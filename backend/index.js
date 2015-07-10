'use strict'

var middleware = require( './middleware' );
var path = require( 'path' );

// send partial, or 404
var partials = function ( req, res ) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join( './', stripped );

  res.send( requestedView );
};

// send our single page app
var index = function ( req, res ) {
  res.render( 'index' );
};

module.exports = function (app) {
  app.route( '/modules/*' )
    .get( partials );
  app.route( '/*' )
    .get( middleware.setUserCookie, index );
};