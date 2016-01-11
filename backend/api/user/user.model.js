'use strict'

var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: function ( v ) {
        return /[a-z]/.test( v );
      },
      message: '{VALUE} is not a valid user name!'
    }
  }
});

module.exports = mongoose.model( 'User', UserSchema );
