'use strict';

const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const app = express();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const paths = {
  machines: path.resolve(__dirname, './db/machines')
};

app.use(compression());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Routes

app.get('/machines', function(req, res) {
  getMachines(req, res, paths.machines);
});

app.get('/machines/:id', function(req, res) {
  getMachine(req, res, paths.machines, req.params.id);
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});

// Handlers

function getMachines(req, res, machinesPath) {
  const machines = fs.readdir(machinesPath, (err, files) => {
    if(err) {
      return res.status(500).send({ error: 'Internal server error' });
    }
    return res.send(
      files
        .filter(file => file.match(/^.*\.fsm$/))
        .map(file => file.replace(/\.fsm$/, ''))
    );
  });
}

function getMachine(req, res, machinesPath, machineId) {
  const machinePath = path.resolve(`${machinesPath}/${machineId}.fsm`);
  console.log('mp:', machinePath);
  const machines = fs.readFile(machinePath, { encoding: 'utf-8' }, (err, data) => {
    if(err) {
      return res.status(500).send({ error: 'Internal server error' });
    }
    return res.send(data);
  });
}
