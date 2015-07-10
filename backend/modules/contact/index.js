'use strict';

var controller = require( './contact.controller.js' );

module.exports = function ( app ) {
  app.route('/api/contacts')
    .get( controller.get )
    .post( controller.post )
    .put( controller.put )
    .delete( controller.remove );
};