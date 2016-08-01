'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 20 versions'))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch('sass/includes/*.*',['sass']);
});

gulp.task('default', ['connect', 'sass', 'watch']);