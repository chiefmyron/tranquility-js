'use strict'

var _       = require('lodash');
var Promise = require('bluebird');

var init = function (knex) {
    // Get the latest migration available
    return Promise.join(knex.migrate._listAll(), knex.migrate.currentVersion(), function (migrationsList, currentVersion) {
        var newestMigration = _(migrationsList).last().split('_')[0];
        
        // There are three possible scenarios:
        // 1. No database structures exist - need to create the structures, and seed reference data
        // 2. Database structures exist, but are out of date - need to run migrations to update structures
        // 3. Database structures exist and are up to date - no action required
        if (currentVersion == "none") {
            // Scenario 1 - create database structures and seed reference data
            console.log('Creating database structures (Version: ' + _formatDbVersionString(newestMigration) + ')...');
            return knex.migrate.latest().then(function () {
                console.log('Populating reference data...');
                return knex.seed.run();
            }).then(function () {
                console.log('Database successfully created!');
                return knex.migrate.currentVersion().then(function (currentVersion) {
                    return _formatDbVersionString(currentVersion);    
                });
            });
        } else if (newestMigration !== currentVersion) {
            // Scenario 2 - update database structures to the latest version
            console.log('Current database schema version: ' + currentVersion);
            console.log('Upgrading to version ' + newestMigration + '...');
            return knex.migrate.latest().then(function () {
                console.log('Database migration completed successfully!');
                return knex.migrate.currentVersion().then(function (currentVersion) {
                    return _formatDbVersionString(currentVersion);
                });
            });
        } else {
            // Scenario 3 - no action required
            return knex.migrate.currentVersion().then(function (currentVersion) {
                return _formatDbVersionString(currentVersion);
            });
        }
    });
}

// Returns database schema version in the format dd-mm-yyyy hh:mm:ss 
function _formatDbVersionString(dbVersionString) {
    var returnString = dbVersionString.substr(6, 2) + "-" + dbVersionString.substr(4, 2) + "-" + dbVersionString.substr(0, 4) + " " + dbVersionString.substr(8, 2) + ":" + dbVersionString.substr(10, 2) + ":" + dbVersionString.substr(12, 2);
    return returnString;
}

module.exports = init;