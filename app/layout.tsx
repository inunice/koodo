import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";

import { BookmarksProvider } from "@/context/bookmarkContext";

import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { BookmarkAddIcon } from "@/assets/icon/bookmark";

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
        <body>
          <NavigationBar />

          <main>{children}</main>

          <div className="fixed bottom-5 right-5">
            <Button asChild className="w-16 h-16">
              <Link href="/add">
                <BookmarkAddIcon className="w-6 h-6" />
              </Link>
            </Button>
          </div>

          <Toaster />
        </body>
      </html>
    </BookmarksProvider>
  );
}
