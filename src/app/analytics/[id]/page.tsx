"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ClickLog {
  id: number;
  shortUrlId: string;
  timestamp: string;
  ip: string | null;
  userAgent: string | null;
}

interface Stats {
  shortUrl: string;
  original: string;
  totalClicks: number;
  clicks: ClickLog[];
}

export default function AnalyticsPage() {
  const { id } = useParams() as { id: string };
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(`/api/stats/${id}`);
      const data = await res.json();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!stats) {
    return <p className="text-center mt-10 text-red-600">No stats available</p>;
  }

  // Format clicks for chart
  const clickData = stats.clicks.map((c) => ({
    date: new Date(c.timestamp).toLocaleDateString(),
  }));

  // Extract simple device info
  const deviceCounts: Record<string, number> = {};
  stats.clicks.forEach((c) => {
    let device = "Other";
    if (c.userAgent) {
      if (/mobile/i.test(c.userAgent)) device = "Mobile";
      else if (/tablet/i.test(c.userAgent)) device = "Tablet";
      else device = "Desktop";
    }
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;
  });

  const deviceData = Object.entries(deviceCounts).map(([device, count]) => ({
    device,
    count,
  }));

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics for {stats.shortUrl}</h1>
      <p className="text-gray-600">
        Original URL:{" "}
        <a
          href={stats.original}
          target="_blank"
          className="text-blue-600 underline"
        >
          {stats.original}
        </a>
      </p>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Total Clicks</h2>
          <p className="text-3xl font-bold">{stats.totalClicks}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Clicks Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clickData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="1" stroke="#2563eb" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Devices</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="device" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Clicks</h2>
          <table className="w-full text-sm border">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-left">IP</th>
                <th className="p-2 text-left">User Agent</th>
              </tr>
            </thead>
            <tbody>
              {stats.clicks
                .slice(-10)
                .reverse()
                .map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="p-2">
                      {new Date(c.timestamp).toLocaleString()}
                    </td>
                    <td className="p-2">{c.ip || "Unknown"}</td>
                    <td className="p-2 truncate max-w-xs">
                      {c.userAgent || "N/A"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
