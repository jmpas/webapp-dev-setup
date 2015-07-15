'use strict';

var gulp = require( 'gulp' );
var uglify = require( 'gulp-uglify' );
var minifyCSS = require( 'gulp-minify-css' );
var concat = require( 'gulp-concat' );
var inject = require( 'gulp-inject' );
var minifyHTML = require( 'gulp-minify-html' );
var nodemon = require( 'gulp-nodemon' );
var path = require( 'path' );
var fs = require( 'fs' );
var jasmine = require( 'gulp-jasmine' );

gulp.task( 'backend', function () {
  return gulp
    .src(['./backend/**/*', '!backend/**/*.spec.js'])
    .pipe(gulp.dest('./dist/backend'));
} );


gulp.task( 'build', [ 'backend' ], function () {} );

gulp.task( 'test:backend', function (done) {
  gulp
    .src( './backend/tests/**/*.js' )
    .pipe( jasmine() );
} );

gulp.task( 'test', [ 'test:backend' ], function () {} );

gulp.task( 'serve', function () {
  nodemon({
    script: 'backend/app.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
} );

gulp.task( 'serve:dist', [ 'build' ], function () {
  nodemon({
    script: 'dist/backend/app.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
} );
