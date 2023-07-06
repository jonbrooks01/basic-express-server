'use strict'

const express = require('express');
const server = express();
const logger = require('./src/middleware/logger.js');
const getBrowser = require('./src/middleware/getBrowser.js');
const handle500 = require('./src/error-handlers/500.js');

function start(port) {
  server.listen(port, () => console.log(`I am listening on port ${port}`));
}

function handle404(req,res,next) {
  const errorObject = {
    status: 404,
    message: 'Sorry, we could not find what your looking for',
  };

  res.status(404).json(errorObject);
}


server.use(logger);

server.use(express.json());

server.get('/', (req,res) => res.send('Hello World'));

server.get('/hello', (req, res) => {
  if (!req.query.name) {
    throw new Error("Hey! You were suppose to give us your name");
  }
  res.send(`Hello, ${req.query.name}`);
});

server.get('/hello/:person', (req,res) => {
  res.send(`Hello, ${req.params.person}`);
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