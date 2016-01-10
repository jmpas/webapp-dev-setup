'use strict';

var mongoose = require( 'mongoose' );

function getReadyState () {
  return mongoose.connection.readyState;
}

function connect ( uri, options ) {

  if ( getReadyState() ) return;

  mongoose.connect( uri, options );

  mongoose.connection.on( 'error', function ( err ) {
    console.error( 'MongoDB connection error: ' + err );
    process.exit( -1 );
  });
}

function closeConnection () {
  mongoose.connection.close();
}

function errorMiddleware ( req, res, next ) {
  if ( !getReadyState() ) {
    return res.status( 500 ).json({ msg: 'DB Connection lost' });
  }

  next();
}

module.exports = {
  connect: connect,
  closeConnection: closeConnection,
  getReadyState: getReadyState,
  errorMiddleware: errorMiddleware
};
