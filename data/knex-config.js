'use strict'

// Import application configuration
var config = require('../config');

// Configuration for Knex migration tool
module.exports = {
    
    // Development environment
    development: {
        client: config.development.database.driver,
        connection: {
            host: config.development.database.hostname,
            user: config.development.database.username,
            password: config.development.database.password,
            database: config.development.database.database
        }, 
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'tql_sys_db_migrations'
        }
    },
    
    // Staging environment
    staging: {
        client: config.staging.database.driver,
        connection: {
            host: config.staging.database.hostname,
            user: config.staging.database.username,
            password: config.staging.database.password,
            database: config.staging.database.database
        }, 
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'tql_sys_db_migrations'
        }
    },
    
    // Test environment
    test: {
        client: config.test.database.driver,
        connection: {
            host: config.test.database.hostname,
            user: config.test.database.username,
            password: config.test.database.password,
            database: config.test.database.database
        }, 
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'tql_sys_db_migrations'
        }
    },

    // Production environment
    production: {
        client: config.production.database.driver,
        connection: {
            host: config.production.database.hostname,
            user: config.production.database.username,
            password: config.production.database.password,
            database: config.production.database.database
        }, 
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'tql_sys_db_migrations'
        }
    }
};
