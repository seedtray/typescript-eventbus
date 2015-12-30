var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');
gulp.task('compile-sources', function () {
  return gulp.src('src/**/*.ts')
    .pipe(ts(tsProject))
    .pipe(gulp.dest('built/local'));
});

var tslint = require('gulp-tslint');
gulp.task('lint', function() {
    return gulp.src(['src/**/*.ts'])
        .pipe(tslint())
        .pipe(tslint.report('verbose'))
});

var gulp = require('gulp');
var Server = require('karma').Server;
gulp.task('test', ['compile-sources'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
