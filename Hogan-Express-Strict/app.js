const config = require('./config');
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
    res.render('template', { partials : { partial2: 'partials/partial2' } });
});

app.listen(app.settings.port, () => {
    console.log("Server listening on port " + app.settings.port);
});