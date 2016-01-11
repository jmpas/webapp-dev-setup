'use strict';

var path = require( 'path' );
var config = require( './config' );
var middleware = require( './middleware' );

module.exports = function ( app ) {

  app
    .use( '/login', function ( req, res, next ) {
      if ( req.session.user ) {
        return res.redirect( '/' );
      }

      next();
    })
    .use( '/logout', function ( req, res ) {
      delete req.session.user;
      res.redirect( '/login' );
    })
    .use( '/api/login', require( './api/login' ) );
    .use( '/api/*', middleware.auth );
    .use( '/api/user', require( './api/user' ) );

  app.route( '/' )
    .get( function ( req, res ) {
      res.render( 'index' );
    });
  app.route( '/*' )
    .get( function ( req, res ) {
      res.render( req.url.slice( 1, req.url.length ) );
    });

};
