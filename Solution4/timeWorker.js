const { parentPort, isMainThread } = require("worker_threads");

function busyWaitTime() {
  let date = Date.now()
	let end = Date.now() + 10000;

	/* Long Job Operation */
  while (date < end) {
		date = Date.now()
  }
 
  return "Done";
}

// check that the sorter was called as a worker thread
if (!isMainThread) {

  // we post a message through the parent port, to emit the "message" event
  parentPort.postMessage(busyWaitTime());
}
