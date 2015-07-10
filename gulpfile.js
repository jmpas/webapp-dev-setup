var gulp = require( 'gulp' );
var p = require('gulp-load-plugins')(); // loading gulp plugins lazily
var spawn = require('child_process').spawn;
var node = null;


gulp.task( 'spawn', function () {
  
  if ( node ) {
    node.kill();
  }
  
  node = spawn( 'node', [ 'server.js' ], { stdio:'inherit' } );
  node.on( 'close', function ( code ) {
    if ( code === 8 ) {
      p.util.log( 'Error! Wating for changes' );
    }
  } );

} );

gulp.task( 'livereload-start', function () {
  return p.livereload.listen();
} );

gulp.task( 'watch-server', ['livereload-start'], function () {
  return gulp
    .watch([ 'server.js','backend/**/*.js' ], [ 'spawn' ])
    .on( 'change', function ( file ) {
      p.livereload.changed( file.path );
    } );
} );

gulp.task( 'serve', [ 'spawn', 'watch-server'], function () {} );