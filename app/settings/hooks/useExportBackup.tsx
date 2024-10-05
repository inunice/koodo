import { useCallback } from "react";
import { exportDB } from "dexie-export-import";

import { localDatabase } from "@/config/localDatabase";

const useExportBackup = () => {
  const exportBackup = useCallback(async () => {
    try {
      const blob = await exportDB(localDatabase);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const fileName =
        "koodo-backup-" +
        new Date().toISOString().replace(/[:.]/g, "-") +
        ".json";
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export backup:", error);
    }
  }, []);

  return exportBackup;
};

export default useExportBackup;
