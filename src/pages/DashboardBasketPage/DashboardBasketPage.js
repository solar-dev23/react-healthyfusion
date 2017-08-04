import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';

import { Link } from 'react-router';

import DashboardBasketPageStore from 'stores/DashboardBasketPageStore.js';
import DashboardBasketPageActions from 'actions/DashboardBasketPageActions.js';
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';

import './DashboardBasketPage.scss';

@connectToStores
export default class DashboardSearchPage extends Component {
    componentDidMount() {
        DashboardBasketPageActions.getPatientsBasket();
    }

    static getStores() {
        return [DashboardBasketPageStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardBasketPageStore.getState()
        }
    }

    handleAddToCartClick(product) {
        DashboardCheckoutPageActions.addToCheckout(product);
    }

    render() {
        const { providerId, basketData } = this.props;

        return (
            <div className="dashboard-basket-page">
                {providerId && providerId.map(provider => {
                    return (
                        <div key={provider.ProviderID} className="dashboard-basket-page__recommended-products-block">
                            <h3 className ='dashboard-basket-page__title'>
                                Recommended Products By Dr {provider.ProviderName}
                            </h3>

                            {providerId && providerId.length == 0 && <span className="btn-BAsket-label">No Recommended Products</span>}

                            <ul className ='dashboard-basket-page__recommended-products-list'>
                                {basketData && basketData.map(product => {
                                    return (
                                        <li className ='dashboard-basket-page__recommended-products-item'>
                                            <div className="product-card" key={product.ProductID}>
                                                <div className="product-card__wrapper hovereffect">
                                                    <Link
                                                        to={{pathname: 'dashboard/dashboardProductDetails/' ,
                                                            query: { productId: product.ProductID }}}
                                                    >
                                                        <img
                                                            className="img-responsive img-transform"
                                                            style={{height: 220, margin: '0 auto'}}
                                                            src={product.ImagePath}/>
                                                    </Link>

                                                    <p className="product-card__product-name paragraph">{product.Name}</p>

                                                    <p className="product-card__product-price paragraph">
                                                        <span className="products-list__product-price">${product.Price.toFixed(2)}</span>
                                                    </p>

                                                    <button
                                                        type="button"
                                                        onClick={this.handleAddToCartClick.bind(this, product)}
                                                        className="product-card__add-to-cart-btn btn btn-style"
                                                    >
                                                        <div>
                                                            <div >
                                                                <i className="fa fa-shopping-cart" aria-hidden="true"/>

                                                                Add to Cart
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        );
    }
}