var gulp = require('gulp');
// css
// var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// optimising media queries is a bad idea
// js
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish'); // add color to jshint output
var ngAnnotate = require('gulp-ng-annotate');
// css + js
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
// var gzip = require('gulp-gzip');

var paths = {
    sassSrc: 'assets/css/*.scss',
    jsSrc: [
        'js/app.js',
        'js/directives/*.js',
        'js/services/*.js'
    ],
    dist: 'dist',
};

// Production style
var inProduction = true;


gulp.task('sass', function () {
  	gulp.src(paths.sassSrc)
  		.pipe(sourcemaps.init())
    		.pipe(sass({outputStyle: 'compressed'}))
    		.pipe(autoprefixer({
    		    browsers: ['> 1%', 'IE 7'], 
    		    remove: true 
    		}))
    	.pipe(sourcemaps.write())
    	// .pipe(gzip())
    	.pipe(gulp.dest(paths.dist));
});

gulp.task('js',function() {
	return gulp.src(paths.jsSrc)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
	    .pipe(sourcemaps.init())
	    	.pipe(concat(paths.dist))
            .pipe(ngAnnotate())
	    	.pipe(uglify())
	    .pipe(sourcemaps.write())
	    .pipe(rename('all.js'))
	    // .pipe(gzip())
	    .pipe(gulp.dest(paths.dist));
});
 
gulp.task('default',function() {
    gulp.watch(paths.sassSrc,['sass']);
    gulp.watch(paths.jsSrc, ['js']);
});