var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

app.get('/blocks', (request, response) => {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    if (request.query.limit >= 0) {
        response.json(blocks.slice(0, request.query.limit));
    } else {
        response.json(blocks);
    }
});

app.listen(3000);