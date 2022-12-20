const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');

//Server
gulp.task('browser', () => {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "source"
    }
  });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

//Pug
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('source/template/index.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'))
})