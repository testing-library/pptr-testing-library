// @ts-check

const path = require("path");
const Benchmark = require("benchmark");
const puppeteer = require("puppeteer");
const { queries: currentQueries } = require("./current");
const { queries: newQueries, getDocument } = require("./");

var suite = new Benchmark.Suite("pptr-testing-library");

async function main() {
  const browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(`file://${path.join(__dirname, "test/fixtures/page.html")}`);
  let document = await getDocument(page);

  // add tests
  suite
    .add({
      name: "current findByRole",
      defer: true,
      fn(deferred) {
        currentQueries
          .getByText(document, "Hello h1")
          .then(() => deferred.resolve());
      },
    })
    .add({
      name: "new findByRole",
      defer: true,
      fn(deferred) {
        newQueries
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
