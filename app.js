// initial config
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Person = require('./models/Person');

// reading JSON configuration / middleware
app.use(express.urlencoded(
    {extended: true}
 )
);

app.use(express.json());

//endpoint
app.get('/', (req, res) => {
    res.json({message: "Express is up!"})
});

//port
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
 .connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.5u8qicb.mongodb.net/?retryWrites=true&w=majority`
 )
 .then(() => {
  console.log('MongoDB connected!');
  app.listen(8080);
  }
 )
 .catch(err => console.log(err));
