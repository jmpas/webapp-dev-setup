var config = null;
var path = require( 'path' );

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
  default:
    config = {
      root: path.normalize( __dirname + '/../' ),
      host: 'localhost',
      port: '9000'
    };
    break;
}

module.exports = config;
