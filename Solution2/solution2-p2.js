const express = require('express');
const app = express();
const util = require('util');

const work = ({date,end},cb) => {
	if(date >= end) {
		cb(null,"Long Job Over");
		return;
	}
	date = Date.now()
	setImmediate(work.bind(null,{date,end},cb))
}

app.get('/', (req, res) => { 
	res.send('Hello, World\n') 
});

app.get('/foo', async (req, res) => {
	let date = Date.now()
	let end = Date.now() + 10000;
	// Here we use util.promisify to convert the function to a promise
	const longWait = util.promisify(work);
	const data = await longWait({date,end})
  res.send(data);
});

app.get('/non-block', (req, res) => {
	// Imagine that setTimeout is IO operation
	// setTimeout is a native implementation, not the JS
	setTimeout(() => res.send('I am done!'), 5001);
});

app.listen(3000, () => console.log('app listening on port 3000'));
