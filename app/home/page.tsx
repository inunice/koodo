"use client";

import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/getFicInfo?url=${encodeURIComponent(link)}`,
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
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
