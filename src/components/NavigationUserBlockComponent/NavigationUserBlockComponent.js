import React from 'react';
import {Link} from 'react-router';

import './NavigationUserBlockComponent.scss'
import AuthActions from 'actions/AuthActions.js';
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import ChangePasswordFormComponent from "components/ChangePasswordFormComponent/ChangePasswordFormComponent.js";
import HelpFormComponent from "components/HelpFormComponent/HelpFormComponent.js";
import CheckoutBtnComponent from 'components/CheckoutBtnComponent/CheckoutBtnComponent.js';
import ProviderProductBasketCountComponent from 'components/ProviderProductBasketCountComponent/ProviderProductBasketCountComponent.js';
import HelpStore from 'stores/HelpStore.js';
import connectToStores from 'alt/utils/connectToStores';
import Routes from 'routes.js';

@connectToStores
export default class NavigationUserBlockComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            changePassModal: false,
            helpModal: false
        };
    }

    static getStores() {
        return [
            HelpStore,
        ];
    }

    static getPropsFromStores() {
        return {
            ...HelpStore.getState()
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.helpSendSuccess && newProps.helpSendSuccess !== this.props.helpSendSuccess) {
            this.hideHelpModal();
        }
    }

    showChangePasswordModal() {
        this.setState({changePassModal: true});
    }

    hideChangePasswordModal() {
        this.setState({changePassModal: false});
    }

    showHelpModal() {
        this.setState({helpModal: true});
    }

    hideHelpModal() {
        this.setState({helpModal: false});
    }

    logout(e) {
        e.preventDefault();

        DashboardProductsPageActions.clearBasket();
        DashboardCheckoutPageActions.clearCheckout();

        AuthActions.logout();
    }

    render() {
        const {
            checkoutData,
            currentUser,
            isPatient,
            totalCountPrice
        } = this.props;

        return (
            <div className="navigation-user-block-component">
                <ul className="user-block nav">
                    <CheckoutBtnComponent 
                        checkoutData={checkoutData} 
                        totalCountPrice={totalCountPrice} 
                        isPatient={isPatient}
                    />

                    <li>
                        <a onClick={this.showHelpModal.bind(this)} className="user-block__help-btn" title="Help">
                            <i className="fa fa-question-circle"/>
                            <span>Help</span>
                        </a>
                    </li>

                    <li className="dropdown">
                        <a href="" className="user-block__dropdown-btn dropdown-toggle" data-toggle="dropdown">
                            <div className="user-block__avatar"/>
                            <span className="user-block__username">{currentUser.Name}</span>
                            <i className="fa fa-angle-down"/>
                        </a>

                        <ul className="user-block__dropdown-menu dropdown-menu">
                            <li>
                                <Link
                                to={ Routes.dashboardFAQ }
                                className="main-menu__link"
                                activeClassName="active"
                                title="Frequently Asked Questions"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <a onClick={this.showChangePasswordModal.bind(this)}>
                                    <i className="fa fa-retweet" />
                                    Change Password
                                </a>
                            </li>

                            <li>
                                <a href="" onClick={this.logout.bind(this)}>
                                    <i className="fa fa-sign-out" />
                                    Logout
                                </a>
                            </li>
                            
                        </ul>
                    </li>
                </ul>
                <ModalComponent
                    showModal={this.state.changePassModal}
                    onHide={this.hideChangePasswordModal.bind(this)}
                    onShow={this.showChangePasswordModal.bind(this)}
                    header="Change password"
                    hideOk={true}
                >
                    <ChangePasswordFormComponent
                        onSuccess={this.hideChangePasswordModal.bind(this)}
                    />
                </ModalComponent>

                <ModalComponent
                    showModal={this.state.helpModal}
                    onHide={this.hideHelpModal.bind(this)}
                    onShow={this.showHelpModal.bind(this)}
                    hideOk={true}
                >
                    <HelpFormComponent/>
                </ModalComponent>
            </div>
        );
    }
}
