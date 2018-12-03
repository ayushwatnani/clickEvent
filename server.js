console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// serve files from the public directory
app.use(express.static('public'));

// connect to the db and start the express server
let db;

// ***Replace the URL below with the URL for your database***
const url =  'mongodb://ayush356:ayush356@ds033760.mlab.com:33760/clicks';
// E.g. for option 2) above this will be:
// const url =  'mongodb://localhost:21017/databaseName';

MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database;
  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log('listening on 8080');
  });
});

// add a document to the DB collection recording the click event
app.post('/clicked', (req, res) => {
    const click = {clickTime: new Date()};
    console.log(click);
    console.log(db);
  
    db.collection('clicks').save(click, (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log('click added to db');
      res.sendStatus(201);
    });
  });

  // get the click data from the database
app.get('/clicks', (req, res) => {

    db.collection('clicks').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});