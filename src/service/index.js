'use strict';

const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const app = express();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const paths = {
  workflows: path.resolve(__dirname, './db/workflows'),
  domainObjects: path.resolve(__dirname, './db/domain-objects')
};

app.use(compression());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Routes

app.get('/workflows', function(req, res) {
  getWorkflows(req, res, paths.workflows);
});

app.get('/workflows/:id', function(req, res) {
  getWorkflow(req, res, paths.workflows, req.params.id);
});

// app.get('/domain-objects', function(req, res) {
//   getDomainObjects(req, res, paths.machines, req.params.id);
// });

// app.get('/domain-objects/:id', function(req, res) {
//   getDomainObject(req, res, paths.machines, req.params.id);
// });

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});

// Handlers

function getWorkflows(req, res, itemsPath) {
  fs.readdir(itemsPath, (err, files) => {
    if(err) {
      return res.status(500).send({ error: 'Internal server error' });
    }
    return res.send(
      files
        .filter(file => file.match(/^.*\.json$/))
        .map(file => file.replace(/\.json$/, ''))
    );
  });
}

function getWorkflow(req, res, itemsPath, itemId) {
  const itemPath = path.resolve(`${itemsPath}/${itemId}.json`);
  fs.readFile(itemPath, { encoding: 'utf-8' }, (err, data) => {
    if(err) {
      return res.status(500).send({ error: 'Internal server error' });
    }
    return res.send(JSON.parse(data));
  });
}
