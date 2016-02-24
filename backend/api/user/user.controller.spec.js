'use sctrict';

var config = require( '../../config' ),
    path = require( 'path' );

var expect = require( 'chai' ).expect,
    request = require( 'supertest' ),
    mongoose = require( 'mongoose' );


var app = require( path.resolve( config.root, 'backend/test/mocks/app' ) )(),
    User = require( path.join( config.root, 'backend/api/user/user.model' ) ),
    db = require( path.join( config.root, 'backend/db' ) );

app.use( '/api/user', require( './index' ) );

describe( 'ROUTE /api/user', function () {

  beforeEach( function ( done ) {
    // Connect to database
    db.connect( config.mongo.uri, config.mongo.options );

    // Removing all users from test database
    User.remove( {}, function ( err ) {
      if ( err ) return done( err );

      done();
    });

  });

  afterEach( function () {
    db.closeConnection();
  });

  describe( 'GET /api/user', function () {

    it( 'should respond an empty array', function ( done ) {
      request( app )
        .get( '/api/user' )
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

  describe( 'POST /api/user', function () {
    var userMock;

    beforeEach( function () {
      userMock = {
        username: 'admin',
        password: 'secret'
      };
    });

    it( 'should create an user', function ( done ) {
      request( app )
        .post( '/api/user' )
        .send( userMock )
        .expect( 200 )
        .expect( 'Content-Type', /json/ )
        .end(function ( err, res ){
          if ( err ) return done( err );

          expect( res.body ).to.have.property( 'username' ).and.to.eql( userMock.username );

          done();
        });
    });

    it( 'should respond 500 code with error', function ( done ) {
      request( app )
        .post( '/api/user' )
        .send({ username: '1234', password: '1234' })
        .expect( 500 )
        .expect( 'Content-Type', /json/ )
        .end(function ( err, res ){
          if ( err ) return done( err );

          expect( res.body ).to.throw;

          done();
        });
    });

  });

});
