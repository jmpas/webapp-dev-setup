'use strict'

var mongoose = require( 'mongoose' );
var crypto = require( 'crypto' );
var _ = require( 'lodash' );

var Schema = mongoose.Schema;

var User = new Schema({
  username: {
    type: String,
    validate: {
      validator: function ( v ) {
        return /[a-z]/.test( v );
      },
      message: '{VALUE} is not a valid user name!'
    }
  },
  password: String
});


// Instance methods
function checkPassword ( password ) {
  var hash = crypto.createHash( 'sha1' );

  hash.update( password, 'utf8' );
  password = hash.digest( 'hex' );

  return this.password === password;
}

User.methods.checkPassword = checkPassword;

// Static methods
function generatePassword ( password ) {
  var hash = crypto.createHash( 'sha1' );

  hash.update( password, 'utf8' );
  password = hash.digest( 'hex' );

  return password;
}

User.statics.generatePassword = generatePassword;

// Exporting model
module.exports = mongoose.model( 'User', User );
