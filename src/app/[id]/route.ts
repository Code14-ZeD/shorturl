import { NextRequest, NextResponse } from "next/server";
import { db } from "@/../lib/db";
import { shortUrls, clicks } from "@/../lib/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Find original URL
  const [record] = await db
    .select()
    .from(shortUrls)
    .where(eq(shortUrls.id, id));

  if (!record) {
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  }

  // Increment click count
  await db
    .update(shortUrls)
    .set({ clickCount: sql`${shortUrls.clickCount} + 1` })
    .where(eq(shortUrls.id, id));

  // Get IP safely
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("cf-connecting-ip") ||
    null;

  // Log analytics
  await db.insert(clicks).values({
    shortUrlId: id,
    ip,
    userAgent: req.headers.get("user-agent") || null,
  });

  return NextResponse.redirect(record.original);
}
