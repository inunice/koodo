import { NextRequest, NextResponse } from "next/server";

const cheerio = require("cheerio");

function getTextArray($: any, selector: string) {
  return $(selector)
    .map((i: number, el: any) => {
      return $(el).text();
    })
    .get();
}

export async function GET(req: NextRequest) {
  try {
    const response = await fetch("https://archiveofourown.org/works/41369472");
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const title = $("h2.title").text().trim();
    const author = $('a[rel="author"]').text();
    const summary = $("div.summary p")
      .map((i: any, el: any) => $(el).text())
      .get()
      .join("\n");

    const fandoms = getTextArray($, "dd.fandom ul li");
    const relationships = getTextArray($, "dd.relationship ul li");
    const characters = getTextArray($, "dd.character ul li");

    const language = $("dd.language").text().trim();

    return new NextResponse(
      JSON.stringify({
        relationships,
        characters,
        fandoms,
        title,
        author,
        summary,
        language,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
