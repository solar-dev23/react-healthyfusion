'use strict';

function search (requestSender) {
    this.rs = requestSender;
}

search.prototype = {
    show: function() {
        return this.rs().get('search/GetNutrients');
    },

    Nutrientsshow: function(stringtosearch) {

        return this.rs().post('search/SearchNutrientsByMedication/',{stringtosearch: stringtosearch});
    },
    Symptomsshow: function(stringtosearch) {

        return this.rs().post('search/SearchNutrientsBySymtoms/',{stringtosearch: stringtosearch});
    },
    getmedication:function()
    {
 return this.rs().get('search/Medication');

    },
     getsymptom:function()
    {
 return this.rs().get('search/Symptom');

    },
    monoitem:function()
    {
 return this.rs().get('providers/GetMonographDetails');

    }

}
module.exports = search;