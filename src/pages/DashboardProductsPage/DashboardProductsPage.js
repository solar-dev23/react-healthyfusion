import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {Link} from 'react-router';

import _ from 'lodash';
import Routes from 'routes.js';
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import DashboardProductsPageStore from 'stores/DashboardProductsPageStore';
import PaginationComponent from 'components/PaginationComponent/PaginationComponent.js';
import PatientProductFormComponent from 'components/PatientProductFormComponent/PatientProductFormComponent.js'
import ScrollToTopBtnComponent from 'components/ScrollToTopBtnComponent/ScrollToTopBtnComponent.js'
import DashboardSortingComponent from 'components/DashboardSortingComponent/DashboardSortingComponent.js'
import './DashboardProductsPage.scss';
import DashboardCheckoutPageStore from 'stores/DashboardCheckoutPageStore.js';
import AuthStore from 'stores/AuthStore'
import AuthActions from 'actions/AuthActions.js';

@connectToStores
export default class DashboardProductsPage extends Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            selectedProduct: [],
            pageNumber:0,
            key:0,
            searchitem:"",
            searchValue: '',
            Character:'',
            fromSearch:0
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.addedPatientID && newProps.addedPatientID !== this.props.addedPatientID) {
            setTimeout(() => {
                this.addToCart(newProps.addedPatientID.id);
            }, 500);
        }
    }

    addToCart(patientId) {
        const {productsBasket} = this.props,
            productsIdArray = [];

        productsBasket.map(product => productsIdArray.push({ProductId: product.ProductID}));

        const requestData = {
            PatientId: patientId,
            ProductID: productsIdArray
        };

        DashboardProductsPageActions.addToCart(requestData);
    }

    componentDidMount() {
        DashboardProductsPageActions.getAllCategories();
        this.props.isProvider && DashboardProductsPageActions.getProductsByPage();
        this.props.isPatient && DashboardProductsPageActions.getProductsByPage();

    }

    static getStores() {
        return [DashboardProductsPageStore, DashboardCheckoutPageStore,, AuthStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardProductsPageStore.getState(),
            ...DashboardCheckoutPageStore.getState(),
              ...AuthStore.getState()
        }
    }
    changeSelectValue(key)
    {
        var Character = this.state.Character;
        this.setState({key:key,
            searchitem:"",searchValue:""})
        var value={
            key:key,
            searchitem:"",
            pageNumber:0,
            Character:Character
        }
        DashboardProductsPageActions.getProductsbyCategory(value)

    }
    handlechangeAtoZ(value)
    {
        var pageNumber=this.state.pageNumber;
        var key = this.state.key;
        this.setState({searchitem:"",
            Character:value,searchValue:""
        })

        var value={
            pageNumber:0,
            searchitem:"",
            key:key,
            Character:value
        }

        DashboardProductsPageActions.getProductsByAlphebets(value);
    }
    onPaginate(pageNumber)
    {
        var key=this.state.key;
        var item=this.state.searchValue;
         var Character = this.state.Character; 

        this.setState({pageNumber:pageNumber,fromSearch:0});
        var value={
            key:key,
            pageNumber:pageNumber,
            searchitem:item,
            Character:Character
        }


        DashboardProductsPageActions.getProductsByPage(value);
    }
    handleAddToCartClick(product) {
        this.setState({selectedProduct: []});
        if (this.props.isProvider)
        {
            DashboardProductsPageActions.addProductToBasket(product)
            DashboardCheckoutPageActions.addToProviderCheckout(product);
            var selectedvalue = []
            selectedvalue.push(product);
            if (_.isArray(selectedvalue)) {

                selectedvalue.map(Product => {
                    let existProduct = null;
                    existProduct = _.find(this.props.checkoutData, ['ProductID', Product.ProductID])
                    if (!_.isNull(existProduct) && existProduct !== undefined) {
                        this.setState({selectedProduct: product});
                        //  DashboardCheckoutPageActions.productAlreadyExisting()
                    }

                })
            }

        }
        else {
            var selectedvalue = []
            selectedvalue.push(product);
            if (_.isArray(selectedvalue)) {
                selectedvalue.map(Product => {
                    let existProduct = null;
                    existProduct = _.find(this.props.checkoutData, ['ProductID', Product.ProductID])
                    if (!_.isNull(existProduct) && existProduct !== undefined) {
                        this.setState({selectedProduct: product});
                        DashboardCheckoutPageActions.productAlreadyExisting()
                    }
                    else {
                        this.setState({selectedProduct: product});
                        DashboardCheckoutPageActions.showPatientProductPopup();
                    }
                })
            }
            else {
                this.setState({selectedProduct: product});
                DashboardCheckoutPageActions.showPatientProductPopup();
            }
        }
    }

    searchProducts() {
         this.setState({fromSearch:1});
        var value = {
            pageNumber: 0,
            searchitem: this.state.searchValue,
            key:this.state.key,
            Character: this.state.Character
        };

        DashboardProductsPageActions.getProductsByPage(value);
         
    }

    showModal() {
        this.setState({modal: true});
    }

    hideModal() {
        this.setState({modal: false});

        DashboardProductsPageActions.hideAddedToCartModal();
    }
    viewall()
    {

        DashboardProductsPageActions.getAllProducts()
    }
    onPaginate(pageNumber) {
        DashboardProductsPageActions.onPaginate(pageNumber);

         var key=this.state.key;
        var item=this.state.searchValue;
        var Character = this.state.Character;

        this.setState({pageNumber:pageNumber,fromSearch:0});
        var value={
            key:key,
            pageNumber:pageNumber,
            searchitem:item,
            Character:Character

        }

        DashboardProductsPageActions.getProductsByPage(value);
    }
    render() {
        const { currentRoute, products, contextRouter, isProvider, totalProductPages, addedPatient, pageNumber } = this.props;
        const modalStyle = {
            width: '565px',
            maxWidth: '100%',
        };
        const modalStyleAlert = {
            width: '465px',
            maxWidth: '100%'
        };


        return (
            <div className="dashboard-products-page clearfix">
                {!contextRouter.isActive(Routes.providerProductsBasket) && <div className="dashboard-products-page__top-row">
                    
                    <DashboardSortingComponent
                        options={this.props.CategoryOptions}
                        changeSelectValue={this.changeSelectValue.bind(this)}
                        handlechangeAtoZ={this.handlechangeAtoZ.bind(this)}
                    />
                    <div className="search-direct-product">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search products"
                            value={this.state.searchValue}
                            onChange={(e) => this.setState({searchValue: e.target.value})}
                        />
                        <div>
                            <button
                                className="Button  btn btn-info m-l-xs"
                                onClick={this.searchProducts.bind(this)}
                            >
                                <i className="fa fa-search" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                    <span className="dashboard-products-page__products-counter">
                        {products && products.length} items of {totalProductPages}
                    </span>
                    {totalProductPages > 10 && currentRoute.path === Routes.dashboardProductsPage &&
                            <PaginationComponent
                                paginationParams="showpatients"
                                totalCountPage={parseInt(totalProductPages / 10)}
                                contextRouter={contextRouter}
                                onPaginate={this.onPaginate.bind(this)}
                                viewall={this.viewall.bind(this)}
                                pageNumber={pageNumber}
                            />
                    }
                </div>}

                <div className="dashboard-products-page__products-list">
                    {!currentRoute.component.basket && products && products.map(product => {
                        return (
                            <div className="product-card under" key={product.ProductID}>
                                <div className="product-card__wrapper hovereffect">
                                    <Link to={{pathname: 'dashboard/dashboardProductDetails/' , query: { productId: product.ProductID }}}>
                                        <img className="img-responsive img-transform" style={{height: 250, margin: '0 auto'}} src={product.ImagePath}/>
                                    </Link>

                                    <p className="product-card__product-name paragraph">{product.Name}</p>
                                     <button type="button" onClick={this.handleAddToCartClick.bind(this, product)}
                                            className="product-card__add-to-cart-btn btn btn-style success">
                                        <div>
                                            <div style={{float: 'left'}}>

                                            </div>
                                            <div className='cartButton'>
                                                <i className="fa fa-shopping-cart" aria-hidden="true"/>

                                                {isProvider ? "Add to Cart" : "Add to Cart"}
                                            </div>
                                        </div>
                                    </button>
                                    <p className="product-card__product-price paragraph"><span
                                        className="products-list__product__price">${product.Price.toFixed(2)}</span></p>
                                    <p dangerouslySetInnerHTML={{__html:product.ShortDescription}} style={{overflow:'auto'}}/>
                                   
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="clearfix"/>

                {totalProductPages > 10 && currentRoute.path === Routes.dashboardProductsPage &&
                <PaginationComponent
                    paginationParams="showpatients"
                    totalCountPage={parseInt(totalProductPages / 10)}
                    contextRouter={contextRouter}
                     onPaginate={this.onPaginate.bind(this)}
             pageNumber={pageNumber}
                />}

                {this.props.children && React.cloneElement(this.props.children, {
                    productsBasket: this.props.productsBasket,
                    newPatientFormShow: this.props.newPatientFormShow,
                    searchedPatientsList: this.props.searchedPatientsList,
                    addedPatient: addedPatient,
                    checkoutFormshow:this.props.checkoutFormshow,
                    addedToCart: this.props.addedToCart,
                    showAddedToCartModal: this.showModal.bind(this),
                    addToCart: this.addToCart.bind(this),
                    contextRouter: contextRouter,
                    providerUserNameIsAvailable:this.props.providerUserNameIsAvailable
                })}

                <ModalComponent
                    showModal={this.state.modal}
                    onHide={this.hideModal.bind(this)}

                    onShow={this.showModal.bind(this)}>
                    {this.props.addedPatient ? <div> The new patient 
                        {' '+`${addedPatient.firstName} ${addedPatient.lastName}`+' '}
                          was created and products were added.

                    </div> : <div>Products Added to Patient Basket</div>}
                </ModalComponent>

                <ModalComponent
                    showModal={this.props.showPatientProductPopup}
                    onHide={DashboardCheckoutPageActions.closePatientProductPopup}
                    onShow={DashboardCheckoutPageActions.showPatientProductPopup}
                    modalStyle={modalStyle}
                    type="transparent"
                    header="Add to your cart"
                    hideOk={true}>
                    <PatientProductFormComponent selectedProduct={this.state.selectedProduct}
                                                 cartItems={this.props.checkoutData}
                                                 addedtocart={this.props.addedtocart}/>
                </ModalComponent>

                <ModalComponent
                    showModal={this.props.productAlreadyExisting}
                    onHide={DashboardCheckoutPageActions.hideproductAlreadyExistingpop}
                    onShow={DashboardCheckoutPageActions.productAlreadyExisting}
                    hideOk={true}
                    modalStyle={modalStyleAlert}
                    type="transparent">
                    <div style={{padding: '1rem'}} className="clearfix">
                        <p>Item has been already added to your cart.What would you like to do next?</p>
                        <div>
                            <div style={{float: "left", 'padding-left': 20}}>
                                <button
                                    className="btn btn-style success "
                                    onClick={DashboardCheckoutPageActions.showPatientProductPopup}>
                                    Continue Shopping
                                </button>
                            </div>
                            <div style={{float: "left", 'padding-left': 20}}>
                                <button style={{width: 100}}
                                        className="btn btn-style success"
                                        onClick={DashboardCheckoutPageActions.gotoCartpage}>
                                    Go To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalComponent>

                <ScrollToTopBtnComponent contextRouter={this.props.contextRouter} />
            </div>
        );
    }
}