const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello, World'));

app.get('/foo', (req, res) => {
  let date = Date.now()
	let end = Date.now() + 10000;

	/* Long Job Operation */
  while (date < end) {
		date = Date.now()
  }
  res.send('I am done!');
});

app.get('/non-block', (req, res) => {
  // Imagine that setTimeout is IO operation
  // setTimeout is a native implementation, not the JS
  setTimeout(() => res.send('I am done!'), 5000);
});

app.listen(3000, () => console.log('app listening on port 3000'));
