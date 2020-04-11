var express = require('express');
var port = process.env.PORT || 8080;
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var xss = require("xss");

//Connection to MLabs Database
mongoose.connect('mongodb://admin:adminuser1@ds031611.mlab.com:31611/heroku_mb7zk2tn', function(err, db){
    if (err) {
        console.log('Error Connecting with mLabs');
        process.exit(1);
        throw err
    } else {
        console.log('Connected to mLabs')
        blogCollection = db.collection("blogs")
    }
});

//Schemas
var blogSchema = require('./_models/blogSchema');

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

//Santizing Inputs
var xssService = {
    sanitize: function (req, res, next) {
        var data = req.body;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = xss(data[key]);
            }
        }
        next();
    }
};

//Posting Blogs
app.post('/postBlog', function (req, res) {
    var newBlog = new blogSchema(req.body);
    newBlog.save(function (err, product) {
        if (err) throw err;
        console.log("Blog Saved!");
        res.status(200).send({
            type: true,
            data: 'Successfully Added New Blog'
        })
    });
});

//Getting Blogs
app.get("/postBlog",function(req,res){
	blogCollection.find().toArray(function(err,docs){
		if(err){
			throw err;
			res.sendStatus(500);
		}else{
			var result = docs.map(function(data){
				return data;
			})
			res.json(result);
		}
	})
})

//Listening on port: 8080
app.listen(port, function () {
    console.log('listening on port: ', port);
})