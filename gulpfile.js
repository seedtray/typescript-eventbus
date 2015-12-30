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

var webpack = require("webpack");
gulp.task("bundle-tests", function(callback) {
    webpack({
      entry: './src/eventbus_test.ts',
      output: {
        filename: 'built/local/test-bundle.js'
      },
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
      },
      module: {
        loaders: [
          { test: /\.ts$/, loader: 'ts-loader' }
        ]
      }
    }, function(err, stats) {
        if(err) throw err;
        callback();
    });
});

var gulp = require('gulp');
var Server = require('karma').Server;
gulp.task('test', ['bundle-tests'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
