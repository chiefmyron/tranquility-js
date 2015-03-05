// Set to strict mode
'use strict'

// Load dependencies
var _              = require('lodash');
var bodyParser     = require('body-parser');
var compression    = require('compression');     // Response compression
var cookieParser   = require('cookie-parser');   
var csrf           = require('csurf');           // CSRF protection
var db             = require('bookshelf');       // Database abstraction layer
var express        = require('express');         // Express application framework
var helmet         = require('helmet');          // Security middleware collection
var http           = require('http');            // HTTP server
var hogan          = require('hogan-express');   // Templating engine
var knex           = require('knex');            // SQL querying engine
var methodOverride = require('method-override');
var morgan         = require('morgan');          // HTTP request logger
var passport       = require('passport');        // Authentication manager
var path           = require('path');            // Handles and transforms file paths
var Promise        = require('bluebird');
var serveStatic    = require('serve-static');
var session        = require('express-session'); // Session management for Express

// Internal packages
var api            = require('./api');           // Internal API for data access and operations
var migrations     = require('./util/migrations');
var packageJson    = require('./package.json');  // Node.js dependencies package and manifest


// Initialise the application
init();

/*
 * Initialise the application
 * 
 * Sets up the express server instance, instaniates helpers, routes 
 * and middleware. Finally, return an instance of the application.
 */
function init() {
    // Create express application
    var app = express();

    // Check environment details
    var environment = {
        mode: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 3000,
        version: packageJson.version
    }
    app.env = environment;
    app.disable('x-powered-by');
    app.set('port', app.env.port);
    
    // Load configuration file
    var config = require('./config')[app.env.mode];
    app.config = config;
    
    // Create database connection
    knex = knex({
        client: app.config.database.driver,
        connection: {
            host: app.config.database.hostname,
            user: app.config.database.username,
            password: app.config.database.password,
            database: app.config.database.database
        },
        migrations: {
            tableName: app.config.migrations.metadataTable,
            directory: app.config.migrations.migrationsPath
        },
        seeds: {
            directory: app.config.migrations.seedPath
        }
    });
    db = db(knex);
    app.set('db', db);
    
    // Load internal API
    //api.init(config, db);

    // Configure rendering engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'html'); // Use .html extension for templates
    app.set('layout', path.join(__dirname, 'layouts/layout.html'));    // Use layout.html as the default layout
    app.enable('view cache');
    app.engine('html', hogan);
    
    // Load middlewares
    app.use(morgan('dev'));
    app.use(compression());
    app.use(serveStatic(path.join(__dirname, 'public')));
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(app.config.encryptionKey));
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: app.config.encryptionKey
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(csrf({ cookie: { signed: true } }));
    helmet(app);
    
    // Configure permissions
    require('./util/passport')(app, passport);
    
    // Load application routes
    require('./routes')(app, passport);
    //app.use(require('./views/http/index').http500);
    
    // Include utility helpers
    app.utility = {};
    app.utility.strings = require('./util/strings');
    //app.utility.sendmail = require('./util/sendmail');
    //app.utility.slugify = require('./util/slugify');
    //app.utility.workflow = require('./util/workflow');
    
    // Run any pending database schema migrations
    var migrations = require('./util/migrations');
    migrations(knex).then(function (schemaVersion) {
        // Set database schema version
        app.env.dbSchemaVersion = schemaVersion;

        // Start the application
        var startupMessage = '\r\n' +
            app.utility.strings.padString(' ', 60, '*') + '\r\n' +
            app.utility.strings.padString(' *', 59, ' ') + '*\r\n' +
            app.utility.strings.padString(' * Starting Tranquility server', 59, ' ') + '*\r\n' +
            app.utility.strings.padString(' *', 59, ' ') + '*\r\n' +
            //app.utility.strings.padString(' *   - Server address:          ' + app.server.address(), 59, ' ') + '*\r\n' +
            app.utility.strings.padString(' *   - Port:                    ' + app.env.port, 59, ' ') + '*\r\n' +
            app.utility.strings.padString(' *', 59, ' ') + '*\r\n' +
            app.utility.strings.padString(' *   - Application version:     ' + app.env.version, 59, ' ') + '*\r\n' +
            app.utility.strings.padString(' *   - Database schema version: ' + app.env.dbSchemaVersion, 59, ' ') + '*\r\n' +
            app.utility.strings.padString(' *   - Environment:             ' + app.env.mode, 59, ' ') + '*\r\n' +
            app.utility.strings.padString(' *', 59, ' ') + '*\r\n' +
            app.utility.strings.padString(' ', 60, '*') + '\r\n\r\n';
        
            // Start up HTTP server, and begin listening
            app.server = http.createServer(app);
            app.server.listen(app.config.port, function () {
                // Application is up and running!
                console.log(startupMessage);
            });
    });

    return app;
}

// Export app (for unit testing purposes)
module.exports = init;