import { ThemeProvider } from "next-themes";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="customer"
      disableTransitionOnChange
    >
      <div className="bg-fixed bg-linear-to-br from-sky-900 via-slate-800 to-green-900">
        {children}
      </div>
    </ThemeProvider>
  );
}
