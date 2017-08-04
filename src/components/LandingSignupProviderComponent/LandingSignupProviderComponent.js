import React from 'react';

import LandingSignupProviderStepsComponent from 'components/LandingSignupProviderStepsComponent/LandingSignupProviderStepsComponent.js';

import './LandingSignupProviderComponent.scss'


const LandingSignupProviderComponent = (
    { appHistory, children, providerSettings, cardTypeOptions,
        providerUserNameIsAvailable, providerTitleOptions, providerAreaOptions, landingProviderContactsData,
        landingProviderBusinessData, landingProviderPaymentData, states, providerSubscribeOptions, isAgreement,
        isAgreementSalesPolicy, isAgreementReturnPolicy, router
    }) =>
    <div
        id="landing-signup-provider"
        className="landing-signup-provider-component"
    >
        <h2>Provider Registration</h2>

        <LandingSignupProviderStepsComponent
            router={router}
            landingProviderContactsData={landingProviderContactsData}
            landingProviderBusinessData={landingProviderBusinessData}
            isAgreement={isAgreement}
            isAgreementSalesPolicy={isAgreementSalesPolicy}
            isAgreementReturnPolicy={isAgreementReturnPolicy}
        />

        {children && React.cloneElement(children, {
            appHistory: appHistory,
            providerSettings: providerSettings,
            cardTypeOptions: cardTypeOptions,
            providerUserNameIsAvailable: providerUserNameIsAvailable,
            providerTitleOptions: providerTitleOptions,
            providerAreaOptions: providerAreaOptions,
            landingProviderContactsData: landingProviderContactsData,
            landingProviderBusinessData: landingProviderBusinessData,
            states: states,
            providerSubscribeOptions: providerSubscribeOptions,
            isAgreement: isAgreement,
            isAgreementSalesPolicy: isAgreementSalesPolicy,
            isAgreementReturnPolicy: isAgreementReturnPolicy,
            landingProviderPaymentData: landingProviderPaymentData
        })}
    </div>;

export default LandingSignupProviderComponent
