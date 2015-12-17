var gulp = require('gulp');
var exec = require('child_process').exec;
var webpack = require('webpack-stream');

gulp.task('build', ['build-app'], function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(gulp.dest('./built'));
});


gulp.task('build-app', function () {
  return gulp.src('src/entry.js')
    .pipe(webpack( require('./webpack.make.js')({BUILD: true, TEST: false}) ))
    .pipe(gulp.dest('./built'));
});
