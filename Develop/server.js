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



//if we don't have a helper file/util in this project, we also need to put our readFile in here for the get and post /api
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            res.json(parsedData);
        }
    });
});

//POST /api: get new note, save on req.body, add to db.json, return new note to client (writeFIle)
app.post('api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            const newNote = req.body;
            parsedData.push(newNote);
            fs.writeFile('./db/db.json')
        }

    });
})


//console log the url for the se4rver
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);