import ExportBackup from "./exportBackup";
import ImportBackup from "./importBackup";

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <ExportBackup />
      <ImportBackup />
    </div>
  );
}
