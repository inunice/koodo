import dynamic from "next/dynamic";

import DownloadCSV from "./downloadCSV";

const ExportBackup = dynamic(() => import("./exportBackup"), { ssr: false });
const ImportBackup = dynamic(() => import("./importBackup"), { ssr: false });

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <ExportBackup />
      <ImportBackup />
      {/* <DownloadCSV /> */}
    </div>
  );
}
