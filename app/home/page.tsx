"use client";

import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState("");

  const getWorkInformation = async () => {
    try {
      const url = new URL(link);
      const id = url.pathname.split("/")[2];

      const response = await fetch(
        `/api/getWorkInfo?id=${encodeURIComponent(id)}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Enter Fic URL</h1>
      <div>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link"
        />
        <button onClick={getWorkInformation}>Get work info</button>
      </div>
    </div>
  );
}
