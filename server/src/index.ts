import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');

//controllers
import { default as cards } from './rest-controller/rest_cards';
import { default as lists } from './rest-controller/rest_lists'

const app = express();
app.use(bodyParser.json());
app.use(cors());

import _ = require('lodash');

const sqlite3 = require('sqlite3').verbose();
const en = new sqlite3.Database('./db/english.db', (err: Error) => {
  if(err) {
    return console.log("An error occured!");
  }
  console.log("Connected to english");
});


cards(app, en);
lists(app, en);

console.log('Your server application is running and listening port 3000 ...');
app.listen(3000);