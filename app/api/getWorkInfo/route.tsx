import { NextRequest, NextResponse } from "next/server";
import { WorkInfo } from "@/types/workInfo";

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
    const { searchParams } = new URL(req.url);
    const workID = Number(searchParams.get("id"));

    if (!workID) {
      return new NextResponse(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const url = "https://archiveofourown.org/works/" + workID;

    const response = await fetch(url);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const workInfo: Partial<WorkInfo> = {};

    workInfo.workID = workID;
    workInfo.workLink = url;
    workInfo.fetchDate = new Date();
    workInfo.workBasicInfo = {
      title: $("h2.title").text().trim(),
      author: getTextArray($, 'a[rel="author"]'),
      summary: getTextArray($, "div.preface div.summary p:not(.chapter p)"),
      fandoms: getTextArray($, "dd.fandom ul li"),
    };

    console.log(workInfo.workBasicInfo);
    workInfo.workTags = {
      rating: $("dd.rating").text().trim(),
      archiveWarnings: getTextArray($, "dd.warning ul li"),
      categories: getTextArray($, "dd.category ul li"),
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
      chapterProgress[1] === "?" ? 0 : Number(chapterProgress[1]);

    workInfo.workStats = {
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
      status: totalChapters === 0 ? "In Progress" : "Complete",
      workType: totalChapters === 1 ? "One Shot" : "Multi Chapter",
    };

    return new NextResponse(JSON.stringify(workInfo), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch work data" }),
      {
        status: 500,
      }
    );
  }
}
