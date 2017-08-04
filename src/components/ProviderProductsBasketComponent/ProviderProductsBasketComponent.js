import React from 'react';
import { Link, useRouterHistory } from 'react-router';
import Routes from 'routes.js';

import { createHashHistory } from 'history';
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import ProviderProductsBasketPatientsComponent from 'components/ProviderProductsBasketPatientsComponent/ProviderProductsBasketPatientsComponent.js';
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import CheckoutBtnComponent from 'components/CheckoutBtnComponent/CheckoutBtnComponent.js';
import './ProviderProductsBasketComponent.scss'
import AuthStore from 'stores/AuthStore'
import AuthActions from 'actions/AuthActions.js';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
export default class ProviderProductsBasketComponent extends React.Component {

    removeProduct(product) {
         DashboardProductsPageActions.removeProduct(product);
         DashboardCheckoutPageActions.removeProductFromCheckout(product.ProductID);
         DashboardCheckoutPageActions.onTotalChanged(-product.Total);
    }
static getStores() {
        return [DashboardProductsPageStore, DashboardCheckoutPageStore,AuthStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardProductsPageStore.getState(),
            ...DashboardCheckoutPageStore.getState(),
             ...AuthStore.getState()
        }
    }
    render() {

        const { productsBasket, products,contextRouter } = this.props;


        return (
            <div className="provider-products-basket-component SectionBody panel-body overflow-hidden">
                <div className='product-block-order'>
                    <Link to={Routes.dashboardProductsPage} className="add-products-button">Add more products</Link>
                    <span className="dashboard-products-page__products-counter">Total items: {productsBasket && productsBasket.length}</span>
                    <div className="added-products">
                        <div className="undercon">
                            <div className="row">
                                <div className="sorted-list">
                                    {productsBasket && productsBasket.map(product => {
                                        return (
                                            <div
                                                className='underProduct'
                                                key={product.ProductID}
                                            >
                                                <div >
                                                    <div className="product-image">
                                                        <img src={product.ImagePath} style={{height: 160}} />
                                                    </div>
                                                    <div className='product-name'>
                                                        <p>{product.Name}</p>
                                                    </div>
                                                    <p className="product-price">{product.Price.toFixed(2)}</p>
                                                    <a className="delete-product">
                                                        <div>
                                                            <div
                                                                title="Remove Product"
                                                                onClick={this.removeProduct.bind(this, product)}
                                                            >Remove Product</div>
                                                        </div>
                                                    </a>
                                                </div >
                                            </div >
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProviderProductsBasketPatientsComponent
                    newPatientFormShow={this.props.newPatientFormShow}
                    searchedPatientsList={this.props.searchedPatientsList}
                    addedToCart={this.props.addedToCart}
                    addedPatient={this.props.addedPatient}
                    showAddedToCartModal={this.props.showAddedToCartModal}
                    addToCart={this.props.addToCart}
                    checkoutFormshow={this.props.checkoutFormshow}
                    checkoutData = {this.props.checkoutData}
                    providerUserNameIsAvailable={this.props.providerUserNameIsAvailable}
                />

                  <ModalComponent
                    showModal={this.props.checkoutFormshow}
                    
                >
                     {this.props.checkoutFormshow && appHistory.push(Routes.dashboardCheckoutPage) }

                </ModalComponent>
               
                
            </div>
        );
    }
}
