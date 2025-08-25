"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Github } from "lucide-react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setShortUrl(null);

    const res = await fetch("/api/urls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ original: url }),
    });

    const data = await res.json();
    setShortUrl(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/${
        data.id
      }`
    );

    setUrl("");
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Hero Section */}
      <section className="max-w-2xl text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold">🔗 URL Shortener</h1>
        <p className="text-gray-600">
          Create short, shareable links and track their performance with
          built-in analytics. Your mini Bitly — simple, fast, and free.
        </p>
      </section>

      {/* Shorten Form */}
      <section className="w-full max-w-lg">
        <form onSubmit={handleShorten} className="flex gap-2">
          <Input
            type="url"
            placeholder="Paste your long URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Shorten"}
          </Button>
        </form>

        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Here’s your short link:</p>
            <a
              href={shortUrl}
              target="_blank"
              className="text-blue-600 underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </section>

      {/* Action Buttons */}
      <section className="mt-8 flex gap-4">
        <Link href="/dashboard">
          <Button variant="outline">📊 Go to Dashboard</Button>
        </Link>

        {/* GitHub Link */}
        <a
          href="https://github.com/Code14-ZeD/shorturl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" className="flex items-center gap-2">
            <Github className="w-4 h-4" /> GitHub
          </Button>
        </a>
      </section>
    </main>
  );
}
