'use strict';

function Help (requestSender) {
    this.rs = requestSender;
}

Help.prototype = {
    add: function(data) {
        return this.rs().post('help', data);
    }
}

module.exports = Help;