var jspm = require('jspm');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');
var replace = require('gulp-replace');
var del = require('del');

module.exports = function(gulp) {

	gulp.task('clean', function() {
		del('build/src');
	});

	gulp.task('bundle', ['clean'], function() {

		jspm.bundle('src/main', 'build/src/main.bundle.js', {
			inject: true,
			mangle: true,
		}).then(function() {

			// replace paths with build paths
			gulp.src('build/src/main.bundle.js')
				.pipe(replace('src/js/', 'build/src/js/'))
				.pipe(gulp.dest('build/src'));

			// convert js to ES5
			gulp.src('src/js/**/*.js')
				.pipe(babel({
					presets: [es2015]
				}))
				.pipe(gulp.dest('build/src/js'));

		}).catch(function(e) {
			console.warn(e);
		});

	});

	return gulp;
};
