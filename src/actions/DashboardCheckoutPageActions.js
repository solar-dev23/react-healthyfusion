import alt from 'alt.js'

import ProductsService from 'services/ProductsService.js';

class DashboardCheckoutPageActions {
    constructor() {
        this.generateActions(
            'addToCheckout',
            'addToProviderCheckout',
            'removeProductFromCheckout',
            'clearCheckout',
            'sentPlaceOrder',
            'addToPlaceOrder',
            'addInitialPlaceOrder',
            'hidePlaceOrderModal',
            'addPaymentmodel',
            'hidePaymentmodel',
            'sentPlaceOrderFailed',
            'sentPlaceOrderSuccess',
           
            'getPaymentsSuccess',
            'hidePaymentSuccessmodel',
            'orderpaymentmodel',
            'clearCheckout',
            'showPatientProductPopup',
            'closePatientProductPopup',
            'closePatientProductPopWithRedirect',
            'productAlreadyExisting',
            'hideproductAlreadyExistingpop',
            'gotoCartpage',
            'onTotalChanged'
        );
    }

    sendPlaceOrder(requestData) {
        ProductsService.sendPlaceOrder(requestData)
            .then(data => this.actions.sentPlaceOrderSuccess(data))
             .catch(data => this.actions.sentPlaceOrderFailed(data))
    }

   

    OrderPayment(payData)
    {
        ProductsService.OrderPayment(payData)
            .then(data => this.actions.getPaymentsSuccess(data))
            .catch(data => console.log(data));
    }
    
}

export default alt.createActions(DashboardCheckoutPageActions);