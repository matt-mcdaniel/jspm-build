module.exports = function(gulp, ENV) {

	gulp.task('unbuild', ['unbundle', 'clean', 'html-multi-script']);

	return gulp;

}