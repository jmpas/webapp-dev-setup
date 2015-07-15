'use sctrict';

var config = require( '../config' );

describe( 'ROUTE /api/contacts', function () {
  var loginController, req, res;

  beforeEach( function () {
    contactController = require( config.root + '/backend/api/contact/contact.controller' );

    req = { };

    res = {
      status: function ( code ) { },
      json: function ( something ) { }
    };

    spyOn( res, 'status' ).and.returnValue( res );
    spyOn( res, 'json' );

  } );

  describe( 'GET /api/contact', function () {
    beforeEach( function () {
      contactController.find( req, res );
    } );

    it( 'should respond an array', function ( done ) {
      expect( res.status ).toHaveBeenCalledWith( 200 );
      expect( res.json ).toHaveBeenCalledWith( jasmine.any( Array ) );

      done();
    } );

  } );

} );

