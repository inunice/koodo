"use client";

import useExportBackup from "./hooks/useExportBackup";

import { Button } from "@/components/ui/button";

export default function ImportBackup() {
  const exportBackup = useExportBackup();

  return <Button onClick={exportBackup}>Export backup</Button>;
}
