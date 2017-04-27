var express = require('express');

/********************************
 * OPTIONAL BUT USUALLY REQUIRED
 ********************************/

//  CORS: Cross-origin HTTP request
//        Server serves requests originating from other domains
var cors = require('cors');

//  File System:  read and write files
var fs = require('fs');

//  Parse variables submitted in post request to request.body
var bodyParser = require('body-parser');

/********************************
 * END OPTIONAL
 ********************************/

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5000);

app.get('/', (request, response) => {
  response.status(200).send('Server is running');
});

app.get('*', (request, response) => {
  response.send('Wrong path.', 404);
});

app.post('/', (request, response) => {
  response.status(201).send(request.body);
});