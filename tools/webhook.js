const http = require('http')
const createHandler = require('github-webhook-handler');
const path = require('path');
const handler = createHandler({ path: '/webhook', secret: process.env["PUSH_SECRET"] })
const spawn = require('child_process').spawn;

function exec(name, path, argv) {
  return new Promise((resolve) => {
    const s = spawn(path, argv);
    s.stdout.on('data', (data) => {
      console.log(`${name}: ${data}`);
    });
    s.stderr.on('data', (data) => {
      console.log(`${name}: ${data}`);
    });
    s.on('close', () => {
      console.log('done');
      resolve();
    })
    console.log('has rebuild');
  });
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    console.log(req.url)
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
  //
  //
  const shFile = path.resolve(__dirname, 'build.sh');
  exec('pull & build', 'sh', [shFile]);
})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})
