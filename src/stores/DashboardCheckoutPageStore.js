import alt from 'alt.js';

import _ from 'lodash';
import Routes from 'routes.js';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';

class DashboardCheckoutPageStore {
    constructor() {
        this.bindActions(DashboardCheckoutPageActions);

        this.checkoutData = [];
        this.sentPlaceOrder = false;        
        this.orderId=0;
       
        this.orderpayment=false;
        this.showPatientProductPopup = false;
        this.addedtocart = false;
        this.productAlreadyExisting = false;
        this.totalCountPrice = 0;
    }

 onAddToProviderCheckout(productData) {
       
        if (_.isArray(productData)) {
            productData.map(product => {
                let existProduct = null;
                let updatedProduct = {};

                updatedProduct = product;

                existProduct =_.find(this.checkoutData, ['ProductID', product.ProductID])

                if (!_.isNull(existProduct) && existProduct !== undefined) {
                    _.pull(this.checkoutData, _.find(this.checkoutData, ['ProductID', product.ProductID]));
                    updatedProduct = existProduct;

                    updatedProduct['Quantity'] += product['Quantity'];
                    updatedProduct['Total'] += product['Total'];
                }

                this.checkoutData.push(updatedProduct);
            })
        } else {
            productData['Quantity'] = 1;
            productData['Total'] = productData.Price;
    
            this.checkoutData.push(productData);
            this.checkoutData = _.uniqBy(this.checkoutData, 'ProductID');
        }
        
        this.totalCountPrice = _.reduce(_.map(this.checkoutData, 'Total'), (sum, n) => { return sum + n }, 0)
        
       // this.addedtocart = true;
    }
    onAddToCheckout(productData) {
        this.addedtocart = false;
        if (_.isArray(productData)) {
            productData.map(product => {
                let existProduct = null;
                let updatedProduct = {};

                updatedProduct = product;

                existProduct =_.find(this.checkoutData, ['ProductID', product.ProductID])

                if (!_.isNull(existProduct) && existProduct !== undefined) {
                    _.pull(this.checkoutData, _.find(this.checkoutData, ['ProductID', product.ProductID]));
                    updatedProduct = existProduct;

                    updatedProduct['Quantity'] += product['Quantity'];
                    updatedProduct['Total'] += product['Total'];
                }

                this.checkoutData.push(updatedProduct);
            })
        } else {
            productData['Quantity'] = 1;
            productData['Total'] = productData.Price;
    
            this.checkoutData.push(productData);
            this.checkoutData = _.uniqBy(this.checkoutData, 'ProductID');
        }
        
        this.totalCountPrice = _.reduce(_.map(this.checkoutData, 'Total'), (sum, n) => { return sum + n }, 0)
        
        this.addedtocart = true;
    }

    onRemoveProductFromCheckout(productId) {
        const product = _.find(this.checkoutData, ['ProductID', productId]);

        this.checkoutData = _.pull(this.checkoutData, product);
    }

    onClearCheckout() {
        this.checkoutData = [];
        this.totalCountPrice = 0;
    }

    onSentPlaceOrder() {

       //  this.orderId=orderId;
        this.sentPlaceOrder = true;         
        this.checkoutData = [];
        this.totalCountPrice = 0;
    }


    onHidePaymentSuccessmodel(){
       
        this.orderpayment=false;
    }

    onAddToPlaceOrder(product) {
        const currentProduct = _.find(this.checkoutData, ['ProductID', product.ProductId])

        currentProduct['Quantity'] = product.Quantity;
        currentProduct['Total'] = product.Total;

        if (product.Quantity < 1) {
            currentProduct['Total'] = 0
        }
    }

    onHidePlaceOrderModal() {
        this.sentPlaceOrder = false;
         this.orderpayment=false;
    }

    onClearCheckout() {
        this.checkoutData = [];
        this.totalCountPrice = 0;
    }
    onSentPlaceOrderFailed(data)
    {

    }
    onSentPlaceOrderSuccess(data)
    { 
       
         this.sentPlaceOrder = true;
       
         this.orderId=data;
         appHistory.push(Routes.dashboardPatientPayment);
    }
     

    onGetPaymentsSuccess(data)
    {       
        this.checkoutData = [];
        this.sentPlaceOrder = false;       
        this.orderpayment=true;
        this.totalCountPrice = 0;
    }
    onShowPatientProductPopup()
    {
        this.productAlreadyExisting = false;
        this.showPatientProductPopup = true;        
    }
    onClosePatientProductPopup()
    {
        this.showPatientProductPopup=false;
        this.addedtocart = false;
    }
    onClosePatientProductPopWithRedirect()
    {
         if(this.checkoutData.length>0)
         {
            this.showPatientProductPopup=false;
            this.addedtocart = false;
            appHistory.push(Routes.dashboardCheckoutPage);
         }
            
    }
    onProductAlreadyExisting()
    {
        this.productAlreadyExisting = true;
    }
    onHideproductAlreadyExistingpop()
    {
        this.productAlreadyExisting = false;
    }
    onGotoCartpage()
    {
        if(this.checkoutData.length>0)
         {
            this.productAlreadyExisting = false;
            appHistory.push(Routes.dashboardCheckoutPage);
         }
    }
    
    onTotalChanged(totalDif) {
        this.totalCountPrice += totalDif
    }
}

export default alt.createStore(DashboardCheckoutPageStore)