var replace = require('gulp-replace');
var babel = require('gulp-babel');
var Builder = require('systemjs-builder');
var path = require('path');

module.exports = function(gulp) {

	gulp.task('bundle-sfx', ['clean'], function() {

		var baseURL = path.join(__dirname, '../');
		var config = path.join(__dirname, '../config.js');

		var entry = path.join(__dirname, '../src/main.js');
		var outfile = path.join(__dirname, '../build/src/main.bundle.js');

		// sets new baseURL and config
		var builder = new Builder(baseURL, config);

		builder.buildStatic(entry, outfile, {
			// conditions: {
			// 	'src/app/core/config/env.conditions.js|mock.js': ENV.toLowerCase() === 'test', 'src/app/core/config/env.conditions.js|environment': ENV.toLowerCase()
			// },
			// sourceMaps: true,
			config: {
				runtime: false,
				minify: false,
				mangle: false,
				format: 'cjs'
			}
		}).then(function() {

			// replace paths with build paths
			gulp.src('build/src/main.bundle.js')
				.pipe(replace('src/js/', 'build/src/js/'))
				.pipe(gulp.dest('build/src'));

			// build individual modules
			gulp.src('src/js/**/*.js')
				.pipe(babel({
					presets: ['es2015'],
					plugins: ['system-import-transformer']
				}))
				.pipe(gulp.dest('build/src/js'));

		}).catch(function(e) {
			console.log(e);
		});

	});

	return gulp;
};
