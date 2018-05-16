const { readFileSync, writeFileSync } = require("fs");
const hash = require("random-id");

const assets = JSON.parse(readFileSync(`./dist/public/manifest-asset.json`, "utf8"));

const CACHE_NAME = `static-cache-${hash()}`;
const URLS_TO_CACHE = ["./", ...Object.values(assets)];
const BASE = readFileSync("./src/sw/base.js").toString();
const SW = `(function() {
  "use strict";

  const CACHE_NAME = ${JSON.stringify(CACHE_NAME)};
  const URLS_TO_CACHE = ${JSON.stringify(URLS_TO_CACHE)};

  ${BASE}
})();`;

writeFileSync("./dist/public/service-worker.js", SW);
