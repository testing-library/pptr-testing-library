// @ts-check

const path = require("path");
const Benchmark = require("benchmark");
const puppeteer = require("puppeteer");
const { queries: baseQueries, getDocument } = require("./versions/base");
const { queries: windowQueries } = require("./versions/window");
const { queries: execQueries } = require("./versions/executionContext");

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
        baseQueries
          .getByText(document, "Hello h1")
          .then(() => deferred.resolve());
      },
    })
    .add({
      name: "window check",
      defer: true,
      fn(deferred) {
        windowQueries
          .getByText(document, "Hello h1")
          .then(() => deferred.resolve());
      },
    })
    .add({
      name: "execution context",
      defer: true,
      fn(deferred) {
        execQueries
          .getByText(document, "Hello h1")
          .then(() => deferred.resolve());
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
