const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

//consider using custom middleware

//middleware for using public, json, and encoded data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api); // /api is new /routes

app.use(express.static('public'));

//we also need a get for the homepage '/' reg instance
app.get('/', (req, res) => 
    res.sendFile(path.join(__direname, '/public/index.html'))
);

//Get /notes to return notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__direname, '/public/notes.html'))
);
//Get * to return index.html
app.get('*', (req, res) => 
    res.sendFile(path.join(__direname, '/public/index.html'))
);

//console log the url for the se4rver
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);