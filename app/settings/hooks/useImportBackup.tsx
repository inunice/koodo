import { useCallback, useState } from "react";
import { importDB } from "dexie-export-import";

const useImportBackup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const importBackup = useCallback(async (file: File): Promise<boolean> => {
    setIsLoading(true);
    try {
      await importDB(file, {
        progressCallback: (progress) => {
          console.log(
            `Importing: ${progress.completedTables}/${progress.totalTables}`
          );
          return true;
        },
      });
      console.log("Backup imported successfully");
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Failed to import backup:", error);
      setIsLoading(false);
      return false;
    }
  }, []);

  return { importBackup, isLoading };
};

export default useImportBackup;
