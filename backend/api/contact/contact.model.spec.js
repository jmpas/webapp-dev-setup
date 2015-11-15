'use strict'

process.env.NODE_ENV = 'test';

var mongoose = require( 'mongoose' );
var config = require( '../../config' );
var path = require( 'path' );
var db = require( path.join( config.root, 'backend/db' ) );
var expect = require( 'chai' ).expect;
var Contact = require( './contact.model' );

describe( 'Connection', function () {
  var tobi,
      loki,
      jane;

  beforeEach( function ( done ) {
    // Connect to database
    db.connect( config.mongo.uri, config.mongo.options );

    Contact.remove( {}, function ( err ) {

      if ( err ) return done( err );

      tobi = new Contact({ name: 'tobi' }),
      loki = new Contact({ name: 'loki' }),
      jane = new Contact({ name: 'jane' });

      Contact.create( [ tobi, loki, jane ], done );
    });

  });

  afterEach( function ( done ) {
    Contact.remove( {}, function ( err ) {
      if ( err ) return done( err );

      db.closeConnection();
      done();
    });
  });

  describe( '#find()', function () {

    it( 'respond with matching records', function ( done ) {

      Contact.findOne({ name: 'tobi' }, function ( err, doc ) {
        expect( err ).to.not.exist;
        expect( doc ).to.have.property( 'name' ).equal( tobi.name );

        done();
      });

    });

  });

});
