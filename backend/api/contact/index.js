'use strict';

var express = require( 'express' );
var controller = require( './contact.controller' );

var router = express.Router();

router.get( '/', controller.find );

module.exports = router;
