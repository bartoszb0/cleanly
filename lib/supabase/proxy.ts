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

  const publicRoutes = [
    "/confirm",
    "/error",
    "/forgot-password",
    "/login",
    "/sign-up",
    "/sign-up-success",
    "/update-password",
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // 1. Handle Unauthenticated Users
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 2. Handle Authenticated Users
  if (user) {
    // FETCH THE PROFILE DATA FROM THE PUBLIC TABLE
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarded, role")
      .eq("id", user.id)
      .single();

    const pathname = request.nextUrl.pathname;
    const isOnboardingPage = pathname.startsWith("/onboarding");
    const authPages = ["/login", "/sign-up", "/forgot-password"];

    // A. ROOT PATH REDIRECTION ('/')
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      if (!profile?.onboarded) {
        url.pathname = "/onboarding";
      } else {
        url.pathname = profile.role === "cleaner" ? "/cleaner" : "/customer";
      }
      return NextResponse.redirect(url);
    }

    // B. Force Onboarding if not finished
    if (!profile?.onboarded && !isOnboardingPage && !isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }

    // C. Prevent already onboarded users from seeing Auth/Onboarding pages
    if (
      profile?.onboarded &&
      (authPages.includes(pathname) || isOnboardingPage)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = profile.role === "cleaner" ? "/cleaner" : "/customer";
      return NextResponse.redirect(url);
    }

    // D. ROLE PROTECTION (Cross-access prevention)
    if (profile?.onboarded) {
      if (pathname.startsWith("/cleaner") && profile.role !== "cleaner") {
        return NextResponse.redirect(new URL("/customer", request.url));
      }
      if (pathname.startsWith("/customer") && profile.role !== "customer") {
        return NextResponse.redirect(new URL("/cleaner", request.url));
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
