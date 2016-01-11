'use strict';

var User = require( './user.model' );

exports.find = function ( req, res ) {
  User.find( {}, function ( err, docs ) {
    res.status( 200 ).json( docs );
  });
};

exports.create = function ( req, res ) {
  var newUser = req.body;

  newUser.password = User.generatePassword( newUser.password );
  newUser = new User( newUser );

  newUser
    .save()
    .then( function  ( doc ) {
      res.status( 200 ).json( doc );
    }, function ( err ) {
      res.status( 500 ).send( err );
    });
};
