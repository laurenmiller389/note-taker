const express = require('express');

//create our modular routers
const notesRouter = require('./notes'); //this is notes route js not notes public js

const app = express();

app.use('/notes', notesRouter);

module.exports = app;