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

// save task
router.post('/task', functino(req, res, next) {
	var task = req.body;
	if (!task.title || (task.isDone + '')) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	}
	else {
		db.tasks.save(task, function(err, task) {
			if (err) {
				res.send(err);
			}
			res.json(task);
		});
	}
});

// delete task
router.delete('/tasks/:id', function(req, res, next) {
	//res.send('TASK API');
	db.tasks.remove({ id: mongojs.ObjectId(req.params.id)}, (function(err, task) {
		if (err) {
			res.send(err);
		}
		res.json(task);
	});
	// db.use.tasks;
	// db.tasks.insert({})
	// db.tasks.find
});

// update task
router.put('/tasks/:id', function(req, res, next) {
	//res.send('TASK API');
	var task = req.body;
	var updTask = {};

	if (task.isDone) {
		updTask.isDone = task.isDone;
	}

	if (task.title) {
		updTask.title = task.title;
	}

	if (!updTask) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} 
	else {
		db.tasks.update({ id: mongojs.ObjectId(req.params.id)}, updTask, {}, (function(err, task) {
			if (err) {
				res.send(err);
			}
			res.json(task);
		});
	}

	
	// db.use.tasks;
	// db.tasks.insert({})
	// db.tasks.find
});

module.exports = router;