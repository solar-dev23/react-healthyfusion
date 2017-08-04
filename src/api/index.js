'use strict';

var auth = require('./auth');
var download = require('./download');

var users = require('./users');
var vendors = require('./vendors');


var tempTokens = require('./tempTokens');

var providers = require('./providers');
var patients = require('./patients');
var help = require('./help');
var search = require('./search');
var Products= require('./Products');
module.exports = function(rs) {
    return  {
        auth: new auth(rs),
        download: new download(rs),
        users: new users(rs),
        vendors: new vendors(rs),
        tempTokens: new tempTokens(rs),
        providers: new providers(rs),
        patients: new patients(rs),
        help: new help(rs),
        search: new search(rs),
        Products:new Products(rs)
    };
};