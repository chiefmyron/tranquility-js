'use strict';

// Import data from JSON files
var referenceData = require('./data/reference.json');


exports.seed = function (knex, Promise) {
    var seedPromises = [];
    
    // Locale reference data
    referenceData.locales.forEach(function (locale) {
        seedPromises.push(knex.table('tql_cd_locales').insert(locale));
    });
    
    // Timezone reference data
    referenceData.timezones.forEach(function (timezone) {
        seedPromises.push(knex.table('tql_cd_timezones').insert(timezone));
    });
    
    return Promise.all(seedPromises);
};