import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { shortUrls } from "../../../lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const [record] = await db
    .select()
    .from(shortUrls)
    .where(eq(shortUrls.id, id));

  if (!record) {
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  }

  return NextResponse.redirect(record.original);
}
