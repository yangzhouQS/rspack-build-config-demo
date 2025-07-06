import {defineConfig} from "@rspack/cli";
import {type RspackPluginFunction, rspack} from "@rspack/core";
import {VueLoaderPlugin} from "vue-loader";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  target: "web",
  entry: {
    main: "./src/main.ts",
    home: './src/web-content/home/main.ts'
  },
  resolve: {
    extensions: ["...", ".ts", ".vue", '.tsx', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true
        }
      },
      {
        test: /\.(js|ts)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript"
                }
              },
              env: {targets}
            }
          }
        ]
      },
      {
        test: /\.svg/,
        type: "asset/resource"
      },
      {
        test: /\.less$/,
        loader: "less-loader",
        type: "css"
      },
      {
        test: /\.(tsx|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-typescript', {allExtensions: true, isTSX: true}]],
              plugins: ['@vue/babel-plugin-jsx'],
            },
          },
        ],
      },
    ]
  },
  plugins: [
    isDev && new rspack.HotModuleReplacementPlugin(),
    new rspack.HtmlRspackPlugin({
      template: "./index.html"
      /*templateParameters: (params) => {
        // console.log(params);
        return {
          home: './index.html',
          main: './index.html'
        }
      },*/
      /*templateContent:( params)=>{
        console.log(1111,params);
        return ''
      }*/
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
    new VueLoaderPlugin() as RspackPluginFunction
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: {targets}
      })
    ]
  },
  experiments: {
    css: true
  }
});
