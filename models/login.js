var mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
	username : String,
  	password : String,
 	createDate : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Login', LoginSchema);
