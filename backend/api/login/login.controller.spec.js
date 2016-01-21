'use sctrict';

var expect = require( 'chai').expect,
    request = require( 'supertest' );

var config = require( '../../config' ),
    path = require( 'path' );

var app = require( path.resolve( config.root, 'backend/test/mocks/app' ) ),
    User = require( path.join( config.root, 'backend/api/user/user.model' ) ),
    db = require( path.join( config.root, 'backend/db' ) );

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

      var tobi = new User({ username: 'tobi', password: 'secret' });
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
