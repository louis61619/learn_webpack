import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import vue from "rollup-plugin-vue";
import replace from "rollup-plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

console.log(process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === "production";

const plugins = [ // 共用插件
  commonjs(),
  resolve(),
  replace({
    // vue需要依賴環境變量
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  }),
  babel({
    babelHelpers: "bundled",
  }),
  postcss(),
  vue(),
];

if (isProduction) { // 判斷環境加載插件
  plugins.push(terser());
} else {
  const devPlugins = [
    serve({
      open: true, // 是否打開瀏覽器
      port: 8080, // 監聽哪一個端口
      contentBase: ".", // 服務哪一個文件夾
    }),
    livereload(), // 文件更改時更新
  ];
  plugins.push(...devPlugins);
}

export default {
  input: "./src/main.js",
  output: {
    format: "umd", // iife/cjs/amd/umd
    name: "rennyUtils",
    file: "dist/renny.umd.js",
    globals: {
      lodash: "_",
    },
  },
  external: ["lodash"],
  plugins,
};
