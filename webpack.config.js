const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { clear } = require("console");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => ({
  mode: argv.mode || "development",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean:true  
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/assets", to: "assets" }, // Copies assets folder
      ],
    }),
  ],
  devServer: {
    static: {
      directory: "./dist",      
    },
    open: true
  }
});
