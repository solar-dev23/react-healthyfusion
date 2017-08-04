import React from 'react';

import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import './CheckoutProductItemComponent.scss'

export default class CheckoutProductItemComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: props.product.Quantity,
            total: props.product.Total,
            previousTotal: props.product.Total,
        };
    }

    handleQuantityChange(e) {
        const quantity = e.target.value ? parseInt(e.target.value, 10) : 0;
        const total = quantity * this.props.product.Price;
        const totalDif = total - this.state.previousTotal;
        const {product} = this.props;
        const productToOrder = {};

        this.setState({
            quantity: quantity,
            total: total
        });

        productToOrder['PatientToPdtID'] = product.PatientToPdtID;
        productToOrder['ProductId'] = product.ProductID;
        productToOrder['Quantity'] = quantity;
        productToOrder['Total'] = total;

        DashboardCheckoutPageActions.onTotalChanged(totalDif);

        DashboardCheckoutPageActions.addToPlaceOrder(productToOrder);

        this.setState({previousTotal: total});
    }

    handleRemoveClick(product) {
        DashboardCheckoutPageActions.onTotalChanged(-this.state.total);
        DashboardProductsPageActions.removeProduct(product);
        DashboardCheckoutPageActions.removeProductFromCheckout(product.ProductID);
         
    }

    render() {
        const {product} = this.props;

        console.log(product.Name);
        return (
            <tr className="checkout-products-table__row">
                <td className="checkout-products-table__cell checkout-products-table__cell--product" style={{alignItems: 'center'}}>
                    <img src={product.ImagePath} className="checkout-products-table__product-img"/>
                    {product.Name}
                </td>

                <td className="checkout-products-table__cell checkout-products-table__cell--price">
                    ${product.Price.toFixed(2)}
                </td>

                <td className="checkout-products-table__cell checkout-products-table__cell--quantity">
                    <input
                        type="number"
                        className="checkout-products-table__quantity-input"
                        pattern="\d*"
                        min="0"
                        value={this.state.quantity}
                        onChange={this.handleQuantityChange.bind(this)}
                    />
                </td>

                <td className="checkout-products-table__cell checkout-products-table__cell--total">
                    ${this.state.total.toFixed(2)}

                    <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        onClick={this.handleRemoveClick.bind(this, product)}
                        style={{cursor: 'pointer'}}
                    />
                </td>
            </tr>
        );
    }
}
