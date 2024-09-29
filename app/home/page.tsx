"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { fetchWorks } from "@/app/api/fetchWorks";

import { WorkInfo } from "@/types/workInfo";

import { Button } from "@/components/ui/button";

export default function Home() {
  const [works, setWorks] = useState<WorkInfo[]>([]);

  useEffect(() => {
    const getWorks = async () => {
      const fetchedWorks = await fetchWorks();
      if (fetchedWorks) {
        setWorks(fetchedWorks);
      }
    };

    getWorks();
  }, []);

  return (
    <div>
      <span>Home</span>
      <div>
        <Button asChild>
          <Link href="/add">Add work</Link>
        </Button>
      </div>
      {works.map((work, index) => (
        <div key={index}>
          <h2>{work.workID}</h2>
          <h2>{work.workBasicInfo.title}</h2>
        </div>
      ))}
    </div>
  );
}
