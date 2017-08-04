import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router';
// import Routes from 'routes.js';
import LandingSignupPageStore from 'stores/LandingSignupPageStore.js';
import AuthStore from 'stores/AuthStore.js';
import AuthActions from 'actions/AuthActions.js';

import './LandingSignupPage.scss';

@connectToStores
export default class LandingPage extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    static propTypes = {
        children: PropTypes.object,
        providerId: PropTypes.number,
        userNameIsAvailable: PropTypes.bool,
        referralCode: PropTypes.string,
        isNoValidated: PropTypes.bool,
        landingProviderContactsData: PropTypes.object,
        landingProviderBusinessData: PropTypes.object,
        patientEmail: PropTypes.string,
        providerSettings: PropTypes.object,
        subscriptionOptions: PropTypes.array,
        cardTypeOptions: PropTypes.array,
        landingProviderPaymentData: PropTypes.object,
        providerUserNameIsAvailable: PropTypes.bool,
        providerTitleOptions: PropTypes.array,
        providerAreaOptions: PropTypes.array,
        providerSubscribeOptions: PropTypes.array,
        states: PropTypes.array,
        isAgreement: PropTypes.bool,
        isAgreementSalesPolicy: PropTypes.bool,
        isAgreementReturnPolicy: PropTypes.bool
    };

    static getStores() {
        return [LandingSignupPageStore, AuthStore];
    }

    static getPropsFromStores() {
        return {
            ...LandingSignupPageStore.getState(),
            ...AuthStore.getState()
        }
    }

    componentDidMount() {
        AuthActions.getProviderSettings();
        AuthActions.getStates();
    }

    render() {
        const { children, providerId, userNameIsAvailable, referralCode, isNoValidated, landingProviderContactsData,
            landingProviderBusinessData, patientEmail, providerSettings, cardTypeOptions,
            landingProviderPaymentData, providerUserNameIsAvailable, providerTitleOptions, providerAreaOptions,
            states, providerSubscribeOptions, isAgreement, isAgreementSalesPolicy, isAgreementReturnPolicy, verifyCodeData
        } = this.props;

        const { router } = this.context;
        const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

        return (
            <div className="landing-signup-page">
                {children && React.cloneElement(children, {
                    appHistory: appHistory,
                    providerId: providerId,
                    router: router,
                    userNameIsAvailable: userNameIsAvailable,
                    referralCode: referralCode,
                    isNoValidated: isNoValidated,
                    landingProviderContactsData: landingProviderContactsData,
                    landingProviderBusinessData: landingProviderBusinessData,
                    patientEmail: patientEmail,
                    providerSettings: providerSettings,
                    cardTypeOptions: cardTypeOptions,
                    landingProviderPaymentData: landingProviderPaymentData,
                    providerUserNameIsAvailable: providerUserNameIsAvailable,
                    providerTitleOptions: providerTitleOptions,
                    providerAreaOptions: providerAreaOptions,
                    providerSubscribeOptions: providerSubscribeOptions,
                    states: states,
                    isAgreement: isAgreement,
                    isAgreementSalesPolicy: isAgreementSalesPolicy,
                    isAgreementReturnPolicy: isAgreementReturnPolicy,
                    verifyCodeData: verifyCodeData
                })}
            </div>
        );
    }
}