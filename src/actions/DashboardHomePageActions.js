import alt from 'alt.js'

import ProductsService from 'services/ProductsService.js';
import AccountService from 'services/AccountService.js';
class DashboardHomePageActions {
    constructor() {
        this.generateActions(
            'getPatientsBasketSuccess',
            'getDashboardDataSuccess',
            'getDashboardProductSuccess',
            'GetProviderLicenseSuccess',
            'UpdateProviderLicenseSuccess',
            'GetPatientLicenseSuccess',
            'GetEulaLicenseSuccess',
            'UpdateEulaLicenseValid'
        );
    }

    getDashboardData() {
        ProductsService.getDashboardData()
            .then(data => this.actions.getDashboardDataSuccess(data));
    }

    getDashboardDataForProduct() {
       ProductsService.getDashboardDataForProduct()
            .then(data => this.actions.getDashboardProductSuccess(data));
    }

    getPatientsBasket() {
        ProductsService.getPatientsBasket()
            .then(data => this.actions.getPatientsBasketSuccess(data));
    }
    getProviderLicense(ProviderId)
    {
        AccountService.getProviderLicense(ProviderId)
            .then(data=> this.actions.GetProviderLicenseSuccess(data));
    }
    getEulaLicense(){
        AccountService.getEulaLicense()
        .then(data=>this.actions.GetEulaLicenseSuccess(data));
    }
    getPatientLicense(PatientId)
    {
        AccountService.getPatientLicense(PatientId)
            .then(data=> this.actions.GetPatientLicenseSuccess(data));
    }
    UpdateProviderLicense(ProviderId){        
         AccountService.UpdateProviderLicense(ProviderId)
            .then(data=> this.actions.UpdateProviderLicenseSuccess(data));
    }
     UpdatePatientLicense(PatientId){        
         AccountService.UpdatePatientLicense(PatientId)
            .then(data=> this.actions.UpdatePatientLicenseSuccess(data));
    }
    UpdateEulaLicense(data){
        AccountService.UpdateEulaLicense(data).then(()=>this.actions.UpdateEulaLicenseValid());

    }
}

export default alt.createActions(DashboardHomePageActions);