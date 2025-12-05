import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GlobalSnackbar from "@/components/GlobalSnackbar";

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Simple Blog",
  description: "Simple blog by Nott Nott",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={montserrat.className}
      >
        <Providers>
          {children}
          <GlobalSnackbar />
        </Providers>
      </body>
    </html>
  );
}
