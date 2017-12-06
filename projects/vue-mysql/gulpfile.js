var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
var browserSync = require('browser-sync').create();

gulp.task('nodemon', function(cb) {
  var started = false;

  return nodemon({
    script: 'app.js'
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('default', ['nodemon'], function(){
  browserSync.init({
    proxy: 'http://localhost:3000',
    browser: 'chrome',
    port: 7000
  });

  // gulp.watch('public/**/*.+(scss|jade|ls)', ['inject']).on('change', browserSync.reload);
});
