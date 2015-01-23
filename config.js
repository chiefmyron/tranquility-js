'use strict';

exports.port = process.env.PORT || 3000;
exports.mongodb = {
    uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost/drywall'
};
exports.companyName = 'Acme, Inc.';
exports.projectName = 'Drywall';
exports.systemEmail = 'your@email.addy';
exports.cryptoKey = 'k3yb0ardc4t';
exports.loginAttempts = {
    forIp: 50,
    forIpAndUser: 7,
    logExpiration: '20m'
};