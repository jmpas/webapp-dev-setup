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
var mocha = require( 'gulp-mocha' );
var istanbul = require( 'gulp-istanbul' );

gulp.task( 'build:backend', function () {
  return gulp
    .src([ './backend/api/**/*', '!backend/api/**/*.spec.js' ])
    .pipe( gulp.dest( './dist/backend' ) );
});

gulp.task( 'build', [ 'build:backend' ], function () {});

/**
 * Run backend tests
 */
gulp.task( 'pre-test:backend', function () {
  return gulp.src([ 'backend/api/**/*.model.js', 'backend/api/**/*.controller.js', '!backend/api/**/*.spec.js' ])
    // Covering files
    .pipe( istanbul() )
    // Force `require` to return covered files
    .pipe( istanbul.hookRequire() );
});

gulp.task( 'test:backend', [ 'pre-test:backend' ], function () {
  return gulp.src([ 'backend/api/**/*.spec.js' ])
    .pipe( mocha({ reporter: 'nyan' }) )
    // Creating the reports after tests ran
    .pipe( istanbul.writeReports() )
    // Enforce a coverage value
    .pipe( istanbul.enforceThresholds({ thresholds: { global: 100 } }) );
});

gulp.task( 'test', [ 'test:backend' ], function () {});

gulp.task( 'serve', function () {
  nodemon({
    script: 'backend/app.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task( 'serve:dist', [ 'build' ], function () {
  nodemon({
    script: 'dist/backend/app.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});
