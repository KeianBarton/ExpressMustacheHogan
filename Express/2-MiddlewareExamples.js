// serving files with sendFile
var express = require('express');
var app = express();

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);

// serving files with middleware
app.use(express.static('public'));   // defaults to serving index.html file
app.listen(3000);


// Middleware example
app.use( (request, response, next) => {
    /* ... */
    next();   // moves processing to next middleware in the stack
});

/* ... next();  middleware B */

app.use( (request, response, next) => {
    /* ... */
    response.send('done!');   // complete request ( no more middleware will be run )
});