import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { BookmarksProvider } from "@/context/bookmark-context";

import { Toaster } from "@/components/ui/toaster";

import NavigationBar from "@/components/navigationBar/navigationBar";

import "./globals.css";

const dmSans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "koodo",
  description: "ao3 bookmark manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BookmarksProvider>
      <html lang="en" className={`${dmSans.variable} font-sans lg:mx-[250px]`}>
        <body className="mb-10">
          <NavigationBar />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </BookmarksProvider>
  );
}
