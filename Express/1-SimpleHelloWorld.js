var express = require('express');
var app = express();

app.get('/', (request, response) => {
    response.send('Hello world');
});

//app.listen(3000);  // bind to TCP port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
});


// Express HTTP objects inherit from Node objects
app.get('/', (request, response) => {
    response.write('Hello world');   // using Node API
    response.end();                  // using Node API
});

// The send function converts Objects and Arrays to JSON
app.get('/blocks', (request, response) => {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.send(blocks);
    //response.json(blocks);   // the same as send function for converting to json
});

// Redirecting to relative path
app.get('/blocks', (request, response) => {
    // response.redirect('/parts');  // temporary redirect
    response.redirect(301, '/parts');   // moved permanently
});