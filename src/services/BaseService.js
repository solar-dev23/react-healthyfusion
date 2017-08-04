import URI from 'urijs';
// import _ from 'lodash';
import Q from 'q';
import $ from 'jquery';

import AuthActions from 'actions/AuthActions.js';
import DashboardCommonActions from 'actions/DashboardCommonActions.js';

var config = require('../../config.js');

export default class BaseService {
    //
    // delete(url, requestParams) {
    //     return this.update(url, 'DELETE', requestParams);
    // }
    //
    // patch(url, requestData, queryParams={}, filesData) {
    //     return this.update(url, 'PATCH', requestData, queryParams, filesData);
    // }
    //

    // update(url, method, requestData, queryParams={}, filesData) {
    //     url = `${config.apiUrl}${new URI(url).setSearch(queryParams).toString()}`;
    //     let requestBody;
    //
    //     if (filesData) {
    //         requestBody = new FormData();
    //
    //         _.forEach(filesData, (fileDataObj, fileName) => {
    //             requestBody.append(fileName, fileDataObj);
    //         });
    //
    //         _.forEach(requestData, (fieldValue, fieldName) => {
    //             requestBody.append(fieldName, fieldValue);
    //         });
    //     } else {
    //         requestBody = JSON.stringify(requestData);
    //     }
    //
    //     return fetch(url, {
    //         method: method,
    //         headers: this.getHeaders(filesData ? 'multipart' : 'json'),
    //         credentials: 'same-origin',
    //         body: requestBody
    //     }).then(this.failOnHTTPErrors).then(response => {
    //         const HTTP_NO_CONTENT = 204;
    //
    //         if (response.status !== HTTP_NO_CONTENT) {
    //             return response.json();
    //         }
    //     });
    // }
    //
    // failOnHTTPErrors(response) {
    //     let error;
    //     const HTTP_OK = 200;
    //     const HTTP_MULTIPLE_CHOICES = 300;
    //
    //     if (response.status >= HTTP_OK && response.status < HTTP_MULTIPLE_CHOICES) {
    //         return response;
    //     } else {
    //         return response.json().then(body => {
    //             error = new Error(response.statusText);
    //             error.response = response;
    //             error.responseJson = body;
    //
    //             throw error;
    //         }, () => {
    //             error = new Error(response.statusText);
    //             error.response = response;
    //
    //             throw error;
    //         });
    //     }
    // }
    //
    // getHeaders(type='json') {
    //     const currentUser = localStorage.currentUser && JSON.parse(localStorage.currentUser),
    //           headers = {
    //               'Accept': 'application/json'
    //           };
    //
    //     if (type === 'json') {
    //         headers['Content-Type'] = 'application/json';
    //     }
    //
    //     if (currentUser) {
    //         headers['auth-token'] = currentUser.authToken
    //     }
    //
    //     return headers;
    // }

    // setAuthToken(authToken) {
    //     $.ajaxPrefilter(function( options ) {
    //         options.beforeSend = function (xhr) {
    //             xhr.setRequestHeader('auth-token', authToken);
    //         }
    //     });
    // }

    // post(url, requestData, queryParams={}, filesData) {
    //     return this.update(url, 'POST', requestData, queryParams, filesData);
    // }
    //
    // get(url, queryParams = {}) {
    //     // additional query string parameters processing
    //     url = `${config.apiUrl}${new URI(url).setSearch(queryParams).toString()}`;
    //
    //     return fetch(url, {
    //         method: 'GET',
    //         headers: this.getHeaders(),
    //         credentials: 'same-origin'
    //     }).then(this.failOnHTTPErrors).then(response => response.json());
    // }

    get(url) {
        var d = Q.defer();

        if (localStorage.currentUser) {
            const currentUser = localStorage.currentUser && JSON.parse(localStorage.currentUser);

            $.ajaxPrefilter(function( options ) {
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader('auth-token', currentUser.authToken);
                }
            });
        }

        DashboardCommonActions.onLoading();

        $.ajax({
            url: `${config.apiUrl}${new URI(url).setSearch({}).toString()}`,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: config.crossDomain,
            dataType: 'json'
        }).done(function(data) {
            DashboardCommonActions.offLoading();

            d.resolve(data);
        }).fail(function(jqXHR) {
            console.log(jqXHR);

            if (jqXHR.statusText === 'Unauthorized') {
                AuthActions.logout();
            }

            DashboardCommonActions.offLoading();

            d.resolve(jqXHR.statusText);
        });

        return d.promise;
    }

    post(url, data) {
        var d = Q.defer();

        if (localStorage.currentUser) {
            const currentUser = localStorage.currentUser && JSON.parse(localStorage.currentUser);

            $.ajaxPrefilter(function( options ) {
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader('auth-token', currentUser.authToken);
                }
            });
        }

        DashboardCommonActions.onLoading();

        $.ajax({
            url: `${config.apiUrl}${new URI(url).setSearch({}).toString()}`,
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
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.warn(e);
                }
            }

            DashboardCommonActions.offLoading();
            d.resolve(data);

        }).fail(function(jqXHR) {
            console.log(jqXHR);

            if (data.statusText === 'Unauthorized') {
                AuthActions.logout();
            }

            DashboardCommonActions.offLoading();

            d.reject(jqXHR);
        });

        return d.promise;
    }

    put(url, data) {
        var d = Q.defer();

        DashboardCommonActions.onLoading();

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
            DashboardCommonActions.offLoading();

            d.resolve();
        }).fail(function(jqXHR) {

            DashboardCommonActions.offLoading();

            d.reject(jqXHR.responseJSON);
        });

        return d.promise;
    }
}
