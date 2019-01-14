const express = require('express');
const app = express();
var m = require('./');
var logMsg = 'execution time:';

function doAsyncStuffPromised(workerId, throwsError = false) {
	return new Promise(function(resolve, reject) {

		// this is how we would invoke the function with a callback
		//
	var iterations = 1000000000;
		m.doAsyncStuff(workerId, iterations, throwsError, function(error, result) {
			if (error) {
				return reject(error);
			}
			return resolve(result);
		});

	});
}

function runAsync(numTasks) {
	var taskIds = Array(numTasks).fill(0).map((_, i) => 'asyncTask_' + i);
	var promises = taskIds.map(
		taskId => doAsyncStuffPromised(taskId)
		.then((tId) => {
			console.log('task %s finished', tId);
			return tId;
		})
	);

	console.time(logMsg);
	return Promise.all(promises)
		.then(taskIds => {
			console.log('all tasks finished:', taskIds);
			console.timeEnd(logMsg);
		})
		.catch(error => console.log(error))
}


app.get('/', (req, res) => res.send('Hello, World'));

app.get('/foo', (req, res) => {
	runAsync(4).then(() => {
		// after running the async example lets see what happens
		// if we trigger an error
		res.send("Done");
	});
});

app.get('/non-block', (req, res) => {
	// Imagine that setTimeout is IO operation
	// setTimeout is a native implementation, not the JS
	setTimeout(() => res.send('I am done!'), 5000);
});

app.listen(3000, () => console.log('app listening on port 3000'));
