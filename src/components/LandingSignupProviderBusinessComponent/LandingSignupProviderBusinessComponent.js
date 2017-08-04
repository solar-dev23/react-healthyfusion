import React from 'react';
import autobind from 'autobind-decorator';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Link } from 'react-router';
import _ from 'lodash';

import Routes from 'routes.js';
import AuthActions from 'actions/AuthActions.js';
import InputFormComponent from 'components/InputFormComponent/InputFormComponent.js';
import InputSelectFormComponent from 'components/InputSelectFormComponent/InputSelectFormComponent.js';

import 'react-datepicker/dist/react-datepicker.css';
import './LandingSignupProviderBusinessComponent.scss'

@autobind
export default class LandingSignupProviderBusinessComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            businessName: props.landingProviderBusinessData.businessName || '',
            licenseName: props.landingProviderBusinessData.licenseName || '',
            licenseNumber: props.landingProviderBusinessData.licenseNumber || '',
            licenseState: props.landingProviderBusinessData.licenseState || '',
            licenseExpDate: (props.landingProviderBusinessData.licenseExpDate && moment(props.landingProviderBusinessData.licenseExpDate)) || '',
            primaryContactName: props.landingProviderBusinessData.primaryContactName || '',
            commonConditions: props.landingProviderBusinessData.commonConditions || '',
            referringThanks: props.landingProviderBusinessData.referringThanks || '',
            brands:  props.landingProviderBusinessData.brands || '',
            additionalComments: props.landingProviderBusinessData.additionalComments || '',
            subscribe: props.landingProviderBusinessData.subscribe || '0',
            streetAddress: props.landingProviderBusinessData.streetAddress || '',
            city: props.landingProviderBusinessData.city || '',
            state: props.landingProviderBusinessData.state || '',
            zip: props.landingProviderBusinessData.zip || ''
        };
    }

    submitBusinessForm(e) {
        e.preventDefault();

        AuthActions.goToStep3(this.state);
    }

    handleBusinessNameChange(businessName) {
        this.setState({businessName});
    }

    handleLicenseNameChange(licenseName) {
        this.setState({licenseName});
    }

    handleLicenseNumberChange(licenseNumber) {
        this.setState({licenseNumber});
    }

    handleLicenseStateChange(licenseState) {
        this.setState({licenseState});
    }

    handleLicenseExpDateChange(licenseExpDate) {
        this.setState({licenseExpDate});
    }

    handlePrimaryContactNameChange(primaryContactName) {
        this.setState({primaryContactName});
    }

    handleReferringThanksChange(referringThanks) {
        this.setState({referringThanks});
    }

    handleBrandsChange(brands) {
        this.setState({brands});
    }

    handleAdditionalCommentsChange(additionalComments) {
        this.setState({additionalComments});
    }

    handleSubscribeYesChange(subscribe) {
        this.setState({subscribe});
    }

    handleSubscribeNoChange(subscribe) {
        this.setState({subscribe});
    }

    handleStreetAddressChange(streetAddress) {
        this.setState({streetAddress});
    }

    handleCityChange(city) {
        this.setState({city});
    }

    handleStateChange(state) {
        this.setState({state});
    }

    handleCommonConditionsChange(commonConditions) {
        this.setState({ commonConditions });
    }

    handleZipChange(zip) {
        this.setState({zip});
    }


    render() {
        const { businessName, licenseName, licenseNumber, licenseState, licenseExpDate, primaryContactName,
            commonConditions, referringThanks, brands, additionalComments, streetAddress, city, state, zip } = this.state;

        const { states, landingProviderBusinessData } = this.props;

        return (
            <div className="landing-signup-provider-business-component">
                <form
                    onSubmit={this.submitBusinessForm}
                    className="signup-provider-form"
                >
                    <h3 className="registration-title">Business Info</h3>

                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Business name:"
                            inputType="text"
                            inputValue={businessName}
                            onInputValueChange={this.handleBusinessNameChange}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="License name:"
                            inputType="text"
                            inputValue={licenseName}
                            onInputValueChange={this.handleLicenseNameChange}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="License number:"
                            inputType="text"
                            inputValue={licenseNumber}
                            onInputValueChange={this.handleLicenseNumberChange}
                            isRequired
                        />

                    </div>

                    <div className="section-registration">
                        <InputSelectFormComponent
                            inputTitle="License state:"
                            inputValue={licenseState}
                            onInputValueChange={this.handleLicenseStateChange}
                            options={states}
                            isRequired
                        />

                        <label className="date-picker-block">
                            <div className="date-titel">License Expiry date:</div>
                            <div className="date-picker">
                                <DatePicker
                                    selected={licenseExpDate}
                                    onChange={this.handleLicenseExpDateChange}
                                    minDate={moment()}
                                    showYearDropdown
                                    required
                                />
                            </div>
                        </label>

                        <InputFormComponent
                            inputTitle="Primary contact name:"
                            inputType="text"
                            inputValue={primaryContactName}
                            onInputValueChange={this.handlePrimaryContactNameChange}
                        />
                    </div>

                    <h3 className="registration-title">Additional Info</h3>

                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Name the three most common conditions you treat:"
                            inputType="text"
                            inputValue={commonConditions}
                            onInputValueChange={this.handleCommonConditionsChange}
                        />

                        <InputFormComponent
                            inputTitle="Which brands do you currently carry in your practice?"
                            inputType="text"
                            inputValue={brands}
                            onInputValueChange={this.handleBrandsChange}
                        />
                    </div>

                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Whom do we thank for referring you?"
                            inputType="text"
                            inputValue={referringThanks}
                            onInputValueChange={this.handleReferringThanksChange}
                        />

                        <InputFormComponent
                            inputTitle="Any additional comments/requests?"
                            inputType="text"
                            onputValue={additionalComments}
                            onInputValueChange={this.handleAdditionalCommentsChange}
                        />
                    </div>

                    <h3 className="registration-title">Subscription</h3>

                    <div className="section-registration check-registration">
                        <label>Would you like to subscribe to Healthy Fusion email communications?</label>
                        <div className="check-value">
                            <InputFormComponent
                                inputTitle="yes"
                                inputType="radio"
                                inputValue="1"
                                onInputValueChange={this.handleSubscribeYesChange}
                                inputName="subscribe"
                            />

                            <InputFormComponent
                                inputTitle="no"
                                inputType="radio"
                                inputName="subscribe"
                                inputValue="0"
                                onInputValueChange={this.handleSubscribeNoChange}
                            />
                        </div>
                    </div>

                    <h3 className="registration-title">Main Address</h3>

                    <div className="section-registration billing-block">
                        <InputFormComponent
                            inputTitle="Street Address:"
                            inputType="text"
                            inputValue={streetAddress}
                            onInputValueChange={this.handleStreetAddressChange}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="City:"
                            inputType="text"
                            inputValue={city}
                            onInputValueChange={this.handleCityChange}
                            isRequired
                        />
                    </div>

                    <div className="section-registration billing-block">
                        <InputSelectFormComponent
                            inputTitle="State:"
                            inputValue={state}
                            onInputValueChange={this.handleStateChange}
                            options={states}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Zip:"
                            inputValue={zip}
                            onInputValueChange={this.handleZipChange}
                            inputPattern="^[0-9]{0,19}"
                            isRequired
                        />
                    </div>

                    <div className="verify-block">
                        <Link
                            to={Routes.landingSignupProviderContacts}
                            className="black-button"
                        >
                            Previous
                        </Link>

                        <input type="submit" className="black-button" value='Next'/>
                    </div>
                </form>
            </div>
        );
    }
}
