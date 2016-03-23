var deleteLines = require('gulp-delete-lines');
var inject = require('gulp-inject');

module.exports = function(gulp, ENV) {

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
			.pipe(inject(gulp.src('', { read: false }), {
				starttag: '<!-- inject:prod -->',
				endtag: '<!-- endinject:prod -->',
				transform: function() {
					return '<script src="build/main.bundle.js"></script>';
				}
			}))
			.pipe(gulp.dest('./'));
	});

	gulp.task('html-multi-script', ['remove-scripts'], function() {
		var target = ['./jspm_packages/system.js', './config.js', './src/config/system-import.js'];

		return gulp.src('./index.html')
			.pipe(inject(gulp.src(target, { read: false }), {
				starttag: '<!-- inject:dev -->',
				endtag: '<!-- endinject:dev -->',
			}))
			.pipe(gulp.dest('./'));
	});

	return gulp;
}