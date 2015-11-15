'use sctrict';

var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    config = require( '../../config' ),
    path = require( 'path' );

var expect = require( 'chai').expect,
    request = require('supertest');

var app = express(),
    db = require( path.join( config.root, 'backend/db' ) )
    Contact = require( './contact.model' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.use( '/api/contact', require( './index' ) );

describe( 'ROUTE /api/contacts', function () {

  beforeEach( function ( done ) {
    // Connect to database
    db.connect( config.mongo.uri, config.mongo.options );
    Contact.remove( {}, function ( err ) {
      if ( err ) return done( err );

      done();
    });
  });

  afterEach( function () {
    db.closeConnection();
  });

  describe( 'GET /api/contact', function () {

    it( 'should respond an array', function ( done ) {
      request( app )
        .get( '/api/contact' )
        .expect( 'Content-Type', /json/ )
        .expect( 200 )
        .end(function ( err, res ){
          if ( err ) return done( err );

          expect( res.body ).to.be.an.instanceof( Array );
          expect( res.body ).to.be.empty;

          done();
        });
    });

  });

});
