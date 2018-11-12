var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: String,
  	username : String,
  	password : String,
 	repassword: String,
  	createDate : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema);
