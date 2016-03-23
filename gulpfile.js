var gulp = require('gulp');
var del = require('del');
var jspm = require('jspm');

var ENV = process.env.NODE_ENV;

// global tasks
gulp.task('clean', function() {
	del('build');
});

gulp.task('unbundle', function() {
	jspm.unbundle();
});

// global deps
require('./gulp/html-inject.js')(gulp, ENV);
require('./gulp/build-deps.js')(gulp, ENV);

// npm run bundle
require('./gulp/bundle.js')(gulp, ENV);

// npm run build
require('./gulp/bundle-sfx.js')(gulp, ENV);

// npm run unbuild
require('./gulp/unbundle.js')(gulp, ENV);
