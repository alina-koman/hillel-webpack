import path from "node:path"
import { fileURLToPath } from 'node:url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PROD = process.env.NODE_ENV === 'production'

const getFilename = (ext) => `assets/${ext}/[name]${IS_DEV ? '' : '.[fullhash]'}.${ext}`

const setCssLoaders = (extra) => {
    const loaders = [MiniCssExtractPlugin.loader, 'css-loader']
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

const setJsLoaders = (extra) => {
    const presets = ['@babel/preset-env']
    if (extra) {
        presets.push(extra)
    }
    
    return [{
        loader: "babel-loader",
        options: { presets }
    }]
}

const setPlugins = (extra) => {
    const plugins = [new HtmlWebpackPlugin({
        template: './index.html',
    }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!.gitkeep']
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src', 'favicon.png'),
                to: path.resolve(__dirname, 'favicon.png'),
            }]
        }),
        new MiniCssExtractPlugin({
            filename: getFilename('css'),
        })
    ]

    if (IS_PROD) {
        // code here
    }

    return plugins
}

export default {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: "./index.js",
      stat: "./statistics.ts"
    },
    target: "web",
    devServer: {
      port: 4200,
      hot: false ,
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: getFilename("js"),
    },
    resolve: {
        extensions: [".js", ".jsx", ".json",  ".ts", ".tsx"],
    },
    optimization: {
      splitChunks: {
          chunks: 'all',
      },
        minimize: IS_PROD,
        minimizer: [
            "...",
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
    plugins: [
        ...setPlugins(),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: setJsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: setJsLoaders('@babel/preset-typescript')
            },
            {
                test: /\.css$/i,
                use: setCssLoaders(),
            },
            {
                test: /\.less$/i,
                use: setCssLoaders('less-loader'),
            },
            {
                test: /\.s[ac]ss$/i,
                use: setCssLoaders('sass-loader'),
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name].[contenthash][ext]",
                }
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[name].[contenthash][ext]",
                }
            }
        ]
    },
}