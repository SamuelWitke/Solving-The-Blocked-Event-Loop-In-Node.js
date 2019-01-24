const express = require('express');
const app = express();
const { Worker } = require("worker_threads");
const path = require("path");

app.get('/', (req, res) => res.send('Hello, World'));

app.get('/foo', (req, res) => {
	// we get the path of the script
	const workerScript = path.join(__dirname, "./timeWorker.js");

	// create a new worker from our script
	const worker = new Worker(workerScript, {});
	worker.on("message", (msg) => res.send(msg))
});

app.listen(3000, () => console.log('app listening on port 3000'));
