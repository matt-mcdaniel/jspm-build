var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');

module.exports = function(gulp, ENV) {
	gulp.task('build-deps', function() {

		// gulp replace below replaces this:
		// System.import('src/js/custom')
		// with
		// System.import('build/js/custom')

		// build individual modules
		gulp.src('src/js/**/*.js')
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(gulpif(ENV === 'prod', uglify()))
			.pipe(gulpif(ENV === 'dev', replace(/System.import\([\"\']src\/(.*)[\"\']\)/gi, "System.import('build/$1')")))
			.pipe(gulpif(ENV === 'prod', replace(/System.import\([\"\']src\/(.*)[\"\']\)/gi, 'System["import"]("build/$1")')))
			.pipe(gulp.dest('build/js'));
	});
}