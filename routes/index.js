const express = require('express');
const router = express.Router();

// Get Homepage
router.get('/', function(req, res){
	res.render('index', {layout: false});
});

// Get Blog
router.get('/blog', function(req, res){
	res.render('blog', {layout: false});
});

// Get About
router.get('/about', function(req, res){
	res.render('about', {layout: false});
});

// Get Contact
router.get('/contact', function(req, res){
	res.render('contact', {layout: false});
});

// Get Submit Blog
router.get('/submitblog', function(req, res){
	res.render('submitblog', {layout: false});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;