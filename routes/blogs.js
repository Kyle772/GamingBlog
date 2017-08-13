const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://lam:lam@ds161262.mlab.com:61262/gamingblog', ['blogs']);

const Blogs = require('../models/blogs');

// Get All Blogs
router.get('/blogs', function(req, res, next){
    db.blogs.find(function(err, blogs){
        if(err){
            res.send(err);
        }
        res.json(blogs);
    });
});

// Get Single Blog
router.get('/blog/:id', function(req, res, next){
    db.blogs.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, blog){
        if(err){
            res.send(err);
        }
        res.json(blog);
    });
});



//Save Blog

router.post('/blogs', function(req, res){
	const title = req.body.title;
	const review = req.body.review;
	const url = req.body.url;


// Validation

	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('review', 'Review is required').notEmpty();
	req.checkBody('url', 'URL is required').notEmpty();


	const errors = req.validationErrors();

	if(errors){
		res.render('submitblog',{
			errors:errors
		});
	} else {
		const newBlog = new Blog({
			title:title,
			review:review,
			url:url
		});

		Blog.createBlog(newBlog, function(err, blog){
			if(err) throw err;
			console.log(blog);
		});

		req.flash('success_msg', 'Your blog has been posted!');

		res.redirect('/blog');
	}
});






// Delete Blog
router.delete('/blog/:id', function(req, res, next){
    db.blogs.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, blog){
        if(err){
            res.send(err);
        }
        res.json(blog);
    });
});


// Update Blog
router.put('/blog/:id', function(req, res, next){
    var blog = req.body;
    var updBlog = {};
    
    if(blog.isDone){
        updBlog.isDone = blog.isDone;
    }
    
    if(blog.title){
        updBlog.title = blog.title;
    }
    
    if(!updBlog){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.blogs.update({_id: mongojs.ObjectId(req.params.id)},updBlog, {}, function(err, blog){
        if(err){
            res.send(err);
        }
        res.json(blog);
    });
    }
});

module.exports = router;