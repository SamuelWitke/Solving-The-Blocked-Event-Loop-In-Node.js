/*
 * If you need to do something more complex, partitioning is not a good option. 
 * This is because partitioning uses only the Event Loop, and you won't benefit from multiple cores almost certainly available on your machine. 
 * Remember, the Event Loop should orchestrate client requests, not fulfill them itself. 
 * For a complicated task, move the work off of the Event Loop onto a Worker Pool.
 */
const express = require('express');
const app = express();

app.get('/', (req, res) => { 
	res.send('Hello, World\n') 
});

const asyncLongJob = (date,end) => new Promise( resolve => {
	const work = (date,end,cb) => {
		if(date >= end) {
		  cb("Long Job Over");
			return;
		}
		date = Date.now()
		/* 
		 * The timer functions within Node.js implement a similar API as the timers API provided by Web Browsers 
		 * but use a different internal implementation that is built around the Node.js Event Loop.
		 */
		setImmediate(work.bind(null,date,end,cb))
	}
	work(date,end,resolve);
})

app.get('/foo', (req, res) => {
	let date = Date.now()
	let end = Date.now() + 10000;

	asyncLongJob(date,end).then( (data) => res.send(data));
});

app.get('/non-block', (req, res) => {
	// Imagine that setTimeout is IO operation
	// setTimeout is a native implementation, not the JS
	setTimeout(() => res.send('I am done!'), 5001);
});

app.listen(3000, () => console.log('app listening on port 3000'));
