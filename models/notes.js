var mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
	date: String,
	describe: String,
  	note: String,
  	createDate : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Notes', NoteSchema);
