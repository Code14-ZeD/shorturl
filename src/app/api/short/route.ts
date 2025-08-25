import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "../../../../lib/db";
import { shortUrls } from "../../../../lib/schema";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const shortId = crypto.randomBytes(4).toString("hex");

  await db.insert(shortUrls).values({
    id: shortId,
    original: url,
  });

  return NextResponse.json({
    shortUrl: `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/${shortId}`,
  });
}
