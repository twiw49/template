require("dotenv").config();
const { S3_BUCKET_URL } = process.env;

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const clientConfig = {
  name: "client",
  target: "web",
  entry: "./src/browser.jsx",
  output: {
    path: path.join(__dirname, "dist", "public"),
    publicPath: S3_BUCKET_URL,
    filename: "bundle.[hash:6].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              name: "[name].[hash:6].[ext]",
              outputPath: "images/"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                enabled: true
              },
              pngquant: {
                enabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "src/assets/icons", to: "icons" },
      {
        from: "src/assets/manifest.json",
        to: "manifest.json",
        transform(content, path) {
          return content.toString().replace(/\[S3_BUCKET_URL\]/g, S3_BUCKET_URL);
        }
      }
    ]),
    new ManifestPlugin({ fileName: "manifest-asset.json" }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};

const serverConfig = {
  name: "server",
  target: "node",
  externals: nodeExternals(),
  entry: "./src/lambda.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "lambda.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              emitFile: false,
              limit: 4096,
              name: "[name].[hash:6].[ext]",
              publicPath: `${S3_BUCKET_URL}images`
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                enabled: true
              },
              pngquant: {
                enabled: true
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};

module.exports = [clientConfig, serverConfig];
