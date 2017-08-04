import React, { Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';

import Routes from 'routes.js';
import DashboardQuickOrderPageStore from 'stores/DashboardQuickOrderPageStore.js';
import DashboardProductsPageStore from 'stores/DashboardProductsPageStore.js';
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import ProductRowComponent from "components/ProductRowComponent/ProductRowComponent.js";
import ScrollToTopBtnComponent from 'components/ScrollToTopBtnComponent/ScrollToTopBtnComponent.js'
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';

import ModalComponent from "components/ModalComponent/ModalComponent.js";
import './DashboardQuickOrderPage.scss';

import _ from 'lodash';

@connectToStores
export default class DashboardAccountPage extends Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            totalCount: 0,
            selectedProducts: []
        };
    }

    static getStores() {
        return [DashboardQuickOrderPageStore, DashboardProductsPageStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardQuickOrderPageStore.getState(),
            ...DashboardProductsPageStore.getState()
        }
    }

    componentDidMount() {
        DashboardProductsPageActions.getAllProducts();
    }

    showModal() {
        this.setState({modal: true});
    }

    hideModal() {
        this.setState({modal: false});
    }

    handleTotalChanged(product) {
        let selectedProducts = this.state.selectedProducts;

        if (product.Quantity != 0) {
            if (!_.includes(selectedProducts, product)) {
                selectedProducts.push(product);
            }
        } else {
            selectedProducts = _.reject(selectedProducts, (product) => {return product.Quantity == 0});
        }

        this.setState({
            selectedProducts: selectedProducts,
        });

        this.calculateTotal();

    }

    calculateTotal() {
        let totalCount = 0;

        this.state.selectedProducts.forEach((product) => {
            totalCount += product.Total
        });

        this.setState({
            totalCount: totalCount
        })
    }

    handlerAddToCartClick() {
        const { selectedProducts} = this.state;

        if (!_.isEmpty(selectedProducts)) {
            DashboardCheckoutPageActions.addToCheckout(selectedProducts);
            this.props.appHistory.push(Routes.dashboardCheckoutPage);
        }
    }

    render() {
        return (
            <div className="dashboard-quick-order-page">
                <table className="dashboard-quick-order-page__table">
                    <caption className="dashboard-quick-order-page__caption">
                        <button className="dashboard-quick-order-page__add-to-cart-btn" title="Add to Cart" onClick={this.handlerAddToCartClick.bind(this)}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"/>
                            Add to Cart
                        </button>

                        <span className='dashboard-quick-order-page__total-price'>Total: <b>${this.state.totalCount.toFixed(2)}</b></span>
                    </caption>

                    <thead className="dashboard-quick-order-page__header">
                        <tr className="dashboard-quick-order-page__header-row">
                            <td className="dashboard-quick-order-page__header-cell dashboard-quick-order-page__header-cell--quantity">Quantity</td>
                            <td className="dashboard-quick-order-page__header-cell dashboard-quick-order-page__header-cell--product">Product</td>
                            <td className="dashboard-quick-order-page__header-cell dashboard-quick-order-page__header-cell--price">Price</td>
                            <td className="dashboard-quick-order-page__header-cell dashboard-quick-order-page__header-cell--total">Total</td>
                        </tr>
                    </thead>

                    <tbody className="dashboard-quick-order-page__body">
                        {this.props.products && this.props.products.map((product) => {
                            return (
                                <ProductRowComponent
                                    key={product.ProductID}
                                    product={product}
                                    onTotalChanged={this.handleTotalChanged.bind(this)}
                                />
                            )
                        })}
                    </tbody>
                </table>

                <ModalComponent
                    showModal={this.state.modal}
                    onHide={this.hideModal.bind(this)}
                    onShow={this.showModal.bind(this)}
                    type="error"
                >
                    The new patient
                </ModalComponent>

                <ScrollToTopBtnComponent contextRouter={this.props.contextRouter} />
            </div>
        );
    }
}