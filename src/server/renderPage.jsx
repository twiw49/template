require("dotenv").config();
const { S3_BUCKET_URL } = process.env;

import React from "react";
import { readFileSync } from "fs";
import { renderToString } from "react-dom/server";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import { Helmet } from "react-helmet";
import App from "../client/components/App";
import { ServerStyleSheet } from "styled-components";
import rootReducer from "../client/reducers";

const manifest = JSON.parse(readFileSync(`./dist/public/manifest-asset.json`, "utf8"));

const renderPage = (req, res) => {
  const store = createStore(rootReducer);
  const sheet = new ServerStyleSheet();

  const staticContext = {};

  const appString = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter location={req.url} context={staticContext}>
          <App />
        </StaticRouter>
      </Provider>
    )
  );

  const styles = sheet.getStyleTags();

  const preloadedState = store.getState();

  const helmet = Helmet.renderStatic();

  const meta = `
    <link rel="manifest" href="/manifest.json">
          
    <meta name="apple-mobile-web-app-title" content="SmallWins">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-startup-image" href="${S3_BUCKET_URL}icons/launch.png">

    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="${S3_BUCKET_URL}icons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="${S3_BUCKET_URL}icons/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="${S3_BUCKET_URL}icons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="${S3_BUCKET_URL}icons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="${S3_BUCKET_URL}icons/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="${S3_BUCKET_URL}icons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="${S3_BUCKET_URL}icons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="${S3_BUCKET_URL}icons/apple-touch-icon-152x152.png">
    <link rel="icon" type="image/png" href="${S3_BUCKET_URL}icons/favicon-196x196.png" sizes="196x196">
    <link rel="icon" type="image/png" href="${S3_BUCKET_URL}icons/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="${S3_BUCKET_URL}icons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="${S3_BUCKET_URL}icons/favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="${S3_BUCKET_URL}icons/favicon-128.png" sizes="128x128">

    <meta name="msapplication-TileColor" content="#2D91F8">
    <meta name="msapplication-TileImage" content="${S3_BUCKET_URL}icons/mstile-144x144.png">
    <meta name="msapplication-square70x70logo" content="${S3_BUCKET_URL}icons/mstile-70x70.png">
    <meta name="msapplication-square150x150logo" content="${S3_BUCKET_URL}icons/mstile-150x150.png">
    <meta name="msapplication-wide310x150logo" content="${S3_BUCKET_URL}icons/mstile-310x150.png">
    <meta name="msapplication-square310x310logo" content="${S3_BUCKET_URL}icons/mstile-310x310.png">
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=0, user-scalable=0">
        
        ${process.env.NODE_ENV === "production" ? meta : ""} 
        
        ${styles}
        ${helmet.title.toString()}
      </head>
      <body>
        <div id="root">${appString}</div>
      </body>
      <script>
        window.PRELOADED_STATE = ${JSON.stringify(preloadedState)}        
      </script>
      <script src=${manifest["main.js"]}></script>
    </html>
  `;

  res.send(html);
};

export default renderPage;
