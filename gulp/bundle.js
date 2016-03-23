var jspm = require('jspm');
var replace = require('gulp-replace');

module.exports = function(gulp) {

	gulp.task('bundle', ['clean', 'unbundle', 'build-deps', 'html-multi-script'], function() {

		jspm.bundle('src/main', 'build/main.bundle.js', {
			inject: true,
			mangle: true,
			format: 'cjs'
		}).then(function() {

			console.log('Bundle created and injected into config.js');

			gulp.src('build/main.bundle.js')
				.pipe(replace(/System\[[\'\"]import[\'\"]\]\([\"\']src\/(.*)[\"\']\)/gi, 'System["import"]("build/$1")'))
				.pipe(gulp.dest('build'));

		}).catch(function(e) {
			console.warn(e);
		});

	});

	return gulp;
};
