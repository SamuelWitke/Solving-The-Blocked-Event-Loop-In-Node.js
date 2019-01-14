const { expect, assert } = require('chai')
const fetch = require('node-fetch');

const TestFetch = (url) => new Promise(resolve =>
	fetch(url)
	.then(response => response.text())
	.then(data => {
		resolve(data)
	}).catch(e => {
		throw Error(e)
	})
)

const TestTime = () => new Promise( resolve =>{
	TestFetch('http://localhost:3000').then( (data) =>{
		console.log('Origin request done',data)
	})
	TestFetch('http://localhost:3000/foo' ).then( (data) =>{
		console.log('Foo request done',data)
	})

	TestFetch('http://localhost:3000/non-block' ).then( (data) =>{
		console.log('Non-block request done',data)
	})
	TestFetch('http://localhost:3000').then( (data) =>{
		console.log('Origin request done',data)
		end = new Date;
		resolve(end);
	})
})

describe('API Test', () => {
	let now;
	beforeEach(async () => {
		now = new Date;
	});

	it('Non Blocking Io Request less than 1000', async () => {
		const end = await TestTime();
		expect(end.getTime()).to.be.lessThan(now.getTime() + 1000);
	});

	it('Non Blocking Io Request less than 500', async () => {
		const end = await TestTime();
		expect(end.getTime()).to.be.lessThan(now.getTime() + 500 );
	});

	it('Non Blocking Io Request less then 250', async () => {
		const end = await TestTime();
		expect(end.getTime()).to.be.lessThan(now.getTime() + 250 );
	});

});

