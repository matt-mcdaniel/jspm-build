var gulp = require('gulp');
var del = require('del');
var jspm = require('jspm');
var inject = require('gulp-inject');
var deleteLines = require('gulp-delete-lines');
var debug = require('gulp-debug');

var ENV = process.env.NODE_ENV;

// global tasks
gulp.task('clean', function() {
	return del('build/src');
});

gulp.task('unbundle', function() {
	jspm.unbundle();
});

gulp.task('remove-scripts', function() {
	return gulp.src('./index.html')
		.pipe(deleteLines({
			'filters': [
				/<script.*>.*<\/script>/i
			]
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('html-single-script', ['remove-scripts'], function() {
	return gulp.src('./index.html')
		.pipe(inject(gulp.src('', {read: false}), {
			starttag: '<!-- inject:prod -->',
			endtag: '<!-- endinject:prod -->',
			transform: function() {
				return '<script src="/build/src/main.bundle.js"></script>';
			}
		}))
		.pipe(debug())
		.pipe(gulp.dest('./'));
});

gulp.task('html-multi-script', ['remove-scripts'], function() {
	var target = ['./jspm_packages/system.js', './config.js', ''];

	return gulp.src('./index.html')
		.pipe(inject(gulp.src(target, {read: false}), {
			starttag: '<!-- inject:dev -->',
			endtag: '<!-- endinject:dev -->',
			transform: function(filepath, file, i) {
				if (i === 2) {
					console.log("2!");
					return '<script>System.import("src/main");</script>';
				}
				return '<script src="' + filepath + '"></script>';
			}
		}))
		.pipe(gulp.dest('./'));
});

// npm run bundle
require('./gulp/bundle.js')(gulp, ENV);

// npm run build
require('./gulp/bundle-sfx.js')(gulp, ENV);

// npm run unbuild
require('./gulp/unbundle.js')(gulp, ENV);
