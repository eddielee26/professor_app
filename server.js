const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./db');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API'});
});

app.get('/professors', db.getAllProfessors);

app.post('/professors', db.addProfessor); 

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
