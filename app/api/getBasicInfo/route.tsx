import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch("https://archiveofourown.org/works/26337703");
    const text = await response.text();
    return new NextResponse(text, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
