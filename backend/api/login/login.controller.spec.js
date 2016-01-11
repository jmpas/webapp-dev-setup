'use sctrict';

var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    session = require( 'express-session' ),
    config = require( '../../config' ),
    path = require( 'path' );

var expect = require( 'chai').expect,
    request = require('supertest'),
    mongoose = require( 'mongoose' );

var app = express(),
    db = require( path.join( config.root, 'backend/db' ) )
    User = require( '../user/user.model' );

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

app.use( '/api/login', require( './index' ) );

describe( 'ROUTE /api/login', function () {
  before( function () {
    // Connect to database
    db.connect( config.mongo.uri, config.mongo.options );
  });

  beforeEach( function ( done ) {
    // Removing all users from test database
    User.remove( {}, function ( err ) {
      if ( err ) return done( err );

      tobi = new User({ username: 'tobi', password: 'secret' }),
      tobi.password = User.generatePassword( tobi.password );

      tobi.save()
        .then(function () {
          done();
        });
    });

  });

  after( function () {
    db.closeConnection();
  });

  describe( 'POST /api/login', function () {

    it( 'should respond 200 code, with text "ok"', function ( done ) {
      request( app )
        .post( '/api/login' )
        .send({ username: 'tobi', password: 'secret' } )
        .expect( 200 )
        .expect( 'Content-Type', /text/ )
        .end(function ( err, res ){
          if ( err ) return done( err );

          expect( res.text ).to.equal( 'ok' );

          done();
        });
    });

     it( 'should respond 400 code, with text "invalid"', function ( done ) {
      request( app )
        .post( '/api/login' )
        .send({ username: 'moron', password: 'falsesecret' } )
        .expect( 400 )
        .expect( 'Content-Type', /text/ )
        .end(function ( err, res ){
          if ( err ) return done( err );

          expect( res.text ).to.equal( 'invalid' );

          done();
        });
    });

  });

});
