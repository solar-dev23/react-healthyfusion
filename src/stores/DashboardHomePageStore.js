import alt from 'alt.js';
// import _ from 'lodash';

import DashboardHomePageActions from 'actions/DashboardHomePageActions.js';

class DashboardHomePageStore {
    constructor() {
        this.bindActions(DashboardHomePageActions);
        this.chartData = [];
        this.productData = [];
        this.basketData = [];
        this.Agreementdata=[];
        this.PatientLicenseAgreementdata=[];
    }

    getPatientsBasketSuccess(data) {
        this.basketData = data.Basket;
        this.orderHistoryData = data.OrderHistory;
        this.providerId = data.ProviderId;
    }
    getDashboardProductSuccess(data) {
        this.productData = data;
    }
    getDashboardDataSuccess(data) {
        this.chartData = data;
    }
    onGetProviderLicenseSuccess(data)
    {
    	this.Agreementdata=data;
    }
    onGetPatientLicenseSuccess(data)
    {
        this.PatientLicenseAgreementdata=data;
    }
    onUpdateProviderLicenseSuccess(){
        this.showModelComponent=false;
    }
    onUpdatePatientLicenseSuccess(){
        this.showModelComponent=false;
    }
    onGetEulaLicenseSuccess(data){
        this.Agreementdata=data;
    }
    onUpdateEulaLicenseValid(){
        this.Agreementdata=[];
    }
}

export default alt.createStore(DashboardHomePageStore);