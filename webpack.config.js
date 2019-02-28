"use strict";

const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  mode: "production",
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new MiniCssExtractPlugin({ filename: "[name]-[contenthash].css" })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                postcssPresetEnv({
                  stage: 2,
                  preserve: false,
                  features: {
                    "custom-media-queries": true,
                    "custom-selectors": true,
                    "nesting-rules": true
                  },
                  importFrom: ["src/common.css"]
                })
              ]
            }
          }
        ]
      }
    ]
  }
};
