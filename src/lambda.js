const awsServerlessExpress = require("aws-serverless-express");
const app = require("./server");
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  // console.log(event);
  awsServerlessExpress.proxy(server, event, context);
};
