import React from 'react';
import {Link} from 'react-router';

import Routes from 'routes.js';
import classNames from 'classnames';
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import HelpFormComponent from "components/HelpFormComponent/HelpFormComponent.js";
import AuthActions from 'actions/AuthActions.js';
import './NavigationLinksComponent.scss'

export default class NavigationLinksComponent extends React.Component {

    constructor() {
        super();

        this.state = {
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

    showHelpModal() {
        this.setState({helpModal: true});
    }

    hideHelpModal() {
        this.setState({helpModal: false});
    }

    logout(e) {
        e.preventDefault();
        AuthActions.logout();
    }

    render() {
        const {isProvider, isPatient, isFooter} = this.props;

        const headerMainMenuClasses = classNames({
            'main-menu': true,
            'main-menu--header': !this.props.isFooter
        });

        return (
            <div className={headerMainMenuClasses}>
                <ul className=" main-menu__list">

                    <li className="main-menu__list-item">
                        <Link
                            to={ Routes.dashboardHomePage }
                            className="main-menu__link"
                            activeClassName="active"
                            title="Home"
                        >
                            Home
                        </Link>
                    </li>

                    {isProvider && <li className="main-menu__list-item">
                        <Link
                            to={ Routes.dashboardSearchPage }
                            className="main-menu__link"
                            activeClassName="active"
                            title="Monographs"
                        >

                            Monographs

                        </Link>
                    </li>}

                    {isProvider && <li className="main-menu__list-item">
                        <Link
                            to={ Routes.dashboardHandoutPage }
                            className="main-menu__link"
                            activeClassName="active"
                            title="Handouts"
                        >
                            Handouts
                        </Link>
                    </li>}

                    <li className="main-menu__list-item">
                        <Link to={ Routes.dashboardProductsPage }
                              className="main-menu__link"
                              activeClassName="active"
                              title="Products"
                        >
                            Products
                        </Link>
                    </li>

                    {isPatient && <li className="main-menu__list-item">
                        <Link
                            to={ Routes.dashboardBasketPage }
                            className="main-menu__link"
                            activeClassName="active"
                            title="Basket"
                        >
                            Basket
                        </Link>
                    </li>}

                    {isProvider && <li className="main-menu__list-item">
                        <Link
                            to={ Routes.dashboardPatientsPage }
                            className="main-menu__link"
                            activeClassName="active"
                            title="Patients"
                        >
                            Patients
                        </Link>
                    </li>}

                    {isPatient && <li className="main-menu__list-item">
                        <Link
                            to={ Routes.dashboardQuickOrderPage }
                            className="main-menu__link"
                            activeClassName="active"
                            title="Quick Order"
                        >
                            Quick Order
                        </Link>
                    </li>}

                    <li className="main-menu__list-item">
                        <Link
                            to={ isProvider ? Routes.dashboardAccountPage : Routes.dashboardAccountPatientInfo }
                            className="main-menu__link"
                            activeClassName="active"
                            title="My Account"
                        >
                            My Account
                        </Link>
                    </li>

                    {isFooter && <li className="main-menu__list-item">
                        <a className="main-menu__link" title="Help" onClick={this.showHelpModal.bind(this)}>
                            <span>Help</span>
                        </a>
                    </li>}

                    {isFooter && <li className="main-menu__list-item">
                        <a className="main-menu__link" onClick={this.logout.bind(this)}>
                            Logout
                        </a>
                    </li>}
                </ul>
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
