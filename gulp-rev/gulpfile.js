var gulp = require('gulp'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	del = require('del');

var devDir = './app';
var destDir = './app-rev';
var revDir = './rev';

gulp.task('del-rev', function(){
	 return del([revDir, destDir])
})

gulp.task('rev-json', ['del-rev'], function(){
	return gulp.src(["./app/**/*.css", "./app/**/*.js"])
		.pipe(rev())
		.pipe(gulp.dest(destDir))
		.pipe(rev.manifest())
		.pipe(gulp.dest(revDir))
});

gulp.task('rev', ['rev-json'], function(){
	gulp.src([revDir+'/**/*.json', devDir+"/*.html"])
		.pipe(revCollector({
			replaceReved: true
		}))
		.pipe(gulp.dest(destDir))
})
