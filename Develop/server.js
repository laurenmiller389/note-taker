const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

//consider using custom middleware

//middleware for using public, json, and encoded data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(express.static('public'));

//console log the url for the se4rver
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);