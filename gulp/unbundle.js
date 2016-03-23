module.exports = function(gulp, ENV) {

	gulp.task('unbuild', ['clean', 'html-multi-script']);

	return gulp;

}