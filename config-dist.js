'use strict';

// Development environment configuration
exports.development = {
    // System settings
    encryptionKey: 'Your key here',
    port: process.env.PORT || 3000,
    
    // Database connection
    database: {
        driver: 'mysql',
        hostname: 'localhost',
        database: 'Database name',
        username: 'Database username',
        password: 'Database password'
    },
    
    // Database migrations
    migrations: {
        metadataTable: 'tql_sys_db_metadata',
        migrationsPath: './data/migrations',
        seedPath: './data/seeds'
    },
    
    // System logging
    logging: {
        level: 'debug',
        path: '/logs/',
        filename: 'application.log'
    },

    // API keys, etc
    services: {

    },

    // Miscellaneous
    serverTimezone: 'UTC',
    fromEmailAddress: 'hello@tranquility.local'
}

// Test environment configuration
exports.test = {
    // System settings
    encryptionKey: 'Your key here',
    port: process.env.PORT || 3000,
    
    // Database connection
    database: {
        driver: 'mysql',
        hostname: 'localhost',
        database: 'Database name',
        username: 'Database username',
        password: 'Database password'
    },
    
    // Database migrations
    migrations: {
        metadataTable: 'tql_sys_db_metadata',
        migrationsPath: './data/migrations',
        seedPath: './data/seeds'
    },
    
    // System logging
    logging: {
        level: 'debug',
        path: '/logs/',
        filename: 'application.log'
    },
    
    // API keys, etc
    services: {

    },
    
    // Miscellaneous
    serverTimezone: 'UTC',
    fromEmailAddress: 'hello@tranquility.local'
}

// Staging environment configuration
exports.staging = {
    // System settings
    encryptionKey: 'Your key here',
    port: process.env.PORT || 3000,
    
    // Database connection
    database: {
        driver: 'mysql',
        hostname: 'localhost',
        database: 'Database name',
        username: 'Database username',
        password: 'Database password'
    },
    
    // Database migrations
    migrations: {
        metadataTable: 'tql_sys_db_metadata',
        migrationsPath: './data/migrations',
        seedPath: './data/seeds'
    },
    
    // System logging
    logging: {
        level: 'debug',
        path: '/logs/',
        filename: 'application.log'
    },
    
    // API keys, etc
    services: {

    },
    
    // Miscellaneous
    serverTimezone: 'UTC',
    fromEmailAddress: 'hello@tranquility.local'
}

// Production environment configuration
exports.production = {
    // System settings
    encryptionKey: 'Your key here',
    port: process.env.PORT || 3000,
    
    // Database connection
    database: {
        driver: 'mysql',
        hostname: 'localhost',
        database: 'Database name',
        username: 'Database username',
        password: 'Database password'
    },
    
    // Database migrations
    migrations: {
        metadataTable: 'tql_sys_db_metadata',
        migrationsPath: './data/migrations',
        seedPath: './data/seeds'
    },
    
    // System logging
    logging: {
        level: 'debug',
        path: '/logs/',
        filename: 'application.log'
    },
    
    // API keys, etc
    services: {

    },
    
    // Miscellaneous
    serverTimezone: 'UTC',
    fromEmailAddress: 'hello@tranquility.local'
}