/*
 * You should not simply create a Child Process for every client. 
 * You can receive client requests more quickly than you can create and manage children, and your server might become a fork bomb.
 * https://en.wikipedia.org/wiki/Fork_bomb
 */
const cluster = require('cluster');

if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on('exit', function () {
    cluster.fork();
  });
} else {
  require('./blocked.js');
}
