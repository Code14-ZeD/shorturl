"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/short", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="url"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border px-3 py-2 rounded w-80"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <p className="mt-4">
          Shortened URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            className="text-blue-500 underline"
          >
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
