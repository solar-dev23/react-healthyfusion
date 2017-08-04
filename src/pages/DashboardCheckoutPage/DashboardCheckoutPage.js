import React, { Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router';
import _ from 'lodash';

import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import Routes from 'routes.js';
import DashboardCheckoutPageStore from 'stores/DashboardCheckoutPageStore.js';
import DashboardAccountPageStore from 'stores/DashboardAccountPageStore.js';
import CheckoutProductItemComponent from 'components/CheckoutProductItemComponent/CheckoutProductItemComponent.js';
import PaymentFormModalComponent from 'components/PaymentFormModalComponent/PaymentFormModalComponent.js';
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions.js'
import './DashboardCheckoutPage.scss';

@connectToStores
export default class DashboardCheckoutPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clearCartModal: false,
            placeOrderModal: props.sentPlaceOrder,
            addPaymentmodel: false
        }
    }

    componentDidMount() {

        DashboardAccountPageActions.getAllStates();
    }

    static getStores() {
        return [DashboardCheckoutPageStore,DashboardAccountPageStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardCheckoutPageStore.getState(),
            ...DashboardAccountPageStore.getState()
        }
    }

    handleClearCheckout() {
        DashboardCheckoutPageActions.clearCheckout();
        DashboardProductsPageActions.clearBasket();
        this.hideClearCartModal();
        this.props.appHistory.push(Routes.DashboardProductsPage);
    }

    showClearCartModal() {
        this.setState({clearCartModal: true});

        console.log(this.props.checkoutData);
    }

    hideClearCartModal() {
        this.setState({clearCartModal: false});
    }

    showPlaceOrderModal() {
        this.setState({placeOrderModal: true});
    }


    hidePlaceOrderModal() {
        DashboardCheckoutPageActions.hidePlaceOrderModal();

        this.props.appHistory.push(Routes.dashboardHomePage);
    }

    sendPlaceOrder() {


         var currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
        if(currentUser.role==='Provider')
        {
        let { checkoutData } = this.props;
        checkoutData = _.filter(checkoutData, data => data.Quantity > 0 );

        const requestData = _.map(checkoutData, (data) => {
            return {
                PatientToPdtID: data.PatientToPdtID,
                ProductId: data.ProductID,
                Quantity: data.Quantity,
                Total: data.Total,
                isProvider:1
            }});

        !_.isEmpty(checkoutData) && DashboardCheckoutPageActions.sendPlaceOrder({Orders : requestData});
    }
    else
    {
        let { checkoutData } = this.props;
        checkoutData = _.filter(checkoutData, data => data.Quantity > 0 );

        const requestData = _.map(checkoutData, (data) => {
            return {
                PatientToPdtID: data.PatientToPdtID,
                ProductId: data.ProductID,
                Quantity: data.Quantity,
                Total: data.Total,
                isProvider:0
            }});

        !_.isEmpty(checkoutData) && DashboardCheckoutPageActions.sendPlaceOrder({Orders : requestData}); 
    }
    }

    render() {
        const { checkoutData } = this.props;
        const modalStyle = {
            width: '785px',
            maxWidth: '100%'
        };
        return (
            <div className="dashboard-checkout-page">
                <table className="checkout-products-table" >
                    <thead className="checkout-products-table__header" >
                        <tr className="checkout-products-table__row">
                            <td className="checkout-products-table__cell checkout-products-table__cell--product">Product</td>
                            <td className="checkout-products-table__cell checkout-products-table__cell--price">Price</td>
                            <td className="checkout-products-table__cell checkout-products-table__cell--quantity">Quantity</td>
                            <td className="checkout-products-table__cell checkout-products-table__cell--total">Total</td>
                        </tr>
                    </thead>
                    <tbody className="checkout-products-table__body">
                        {checkoutData && checkoutData.map(product =>
                            <CheckoutProductItemComponent
                                key={product.ProductID}
                                product={product}
                            />
                        )}
                    </tbody>
                </table>

                <div className='checkout-summary'>
                    <h3 className="checkout-summary__title">Cart Totals:</h3>

                    <div className="checkout-summary__row">
                        <div className="checkout-summary__col checkout-summary__col--left">
                            Cart Subtotal:
                        </div>

                        <div className="checkout-summary__col checkout-summary__col--right">
                            ${this.props.totalCountPrice.toFixed(2)}
                        </div>
                    </div>

                    <div className="checkout-summary__row">
                        <div className="checkout-summary__col checkout-summary__col--left">
                            Shipping:
                        </div>

                        <div className="checkout-summary__col checkout-summary__col--right">
                            $0.00
                        </div>
                    </div>

                    <div className="checkout-summary__row checkout-summary__row--total">
                        <div className="checkout-summary__col checkout-summary__col--left">
                            Total:
                        </div>

                        <div className="checkout-summary__col checkout-summary__col--right">
                            ${this.props.totalCountPrice.toFixed(2)}
                        </div>
                    </div>

                    <div className="checkout-summary__buttons">
                        <Link to={Routes.dashboardProductsPage} className="checkout-summary__btn checkout-summary__btn--keep-shopping">
                            Keep Shopping
                        </Link>

                        <div
                            title="Clear Cart"
                            className="checkout-summary__btn checkout-summary__btn--clear-cart"
                            onClick={this.props.checkoutData.length > 0 && this.showClearCartModal.bind(this)}
                        >
                            Clear Cart
                        </div>

                        <button
                            className="checkout-summary__btn checkout-summary__btn--checkout"
                            title="Check Out"
                            onClick={this.sendPlaceOrder.bind(this)}
                        >
                            Check Out
                        </button>
                    </div>
                </div>

                <ModalComponent
                    showModal={this.props.addPaymentmodel}
                    onHide={DashboardCheckoutPageActions.hidePaymentmodel}
                    onShow={DashboardCheckoutPageActions.onAddPaymentmodel}
                    modalStyle={modalStyle}
                    hideOk={true}

                >
                    <PaymentFormModalComponent
                        addPaymentmodel={this.props.addPaymentmodel}
                        orderId={this.props.orderId}
                        states= {this.props.allStatesData}
                        Total={this.props.checkoutData}
                    />
                </ModalComponent>



                <ModalComponent
                    showModal={this.state.clearCartModal}
                    onHide={this.hideClearCartModal.bind(this)}
                    onShow={this.showClearCartModal.bind(this)}
                    hideOk={true}

                >
                    <div style={{padding: '1rem'}} className="clearfix">
                        <p>Are you sure do you want to clear cart?</p>

                        <button
                            className="Button btn btn-danger m-l btn-fixed pull-right no-btn"
                            onClick={this.hideClearCartModal.bind(this)}
                        >No</button>
                        <button
                            className="Button btn btn-success m-l btn-fixed pull-right yes-btn"
                            onClick={this.handleClearCheckout.bind(this)}
                        >Yes</button>
                    </div>
                </ModalComponent>

                {/*<ModalComponent
                    showModal={this.props.orderpayment}
                    onHide={this.props.hidePaymentSuccessmodel}
                    onShow={this.props.nGetPaymentsSuccess}
                    hideOk={true}

                >
                    <div style={{padding: '1rem'}} className="clearfix">
                        <p>The patient cart sent to Xymogen to process the order.</p>
                        <button
                            className="Button btn btn-success m-l btn-fixed pull-right yes-btn"
                            onClick={this.hidePlaceOrderModal.bind(this)}
                        >OK</button>
                    </div>
                </ModalComponent>*/}
            </div>
        );
    }
}