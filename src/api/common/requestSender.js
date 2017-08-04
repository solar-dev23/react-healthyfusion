'use strict';

var Q = require('q');
import $ from 'jquery';
var Config = require('../../../config.js');

function get(url) {
    var d = Q.defer();

    $.ajax({
        url: Config.apiUrl + url.replace('+', encodeURIComponent('+')),
        method: 'GET',
        contentType: 'application/json',
        crossDomain: Config.crossDomain,
        dataType: 'json'
    }).done(function(data) {
        d.resolve(data);
    }).fail(function(jqXHR) {

        d.reject(jqXHR.responseJSON);
    });

    return d.promise;
}

function post(url, data) {
    var d = Q.defer();

    $.ajax({
        url: Config.apiUrl + url.replace('+', encodeURIComponent('+')),
        method: 'POST',
        crossDomain: Config.crossDomain,
        contentType: 'application/json',
        Access-Control-Allow-Origin: *,
    data: JSON.stringify(data),
        xhr: function() {
        var myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) {
            myXhr.upload.addEventListener('progress',function(ev) {
                if (ev.lengthComputable) {
                    var percentUploaded = Math.floor(ev.loaded * 100 / ev.total);
                    d.notify(percentUploaded);
                } else {
                    d.notify(100);
                }
            }, false);
        }
        return myXhr;
    }
}).done(function(data) {
        d.resolve(data);
    }).fail(function(jqXHR) {

        d.reject(jqXHR.responseJSON);
    });

    return d.promise;
}

function put(url, data) {
    var d = Q.defer();

    $.ajax({
        url: Config.apiUrl + url.replace('+', encodeURIComponent('+')),
        method: 'PUT',
        crossDomain: Config.crossDomain,
        contentType: 'application/json',
        data: JSON.stringify(data),
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress',function(ev) {
                    if (ev.lengthComputable) {
                        var percentUploaded = Math.floor(ev.loaded * 100 / ev.total);
                        d.notify(percentUploaded);
                    } else {
                        d.notify(100);
                    }
                }, false);
            }
            return myXhr;
        }
    }).done(function() {
        d.resolve();
    }).fail(function(jqXHR) {

        d.reject(jqXHR.responseJSON);
    });

    return d.promise;
}

function deleteIsNotAllowed(url, data) {
    var d = Q.defer();

    $.ajax({
        url: Config.apiUrl + url.replace('+', encodeURIComponent('+')),
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify(data),
        crossDomain: Config.crossDomain
    }).done(function() {
        d.resolve();
    }).fail(function(jqXHR) {
        d.reject(jqXHR.responseJSON);
    });

    return d.promise;
}

module.exports = {
    get:  get,
    post: post,
    put: put,
    delete: deleteIsNotAllowed
}