import React from 'react';

import { Link } from 'react-router';
import Routes from 'routes.js';
import autobind from 'autobind-decorator';
import AuthActions from 'actions/AuthActions.js';

import InputFormComponent from 'components/InputFormComponent/InputFormComponent.js';

import './LandingSignupProviderAgreementComponent.scss'

@autobind
export default class LandingSignupProviderAgreementComponent extends React.Component {
    state = {
        inputValue: this.props.isAgreement
    };

    handleValueChange(e) {
        this.setState({ inputValue: e.target.checked});
    }

    handleNextPage(e) {
        e.preventDefault();

        AuthActions.handleAgreementChange(this.state.inputValue);

        this.props.appHistory.push(Routes.LandingSignupProviderSalesPolicy);
    }

    render() {
        const { providerAgreement } = this.props.providerSettings;
        const data = providerAgreement && providerAgreement[0];

        return (
            <div className="landing-signup-provider-agreement-component">
                <form
                    onSubmit={this.handleNextPage}
                    className="general-privacy"
                >
                    <h3 className="gratitude-title ">
                        Customer Agreement
                    </h3>
                    {data && <div className="privacy-information">
                        <p dangerouslySetInnerHTML={{__html: data.Description}}/>
                    </div>}

                    <InputFormComponent
                        inputTitle="I agree to the terms and conditions of this agreement"
                        inputType="checkbox"
                        inputName="agreement"
                        onInputValueChange={this.handleValueChange}
                        isChecked={this.state.inputValue}
                        isRequired
                    />

                    <div className="verify-block">
                        <Link
                            to={Routes.landingSignupProviderBusiness}
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
