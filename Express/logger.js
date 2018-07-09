module.exports = (request, response, next) => {
    var start = +new Date();   // plus sign converts date object to ms
    var stream = process.stdout;
    var url = request.url;
    var method = request.method;

    response.on('finish', () => {
        var duration = +new Date() - start;
        var message = method + ' to ' + url + 
            '\ntook ' + duration + ' ms \n\n';
        stream.write(message);  // prints log message
    });

    next(); // move request to next middleware in the stack
}