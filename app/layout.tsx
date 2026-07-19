import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sunghyunSans = localFont({
  variable: "--font-sunghyun-sans",
  src: [
    { path: "../public/fonts/SunghyunSans-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/SunghyunSans-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/SunghyunSans-SemiBold.otf", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Madestays Vault",
  description: "Track every property's onboarding journey, from first listing to going live.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${sunghyunSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#eceaea] font-sans text-neutral-900">
        {children}
      </body>
    </html>
  );
}
