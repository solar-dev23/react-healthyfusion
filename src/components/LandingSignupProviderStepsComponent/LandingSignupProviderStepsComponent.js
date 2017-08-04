import React, { PropTypes } from 'react';
import _ from 'lodash';

import classNames from 'classnames';
import Routes from 'routes.js';

import './LandingSignupProviderStepsComponent.scss'

const LandingSignupProviderStepsComponent = ({ router, landingProviderContactsData,
    landingProviderBusinessData, isAgreement, isAgreementSalesPolicy, isAgreementReturnPolicy }) => {

    const isContactsPage = router.isActive(Routes.landingSignupProviderContacts);
    const isBusinessPage = router.isActive(Routes.landingSignupProviderBusiness);
    const isAgreementPage = router.isActive(Routes.LandingSignupProviderAgreement);
    const isSalesPolicyPage = router.isActive(Routes.LandingSignupProviderSalesPolicy);
    const isReturnPolicyPage = router.isActive(Routes.LandingSignupProviderReturnPolicy);
    const isProviderPaymentPage = router.isActive(Routes.landingSignupProviderPayment);
    const isGratitudePage = router.isActive(Routes.landingSignupProviderGratitude);
    const isProviderAvailable = true;

    if (isProviderAvailable || isContactsPage) {
        const stepProviderClass1 = classNames({
            'step-part': true,
            'active-step': true,
            'confirmed-step': isProviderAvailable
        });

        const stepProviderClass2 = classNames({
            'step-part': true,
            'active-step': isBusinessPage || !_.isEmpty(landingProviderBusinessData),
            'confirmed-step': !_.isEmpty(landingProviderBusinessData)
        });

        const stepProviderClass3 = classNames({
            'step-part': true,
            'active-step': isAgreementPage || isAgreement,
            'confirmed-step': isAgreement
        });

        const stepProviderClass4 = classNames({
            'step-part': true,
            'active-step': isSalesPolicyPage || isAgreementSalesPolicy,
            'confirmed-step': isAgreementSalesPolicy
        });

        const stepProviderClass5 = classNames({
            'step-part': true,
            'active-step': isReturnPolicyPage || isAgreementReturnPolicy,
            'confirmed-step': isAgreementReturnPolicy
        });

        const stepProviderClass6 = classNames({
            'step-part': true,
            'active-step': isProviderPaymentPage || isGratitudePage,
            'confirmed-step': isGratitudePage
        });


        const stepProviderClass7 = classNames({
            'step-part': true,
            'active-step': isGratitudePage,
            'confirmed-step': isGratitudePage
        });
        return (
            <div className="landing-signup-provider-steps-component">
                <div className="step-block">
                    <div className={stepProviderClass1}>
                        <p>STEP 1</p>
                        <i className="fa fa-user" aria-hidden="true"/>
                        <i className="fa fa-check" aria-hidden="true"/>
                        <p>Contacts</p>
                    </div>
                    <hr className="between"/>
                    <div className={stepProviderClass2}>
                        <p>STEP 2</p>
                        <i className="fa fa-briefcase" aria-hidden="true"/>
                        <i className="fa fa-check" aria-hidden="true"/>
                        <p>Business</p>
                    </div>
                    <hr className="between"/>
                    <div className={stepProviderClass3}>
                        <p>STEP 3</p>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"/>
                        <i className="fa fa-check" aria-hidden="true"/>
                        <p>Agreement</p>
                    </div>
                    <hr className="between"/>
                    <div className={stepProviderClass4}>
                        <p>STEP 4</p>
                        <i className="fa fa-tag" aria-hidden="true"/>
                        <i className="fa fa-check" aria-hidden="true"/>
                        <p>Sales Policy</p>
                    </div>
                    <hr className="between"/>
                    <div className={stepProviderClass5}>
                        <p>STEP 5</p>
                        <i className="fa fa-arrow-circle-left" aria-hidden="true"/>
                        <i className="fa fa-check" aria-hidden="true"/>
                        <p>Return Policy</p>
                    </div>
                    <hr className="between"/>
                    <div className={stepProviderClass6}>
                        <p>STEP 6</p>
                        <i className="fa fa-usd" aria-hidden="true"/>
                        <i className="fa fa-check" aria-hidden="true"/>
                        <p>Payment</p>
                    </div>
                    <hr className="between"/>
                    <div className={stepProviderClass7}>
                        <p>STEP 7</p>
                        <i className="fa fa-check-circle" aria-hidden="true"/>
                        <i className="fa fa-check" aria-hidden="true"/>
                        <p>Thank you</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <h2>You don't have access to this page</h2>
        );
    }
};

export default LandingSignupProviderStepsComponent;


