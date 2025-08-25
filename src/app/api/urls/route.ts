import { NextResponse } from "next/server";
import { db } from "@/../lib/db";
import { shortUrls } from "@/../lib/schema";
import { nanoid } from "nanoid";

// GET all urls
export async function GET() {
  const urls = await db.select().from(shortUrls);
  return NextResponse.json(urls);
}

// POST create a new short url
export async function POST(req: Request) {
  const body = await req.json();
  const { original } = body;

  if (!original) {
    return NextResponse.json(
      { error: "Original URL is required" },
      { status: 400 }
    );
  }

  const id = nanoid(6); // short unique id

  const [newUrl] = await db
    .insert(shortUrls)
    .values({
      id,
      original,
    })
    .returning();

  return NextResponse.json(newUrl);
}
