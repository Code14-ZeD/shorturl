"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface UrlRecord {
  id: string;
  original: string;
  createdAt: string;
  clickCount: number;
}

export default function DashboardPage() {
  const [urls, setUrls] = useState<UrlRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState("");
  const [creating, setCreating] = useState(false);

  // fetch all URLs
  const fetchUrls = async () => {
    setLoading(true);
    const res = await fetch("/api/urls");
    const data = await res.json();
    setUrls(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // handle create
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    setCreating(true);
    await fetch("/api/urls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ original: newUrl }),
    });
    setNewUrl("");
    setCreating(false);
    fetchUrls();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">📊 URL Dashboard</h1>

      {/* Create Form */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleCreate} className="flex gap-2 items-center">
            <Input
              type="url"
              placeholder="Enter a URL to shorten"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              required
            />
            <Button type="submit" disabled={creating}>
              {creating ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Shorten"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* URL Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border min-w-[600px]">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-2 text-left">Short URL</th>
                  <th className="p-2 text-left">Original URL</th>
                  <th className="p-2 text-left">Clicks</th>
                  <th className="p-2 text-left">Created</th>
                  <th className="p-2 text-left">Analytics</th>
                </tr>
              </thead>
              <tbody>
                {urls.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      No URLs shortened yet
                    </td>
                  </tr>
                )}
                {urls.map((url) => (
                  <tr key={url.id} className="border-b">
                    <td className="p-2 whitespace-nowrap">
                      <a
                        href={`/${url.id}`}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        {`${
                          process.env.NEXT_PUBLIC_BASE_URL ||
                          "http://localhost:3000"
                        }/${url.id}`}
                      </a>
                    </td>
                    <td className="p-2 truncate max-w-[150px]">
                      <a
                        href={url.original}
                        target="_blank"
                        className="text-gray-700 hover:underline"
                      >
                        {url.original}
                      </a>
                    </td>
                    <td className="p-2 text-center">{url.clickCount}</td>
                    <td className="p-2 whitespace-nowrap">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <Link
                        href={`/analytics/${url.id}`}
                        className="text-blue-500 underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
