import path from "node:path"
import { fileURLToPath } from "node:url"
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import * as test from "node:test";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: "./index.js",
      stat: "./statistics.js"
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
    },
    resolve: {
        extensions: ["js", "jsx", "json",  ".ts", ".tsx"],
    },
    optimization: {
      splitChunks: {
          chunks: 'all',
      }
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html',
    }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                 test: /\.(png|jpg|jpeg|gif|svg|ttf|woff|woff2)$/,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name].[contenthash][ext]",
                }
            },
            {
                test: /\.png|jpe?g|gif$|webp|svg$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[name].[contenthash][ext].png",
                }
            }
        ]
    },
}