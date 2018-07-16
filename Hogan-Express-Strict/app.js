const config = require('./config');
const data = require('./data');
data.lambdas = {
    boldAndUpper: (text) => { return `<b>${text.toUpperCase()}</b>` },
    reverseString: (text) => { return text.split("").reverse().join(""); }
    /*
    data.renderTextInCoolWayFunc = function() {
        return function(text, render) {
            // Lambdas in Hogan no longer require the 'render' funciton
            // use the hogan-express-strict method instead - see above
            return '<b>' + render(text.toUpperCase()) + '</b>';
        }
    };
    */
};

const express = require('express');
const router = express.Router();

const app = express();

app.set('port', config.port);
app.set('view engine', 'html');   // use .html extension for templates
app.set('layout', 'layout');      // use layout.html as the default layout
app.set('partials', { partial1: 'partials/partial1' });  // define partials available to all pages
app.enable('view cache');
app.engine('html', require('hogan-express-strict'));

app.get('/', (req, res) => {
    res.locals = { name : 'Keian' };
    res.render('template', data);
});

app.listen(app.settings.port, () => {
    console.log("Server listening on port " + app.settings.port);
});