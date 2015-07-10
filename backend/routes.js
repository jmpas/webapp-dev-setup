'use strict';

var path = require( 'path' );
var fs = require( 'fs' );

module.exports = function ( app ) {
  fs.readdir( ( __dirname + '/modules' ), function ( err, folders ) {
    var i, n, file;

    if ( err ) {
      return;
    }

    for ( i = 0, n = folders.length; i < n; i++ ) {
      var folder = folders[i];
    
      require( path.resolve( __dirname + '/modules/' + folder ) )( app );
    }
      
    require( path.resolve( __dirname + '/index.js' ) )( app );
  });
};