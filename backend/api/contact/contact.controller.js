'use strict';

exports.find = function ( req, res ) {
  res.status( 200 ).json([
    { name: 'John Doe' }
  ]);
};