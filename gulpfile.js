// Gulp
var gulp = require('gulp');

// Plugins
var sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    imagemin = require('gulp-imagemin');

// Paths
var paths = {
  scss: 'assets/sass/**/*.scss',
  images: 'assets/img/**',
  html: 'index.html'
};

gulp.task('browser-sync', function() {
    browserSync.init(['assets/dist/*.css'], {
        proxy: 'localhost'
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// CSS
gulp.task('styles', function() {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(minifycss())
    .pipe(gulp.dest('assets/dist'))
    .pipe(reload({stream:true}));
});

// Images
gulp.task('images', function() {
  return gulp.src(paths.images)
  .pipe(imagemin())
  .pipe(gulp.dest('assets/img'));
});

// Default task
gulp.task('default', ['styles', 'browser-sync'], function() {
  gulp.watch(paths.scss, ['styles']);
  gulp.watch(paths.images, ['images', 'bs-reload']);
  gulp.watch(paths.html, ['bs-reload']);
});