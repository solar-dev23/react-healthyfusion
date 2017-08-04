import alt from 'alt.js'

import ProductsService from 'services/ProductsService.js';

class DashboardPatientPaymentPageActions {
    constructor() {
        this.generateActions(
            'getPatientAddressSuccess',
            'getPatientShippingAddressDetailsSuccess',
            'getPatientBillingAddressDetailsSuccess',
            'CreateNewPatientShippingAddressSuccess',
            'createNewPatientBillingAddressSuccess',   
            'CreateNewProviderShippingAddressSuccess',
            'createNewProviderBillingAddressSuccess',  
            'getProviderAddressSuccess',
            'getProviderShippingAddressDetailsSuccess',
            'getProviderBillingAddressDetailsSuccess'          
        );
    }
  	getPatientAddressList() {
        ProductsService.getPatientAddressList()
            .then(data => this.actions.getPatientAddressSuccess(data))
            .catch(data => console.log(data));
    }
    getPatientShippinngAddressDetailsByAddressID(AddressID){
        ProductsService.getPatientAddressDetailsByAddressID(AddressID)
            .then(data => this.actions.getPatientShippingAddressDetailsSuccess(data))
            .catch(data => console.log(data));
    }
    getPatientBillingAddressDetailsByAddressID(AddressID){
        ProductsService.getPatientAddressDetailsByAddressID(AddressID)
            .then(data => this.actions.getPatientBillingAddressDetailsSuccess(data))
            .catch(data => console.log(data));
    }
    CreateNewPatientShippingAddress(Addressdata)
    {
         ProductsService.CreateNewPatientAddress(Addressdata)
            .then(data => this.actions.CreateNewPatientShippingAddressSuccess(data))
            .catch(data => console.log(data));
    }
     CreateNewPatientBillingAddress(Addressdata)
    {
         ProductsService.CreateNewPatientAddress(Addressdata)
            .then(data => this.actions.createNewPatientBillingAddressSuccess(data))
            .catch(data => console.log(data));
    }
     CreateNewProviderShippingAddress(Addressdata)
    {
         ProductsService.CreateNewProviderAddress(Addressdata)
            .then(data => this.actions.CreateNewProviderShippingAddressSuccess(data))
            .catch(data => console.log(data));
    }
     CreateNewProviderBillingAddress(Addressdata)
    {
         ProductsService.CreateNewProviderAddress(Addressdata)
            .then(data => this.actions.createNewProviderBillingAddressSuccess(data))
            .catch(data => console.log(data));
    }
    getProviderAddressList() {
        ProductsService.getProviderAddressList()
            .then(data => this.actions.getProviderAddressSuccess(data))
            .catch(data => console.log(data));
    }
    getProviderShippinngAddressDetailsByAddressID(AddressID){
        ProductsService.getProviderAddressDetailsByAddressID(AddressID)
            .then(data => this.actions.getProviderShippingAddressDetailsSuccess(data))
            .catch(data => console.log(data));
    }
     getProviderBillingAddressDetailsByAddressID(AddressID){
        ProductsService.getProviderAddressDetailsByAddressID(AddressID)
            .then(data => this.actions.getProviderBillingAddressDetailsSuccess(data))
            .catch(data => console.log(data));
    }
    UpdateProviderShippingAddress(Addressdata)
    {
         ProductsService.UpdateProviderShippingAddress(Addressdata);          
    }
    UpdatePatientShippingAddress(Addressdata)
    {
         ProductsService.UpdatePatientShippingAddress(Addressdata);
    }
}

export default alt.createActions(DashboardPatientPaymentPageActions);