import { NextRequest, NextResponse } from "next/server";
import { FicInfo } from "../../types/ficInfo";

const cheerio = require("cheerio");

function getTextArray($: any, selector: string) {
  return $(selector)
    .map((i: number, el: any) => {
      return $(el).text();
    })
    .get();
}

function getNumberFromText($: any, selector: string): number {
  const text = $(selector).text().replace(/,/g, "").trim();
  return Number(text) || 0;
}

export async function GET(req: NextRequest) {
  try {
    const url =
      "https://archiveofourown.org/works/29570736/chapters/72677034".replace(
        /\/chapters\/\d+$/,
        ""
      );
    const match = url.match(/works\/([^\/]+)/);

    const ficID = Number(match?.[1] || 0);

    const response = await fetch(url);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const summary = $("div.summary p")
      .map((i: any, el: any) => $(el).text())
      .get()
      .join("\n");

    const ficInfo: Partial<FicInfo> = {};

    ficInfo.ficID = ficID;
    ficInfo.ficLink = url;
    ficInfo.ficBasicInfo = {
      title: $("h2.title").text().trim(),
      author: $('a[rel="author"]').text(),
      summary,
    };
    ficInfo.ficTags = {
      rating: $("dd.rating").text().trim(),
      archiveWarnings: getTextArray($, "dd.warning ul li"),
      categories: getTextArray($, "dd.category ul li"),
      fandoms: getTextArray($, "dd.fandom ul li"),
      relationships: getTextArray($, "dd.relationship ul li"),
      characters: getTextArray($, "dd.character ul li"),
      additionalTags: getTextArray($, "dd.freeform ul li"),
      language: $("dd.language").text().trim(),
    };

    const publishedDate = new Date($("dd.stats dl.stats dd.published").text());
    const lastestUpdateDate = $("dd.stats dl.stats dd.status").text();
    const chapterProgress = $("dd.stats dl.stats dd.chapters")
      .text()
      .split("/");
    const totalChapters =
      chapterProgress[1] === "?" ? "?" : Number(chapterProgress[1]);

    ficInfo.ficStats = {
      publishedDate,
      lastestUpdateDate: lastestUpdateDate
        ? new Date(lastestUpdateDate)
        : publishedDate, // If no update date, use published date
      words: getNumberFromText($, "dd.stats dl.stats dd.words"),
      latestChapter: Number(chapterProgress[0]),
      totalChapters,
      comments: getNumberFromText($, "dd.comments"),
      kudos: getNumberFromText($, "dd.kudos"),
      bookmarks: getNumberFromText($, "dd.bookmarks"),
      hits: getNumberFromText($, "dd.hits"),
      status: totalChapters === "?" ? "In Progress" : "Complete",
    };

    return new NextResponse(JSON.stringify(ficInfo), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch fic data" }),
      {
        status: 500,
      }
    );
  }
}
