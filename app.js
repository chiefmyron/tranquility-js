// Set to strict mode
'use strict'

// Load dependencies
var bodyParser     = require('body-parser');
var compression    = require('compression');     // Response compression
var cookieParser   = require('cookie-parser');   
var csrf           = require('csurf');           // CSRF protection
var express        = require('express');         // Express application framework
var helmet         = require('helmet');          // Security middleware collection
var http           = require('http');            // HTTP server
var hogan          = require('hogan-express');
var methodOverride = require('method-override');
var morgan         = require('morgan');          // HTTP request logger
var passport       = require('passport');        // Authentication manager
var path           = require('path');            // Handles and transforms file paths
var serveStatic    = require('serve-static');
var session        = require('express-session'); // Session management for Express
var packageJson    = require('./package.json');

// Create express application
var app = express();

// Check environment
var environment = {
    mode:    process.env.NODE_ENV || 'development',
    port:    process.env.PORT || 3000,
    version: packageJson.version
}
app.env = environment;

// Load configuration file
var config = require('./config');
app.config = config;

// Initialise web server
app.server = http.createServer(app);

// TODO: Database connection


// TODO: Import data models


// Initialise application settings
app.disable('x-powered-by');
app.set('port', config.port);

// Configure rendering engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); // Use .html extension for templates
app.set('layout', path.join(__dirname, 'layouts/layout.html'));    // Use layout.html as the default layout
app.enable('view cache');
app.engine('html', hogan);

// Setup middleware
app.use(morgan('dev'));
app.use(compression());
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.cryptoKey));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.cryptoKey
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf({ cookie: { signed: true } }));
helmet(app);

// Setup passport
//require('./passport')(app, passport); // TODO: Create passport.js file in root folder

// Setup routing
require('./routes')(app, passport);

// Add custom error handler
//app.use(require('./views/http/index').http500);

// Setup utilities
app.utility = {};
app.utility.strings = require('./util/strings.js');
//app.utility.sendmail = require('./util/sendmail');
//app.utility.slugify = require('./util/slugify');
//app.utility.workflow = require('./util/workflow');

// Build startup message for the top of the log
var startupMessage = '\r\n' +
app.utility.strings.padString(' ', 60, '*') + '\r\n' +
app.utility.strings.padString(' *', 59, ' ') + '*\r\n' +
app.utility.strings.padString(' * Starting tranquility server', 59, ' ') + '*\r\n' +
app.utility.strings.padString(' *', 59, ' ') + '*\r\n' +
app.utility.strings.padString(' *   - Server address:      ' + app.server.address(), 59, ' ') + '*\r\n' +
app.utility.strings.padString(' *   - Port:                ' + app.env.port, 59, ' ') + '*\r\n' +
app.utility.strings.padString(' *', 59, ' ') + '*\r\n' +
app.utility.strings.padString(' *   - Application version: ' + app.env.version, 59, ' ') + '*\r\n' +
app.utility.strings.padString(' *   - Environment:         ' + app.env.mode, 59, ' ') + '*\r\n' +
app.utility.strings.padString(' *', 59, ' ') + '*\r\n' +
app.utility.strings.padString(' ', 60, '*') + '\r\n\r\n';

// Start up HTTP server, and begin listening
app.server.listen(app.config.port, function () {
    // Application is up and running!
    console.log(startupMessage);
});

// Export app (for unit testing purposes)
module.exports = app;