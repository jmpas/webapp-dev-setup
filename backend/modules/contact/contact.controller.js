'use strict';

var ContactModel = require( './contact.model.js' );

exports.get = function ( req, res ) {
  res.status( 200 ).json( [
    {
      name: 'Jonas'
    }, {
      name: 'Filipe'
    }, {
      name: 'Jonathan'
    }
  ] );
};

exports.post = function ( req, res ) {
  
};

exports.put = function ( req, res ) {
  
};

exports.remove = function ( req, res ) {
  
};