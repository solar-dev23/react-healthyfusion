import React from 'react';

import NavigationLinksComponent from 'components/NavigationLinksComponent/NavigationLinksComponent.js';
import NavigationUserBlockComponent from 'components/NavigationUserBlockComponent/NavigationUserBlockComponent.js';

import './DashboardHeaderComponent.scss'

export default class DashboardHeaderComponent extends React.Component {

    render() {
        const { checkoutData, currentUser, isPatient, isProvider, totalCountPrice, contextRouter, productsBasket } = this.props;
        
        return (
            <header className='dashboard-header-component' id='dashboard-header-component'>
                <div className="dashboard-header-component__top-row">
                    <div className='logo-wrapper'>
                        <a className='logo-wrapper__main-logo'>
                            <span className='m-l'></span>
                        </a>
                    </div>

                    <button type="button" className="dashboard-header-component__main-menu-toggle-btn" data-toggle="collapse"
                            data-target=".main-menu--header">
                        <i className="fa fa-bars"/>
                    </button>
                </div>

                <div className="dashboard-header-component__bottom-row">

                    <NavigationLinksComponent
                        isPatient={isPatient}
                        isProvider={isProvider}
                        isFooter={false}
                    />

                    <NavigationUserBlockComponent
                        currentUser={currentUser}
                        checkoutData={checkoutData}
                        isPatient={isPatient}
                        totalCountPrice={totalCountPrice}
                        contextRouter={contextRouter}
                        productsBasket={productsBasket}
                    />
                </div>
            </header>
        );
    }
}