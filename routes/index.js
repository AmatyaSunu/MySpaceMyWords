var express = require('express');
var router = express.Router();

var Users = require('../models/users');
var Notes = require('../models/notes');
var Login = require('../models/login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MySpace MyWords' });
});

//get signup page
router.get('/signup', function(req, res) {
	res.render('signup');
});

router.post('/signup',function(req, res){
  //console.log('req...', req.body);

  var user = new Users({
  	username : req.body.username,
    password : req.body.password,
    });

  var promise = user.save();
  promise.then((user) => {
    console.log('user signed with values', user);
    res.redirect('/home');
  });
  if(req.body.username != '' && req.body.password != '' && req.body.repassword != '') {

      if(req.body.password == req.body.repassword){

        var promise = user.save();

        promise.then((user) => {

          console.log('user signed with values', user);

          res.redirect('/newNotes');

        });

      }

      else{

      console.log("passwords donot match");

      }

  }else{

    console.log("Please fill all the fields");

  }
});


//get login page
router.get('/login', function(req, res){
	res.render('login');
});

router.post('/login', function(
	req, res) {
	if(req.body.username && req.body.password){
	Users.findOne({
		username: req.body.username,	
		password: req.body.password},function(err,user){
		console.log(" Log in is successfull", user);
		res.redirect ('/home');
		})
	}
	else {
	console.log("enter username and password");
}
});

router.get('/addnote', function(req, res){
	res.render('addnote');
});

router.get('/viewnote', function(req, res){
	Notes.find().exec(function(err, notes){
    res.render('viewnote', {notes});
    //console.log(notes);
  });
});

router.post('/addnote', function(req, res) {
	console.log('req......', req.body);
	 var note = new Notes({
	 	date: req.body.date,
	 	describe: req.body.describe,
	 	note: req.body.note
     })
 	 var promise = note.save() 
 	 promise.then((note) => {
 	 console.log('saved note is : ', note);
	 	Notes.find().exec(function(err,notes){
	 		res.render ('viewNote', {notes});
	 		//console.log(notes);
	 	});
 });
});
router.get('/home', function(req, res){
	Notes.find().exec(function(err, notes){
    res.render('home', {notes});
    //console.log(notes);
  });
});
router.post('/home', function(req, res) {
	console.log('req......', req.body);
});
router.post('/viewnote', function(req, res) {
	console.log('req......', req.body);
});

router.get('/deletenote/:id', function(req, res) {
	Notes.findOneAndRemove({_id: req.params.id}, function(err, note) {
		res.redirect('/viewnote');
	});
});

router.get('/editnote/:id', function(req, res) {
	Notes.findOne({_id: req.params.id}, function(err, note) {
		console.log('note', note);
    res.render('editnote', {note});
  	});
});
router.post('/editnote', function(req, res){
	Notes.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, (err,note) => {
		console.log('note updated.... ', note);
		if (!err) res.redirect('/viewnote')
	});
});

module.exports = router;
