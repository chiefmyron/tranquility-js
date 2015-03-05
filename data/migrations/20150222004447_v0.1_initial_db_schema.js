'use strict';

/*
 * Database migration
 * Version: 0.1
 * 
 * Initial table structures for tranquility application
 */

exports.up = function (knex, Promise) {
    return Promise.all([

        /*************************************************************************
         * Reference data tables                                                 *
         *                                                                       *
         * Used for application lookups                                          *
         *************************************************************************/

        // Locale reference data
        knex.schema.createTable('tql_cd_locales', function (table) {
            table.string('code', 30).notNullable().primary();
            table.string('description', 100).notNullable();
            table.integer('ordering').notNullable();
        }),
    
        // Timezone reference data
        knex.schema.createTable('tql_cd_timezones', function (table) {
            table.string('code', 30).notNullable().primary();
            table.string('description', 100).notNullable();
            table.boolean('daylightSavings').notNullable();
            table.integer('ordering').notNullable();
        }),
    
        /*************************************************************************
         * Business object tables                                                *
         *                                                                       *
         * Used to store currently active business data                          *
         *************************************************************************/
     
        // Base business object entity
        knex.schema.createTable('tql_entity', function (table) {
            table.uuid('id').notNullable().primary();
            table.integer('version').notNullable();
            table.string('type', 25).notNullable();
            table.string('subType', 25).notNullable();
            table.boolean('deleted').notNullable();
            table.bigInteger('transactionId').notNullable();
        }),

        // Address details - electronic
        knex.schema.createTable('tql_entity_addresses_electronic', function (table) {
            table.uuid('id').notNullable().primary();
            table.string('addressType', 25).notNullable();
            table.string('category', 25).notNullable();
            table.string('addressText', 255).notNullable();
            table.boolean('primaryContact').notNullable();
        }),

        // Address details - phone
        knex.schema.createTable('tql_entity_addresses_phone', function (table) {
            table.uuid('id').notNullable().primary();
            table.string('addressType', 25).notNullable();
            table.string('addressText', 255).notNullable();
            table.boolean('primaryContact').notNullable();
        }),

        // Address details - physical
        knex.schema.createTable('tql_entity_addresses_physical', function (table) {
            table.uuid('id').notNullable().primary();
            table.string('addressType', 25).notNullable();
            table.string('addressLine1', 255).notNullable();
            table.string('addressLine2', 255).nullable();
            table.string('city', 255).notNullable();
            table.string('state', 255).nullable();
            table.string('postcode', 255).nullable();
            table.string('country', 255).notNullable();
            table.float('latitude').notNullable();
            table.float('longitude').notNullable();
        }),

        // Person or contact
        knex.schema.createTable('tql_entity_people', function (table) {
            table.uuid('id').notNullable().primary();
            table.string('title', 50).notNullable();
            table.string('firstName', 255).notNullable();
            table.string('lastName', 255).notNullable();
            table.string('position', 255).notNullable();
        }),

        // Application user account
        knex.schema.createTable('tql_entity_users', function (table) {
            table.uuid('id').notNullable().primary();
            table.string('username', 255).notNullable().unique();
            table.string('password', 255).notNullable();
            table.string('timezoneCode', 30).notNullable();
            table.string('localeCode', 30).notNullable();
            table.boolean('active').notNullable();
            table.uuid('securityGroupId').notNullable();
            table.dateTime('registeredDateTime').notNullable();
            table.dateTime('lastVisitDateTime').notNullable();
        }),

        // Business object cross reference table
        knex.schema.createTable('tql_entity_xref', function (table) {
            table.uuid('parentId').notNullable();
            table.uuid('childId').notNullable();
            table.primary(['parentId', 'childId']);
        }),


        /*************************************************************************
         * Historical business object tables                                     *
         *                                                                       *
         * Used to store previous versions of business objects for audit         *
         * purposes                                                              *
         *************************************************************************/

        // Base business object entity
        knex.schema.createTable('tql_history_entity', function (table) {
            table.uuid('id').notNullable();
            table.integer('version').notNullable();
            table.string('type', 25).notNullable();
            table.string('subType', 25).notNullable();
            table.boolean('deleted').notNullable();
            table.bigInteger('transactionId').notNullable();
            table.primary(['id', 'version']);
        }),
    
        // Address details - electronic
        knex.schema.createTable('tql_history_entity_addresses_electronic', function (table) {
            table.uuid('id').notNullable();
            table.integer('version').notNullable();
            table.string('addressType', 25).notNullable();
            table.string('category', 25).notNullable();
            table.string('addressText', 255).notNullable();
            table.boolean('primaryContact').notNullable();
            table.primary(['id', 'version']);
        }),
    
        // Address details - phone
        knex.schema.createTable('tql_history_entity_addresses_phone', function (table) {
            table.uuid('id').notNullable();
            table.integer('version').notNullable();
            table.string('addressType', 25).notNullable();
            table.string('addressText', 255).notNullable();
            table.boolean('primaryContact').notNullable();
            table.primary(['id', 'version']);
        }),
    
        // Address details - physical
        knex.schema.createTable('tql_history_entity_addresses_physical', function (table) {
            table.uuid('id').notNullable();
            table.integer('version').notNullable();
            table.string('addressType', 25).notNullable();
            table.string('addressLine1', 255).notNullable();
            table.string('addressLine2', 255).nullable();
            table.string('city', 255).notNullable();
            table.string('state', 255).nullable();
            table.string('postcode', 255).nullable();
            table.string('country', 255).notNullable();
            table.float('latitude').notNullable();
            table.float('longitude').notNullable();
            table.primary(['id', 'version']);
        }),
    
        // Person or contact
        knex.schema.createTable('tql_history_entity_people', function (table) {
            table.uuid('id').notNullable();
            table.integer('version').notNullable();
            table.string('title', 50).notNullable();
            table.string('firstName', 255).notNullable();
            table.string('lastName', 255).notNullable();
            table.string('position', 255).notNullable();
            table.primary(['id', 'version']);
        }),
    
        // Application user account
        knex.schema.createTable('tql_history_entity_users', function (table) {
            table.uuid('id').notNullable();
            table.integer('version').notNullable();
            table.string('username', 255).notNullable().unique();
            table.string('password', 255).notNullable();
            table.string('timezoneCode', 30).notNullable();
            table.string('localeCode', 30).notNullable();
            table.boolean('active').notNullable();
            table.uuid('securityGroupId').notNullable();
            table.dateTime('registeredDateTime').notNullable();
            table.dateTime('lastVisitDateTime').notNullable();
            table.primary(['id', 'version']);
        }),


        /*************************************************************************
         * System tables                                                         *
         *                                                                       *
         * Used for audit trail details, system configuration and security roles *
         *************************************************************************/

        // Audit trail table
        knex.schema.createTable('tql_sys_trans_audit', function (table) {
            table.bigIncrements('transactionId').notNullable().primary();
            table.string('transactionSource', 100).notNullable();
            table.uuid('updateBy').notNullable();
            table.dateTime('updateDateTime').notNullable();
            table.string('updateReason', 100).notNullable();
        }),

        // Entity locks table
        knex.schema.createTable('tql_sys_entity_locks', function (table) {
            table.uuid('entityId').notNullable().primary();
            table.uuid('lockedBy').notNullable();
            table.dateTime('lockedDateTime').notNullable();
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.dropTableIfExists('tql_sys_entity_locks'),
        knex.dropTableIfExists('tql_sys_trans_audit'),
        knex.dropTableIfExists('tql_history_entity_users'),
        knex.dropTableIfExists('tql_history_entity_people'),
        knex.dropTableIfExists('tql_history_entity_addresses_physical'),
        knex.dropTableIfExists('tql_history_entity_addresses_phone'),
        knex.dropTableIfExists('tql_history_entity_addresses_electronic'),
        knex.dropTableIfExists('tql_history_entity'),
        knex.dropTableIfExists('tql_entity_xref'),
        knex.dropTableIfExists('tql_entity_users'),
        knex.dropTableIfExists('tql_entity_people'),
        knex.dropTableIfExists('tql_entity_addresses_physical'),
        knex.dropTableIfExists('tql_entity_addresses_phone'),
        knex.dropTableIfExists('tql_entity_addresses_electronic'),
        knex.dropTableIfExists('tql_entity'),
        knex.dropTableIfExists('tql_cd_timezones'),
        knex.dropTableIfExists('tql_cd_locales')
    ]);
};
