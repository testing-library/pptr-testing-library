// @ts-check

const path = require("path");
const Benchmark = require("benchmark");
const puppeteer = require("puppeteer");
const { queries: baseQueries, getDocument } = require("./versions/base");
const { queries: windowQueries } = require("./versions/window");
const { queries: execQueries } = require("./versions/executionContext");
const { queries: latestQueries } = require("./");

var suite = new Benchmark.Suite("pptr-testing-library");

async function main() {
  const browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(`file://${path.join(__dirname, "test/fixtures/page.html")}`);
  let document = await getDocument(page);

  // add tests
  suite
    .add({
      name: "base",
      defer: true,
      fn(deferred) {
        baseQueries.getByAltText(document, "Image A").then((result) => {
          if (result) {
            deferred.resolve();
          } else {
            throw new Error("Image not found.");
          }
        });
      },
    })
    .add({
      name: "execution context",
      defer: true,
      fn(deferred) {
        execQueries.getByAltText(document, "Image A").then((result) => {
          if (result) {
            deferred.resolve();
          } else {
            throw new Error("Image not found.");
          }
        });
      },
    })
    .add({
      name: "latest",
      defer: true,
      fn(deferred) {
        latestQueries.getByAltText(document, "Image A").then((result) => {
          if (result) {
            deferred.resolve();
          } else {
            throw new Error("Image not found.");
          }
        });
      },
    })
    .add({
      name: "querySelector",
      defer: true,
      fn(deferred) {
        page.$('img[alt="Image A"]').then((result) => {
          if (result) {
            deferred.resolve();
          } else {
            throw new Error("Image not found.");
          }
        });
      },
    })
    // add listeners
    .on("cycle", function(event) {
      console.log(String(event.target));
    })
    .on("complete", function() {
      console.log("Fastest is " + this.filter("fastest").map("name"));
      browser.close();
    })
    // run async
    .run({ async: true });
}

main();
