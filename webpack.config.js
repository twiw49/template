const dev = require("./webpack.config.dev");
const prod = require("./webpack.config.prod");

const config = process.env.NODE_ENV === "development" ? dev : prod;

module.exports = config;
