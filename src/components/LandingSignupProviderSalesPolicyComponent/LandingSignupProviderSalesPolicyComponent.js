import React from 'react';
import { Link } from 'react-router';
import Routes from 'routes.js';
import autobind from 'autobind-decorator';

import AuthActions from 'actions/AuthActions.js';

import InputFormComponent from 'components/InputFormComponent/InputFormComponent.js';
import './LandingSignupProviderSalesPolicyComponent.scss'

@autobind
export default class LandingSignupProviderSalesPolicyComponent extends React.Component {
    state = {
        inputValue: this.props.isAgreementSalesPolicy
    };

    handleValueChange(e) {
        this.setState({ inputValue: e.target.checked});
    }


    handleNextPage(e) {
        e.preventDefault();

        AuthActions.handleAgreementSalesPolicyChange(this.state.inputValue);


        this.props.appHistory.push(Routes.LandingSignupProviderReturnPolicy);
    }

    render() {
        const { providerAgreement } = this.props.providerSettings;
        const data = providerAgreement && providerAgreement[1];

        return (
            <div className="landing-signup-provider-sales-policy-component">
                <form
                    onSubmit={this.handleNextPage}
                    className="general-privacy"
                >
                    <h3 className="gratitude-title ">
                        Sales Policy
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
                            to={Routes.LandingSignupProviderAgreement}
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
