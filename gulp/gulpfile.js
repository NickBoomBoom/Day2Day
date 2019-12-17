const {src, dest, series} = require('gulp')
const babel = require('gulp-babel');

exports.default = function () {
  return src('src/*.js')
    .pipe(babel())
    .pipe(dest('output/'));
}

// function defaultTask(cb) {
//   console.log(1)
//   cb()
// }

// function readGulp() {
//   console.log(2)
//   console.log(src('src/*'))
// }

// exports.default = series(defaultTask, readGulp )