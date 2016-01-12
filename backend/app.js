'use strict';

var express = require( 'express' );
var session = require( 'express-session' );
var bodyParser = require( 'body-parser' );
var favicon = require( 'serve-favicon' );
var app = express();
var path = require( 'path' );
var config = require( './config' );
var db = require( path.join( config.root, 'backend/db' ) );

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.set( 'port', ( process.env.PORT || 9000 ) );

// Connect to database
db.connect( config.mongo.uri, config.mongo.options );

switch ( process.env.NODE_ENV ) {
  case 'development':
    app.set( 'view engine', 'jade' );
    app.set( 'appPath', path.join( config.root, '/frontend' ) );
    app.set( 'views', app.get( 'appPath' ) );
    break;
  case 'production':
    app.set( 'appPath', path.join( config.root, '/build' ) );
    app.set( 'views', app.get( 'appPath' ) );
    break;
  default:
    app.set( 'view engine', 'jade' );
    app.set( 'appPath', path.join( config.root, '/frontend' ) );
    app.set( 'views', app.get( 'appPath' ) );
    break;
}

app.use( favicon( app.get( 'appPath' ) + '/favicon.ico' ) );
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

require( './routes' )( app );

app.listen( app.get( 'port' ), function () {
	console.log( 'Server running: http://' + config.host + ':' + app.get( 'port' ) + '/' );
});
