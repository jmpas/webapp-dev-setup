'use strict';

var mongoose = require( 'mongoose' );

function connect ( uri, options ) {
  mongoose.connect( uri, options );
  mongoose.connection.on( 'error', function ( err ) {
    console.error( 'MongoDB connection error: ' + err );
    process.exit( -1 );
  });
}

function closeConnection () {
  mongoose.connection.close();
}

module.exports = {
  connect: connect,
  closeConnection: closeConnection
};