import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
import _ from 'lodash';

var Overlay = require('oldComponents/Overlay');

import Routes from 'routes.js';
import AuthStore from 'stores/AuthStore.js';
import DashboardProductsPageStore from 'stores/DashboardProductsPageStore.js';
import DashboardCommonStore from 'stores/DashboardCommonStore.js';
import DashboardPatientsPageStore from 'stores/DashboardPatientsPageStore.js';
import DashboardCheckoutPageStore from 'stores/DashboardCheckoutPageStore.js';
import DashboardHeaderComponent from 'components/DashboardHeaderComponent/DashboardHeaderComponent.js';
import SectionComponent from 'components/SectionComponent/SectionComponent.js';
import DashboardFooterComponent from 'components/DashboardFooterComponent/DashboardFooterComponent.js';

import '../../css/font-awesome.css';
import 'oldStyles/main.css';
import 'oldStyles/style.css';
import 'oldStyles/main-responsive.css';
import './DashboardComponent.scss'

@connectToStores
export default class DashboardComponent extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };

    static getStores() {
        return [
            AuthStore,
            DashboardProductsPageStore,
            DashboardCommonStore,
            DashboardPatientsPageStore,
            DashboardCheckoutPageStore
        ];
    }

    static getPropsFromStores() {
        return {
            ...AuthStore.getState(),
            ...DashboardProductsPageStore.getState(),
            ...DashboardCommonStore.getState(),
            ...DashboardPatientsPageStore.getState(),
            ...DashboardCheckoutPageStore.getState()
        }
    }

    renderRightButtons() {
        const { params } = this.props;
  const { router } = this.context;
        return (
            <div className='tools pull-right'>

                { /*router.isActive(Routes.dashboardAccountPatientInfo) && <button
                    className="Button  btn btn-success btn-xs"
                    onClick={() => DashboardAccountPageActions.showEditAccountForm()}
                >
                    <i className="Icon fa fa-plus m-n"/>
                    <span className="m-l-xs">Edit</span>
                </button>*/}

                    {router.isActive(Routes.orderViewPage) && 
                   <Link
                        to={Routes.dashboardAccountPage}
                        style={{color: '#fff'}}>
                        <button className="Button btn btn-success btn-xs">
                        <i className="Icon fa fa-reply m-n"/>
                        <span className="m-l-xs">Back</span>                        
                        </button>
                   </Link>
                  
                    
                }
                {params.monoID && <Link to={Routes.dashboardSearchPage}>
                    <button className="Button  btn btn-success btn-xs">Back</button>
                </Link>}
            </div>
        );
    }

    render() {
        const {
            totalCountPrice,
            routes,
            checkoutData,
            params,
            currentUser,
            products,
            loading,
            children,
            productsBasket
        } = this.props;
        
        const isPatient = currentUser && currentUser.role === 'Patient',
            isProvider = currentUser && currentUser.role === 'Provider',
            appHistory = useRouterHistory(createHashHistory)({ queryKey: false });


        const currentRoute = _.last(routes),
            pageTitle = currentRoute.component.title;

        return (
            <div className="dashboard-component">
                <DashboardHeaderComponent
                    currentUser={currentUser}
                    isPatient={isPatient}
                    isProvider={isProvider}
                    checkoutData={checkoutData}
                    totalCountPrice={totalCountPrice}
                    contextRouter={this.context.router}
                    productsBasket={productsBasket}
                />

                <SectionComponent key='content' type={ isPatient && 'main-content'}>
                    <SectionComponent type='wrapper'>
                        <div className='row' style={{backgroundColor: '#fff'}}>
                            <div className="SectionHeader clearfix panel-heading">
                                {pageTitle}

                                {params.monoID}

                                {this.renderRightButtons()}
                            </div>

                            {children && React.cloneElement(children, {
                                currentUser: currentUser,
                                isPatient: isPatient,
                                isProvider: isProvider,
                                products: products,
                                currentRoute: currentRoute,
                                loading: loading,
                                contextRouter: this.context.router,
                                appHistory: appHistory
                            })}
                        </div>
                    </SectionComponent>
                </SectionComponent>

                <DashboardFooterComponent
                    currentUser={currentUser}
                    isPatient={isPatient}
                    isProvider={isProvider}
                    checkoutData={checkoutData}
                    contextRouter={this.context.router}
                />

                {loading && <Overlay/>}
            </div>
        );
    }
}