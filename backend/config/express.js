var path         = require( 'path' );
var express      = require( 'express' );
var favicon      = require( 'static-favicon' );
var cookieParser = require( 'cookie-parser' );
var bodyParser   = require( 'body-parser' );
var errorHandler = require( 'errorhandler' );
var config       = require( './config' );


module.exports = function ( app ) {
  var env = app.get( 'env' );

  if ( env === 'development' ) {
    app
    .use( require( 'connect-livereload')() )
    .use( errorHandler() )
    //disables caching of scripts in development module
    //TODO: only for certain paths?
    .use( function (req, res, next) {
      if ( req.url.search( /\.js$/ ) === -1 ) {
        res.header( 'Cache-Control', 'no-cache, no-store, must-revalidate' );
        res.header( 'Pragma', 'no-cache' );
        res.header( 'Expires', 0 );
      }

      next();
    } );
  }

  app
  .use( express.static( path.join( config.root, '.tmp' ) ) )
  .use( express.static( path.join( config.root, 'frontend' ) ) )
  .set( 'views', ( config.root + '/frontend' ) )
  .use( cookieParser() )
  .use( bodyParser.urlencoded({ extended: false }) )
  .use( bodyParser.json() );
  
};