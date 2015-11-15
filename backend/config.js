'use strict';

var path = require( 'path' );
var _ = require( 'lodash' );

// Config for all enviroments
var allConfig = {
   mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

var config;

switch ( process.env.NODE_ENV ) {
  case 'development':
    config = {
      root: path.normalize( __dirname + '/../' ),
      host: '0.0.0.0',
      port: '9000'
    };
    break;
  case 'production':
    config = {
      root: path.normalize( __dirname + '/../' ),
      port: process.env.PORT,
      host: process.env.HOST
    };
    break;
  case 'test':
    config = {
      root: path.normalize( __dirname + '/../' ),
      host: '0.0.0.0',
      port: '9000',
      mongo: {
        uri: 'mongodb://0.0.0.0/test-db'
      }
    }
    break;
  default:
    config = {
      root: path.normalize( __dirname + '/../' ),
      host: 'localhost',
      port: '9000'
    };
    break;
}

module.exports = _.merge( allConfig, config );
