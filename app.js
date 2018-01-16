const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const formidable = require('formidable');

const port = process.env.PORT || 8080;
// create express app
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('tiny'));

// define a simple route
app.get('/', function (req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', function (err, text) {
        res.send(text);
    });
});

app.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        res.status(200).send({"size":files.file.size})
    });
    
});



// listen for requests
app.listen(port, function () {
    console.log("Server is listening on port " + port);
});