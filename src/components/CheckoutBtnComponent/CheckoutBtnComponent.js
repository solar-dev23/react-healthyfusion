import React from 'react';
import _ from 'lodash';

import Routes from 'routes.js';
import { Link } from 'react-router';
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import './CheckoutBtnComponent.scss'

export default class CheckoutBtnComponent extends React.Component {

    handleRemoveClick(product) {
        DashboardCheckoutPageActions.onTotalChanged(-product.Total);
        DashboardCheckoutPageActions.removeProductFromCheckout(product.ProductID);
         DashboardProductsPageActions.removeProduct(product);
    }

    render() {
        const { checkoutData, totalCountPrice, isPatient } = this.props;
        const totalCount = _.reduce(_.map(checkoutData, 'Quantity'), (sum, n) => { return sum + n }, 0)
        const productCount=checkoutData.length;
        return (
            <li className="checkout-btn-component dropdown">
                <a className="checkout-btn-component__btn dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-shopping-cart"/>
                    <div className="checkout-btn-component__counter">{productCount}</div>
                    <span className="checkout-btn-component__title">${totalCountPrice.toFixed(2)}</span>
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <Link to={!isPatient ? Routes.providerProductsBasket : Routes.dashboardCheckoutPage} className="checkout-btn-component__view-cart-btn">
                            <i className="fa fa-shopping-cart"/>
                            Add to Basket
                        </Link>
                    </li>

                    <li>
                        <Link to={Routes.dashboardCheckoutPage} className="checkout-btn-component__checkout-btn">
                            <i className="fa fa-chevron-right"/>
                            Checkout
                        </Link>
                    </li>

                    {checkoutData && checkoutData.map(product => <li key={product.ProductID} className="checkout-btn-component__product-item">
                        <div className="checkout-btn-component__product-image-wrapper">
                            <img style={{height: 70}} src={product.ImagePath}/>
                        </div>

                        <div className="checkout-btn-component__product-info">
                            <p className="checkout-btn-component__product-name">
                                {product.Name}
                                (<span className="checkout-btn-component__product-quantity">{product.Quantity}</span>)
                            </p>

                            <p className="checkout-btn-component__product-price">${product.Total.toFixed(2)}</p>
                        </div>

                        <i
                            className="fa fa-trash"
                            aria-hidden="true"
                            onClick={this.handleRemoveClick.bind(this, product)}
                            style={{cursor: 'pointer'}}
                        />
                    </li>)}
                </ul>
            </li>
        );
    }
}
