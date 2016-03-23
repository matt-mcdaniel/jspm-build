var concat = require('gulp-concat');
var replace = require('gulp-replace');
var path = require('path');
var jspm = require('jspm');

module.exports = function(gulp, ENV) {

	gulp.task('bundle-sfx', ['clean', 'unbundle', 'build-deps', 'html-single-script'], function() {

		jspm.bundle('src/main', 'build/main.bundle.js', {
			inject: true,
			minify: true,
			mangle: true,
			format: 'cjs'
		}).then(function() {

			gulp.src([
				'jspm_packages/system.js',
				'config.js',
				'build/main.bundle.js',
				'src/config/system-import.js'
			])
				.pipe(concat('main.bundle.js'))
				.pipe(replace(/System\[[\'\"]import[\'\"]\]\([\"\']src\/(.*)[\"\']\)/gi, 'System["import"]("build/$1")'))
				.pipe(gulp.dest('build'));

		}).catch(function(e) {
			console.warn('Error bundling files:', e);
		});

	});

	return gulp;
};
