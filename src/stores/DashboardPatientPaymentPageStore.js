import alt from 'alt.js';
// import _ from 'lodash';

import DashboardPatientPaymentPageActions from 'actions/DashboardPatientPaymentPageActions.js';

class DashboardPatientPaymentPageStore {
    constructor() {
        this.bindActions(DashboardPatientPaymentPageActions);
        this.AddressList=[];
        this.PatientAddressItemDetails=[];
        this.shippingAddressDeatilsSuccess =false;
        this.BillingAddressDeatilsSuccess = false;
        this.ShippingAddressID = 0;
        this.BillingAddressID = 0;
        this.addressIDData = [];
    }
	onGetPatientAddressSuccess(response) {
        this.AddressList = response.Address;
    }
    onGetPatientShippingAddressDetailsSuccess(response)
    {
		this.PatientAddressItemDetails=[];
        this.BillingAddressDeatilsSuccess = false;
    	this.shippingAddressDeatilsSuccess =true;
		this.PatientAddressItemDetails=response;
		this.ShippingAddressID = this.PatientAddressItemDetails?this.PatientAddressItemDetails[0].AddressID:0;
    }
    onGetPatientBillingAddressDetailsSuccess(response)
    {
    	this.PatientAddressItemDetails=[];
    	this.shippingAddressDeatilsSuccess =false;
    	this.BillingAddressDeatilsSuccess =true;
		this.PatientAddressItemDetails=response;
		this.BillingAddressID = this.PatientAddressItemDetails?this.PatientAddressItemDetails[0].AddressID:0;
    }
    onCreateNewPatientShippingAddressSuccess(data)
    {
		this.ShippingAddressID =  data;
    }
    onCreateNewPatientBillingAddressSuccess(data)
    {
		this.BillingAddressID =  data;
    }
    onGetProviderAddressSuccess(response) {
        this.AddressList = response.Address;
    }
    onGetProviderShippingAddressDetailsSuccess(response)
    {
        this.PatientAddressItemDetails=[];
        this.BillingAddressDeatilsSuccess = false;
        this.shippingAddressDeatilsSuccess =true;
        this.PatientAddressItemDetails=response;
        this.ShippingAddressID = this.PatientAddressItemDetails?this.PatientAddressItemDetails[0].AddressID:0;
    }
    onGetProviderBillingAddressDetailsSuccess(response)
    {
        this.PatientAddressItemDetails=[];
        this.shippingAddressDeatilsSuccess =false;
        this.BillingAddressDeatilsSuccess =true;
        this.PatientAddressItemDetails=response;
        this.BillingAddressID = this.PatientAddressItemDetails?this.PatientAddressItemDetails[0].AddressID:0;
    }
    onCreateNewProviderShippingAddressSuccess(data)
    {
        this.ShippingAddressID =  data;
    }
    onCreateNewProviderBillingAddressSuccess(data)
    {
        this.BillingAddressID =  data;
    }
   
}

export default alt.createStore(DashboardPatientPaymentPageStore);