const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require('gulp-rename');

//Base dir folder where will be taken main html file
/* -------- Server  -------- */
gulp.task('browser', () => {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "build"
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
});

//Sass
gulp.task('sass', () => { 
  return gulp.src('source/styles/main.scss')
  .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('build/css'))
})


//gulp sprite 
gulp.task('sprite', function(cb) {
  const spriteData = gulp.src('source/image/icons/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: 'sprite.scss'
  }));

  spriteData.img.pipe(gulp.dest('build/images/'));
  spriteData.css.pipe(gulp.dest('source/styles/global/'));
  cb();
});

//gulp delete
gulp.task('clean', function del(cb) {
  return rimraf('build', cb)
});

//copy fonts
gulp.task('copy:fonts', () => {
  return gulp.src('./source/fonts/**/*.*')
  .pipe(gulp.dest('build/fonts'));
});

//copy images
gulp.task('copy:images', () => {
  return gulp.src('./source/images/**/*.*')
  .pipe(gulp.dest('build/images'));
});

//copy
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

//-----Watchers--------
gulp.task('watch', () => {
  gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('source/styles/**/*.scss', gulp.series('sass'));
  return true;
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'sass',  'sprite', 'copy'),
  gulp.parallel('watch', 'browser')
  )
);