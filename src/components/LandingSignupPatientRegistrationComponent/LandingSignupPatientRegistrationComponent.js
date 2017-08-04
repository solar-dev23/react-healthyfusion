import React from 'react';
import autobind from 'autobind-decorator';
import { Link } from 'react-router';
import Routes from 'routes.js';

import AuthActions from 'actions/AuthActions.js';
import InputFormComponent from 'components/InputFormComponent/InputFormComponent.js';
import InputSelectFormComponent from 'components/InputSelectFormComponent/InputSelectFormComponent.js';

import './LandingSignupPatientRegistrationComponent.scss'

@autobind
export default class LandingSignupPatientRegistrationComponent extends React.Component {
    state = {
        email: this.props.verifyCodeData.email,
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        confirmPass: '',
        streetAddress1: '',
        streetAddress2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 1,
        referralCode: this.props.verifyCodeData.referralCode
    };

    submitRegistrationForm(e) {
        e.preventDefault();

        AuthActions.sendPatientRegistrationData(this.state);
    }

    handleEmailChange(email) {
        this.setState({ email });
    }

    handleFirstNameChange(firstName) {
        this.setState({ firstName });
    }

    handleLastNameChange(lastName) {
        this.setState({ lastName });
    }

    handlePhoneChange(phone) {
        this.setState({ phone });
    }

    handlePasswordChange(password) {
        this.setState({ password });
    }

    handleConfirmPassChange(confirmPass) {
        this.setState({ confirmPass });
    }

    handleStreetAddress1Change(streetAddress1) {
        this.setState({ streetAddress1 });
    }

    handleStreetAddress2Change(streetAddress2) {
        this.setState({ streetAddress2 });
    }

    handleCityChange(city) {
        this.setState({ city });
    }

    handleZipCodeChange(zipCode) {
        this.setState({ zipCode });
    }

    handleSelectStateChange(state) {
        this.setState({ state });
    }

    handleSelectCountryChange(country) {
        this.setState({ country });
    }

    renderPassMatchErrors() {
        const { password, confirmPass } = this.state;

        if (password !== confirmPass && confirmPass !== '') {
            return <label style={{color: 'red'}}>Passwords do not match</label>;
        }
    }

    render() {
        const { email, firstName, lastName, phone, password, confirmPass, streetAddress1, streetAddress2, city,
            state, zipCode } = this.state;

        const { states } = this.props;

        return (
            <div className="landing-signup-patient-registration-component">
                <form
                    onSubmit={this.submitRegistrationForm}
                    className="signup-patient-form"
                >
                    <h3 className="registration-title">Registration</h3>

                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Email address"
                            inputType="email"
                            inputValue={email}
                            onInputValueChange={this.handleEmailChange}
                            disabled
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Enter your Street address:"
                            inputType="text"
                            inputValue={streetAddress1}
                            onInputValueChange={this.handleStreetAddress1Change}
                            isRequired
                        />
                    </div>

                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Enter your First Name"
                            inputType="text"
                            inputValue={firstName}
                            onInputValueChange={this.handleFirstNameChange}
                            isRequired
                        />
                        <InputFormComponent
                            inputTitle="Enter your Street address 2:"
                            inputType="text"
                            inputValue={streetAddress2}
                            onInputValueChange={this.handleStreetAddress2Change}
                            isRequired
                        />
                    </div>
                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Enter your Last Name"
                            inputType="text"
                            inputValue={lastName}
                            onInputValueChange={this.handleLastNameChange}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Enter your City:"
                            inputType="text"
                            inputValue={city}
                            onInputValueChange={this.handleCityChange}
                            isRequired
                        />
                    </div>

                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Enter your Phone Number"
                            inputType="text"
                            inputValue={phone}
                            onInputValueChange={this.handlePhoneChange}
                            isRequired
                        />

                        <InputSelectFormComponent
                            inputTitle="Enter your state:"
                            inputValue={state}
                            onInputValueChange={this.handleSelectStateChange}
                            options={states}
                            isRequired
                        />
                    </div>
                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Choose a Password"
                            inputType="password"
                            inputValue={password}
                            onInputValueChange={this.handlePasswordChange}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Enter Zip code:"
                            inputType="text"
                            inputValue={zipCode}
                            onInputValueChange={this.handleZipCodeChange}
                            isRequired
                        />
                    </div>
                    <div className="section-registration last-field">
                        <InputFormComponent
                            inputTitle="Type Password again"
                            inputType="password"
                            inputValue={confirmPass}
                            onInputValueChange={this.handleConfirmPassChange}
                            isRequired
                        />
                    </div>

                    {this.renderPassMatchErrors()}

                    <div className="verify-block">
                        <Link to={Routes.landingSignupPatientVerify} className="black-button" href="#">Back</Link>
                        <input type="submit" className="green-button" value='Register'/>
                    </div>
                </form>
            </div>
        );
    }
}
