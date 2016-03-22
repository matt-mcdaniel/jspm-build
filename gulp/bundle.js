var jspm = require('jspm');
var replace = require('gulp-replace');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');

module.exports = function(gulp) {

	gulp.task('bundle', ['clean'], function() {

		jspm.bundle('src/main.js', 'build/src/main.bundle.js', {
			inject: true,
			mangle: true,
			format: 'cjs'
		}).then(function() {

			// replace paths with build paths
			gulp.src('build/src/main.bundle.js')
				.pipe(replace('src/js/', 'build/src/js/'))
				.pipe(gulp.dest('build/src'));

			// build individual modules
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
