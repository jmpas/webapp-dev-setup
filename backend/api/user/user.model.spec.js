'use strict'

process.env.NODE_ENV = 'test';

var mongoose = require( 'mongoose' );
var config = require( '../../config' );
var path = require( 'path' );
var db = require( path.join( config.root, 'backend/db' ) );
var expect = require( 'chai' ).expect;
var User = require( './user.model' );

describe( 'Connection', function () {
  var tobi,
      loki,
      jane;

  beforeEach( function ( done ) {
    // Connect to database
    db.connect( config.mongo.uri, config.mongo.options );

    User.remove( {}, function ( err ) {

      if ( err ) return done( err );

      tobi = new User({ username: 'tobi', password: 'secret' });
      loki = new User({ username: 'loki', password: 'secret' });
      jane = new User({ username: 'jane', password: 'secret' });

      tobi.password = User.generatePassword( tobi.password );
      loki.password = User.generatePassword( loki.password );
      jane.password = User.generatePassword( jane.password );

      User.create( [ tobi, loki, jane ], done );
    });

  });

  afterEach( function ( done ) {
    User.remove( {}, function ( err ) {
      if ( err ) return done( err );

      db.closeConnection();
      done();
    });
  });

  describe( '#find()', function () {

    it( 'respond with matching records', function ( done ) {

      User.findOne({ username: 'tobi' }, function ( err, doc ) {
        expect( err ).to.not.exist;
        expect( doc ).to.have.property( 'username' ).equal( tobi.username );
        expect( doc ).to.have.property( 'password' ).equal( tobi.password );

        done();
      });

    });

  });

  describe( 'checkPassword', function () {

    it( 'should return false', function () {
      expect( tobi.checkPassword( 'myfalsesecret' ) );
    });

    it( 'should return true', function () {
      expect( tobi.checkPassword( 'secret' ) );
    });

  });

  describe( 'generatePassword', function () {

    it( 'should encrypt password to sha1', function () {
      expect( User.generatePassword( 'secret' ) ).to.equal( 'e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4' );
    });

  });

});
