'use strict';

var express = require( 'express' );
var controller = require( './user.controller' );

var router = express.Router();

router.get( '/', controller.find );
router.post( '/', controller.create );

module.exports = router;
