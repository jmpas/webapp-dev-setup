'use strict';

var express = require( 'express' );
var controller = require( './login.controller' );

var router = express.Router();

router.post( '/', controller.login );
router.get( '/current', controller.getCurrentUser );

module.exports = router;
