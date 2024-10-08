import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BookmarkAddIcon } from "@/assets/icon/bookmark";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <div className="fixed bottom-5 right-5">
        <Button asChild className="w-16 h-16">
          <Link href="/add">
            <BookmarkAddIcon className="w-6 h-6" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
