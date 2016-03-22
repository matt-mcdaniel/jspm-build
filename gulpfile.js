var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function() {
	del('build/src');
});

require('./gulp/bundle.js')(gulp);
require('./gulp/bundle-sfx.js')(gulp);
require('./gulp/unbundle.js')(gulp);