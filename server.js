'use strict'

const express = require('express');
const server = express();
const logger = require('./src/middleware/logger.js');
const getBrowser = require('./src/middleware/getBrowser.js');
const handle500 = require('./src/error-handlers/500.js');
const { validateHello, handleHello } = require('./src/middleware/validator.js');
const handle404 = require('./src/error-handlers/404.js');

function start(port) {
  server.listen(port, () => console.log(`I am listening on port ${port}`));
}


server.use(logger);

server.use(express.json());

server.get('/', (req,res) => res.send('Hello World'));

server.get('/hello', validateHello, handleHello);

server.get('/hello/:person', (req,res) => {
  res.json({Name: `${req.params.person}`});
});

server.post('/hello', (req, res) => {
  res.send(`Hello, ${req.body.name}`);
});

server.get('/demo', getBrowser, (req,res) => {
  res.send(`You are using ${req.browser}`);
});

server.use('*', handle404);
server.use(handle500)

module.exports = { server, start }