const app = require('express')();
const server = require('http').createServer(app);
const http = require('http');
const path = require('path');

app.get('/', (req, res, next) => {
  try { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendFile('manager.html', { root: path.join(__dirname, '../views') });
  }
  catch (error) {
    return next("500");
  }
});


module.exports = app;