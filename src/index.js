import React from 'react';
import { Router, Route, Redirect, IndexRedirect, useRouterHistory, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import ES6Promise from 'es6-promise';
import { createHashHistory } from 'history'

import Routes from './routes.js';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardComponent from 'components/DashboardComponent/DashboardComponent.js';
import DashboardHomePage from 'pages/DashboardHomePage/DashboardHomePage.js';
import DashboardProductsPage from 'pages/DashboardProductsPage/DashboardProductsPage.js';
import DashboardSearchPage from 'pages/DashboardSearchPage/DashboardSearchPage.js';
import DashboardAccountPage from 'pages/DashboardAccountPage/DashboardAccountPage.js';
import DashboardQuickOrderPage from 'pages/DashboardQuickOrderPage/DashboardQuickOrderPage.js';
import DashboardPatientsPage from 'pages/DashboardPatientsPage/DashboardPatientsPage.js';
import DashboardBasketPage from 'pages/DashboardBasketPage/DashboardBasketPage.js';
import DashboardCheckoutPage from 'pages/DashboardCheckoutPage/DashboardCheckoutPage.js';
import ProviderProductsBasketComponent from 'components/ProviderProductsBasketComponent/ProviderProductsBasketComponent.js';
import DashboardAccountProviderInfoComponent from 'components/DashboardAccountProviderInfoComponent/DashboardAccountProviderInfoComponent.js';
import DashboardAccountProfInfoComponent from 'components/DashboardAccountProfInfoComponent/DashboardAccountProfInfoComponent.js';
import DashboardHandoutPage from 'pages/DashboardHandoutPage/DashboardHandoutPage.js';
import MonographComponent from 'components/MonographComponent/MonographComponent.js';
import ForgotPasswordPage from 'pages/ForgotPasswordPage/ForgotPasswordPage.js';
import DashboardDocumentProviderInfoComponent from 'components/DashboardDocumentProviderInfoComponent/DashboardDocumentProviderInfoComponent.js';
import DashboardPatientPaymentPage from 'pages/DashboardPatientPaymentPage/DashboardPatientPaymentPage.js'; 
import DashboardProductDetailsPage from 'pages/DashboardProductDetailsPage/DashboardProductDetailsPage.js';
import DashboardFAQPage from 'pages/DashboardFAQPage/DashboardFAQPage.js';
import DaboardMyAccountPage from 'pages/DashboardMyAccountPage/DashboardMyAccountPage.js';
import LandingSignupPage from 'pages/LandingSignupPage/LandingSignupPage.js';
import LandingContentInfoComponent from 'components/LandingContentInfoComponent/LandingContentInfoComponent.js';
import LandingSignupPatientComponent from 'components/LandingSignupPatientComponent/LandingSignupPatientComponent.js';
import LandingSignupProviderComponent from 'components/LandingSignupProviderComponent/LandingSignupProviderComponent.js';
import LandingSignupPatientVerifyComponent from 'components/LandingSignupPatientVerifyComponent/LandingSignupPatientVerifyComponent.js';
import LandingSignupPatientRegistrationComponent from 'components/LandingSignupPatientRegistrationComponent/LandingSignupPatientRegistrationComponent.js';
import LandingSignupProviderContactsComponent from 'components/LandingSignupProviderContactsComponent/LandingSignupProviderContactsComponent.js';
import LandingSignupProviderBusinessComponent from 'components/LandingSignupProviderBusinessComponent/LandingSignupProviderBusinessComponent.js';
import LandingSignupProviderPaymentComponent from 'components/LandingSignupProviderPaymentComponent/LandingSignupProviderPaymentComponent.js';
import LandingSignupProviderAgreementComponent from 'components/LandingSignupProviderAgreementComponent/LandingSignupProviderAgreementComponent.js';
import LandingSignupProviderReturnPolicyComponent  from 'components/LandingSignupProviderReturnPolicyComponent/LandingSignupProviderReturnPolicyComponent.js';
import LandingSignupProviderSalesPolicyComponent  from 'components/LandingSignupProviderSalesPolicyComponent/LandingSignupProviderSalesPolicyComponent.js';
import LandingSignupProviderGratitudeComponent from 'components/LandingSignupProviderGratitudeComponent/LandingSignupProviderGratitudeComponent.js';
import OrderViewPage from 'pages/OrderView/OrderViewPage.js';


ES6Promise.polyfill();

function unLogged(nextState, replace) {
    if (!localStorage.currentUser) {
        replace({
            pathname: Routes.main,
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

function logged(nextState, replace) {
    if (localStorage.currentUser) {
        replace({
            pathname: Routes.dashboard,
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

DashboardHomePage.title = 'Home';
DashboardProductsPage.title = 'Products';
DashboardProductsPage.basket = false;
DashboardProductsPage.isProductPage = true;
ProviderProductsBasketComponent.title = 'Products';
ProviderProductsBasketComponent.basket = true;
DaboardMyAccountPage.title = 'My Account';
DashboardAccountProviderInfoComponent.title = 'My Account';
DashboardAccountProfInfoComponent.title = 'My Account';
DashboardQuickOrderPage.title = 'Quick Order';
DashboardPatientsPage.title = 'Patient List';
DashboardSearchPage.title = 'Search';
DashboardBasketPage.title = 'Basket';
DashboardCheckoutPage.title = 'Check Out';
DashboardHandoutPage.title ='Handouts';
DashboardPatientPaymentPage.title = 'Check Out';
DashboardProductDetailsPage.title = 'Product Detailed Information';
DashboardFAQPage.title='Frequently Asked Questions (FAQ)';
OrderViewPage.title = 'ORDER DETAILS';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const routes = (
    <Router history={appHistory}>
        <Route path={Routes.main} component={LandingPage} onEnter={logged}>
            <IndexRoute component={LandingContentInfoComponent} />
            <Route path={Routes.landingSignupPage} component={LandingSignupPage}>
                <Route path={Routes.landingSignupPatient} component={LandingSignupPatientComponent}>
                    <IndexRedirect to={Routes.landingSignupPatientVerify} />
                    <Route path={Routes.landingSignupPatientVerify} component={LandingSignupPatientVerifyComponent} />
                    <Route path={Routes.landingSignupPatientRegistration} component={LandingSignupPatientRegistrationComponent} />
                </Route>
                <Route path={Routes.landingSignupProvider} component={LandingSignupProviderComponent}>
                    <IndexRedirect to={Routes.landingSignupProviderContacts} />
                    <Route path={Routes.landingSignupProviderContacts} component={LandingSignupProviderContactsComponent} />
                    <Route path={Routes.landingSignupProviderBusiness} component={LandingSignupProviderBusinessComponent} />
                    <Route path={Routes.LandingSignupProviderAgreement} component={LandingSignupProviderAgreementComponent} />
                    
                    <Route path={Routes.LandingSignupProviderSalesPolicy} component={LandingSignupProviderSalesPolicyComponent} />
                    <Route path={Routes.LandingSignupProviderReturnPolicy} component={LandingSignupProviderReturnPolicyComponent} />
                    <Route path={Routes.landingSignupProviderPayment} component={LandingSignupProviderPaymentComponent} />
                    <Route path={Routes.landingSignupProviderGratitude} component={LandingSignupProviderGratitudeComponent} />
                </Route>
            </Route>
        </Route>
        <Route path={Routes.dashboard} component={DashboardComponent} onEnter={unLogged}>
            <IndexRedirect to={Routes.dashboardHomePage} />
            <Route path={Routes.dashboardHomePage} component={DashboardHomePage} />
            <Route path={Routes.dashboardProductsPage} component={DashboardProductsPage} >
                <Route path={Routes.providerProductsBasket} component={ProviderProductsBasketComponent} />
            </Route>
            <Route path={Routes.dashboardSearchPage} component={DashboardSearchPage}>
                <Route path={Routes.dashboardSearchPageMono} component={MonographComponent} />
            </Route>
            <Route path={Routes.dashboardAccountPage} component={DaboardMyAccountPage} />
             <Route path={Routes.orderViewPage} component={OrderViewPage}/>
            <Route path={Routes.dashboardQuickOrderPage} component={DashboardQuickOrderPage} />
            <Route path={Routes.dashboardPatientsPage} component={DashboardPatientsPage} />
            <Route path={Routes.dashboardBasketPage} component={DashboardBasketPage} />
            <Route path={Routes.dashboardCheckoutPage} component={DashboardCheckoutPage} />
            <Route path={Routes.dashboardHandoutPage} component={DashboardHandoutPage} />
            <Route path={Routes.dashboardPatientPayment} component={DashboardPatientPaymentPage}/>
            // <Route path="dashboard/dashboardProductDetails/:productId"  component={DashboardProductDetailsPage}/>
           <Route path={Routes.dashboardProductDetails}  component={DashboardProductDetailsPage}/>
           <Route path={Routes.dashboardFAQ}  component={DashboardFAQPage}/>
        </Route>
        <Route path={Routes.forgotPasswordPage} component={ForgotPasswordPage}/>
    </Router>
);

const appNode = document.getElementById('client-content');
ReactDOM.render(routes, appNode);