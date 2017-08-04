import React from 'react';

import './ProductRowComponent.scss'

export default class ProductRowComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 0,
            total: 0
        }
    }

    handleQuantityChange(e) {
        const quantity = e.target.value ? parseInt(e.target.value, 10): 0;
        const total = quantity * this.props.product.Price;

        this.setState({
            quantity: quantity,
            total: total
        });

        this.changeCartTotal(quantity, total);
    }

    changeCartTotal(quantity, total) {
        const product = this.props.product;
        product.Quantity = quantity;
        product.Total = total;
        this.props.onTotalChanged(product);
    }

    render() {
        return (
            <tr className="product-row-component">
                <td className="product-row-component__cell product-row-component__cell--quantity">
                    <input type="number" className="product-row-component__quantity-input" pattern="\d*" min="0" value={this.state.quantity} onChange={this.handleQuantityChange.bind(this)}/>
                </td>
                <td className="product-row-component__cell product-row-component__cell--name">
                    {this.props.product.Name}
                </td>
                <td className="product-row-component__cell product-row-component__cell--price">
                    ${this.props.product.Price.toFixed(2)}
                </td>
                <td className="product-row-component__cell product-row-component__cell--total">
                    ${this.state.total.toFixed(2)}
                </td>
            </tr>
        );
    }
}
