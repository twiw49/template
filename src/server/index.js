require("dotenv").config();
const { S3_BUCKET_URL } = process.env;

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import request from "request";
import renderPage from "./renderPage";

const app = express()
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use("/static/", express.static("dist/public"));

  const PORT = process.env.PORT || 1234;
  app.listen(PORT, () => console.log(`Server Listening on Port : ${PORT}`));
}

if (process.env.NODE_ENV === "production") {
  app.get("/service-worker.js", (req, res) => {
    return request(`${S3_BUCKET_URL}service-worker.js`).pipe(res);
  });

  app.get("/manifest.json", (req, res) => {
    return request(`${S3_BUCKET_URL}manifest.json`).pipe(res);
  });
}

app.get("/", renderPage);

module.exports = app;
