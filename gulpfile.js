var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 4000
	});
});

gulp.task('browserify', function() {
	// Grabs the app.js file
    return browserify('./app/app.js')
    	// bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('sass', function() {
	return sass('assets/sass/style.sass')
		.pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['browserify']);
	gulp.watch('assets/sass/style.sass', ['sass']);
	gulp.watch('assets/images/*', ['images']);
});

gulp.task('images', function() {
	return gulp.src('assets/images')
		.pipe(cache(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest('public/assets/images'));
});

gulp.task('release', ['browserify', 'sass', 'images']);

gulp.task('default', ['connect', 'watch']);