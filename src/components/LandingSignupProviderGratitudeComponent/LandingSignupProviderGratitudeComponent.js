import React from 'react';
import { Link } from 'react-router';
import Routes from 'routes.js';
import autobind from 'autobind-decorator';

import AuthActions from 'actions/AuthActions.js';

import './LandingSignupProviderGratitudeComponent.scss'

@autobind
export default class LandingSignupProviderGratitudeComponent extends React.Component {
    backToHomePage() {
        AuthActions.resetProviderRegistrationData();
    }

    render() {
        return (
            <div className="landing-signup-provider-gratitude-component">
                <div className="gratitude-privacy">
                    <h2 className="gratitude-title">Thank you</h2>
                    <p className="gratitude-header">Thank you for filling out your Application!</p>
                    <div className="gratitude-information">
                        <p>
                            We will review your application and contact you if we have any questions or need any additional information. Should your application be approved, HEALTHY FUSION will be able to setup your account for online ordering using the email address you provide.
                            If you have any questions or concerns, please do not hesitate to contact us. We are happy to help and look forward to working with you!
                        </p>
                    </div>
                    <div className="verify-block">
                        <a
                            className="green-button"
                            onClick={this.backToHomePage}
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
