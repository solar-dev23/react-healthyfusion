import React from 'react';
import { Link } from 'react-router';

import Routes from 'routes.js';

import './ProviderProductBasketCountComponent.scss'

export default class ProviderProductBasketCountComponent extends React.Component {
    render() {
        return (
            <span className='tools pull-right'>
                <div className={this.props.isPatient ? 'viewnone' : 'viewdiv'}>
                    <Link
                        to={this.props.productsBasketCount > 0
                            ? Routes.providerProductsBasket
                            : Routes.dashboardProductsPage}
                        className="success glyphicon glyphicon-shopping-cart btn btn-Warning btn-style-Header user-block__basket-btn"
                        title="Go to basket"
                    >
                        <span className="user-block__basket-btn-counter">{this.props.productsBasketCount}</span>
                        <label className='btn-BAsket-label'>Basket</label>
                    </Link>
                </div>
            </span>
        );
    }
}
