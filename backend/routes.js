'use strict';

var path = require( 'path' );
var config = require( './config' );
var middleware = require( './middleware' );

module.exports = function ( app ) {

  //app.use( '/api/*', middleware.auth );
  app.use( '/api/user', require( './api/user' ) );

  app.route( '/*' )
    .get( function ( req, res ) {
      res.sendFile( path.resolve( app.get( 'appPath' ) + req.url + '.html' ) );
    });

};
