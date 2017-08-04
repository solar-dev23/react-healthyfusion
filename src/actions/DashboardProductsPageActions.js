import alt from 'alt.js'

import AuthActions from 'actions/AuthActions.js';
import ProductsService from 'services/ProductsService.js';

class DashboardProductsPageActions {
    constructor() {
        this.generateActions(
            'getAllProductsSuccess',
            'getAllProductsFailed',
            'addProductToBasket',
            'removeProduct',
            'showNewPatientForm',
            'showCheckoutForm',
            'hideCheckoutForm',
            'searchPatientSuccess',
            'searchPatientFailed',
            'addNewPatientSuccess',
            'addToCartSuccess',
            'getProductsByPageSuccess',
            'hideAddedToCartModal',
            'clearBasket',
            'getAllCategoriesSuccess',
            'getAllCategoriespageSuccess',          
            'getSingleProductDetailsSuccess',
            'onPaginate',
            'getProductVariantdetailsSuccess',
            'getProductsByAlphebetsSuccess'

        );
    }

    getAllProducts() {
        ProductsService.getAllProducts()
            .then(data => this.actions.getAllProductsSuccess(data))
            .catch(data => console.log(data));
    }

    getProductsByPage(pageNumber) {
        ProductsService.getProductsByPage(pageNumber)
            .then(data => this.actions.getProductsByPageSuccess(data))
            .catch(data => console.log(data));
    }

    searchPatient(searchParams) {
        ProductsService.searchPatient(searchParams)
            .then(data => this.actions.searchPatientSuccess(data));
            // .catch(data => this.actions.searchPatientFailed(data.responseJson));
    }

    addNewPatient(patient) {
        ProductsService.addNewPatient(patient)
            .then(responseId => this.actions.addNewPatientSuccess({ responseId, patient }))
            // .catch(data => console.log(data.responseJson));
    }

    addToCart(requestData) {
        ProductsService.addToCart(requestData)
            .then(() => this.actions.addToCartSuccess())
            .catch((data) => console.log(data));
    }

    getAllCategories(){
        ProductsService.getAllCategories()
            .then(data => this.actions.getAllCategoriesSuccess(data))
            .catch(data => console.log(data));
    }
    getProductsbyCategory(key)
    {
          ProductsService.getAllCategoriespage(key)
            .then(data => this.actions.getAllCategoriespageSuccess(data))
            .catch(data => console.log(data));
    }

    getSingleProductDetails(productid){
        ProductsService.getSingleProductDetails(productid)
            .then(data => this.actions.getSingleProductDetailsSuccess(data))
            .catch(data => console.log(data));


    }
    getProductVariantdetails(productid){
        ProductsService.getProductVariantdetails(productid)
            .then(data => this.actions.getProductVariantdetailsSuccess(data))
            .catch(data => console.log(data));


    }
    getProductsByAlphebets(key)
    {
        ProductsService.getProductsByAlphebets(key)
            .then(data => this.actions.getProductsByAlphebetsSuccess(data))
            .catch(data => console.log(data));
    }
    
}

export default alt.createActions(DashboardProductsPageActions);