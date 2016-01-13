'use strict';

var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    session = require( 'express-session' ),
    config = require( '../../config' ),
    mongoose = require( 'mongoose' ),
    path = require( 'path' );

var app = express(),
    db = require( path.join( config.root, 'backend/db' ) );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(
  session({
    secret: 'safe-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
      secure: false
    }
  })
);
app.use( db.errorMiddleware );

module.exports = app;
