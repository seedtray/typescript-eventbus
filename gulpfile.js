var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('compile-sources', function () {
	return gulp.src('src/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			out: 'output.js'
		}))
		.pipe(gulp.dest('built/local'));
});

gulp.task('compile-tests', ['compile-sources'], function () {
	return gulp.src('test/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			out: 'testSpecs.js'
		}))
		.pipe(gulp.dest('built/local'));
});

var tslint = require('gulp-tslint');
gulp.task('lint', function() {
    return gulp.src(['src/**/*.ts', 'test/**/*.ts'])
        .pipe(tslint())
        .pipe(tslint.report('verbose'))
});

var gulp = require('gulp');
var Server = require('karma').Server;
gulp.task('test', ['compile-tests'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
