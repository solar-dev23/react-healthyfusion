'use strict';

function Products (requestSender) {
    this.rs = requestSender;
}

Products.prototype = {
    addtoCart : function(data,PatientId) {

        return this.rs().post('products/addtoCart/', {ProductID: data,PatientId:PatientId});

    },
    ShowPatientsByName : function(SearchKeyword) {

        return this.rs().post('providers/SearchPatients/', {FirstName: SearchKeyword});

    },
    NewPatientFromProduct:function(data){
        return this.rs().post('providers/AddNewPatient', {FirstName:data.FirstName,
            LastName:data.LastName,
            Phone:data.Phone,
            Email:data.Email});
    },

    ShowPatientBasket:function(){
        return this.rs().get('products/GetPatientBasket');
    },
    ProductCheckOutByPatient:function(data){
        return this.rs().post('Patient/PlaceOrders/',{Orders: data.CheckOutProducts});
    }
};

module.exports = Products;