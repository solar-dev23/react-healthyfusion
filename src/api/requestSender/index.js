'use strict';

var Q = require('q');
import $ from 'jquery';

var config = require('../../../config.js');

function RequestSender () {
    $.support.cors =  config.crossDomain;
    $.ajaxSetup({
        statusCode: {
            401: function() {
                localStorage.userData = '';
                location.href = location.href.substring(0, location.href.length - location.hash.length);
            }
        }
    });
}

RequestSender.prototype = {
    setAuthToken: function(authToken) {
        $.ajaxPrefilter(function( options ) {
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('auth-token', authToken);
            }
        });
    },

    get: function(url) {
        var d = Q.defer();

        $.ajax({
            url: config.apiUrl + url.replace('+', encodeURIComponent('+')),
            method: 'GET',
            contentType: 'application/json',
            crossDomain: config.crossDomain,
            dataType: 'json'
        }).done(function(data) {
            d.resolve(data);
        }).fail(function(jqXHR) {
            d.reject(jqXHR.responseJSON);
        });

        return d.promise;
    },

    post: function(url, data) {
        var d = Q.defer();

        $.ajax({
            url: config.apiUrl + url.replace('+', encodeURIComponent('+')),
            method: 'POST',
            crossDomain: config.crossDomain,
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
        }).done(function(data) {
            try {
                data = JSON.parse(data);
            } catch (e) {
                console.warn(e);
            }

            d.resolve(data);
        }).fail(function(jqXHR) {
            d.reject(jqXHR.responseJSON);
        });

        return d.promise;
    },

    put: function(url, data) {
        var d = Q.defer();

        $.ajax({
            url: config.apiUrl + url.replace('+', encodeURIComponent('+')),
            method: 'PUT',
            crossDomain: config.crossDomain,
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
    },

    delete: function(url, data) {
        var d = Q.defer();

        $.ajax({
            url: config.apiUrl + url.replace('+', encodeURIComponent('+')),
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify(data),
            crossDomain: config.crossDomain
        }).done(function() {
            d.resolve();
        }).fail(function(jqXHR) {
            d.reject(jqXHR.responseJSON);
        });

        return d.promise;
    }
}

module.exports = RequestSender;