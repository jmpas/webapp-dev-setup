'use strict';

var Contact = require( './contact.model' );

exports.find = function ( req, res ) {
  Contact.find( {}, function ( err, docs ) {
    if ( err ) res.status( 500 ).send( err );

    res.status( 200 ).json( docs );
  });
};
