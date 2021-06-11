const { src, dest, watch } = require("gulp")

const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const terser = require('gulp-terser')


const jsTask = () => {
  // 從src中讀取文件輸出到dist文件中
  return (
    // src("./src/*.js")
    src('./src/**/*.js')
      .pipe(babel({presets: ["@babel/preset-env"]}))
      // .pipe(uglify())
      .pipe(terser({mangle: {toplevel: true}}))
      .pipe(dest("./dist"))
  )
}

watch("./src/**/*.js", jsTask)

module.exports = {
  jsTask
}