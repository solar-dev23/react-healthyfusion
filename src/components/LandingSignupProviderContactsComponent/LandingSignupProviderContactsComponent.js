import React from 'react';
import autobind from 'autobind-decorator';
import { Link } from 'react-router';

import AuthActions from 'actions/AuthActions.js';
import InputFormComponent from 'components/InputFormComponent/InputFormComponent.js';
import InputSelectFormComponent from 'components/InputSelectFormComponent/InputSelectFormComponent.js';

import './LandingSignupProviderContactsComponent.scss'

@autobind
export default class LandingSignupProviderContactsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: props.landingProviderContactsData.firstName || '',
            lastName:  props.landingProviderContactsData.lastName || '',
            middleName:  props.landingProviderContactsData.middleName || '',
            title:  props.landingProviderContactsData.title || '',
            area:  props.landingProviderContactsData.area || '',
            email:  props.landingProviderContactsData.email || '',
            phone:  props.landingProviderContactsData.phone || '',
            fax:  props.landingProviderContactsData.fax || '',
            website:  props.landingProviderContactsData.website || '',
            username:  props.landingProviderContactsData.username ||  '',
            password:  props.landingProviderContactsData.password || '',
            confirmPassword:  props.landingProviderContactsData.confirmPassword || ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            document.getElementById("landing-signup-provider").scrollIntoView()
        }, 30)
    }

    submitContactsForm(e) {
        e.preventDefault();

        const { password, confirmPassword, username } = this.state;

        if (password === confirmPassword) {
            AuthActions.checkUsername(username, this.state);
        }
    }

    handleFirstNameChange(firstName) {
        this.setState({ firstName });
    }

    handleMiddleNameChange(middleName) {
        this.setState({ middleName });
    }

    handleLastNameChange(lastName) {
        this.setState({ lastName });
    }

    handleSelectTitleChange(title) {
        this.setState({ title });
    }

    handleSelectAreaChange(area) {
        this.setState({ area });
    }

    handleEmailChange(email) {
        this.setState({ email });
    }

    handlePhoneChange(phone) {
        this.setState({ phone });
    }

    handleFaxChange(fax) {
        this.setState({ fax });
    }

    handleWebsiteChange(website) {
        this.setState({ website });
    }

    handleUsernameChange(username) {
        this.setState({ username });
    }

    handlePasswordChange(password) {
        this.setState({ password });
    }

    renderPassMatchErrors() {
        const { password, confirmPassword } = this.state;

        if (password !== confirmPassword && confirmPassword !== '') {
            return <label className="verify-errors" style={{color: 'red'}}>Passwords do not match</label>;
        }
    }

    handleConfirmPasswordChange(confirmPassword) {
        this.setState({ confirmPassword });
    }

    renderCheckUsernameErrors() {
        if (this.props.providerUserNameIsAvailable === false) {
            return <label className="verify-errors" style={{color: 'red'}}>Username is unavailable</label>;
        }
    }

    render() {
        const { firstName, lastName, middleName, title, area, email, phone, fax, website, username,
            password, confirmPassword } = this.state;

        const { providerTitleOptions, providerAreaOptions, providerUserNameIsAvailable} = this.props;

        return (
            <div className="landing-signup-provider-contacts-component">
                <form
                    onSubmit={this.submitContactsForm}
                    className="signup-provider-form"
                    id="signup-step1"
                >
                    <h2 className="registration-title">Contact info</h2>

                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="First name"
                            inputType="text"
                            inputValue={firstName}
                            onInputValueChange={this.handleFirstNameChange}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Middle name"
                            inputType="text"
                            inputValue={middleName}
                            onInputValueChange={this.handleMiddleNameChange}                            
                        />

                        <InputFormComponent
                            inputTitle="Last name"
                            inputType="text"
                            inputValue={lastName}
                            onInputValueChange={this.handleLastNameChange}
                            isRequired
                        />
                    </div>

                    <div className="section-registration">
                        <InputSelectFormComponent
                            inputTitle="Title"
                            inputValue={title}
                            onInputValueChange={this.handleSelectTitleChange}
                            options={providerTitleOptions}
                            isRequired
                        />

                        <InputSelectFormComponent
                            inputTitle="Area of Specialty"
                            inputValue={area}
                            onInputValueChange={this.handleSelectAreaChange}
                            options={providerAreaOptions}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Email"
                            inputType="email"
                            inputValue={email}
                            onInputValueChange={this.handleEmailChange}
                            isRequired
                        />
                    </div>

                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Phone"
                            inputType="text"
                            inputValue={phone}
                            onInputValueChange={this.handlePhoneChange}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Fax"
                            inputType="text"
                            inputValue={fax}
                            onInputValueChange={this.handleFaxChange}
                            pattern="^[0-9]{0,13}"                            
                        />

                        <InputFormComponent
                            inputTitle="Website"
                            inputType="text"
                            inputValue={website}
                            onInputValueChange={this.handleWebsiteChange}
                        />
                    </div>


                    {this.renderCheckUsernameErrors()}


                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Username"
                            inputType="text"
                            inputValue={username}
                            onInputValueChange={this.handleUsernameChange}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Password"
                            inputType="password"
                            inputValue={password}
                            onInputValueChange={this.handlePasswordChange}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Confirm Password"
                            inputType="password"
                            inputValue={confirmPassword}
                            onInputValueChange={this.handleConfirmPasswordChange}
                            isRequired
                        />
                    </div>

                    {this.renderPassMatchErrors()}

                    <div className="verify-block">
                        <input type="submit" className="black-button" value='Next'/>
                        <a href="#" className="black-button">Cancel</a>
                    </div>
                </form>
            </div>
        );
    }
}
