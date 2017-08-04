import alt from 'alt.js'

import AccountService from 'services/AccountService.js';

class DashboardAccountPageActions {
    constructor() {
        this.generateActions(
            'getProviderDetailsSuccess',
            'showEditAccountForm',
            'hideEditAccountForm',
            'getAllStatesSuccess',
            'getPatientInfoSuccess',
            'hideDocumentAddform',
            'showDocumentAddform',
            'onSelectAddressType',
            'getProviderSettingsSuccess',
            'selectOrder',
            'getSelectOrderSuccess'

        );
    }


    getProviderDetails() {
        AccountService.getProviderDetails()
            .then(data => this.actions.getProviderDetailsSuccess(data))
            .catch(data => console.log(data));
    }

    getAllStates() {
        AccountService.getAllStates()
            .then(data => this.actions.getAllStatesSuccess(data))
            .catch(data => console.log(data));
    }

    updateProvidersProfInfo(data) {
        AccountService.updateProvidersProfInfo(data);
    }

    updateProfInfo(data) {
        AccountService.updateProfInfo(data);
    }

    getPatientInfo() {
        AccountService.getPatientInfo()
            .then(data => this.actions.getPatientInfoSuccess(data))
            .catch(data => console.log(data));
    }

    updatePatientInfo(data) {
        AccountService.updatePatientInfo(data);
    }

    UploadDocument(data)
    {
          AccountService.UploadDocument(data)
           
    }
    getProviderSettings()
    {
        AccountService.getProviderSettings()
            .then(data => this.actions.getProviderSettingsSuccess(data))
            .catch(data => console.log(data));
    }
     selectOrderDetails(OrderId){
         AccountService.selectOrder(OrderId)
            .then(data => this.actions.getSelectOrderSuccess(data))
            .catch(data => console.log(data))
    }

}

export default alt.createActions(DashboardAccountPageActions);