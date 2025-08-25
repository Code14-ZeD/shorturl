import { NextRequest, NextResponse } from "next/server";
import { db } from "@/../lib/db";
import { shortUrls, clicks } from "@/../lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const [urlRecord] = await db
    .select()
    .from(shortUrls)
    .where(eq(shortUrls.id, id));

  if (!urlRecord) {
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  }

  const clickLogs = await db
    .select()
    .from(clicks)
    .where(eq(clicks.shortUrlId, id));

  return NextResponse.json({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${id}`,
    original: urlRecord.original,
    totalClicks: urlRecord.clickCount,
    clicks: clickLogs,
  });
}
