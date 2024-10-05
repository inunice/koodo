"use client";

import dynamic from "next/dynamic";

import { useBookmarks } from "@/context/bookmarkContext";

import DownloadCSV from "./downloadCSV";

const ExportBackup = dynamic(() => import("./exportBackup"), { ssr: false });
const ImportBackup = dynamic(() => import("./importBackup"), { ssr: false });

export default function SettingsPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div>
      <h1>Settings</h1>
      <div className="flex flex-col gap-2">
        <DownloadCSV bookmarks={bookmarks} />
        <ExportBackup />
        <ImportBackup />
      </div>
    </div>
  );
}
