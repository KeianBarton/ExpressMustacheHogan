var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// Middleware function - store in parseUrlencoded
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = {
    'Fixed' : 'Fastened securely in position',
    'Movable' : 'Capable of being moved',
    'Rotating' : 'Moving in a circle around its center'
};

app.delete('/blocks/:name', function(request, response) {
    delete blocks[request.blockName];
    response.sendStatus(200);  // sendStatus sets response body automatically
});

// Routes take multiple handlers as args, executed sequentially
app.post('/blocks', parseUrlencoded, (request, response) => {
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;

    response.status(201).json(newBlock.name);
});

app.param('name', (request, response, next) => {
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

    request.blockName = block;   // can be accessed from other routes in the app

    next();   // calls next process middleware
});

app.use(express.static('public'));

app.get('/blocks/:name', (request, response) => {
    var description = blocks[request.blockName];
    if (!description) {
        response.status(404).json('No description found for ' + request.params.name);
    } else {
        response.json(description);   // will return 200 status code (even if block does not exist)
    }
});

app.get('/blocks', (request, response) => {
    response.json(Object.keys(blocks));
});

app.listen(3000);