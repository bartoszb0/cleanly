import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ROUTES = {
    public: ["/confirm", "/error", "/forgot-password", "/login", "/sign-up", "/sign-up-success", "/update-password"],
    auth: ["/login", "/sign-up", "/forgot-password"],
    home: { cleaner: "/cleaner", customer: "/customer" } as Record<string, string>,
    onboarding: "/onboarding",
  };

  const pathname = request.nextUrl.pathname;
  const isPublicRoute = ROUTES.public.some((route) => pathname.startsWith(route));

  // 1. Handle Unauthenticated Users
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 2. Handle Authenticated Users
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarded, role")
      .eq("id", user.id)
      .single();

    const role = profile?.role; // "cleaner" | "customer" | null
    const roleHome = ROUTES.home[role ?? ""] ?? "/customer";

    // Define onboarding sub-paths
    const isBaseOnboarding = pathname === ROUTES.onboarding;
    const isRoleOnboarding = pathname.startsWith(`${ROUTES.onboarding}/${role}`);
    const isOnboardingPath = pathname.startsWith(ROUTES.onboarding);

    // A. ROOT PATH REDIRECTION ('/')
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      if (!profile?.onboarded) {
        url.pathname = role ? `${ROUTES.onboarding}/${role}` : ROUTES.onboarding;
      } else {
        url.pathname = roleHome;
      }
      return NextResponse.redirect(url);
    }

    // B. Force Onboarding if not finished
    if (!profile?.onboarded && !isPublicRoute) {
      if (!role && !isBaseOnboarding) {
        return NextResponse.redirect(new URL(ROUTES.onboarding, request.url));
      }
      if (role && !isRoleOnboarding) {
        return NextResponse.redirect(new URL(`${ROUTES.onboarding}/${role}`, request.url));
      }
    }

    // C. Prevent already onboarded users from seeing Auth/Onboarding pages
    if (profile?.onboarded && (ROUTES.auth.includes(pathname) || isOnboardingPath)) {
      const url = request.nextUrl.clone();
      url.pathname = roleHome;
      return NextResponse.redirect(url);
    }

    // D. ROLE PROTECTION
    if (profile?.onboarded) {
      if (pathname.startsWith("/cleaner") && role !== "cleaner") {
        return NextResponse.redirect(new URL(ROUTES.home.customer, request.url));
      }
      if (pathname.startsWith("/customer") && role !== "customer") {
        return NextResponse.redirect(new URL(ROUTES.home.cleaner, request.url));
      }
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
