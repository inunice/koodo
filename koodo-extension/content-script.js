(function () {
  if (!window.location.href.includes("archiveofourown.org/works/")) return;

  const getTextArray = (selector) =>
    Array.from(document.querySelectorAll(selector)).map((el) =>
      el.textContent.trim()
    );

  const getNumberFromText = (selector) => {
    const el = document.querySelector(selector);
    return el ? parseInt(el.textContent.replace(/,/g, "").trim(), 10) || 0 : 0;
  };

  const scrapedData = {
    title: document.querySelector("h2.title")?.textContent.trim(),
    author: getTextArray('a[rel="author"]'),
    summary: getTextArray("div.preface div.summary p:not(.chapter p)"),
    fandoms: getTextArray("dd.fandom ul li"),
    rating: document.querySelector("dd.rating")?.textContent.trim(),
    archiveWarnings: getTextArray("dd.warning ul li"),
    categories: getTextArray("dd.category ul li"),
    relationships: getTextArray("dd.relationship ul li"),
    characters: getTextArray("dd.character ul li"),
    additionalTags: getTextArray("dd.freeform ul li"),
    language: document.querySelector("dd.language")?.textContent.trim(),
    publishedDate: document.querySelector("dd.published")?.textContent.trim(),
    updatedDate: document.querySelector("dd.status")?.textContent.trim(),
    words: getNumberFromText("dd.words"),
    chapters: document.querySelector("dd.chapters")?.textContent.trim(),
    comments: getNumberFromText("dd.comments"),
    kudos: getNumberFromText("dd.kudos"),
    bookmarks: getNumberFromText("dd.bookmarks"),
    hits: getNumberFromText("dd.hits"),
  };

  window.opener?.postMessage({ ao3Extract: scrapedData }, "*");
  window.close();
})();