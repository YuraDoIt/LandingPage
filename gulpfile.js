const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf')

//Sass
gulp.task('sass', () => { 
  return gulp.src('source/styles/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('build/css'))
})


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
});

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
gulp.task('clean', (cb) => {
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
})