var jspm = require('jspm');

module.exports = function(gulp) {

	gulp.task('unbundle', function() {

		jspm.unbundle();

	});

	return gulp;
};
