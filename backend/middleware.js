'use strict';

exports.auth = function ( req, res, next ) {

  if ( req.session.user ) {
    return next();
  }

  res.redirect( '/login' );
};