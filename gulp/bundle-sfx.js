var replace = require('gulp-replace');
var babel = require('gulp-babel');
var Builder = require('systemjs-builder');
var path = require('path');

module.exports = function(gulp, ENV) {

	gulp.task('build-files', function() {

		// sets new baseURL and config
		var baseURL = path.join(__dirname, '../');
		var config = path.join(__dirname, '../config.js');
		var builder = new Builder(baseURL, config);

		var entry = path.join(__dirname, '../src/main.js');
		var outfile = path.join(__dirname, '../build/src/main.bundle.js');
		var systemImportShim = path.join(__dirname, '../src/config/system-import-shim.js');

		var bundle = ENV === 'prod' ? systemImportShim + ' + ' + entry : entry;

		builder.buildStatic(bundle, outfile, {
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
					presets: ['es2015']
				}))
				.pipe(gulp.dest('build/src/js'));

		}).catch(function(e) {
			console.log(e);
		});

	});

	gulp.task('bundle-sfx', ['build-files', 'clean', 'unbundle', 'html-single-script'])

	return gulp;
};
