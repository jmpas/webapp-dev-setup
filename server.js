'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require( 'express' );
var path = require( 'path' );
var fs = require( 'fs' );
var config = require( './backend/config/config' );

// Server
var app = express();
require( './backend/config/express' )( app );
require( './backend/routes' )( app );

// Start server
app.listen( config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
} );

// Expose app
exports = module.exports = app