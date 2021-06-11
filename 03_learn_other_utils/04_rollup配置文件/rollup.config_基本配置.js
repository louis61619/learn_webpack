export default {
  input: "./src/main.js",
  // output: {
  //   format: "umd", // iife/cjs/amd/umd
  //   name: "rennyUtils",
  //   file: "dist/renny.umd.js"
  // }
  output: [
    {
      format: "umd",
      name: "rennyUtils",
      file: "dist/renny.umd.js"
    },
    {
      format: "cjs",
      file: "dist/renny.commonjs.js"
    },
    {
      format: "amd",
      file: "dist/renny.amd.js"
    },
    {
      format: "es",
      file: "dist/renny.es.js"
    },
    {
      format: "iife",
      name: "rennyUtils",
      file: "dist/renny.browser.js"
    }
  ]
}