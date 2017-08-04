import alt from 'alt.js';
// import _ from 'lodash';
import Routes from 'routes.js';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions.js';

class DashboardAccountPageStore {
    constructor() {
        this.bindActions(DashboardAccountPageActions);

        this.providerDetails = [];
        this.showEditAccountForm = false;
        this.showDocumentAddform=false;
        this.allStatesData = [];
        this.profTitleOptions = [];
        this.providerInfoOptions = [];
        this.OrderDetails=[];
        this.patientInfo = {};
        this.selectedOrderId =0;
        this.addressTypeOptions = [{ key: '1', value: 'Main Address' },{ key: '2', value: 'Billing Address' },{ key: '3', value: 'Shipping Address' }];
        this.addressType = 'Address1';
        this.paymentMethodOptions = [{key: '1', value: 'VISA'}, {key: '2', value: 'PayPal'}];
    }

    onGetProviderDetailsSuccess(data) {
        this.providerDetails = data;
    }

    onShowEditAccountForm() {
        this.showEditAccountForm = true;
    }

    onShowDocumentAddform() {
        this.showDocumentAddform = true;
    }

    onHideDocumentAddform() {
        this.showDocumentAddform = false;
    }

    onHideEditAccountForm() {
        this.showEditAccountForm = false;
    }

    onGetAllStatesSuccess(data) {        
        this.allStatesData = data.States;
    }

    onGetPatientInfoSuccess(data) {
        this.patientInfo = data[0];
    }

    onSelectAddressType(type) {
        this.addressType = type;
    }
    onGetProviderSettingsSuccess(data)
    {
        this.providerInfoOptions = data.ProviderTitle ;
        this.profTitleOptions = data.ProfessionalTitle;
    }
     onSelectOrder(Order) {
        this.selectedOrderId = Order.OrderId;
       
    }
     onGetSelectOrderSuccess(data) {
        this.OrderDetails = data;
        appHistory.push(Routes.orderViewPage);
       
    }
}

export default alt.createStore(DashboardAccountPageStore);