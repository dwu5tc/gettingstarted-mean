var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://gettingstarted:<mongodb-gettingstarted>@gettingstarted-shard-00-00-gu6ty.mongodb.net:27017,gettingstarted-shard-00-01-gu6ty.mongodb.net:27017,gettingstarted-shard-00-02-gu6ty.mongodb.net:27017/test?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin');


//var MongoClient = require('mongodb').MongoClient;

//var uri = "mongodb://gettingstarted:<mongodb-gettingstarted>@gettingstarted-shard-00-00-gu6ty.mongodb.net:27017,gettingstarted-shard-00-01-gu6ty.mongodb.net:27017,gettingstarted-shard-00-02-gu6ty.mongodb.net:27017/test?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin";


// get all tasks
router.get('/tasks', function(req, res, next) {
	//res.send('TASK API');
	db.tasks.find(function(err, tasks) {
		if (err) {
			res.send(err);
		}
		res.json(tasks);
	});
	// db.use.tasks;
	// db.tasks.insert({})
	// db.tasks.find
});

// get single tasks
router.get('/tasks/:id', function(req, res, next) {
	//res.send('TASK API');
	db.tasks.findOne({ id: mongojs.ObjectId(req.params.id)}, (function(err, task) {
		if (err) {
			res.send(err);
		}
		res.json(task);
	});
	// db.use.tasks;
	// db.tasks.insert({})
	// db.tasks.find
});


module.exports = router;