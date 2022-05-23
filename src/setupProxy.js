const path = require('path');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

console.error('Proxy setup done');

module.exports = function(app) {

  app.use(
    createProxyMiddleware('/examples/sharedb-api/nexteditor', {
      target: 'ws://localhost:8080',
      ws: true,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/examples/sharedb-api/nexteditor': '/nexteditor', // rewrite path
      },
      // onProxyReq: () => {
      //   const logFile = path.resolve('/Users/weishijun/proxy.log');
      //   fs.writeFileSync(logFile, 'proxy request');
      //   console.log('aaaaaa');
      // },
    })
  );

  app.use(
    '/examples/sharedb-api/fake-api',
    createProxyMiddleware({
      target: 'http://localhost:8080/fake-api',
      pathRewrite: {
        '^/examples/sharedb-api/fake-api': '', // rewrite path
      },
    })
  );

  // app.use(
  //   '/examples/yjs-server',
  //   createProxyMiddleware({
  //     target: 'ws://localhost:1234',
  //     ws: true,
  //   })
  // );

};
