import React from 'react';
import autobind from 'autobind-decorator';
import { Link } from 'react-router';

import AuthActions from 'actions/AuthActions.js';

import InputFormComponent from 'components/InputFormComponent/InputFormComponent.js';

import './LandingSignupPatientVerifyComponent.scss'

@autobind
export default class LandingSignupPatientVerifyComponent extends React.Component {
    submitVerifyForm(e) {
        e.preventDefault();

        AuthActions.validateProviderCode(this.props.verifyCodeData);
    }

    verifyDataOnChangeParse(field, fieldValue) {
        AuthActions.verifyDataOnChange({ field, fieldValue });
    }

    handleReferralCodeChange(referralCode) {
        this.verifyDataOnChangeParse('referralCode', referralCode);
    }

    handleChangeEmail(email) {
        this.verifyDataOnChangeParse('email', email);
    }

    handlePractitionerLNameChange(practitionerLName) {
        this.verifyDataOnChangeParse('practitionerLName', practitionerLName);
    }

    backToVerifyForm(e) {
        e.preventDefault();

        AuthActions.resetValidated();
    }

    render() {
        const { isNoValidated, verifyCodeData } = this.props;
        const { referralCode, practitionerLName, email } = verifyCodeData;

        return (
            <div className="landing-signup-patient-verify-component">
                <form
                    onSubmit={this.submitVerifyForm}
                    className="signup-patient-form"
                >
                    <h3 className="registration-title">Verify</h3>

                    {!isNoValidated ? <div>
                        <div className="section-registration referral-block">
                            <InputFormComponent
                                inputTitle="Enter your Referral Code:"
                                inputType="text"
                                inputValue={referralCode}
                                onInputValueChange={this.handleReferralCodeChange}
                                isRequired
                            />
                        </div>
                        <div className="section-registration">
                            <InputFormComponent
                                inputTitle="Enter your Practitioners Last Name:"
                                inputType="text"
                                inputValue={practitionerLName}
                                onInputValueChange={this.handlePractitionerLNameChange}
                                isRequired
                            />
                        </div>
                        <div className="section-registration">
                            <InputFormComponent
                                inputTitle="Enter your Email:"
                                inputType="email"
                                inputValue={email}
                                onInputValueChange={this.handleChangeEmail}
                                isRequired
                            />
                        </div>
                        <div className="verify-block">
                            <input type="submit" className="black-button" value='Verify'/>
                        </div>

                    </div> : <div>
                        <h3 className="step-title">Your referral code is not valid.</h3>
                        <p>YFusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vitae ullamcorper metus. Sed sollicitudin ipsum quis nunc sollicitudin ultrices. Donec euismod scelerisque ligula. Maecenas eu varius risus, eu aliquet arcu. </p>
                        <div className="verify-block">
                            <a href="" className="black-button" onClick={this.backToVerifyForm}>Back</a>
                        </div>
                    </div>}
                </form>
            </div>
        );
    }
}
