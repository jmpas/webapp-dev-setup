'use sctrict';

var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    config = require( '../../config' );

var expect = require( 'chai').expect,
    request = require('supertest');

var app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.use( '/api/contact', require( './index' ) );

describe( 'ROUTE /api/contacts', function () {

  describe( 'GET /api/contact', function () {

    it( 'should respond an array', function ( done ) {
      request( app )
        .get( '/api/contact' )
        .expect( 'Content-Type', /json/ )
        .expect( 200, [{ name: 'John Doe' }], done );
    });

  });

});

