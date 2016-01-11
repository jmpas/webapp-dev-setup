'use strict';

var User = require( '../user/user.model' );

exports.login = function ( req, res ) {
  User.findOne({ username: req.body.username }, function ( err, user ) {
    if (err) res.status( 500 ).send( err );

    if ( user && user.checkPassword( req.body.password ) ) {
      req.session.user = user;
      res.status( 200 ).send( 'ok' );
    } else {
      res.status( 400 ).send( 'invalid' );
    }
  });
};

exports.getCurrentUser = function ( req, res ) {
  res.status( 200 ).json( req.session.user );
};
