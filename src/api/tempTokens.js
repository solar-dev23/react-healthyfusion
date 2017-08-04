'use strict';

function TempTokens (requestSender) {
    this.rs = requestSender;
}

TempTokens.prototype = {
    get: function(sitePart) {
        return this.rs().get('tempTokens?sitePart=' + sitePart);
    }
}

module.exports = TempTokens;