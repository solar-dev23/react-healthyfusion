import alt from 'alt.js';
import _ from 'lodash';

import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';

class DashboardProductsPageStore {
    constructor() {
        this.bindActions(DashboardProductsPageActions);

        this.products = null;
        this.productsBasket = [];
        this.newPatientFormShow = false;
        this.checkoutFormshow = false;
        this.searchedPatientsList = null;
        this.addedPatient = null;
        this.addedPatientID = null;
        this.addedToCart = false;
        this.totalProductPages = null;
        this.CategoryOptions = [];
        this.pagenumber=0;
        this.getSingleProductDetails=[];
        this.pageNumber = 1;
        this.getProductVariantdetails=[];
        this.fromSearch=0;

    }

    onGetAllProductsSuccess(data) {
        this.products = data;
        this.checkoutFormshow = false;
    }

    onGetProductsByPageSuccess(data) {
        this.totalProductPages = data.Count[0].TotalProducts;
       // this.totalProductPages = data.Count;
        this.products = data.Products;
         this.checkoutFormshow = false;
         if(this.fromSearch==1)
         {
             this.pageNumber=1;
         }
    }

    onGetAllProductsFailed(data) {
        console.log(data);
    }

    onAddProductToBasket(product) {
        if (!_.includes(this.productsBasket, product)) {

            this.productsBasket.push(product);
            this.productsBasket = _.uniqBy(this.productsBasket, 'ProductID');
        }
    }

    onRemoveProduct(product) {
        this.productsBasket = _.pull(this.productsBasket, product);
    }

    onShowNewPatientForm() {
        this.newPatientFormShow = true;
        this.searchedPatientsList = false;
    }

     onShowCheckoutForm() {
        this.checkoutFormshow = true;
           

    }
    onHideCheckoutForm() {
        this.checkoutFormshow = false;
    }

    onSearchPatientSuccess(data) {
        this.newPatientFormShow = false;
        this.searchedPatientsList = data;
    }

    onAddNewPatientSuccess({ responseId, patient }) {
        this.addedPatientID = responseId;
        this.addedPatient = patient;
        this.newPatientFormShow = false;
    }

    onAddToCartSuccess() {
        this.addedToCart = true;
        this.searchedPatientsList = null;
        this.productsBasket = [];
    }

    onHideAddedToCartModal() {
        this.addedPatient = false;
        this.addedToCart = false;
    }

    onClearBasket() {
        this.productsBasket = [];
    }


    onGetAllCategoriesSuccess(data)
    {
        this.CategoryOptions=data.Category;
    }
    onGetAllCategoriespageSuccess(data)
    {
        this.products = data.Products;
        this.totalProductPages = data.Count[0].TotalProducts;
        this.pageNumber=1;
    }

    onGetSingleProductDetailsSuccess(data){
        this.getSingleProductDetails=data;

}
    
    onPaginate(pageNumber) {
        this.pageNumber = pageNumber;

    }
    onGetProductVariantdetailsSuccess(data){
        this.getProductVariantdetails=data;
    }
    onGetProductsByAlphebetsSuccess(data)
    {
        this.products = data.Products;
        this.totalProductPages = data.Count[0].TotalProducts;
    }
}

export default alt.createStore(DashboardProductsPageStore);