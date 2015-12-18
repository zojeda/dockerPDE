var gulp = require('gulp');
var exec = require('child_process').exec;
var webpack = require('webpack-stream');
var run = require('gulp-run');
var del = require('del');
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');


gulp.task('clean', function () {
  return del([
    'built/**/*',
  ]);
});

gulp.task('build', function(callback) {
  runSequence('clean',
              ['build-main', 'build-web'],
              callback);
});


gulp.task('build-main', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(gulp.dest('./built'));
});


gulp.task('build-web', function () {
  return gulp.src('src/entry.js')
    .pipe(webpack( require('./webpack.make.js')({BUILD: true, TEST: false}) ))
    .pipe(gulp.dest('./built'))
    .pipe(livereload());
});


gulp.task('run', ['build'], function() {
  return run('electron ' + __dirname).exec();
});


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('app/**/*.*',['build']);
});




gulp.task('default', ['watch', 'run']);