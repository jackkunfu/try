var gulp = require('gulp'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	del = require('del');

var devDir = './app';
var destDir = './app-rev';
var revDir = './rev';

gulp.task('default', ['del-rev', 'rev']);

gulp.task('del-rev', function(){
	return del([revDir, destDir])
})


gulp.task('rev-css-json', function(){
	return gulp.src("./app/css/**/*.css")
		.pipe(rev())
		.pipe(gulp.dest(destDir+'/css/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest(revDir+'/css/'))
});

gulp.task('rev-js-json', function(){
	return gulp.src("./app/js/**/*.js")
		.pipe(rev())
		.pipe(gulp.dest(destDir+'/js/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest(revDir+'/js/'))
});

// gulp.task('rev-css', function(){
// 	gulp.src([revDir+'/css/*.json', devDir+"/*.html"])
// 		.pipe(revCollector({
// 			replaceReved: true
// 		}))
// 		.pipe(gulp.dest(devDir))
// });

// gulp.task('rev-js', function(){
// 	gulp.src([revDir+'/js/*.json', devDir+"/*.html"])
// 		.pipe(revCollector({
// 			replaceReved: true
// 		}))
// 		.pipe(gulp.dest(destDir))
// });


// gulp.task('rev', function(){
// 	return gulp.run(['rev-css-json', 'rev-css', 'rev-js-json', 'rev-js']);
// })

gulp.task('rev',['rev-css-json', 'rev-js-json'], function(){
	gulp.src([revDir+'/**/*.json', devDir+"/*.html"])
		.pipe(revCollector({
			replaceReved: true
		}))
		.pipe(gulp.dest(destDir))
})