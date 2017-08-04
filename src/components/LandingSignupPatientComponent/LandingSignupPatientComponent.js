import React, { PropTypes } from 'react';

import classNames from 'classnames';
import Routes from 'routes.js';

import './LandingSignupPatientComponent.scss'

const LandingSignupPatientComponent = ({ children, appHistory, providerId, router, userNameIsAvailable,
    referralCode, isNoValidated, patientEmail, states, verifyCodeData }) => {
    const isVerifyPage = router.isActive(Routes.landingSignupPatientVerify);
    const isRegistrationPage = router.isActive(Routes.landingSignupPatientRegistration);
    const isAvailable = providerId && userNameIsAvailable;

    if (isAvailable || isVerifyPage) {
        const step1Class = classNames({
            'step-1': true,
            'active-step': true,
            'confirmed-step': isAvailable
        });

        const step2Class = classNames({
            'step-2': true,
            'active-step': isRegistrationPage
        });

        return (
            <div className="landing-signup-patient-component">
                <h2>Patient Registration</h2>

                <div className="step-block">
                    <div className={step1Class}>
                        <p>STEP 1</p>
                        <i className="fa fa-check-circle" aria-hidden="true"/>
                        <i className="fa fa-check" aria-hidden="true"/>
                        <p>Verify</p>
                    </div>
                    <hr className="between"/>
                    <div className={step2Class}>
                        <p>STEP 2</p>
                        <i className="fa fa-file-text" aria-hidden="true"/>
                        <i className="fa fa-check" aria-hidden="true"/>
                        <p>Registration</p>
                    </div>
                </div>

                {children && React.cloneElement(children, {
                    appHistory: appHistory,
                    providerId: providerId,
                    referralCode: referralCode,
                    isNoValidated: isNoValidated,
                    patientEmail: patientEmail,
                    states: states,
                    verifyCodeData: verifyCodeData
                })}
            </div>
        );
    } else {
        return (
            <h2>You don't have access to this page</h2>
        );
    }
};

LandingSignupPatientComponent.propTypes = {
    appHistory: PropTypes.object,
    children: PropTypes.object,
    providerId: PropTypes.number,
    userNameIsAvailable: PropTypes.bool,
    patientEmail: PropTypes.string,
    verifyCodeData: PropTypes.object
};

export default LandingSignupPatientComponent;
