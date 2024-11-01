import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./prosemirror.css"
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Outfit } from 'next/font/google';
import MobileNavbar from "@/components/ui/MobileNavbar";
import { TooltipProvider } from "@/components/ui/tooltip";

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "PejuangKorea",
  description: "Learn Korean language and culture",
  manifest: "/manifest.json",
  icons: {
    icon: '/favicon.ico',
    apple: '/images/circle-logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PejuangKorea",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="PejuangKorea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PejuangKorea" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <TooltipProvider>
              <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/30 via-background to-secondary/30 text-foreground">
                <div className="flex flex-grow">   
                  <main className="flex-grow overflow-y-auto">
                    {children}
                  </main>
                </div>
                <MobileNavbar className="md:hidden" />
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
