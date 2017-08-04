import React from 'react';
import { Link } from 'react-router';
import Routes from 'routes.js';
import autobind from 'autobind-decorator';

import AuthActions from 'actions/AuthActions.js';

import InputFormComponent from 'components/InputFormComponent/InputFormComponent.js';

import './LandingSignupProviderReturnPolicyComponent.scss'

@autobind
export default class LandingSignupProviderReturnPolicyComponent extends React.Component {
    state = {
        inputValue: this.props.isAgreementReturnPolicy
    };

    handleValueChange(e) {
        this.setState({ inputValue: e.target.checked});
    }

    handleNextPage(e) {
        e.preventDefault();

        AuthActions.handleAgreementReturnPolicyChange(this.state.inputValue);

        this.props.appHistory.push(Routes.landingSignupProviderPayment);
    }

    render() {
        const { providerSettings } = this.props;
        const { providerAgreement } = providerSettings;
        const data = providerAgreement && providerAgreement[2];

        return (
            <div className="landing-signup-provider-return-policy-component">
                <form
                    onSubmit={this.handleNextPage}
                    className="general-privacy"
                >
                    <h3 className="gratitude-title ">
                        Return Policy
                    </h3>

                    {data && <div className="privacy-information">
                        <p dangerouslySetInnerHTML={{__html: data.Description}}/>
                    </div>}

                    <InputFormComponent
                        inputTitle="I agree"
                        inputType="checkbox"
                        inputName="agreement"
                        onInputValueChange={this.handleValueChange}
                        isChecked={this.state.inputValue}
                        isRequired
                    />

                    <div className="verify-block">
                        <Link
                            to={Routes.LandingSignupProviderSalesPolicy}
                            className="black-button"
                        >
                            Previous
                        </Link>

                        <input type="submit" className="black-button" value="Next" />
                    </div>
                </form>
            </div>
        );
    }
}
