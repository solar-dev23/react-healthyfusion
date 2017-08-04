'use strict';

var Config = require('../config.js');

function Download () { }

Download.prototype = {
    file: function(base64File, filename) {
        $('#downloader').html('<form id="downloader-form" method="POST" action="' + Config.apiUrl + 'download/file"><input name="Value" value="'+base64File+'"/><input name="FileName" value="' + filename + '"></form>');
        $('#downloader-form').submit();
        $('#downloader').html('');
    }
}

module.exports = Download;
