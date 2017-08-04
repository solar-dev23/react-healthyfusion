import React from 'react';
import autobind from 'autobind-decorator';
import Routes from 'routes.js';
import { Link } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

import AuthActions from 'actions/AuthActions.js';
import InputFormComponent from 'components/InputFormComponent/InputFormComponent.js';
import InputSelectFormComponent from 'components/InputSelectFormComponent/InputSelectFormComponent.js';

import './LandingSignupProviderPaymentComponent.scss'
import 'react-datepicker/dist/react-datepicker.css';

@autobind
export default class LandingSignupProviderPaymentComponent extends React.Component {
    state = {
        subscriptionType: '',
        cardType: '',
        cardName: '',
        expDate: '',
        amount: '',
        cardNumber: '',
        securityCode: '',
        discountCode: ''
    };



    submitPaymentForm(e) {
        e.preventDefault();
        // const paymentData = this.props.landingProviderPaymentData;

        const { landingProviderContactsData, landingProviderBusinessData, landingProviderPaymentData } = this.props;

        landingProviderPaymentData['expDate'] = moment(this.state.expDate).format('MM/DD/YYYY');

        const requestData = {
            PracticeBusiness: landingProviderBusinessData['businessName'],
            LiscenceName: landingProviderBusinessData['licenseName'],
            LiscenceNum: landingProviderBusinessData['licenseNumber'],
            LicenseStateID: landingProviderBusinessData['licenseState'],
            LicenseExpDate:  moment(landingProviderBusinessData['licenseExpDate']).format('MM/DD/YYYY'),
            PrimaryContact: landingProviderBusinessData['primaryContactName'],
            Conditions: landingProviderBusinessData['commonConditions'],
            ReferenceName: landingProviderBusinessData['referringThanks'],
            BrandsName: landingProviderBusinessData['brands'],
            Comments: landingProviderBusinessData['additionalComments'],
            SubscribeEmail: landingProviderBusinessData['subscribe'],
            FirstName: landingProviderContactsData['firstName'],
            LastName: landingProviderContactsData['lastName'],
            MiddleName: landingProviderContactsData['middleName'],
            TitleID: landingProviderContactsData['title'],
            ProfessionalId: landingProviderContactsData['area'],
            Email: landingProviderContactsData['email'],
            Phone: landingProviderContactsData['phone'],
            FaxNo: landingProviderContactsData['fax'],
            Website: landingProviderContactsData['website'],
            UserName: landingProviderContactsData['username'],
            Password: landingProviderContactsData['password'],
            PaymentMethod: "Credit Card",
            ProviderCode: "",
            SubscriptionType: landingProviderPaymentData.subscriptionType,
            CardType: landingProviderPaymentData.cardType,
            NameonCard: landingProviderPaymentData.cardName,
            CardExpiry: landingProviderPaymentData.expDate,
            CardNo: landingProviderPaymentData.cardNumber,
            CardCvv: landingProviderPaymentData.securityCode,
            DiscountCode: landingProviderPaymentData.discountCode,
            provideraddress: [
                {
                    AddressTypeId: 1,
                    Address1: landingProviderBusinessData['streetAddress'],
                    Address2: "",
                    City: landingProviderBusinessData['city'],
                    CountryId: "USA",
                    StateCode: landingProviderBusinessData['state'],
                    zip: landingProviderBusinessData['zip']
                }
            ]

        };

        AuthActions.goToStep7(requestData);
    }

    onChangePaymentDataParse(field, fieldValue) {
        AuthActions.onChangeLandingPaymentData({ field, fieldValue });
    }

    handleSubscriptionTypeChange(subscriptionType) {
        this.onChangePaymentDataParse('subscriptionType', subscriptionType);
    }

    handleCardTypeChange(cardType) {
        this.onChangePaymentDataParse('cardType', cardType);
    }

    handleCardNameChange(cardName) {
        this.onChangePaymentDataParse('cardName', cardName);
    }

    handleExpDateChange(expDate) {
        this.onChangePaymentDataParse('expDate', expDate);
    }

    handleCardNumberChange(cardNumber) {
        this.onChangePaymentDataParse('cardNumber', cardNumber);
    }

    handleSecurityCodeChange(securityCode) {
        this.onChangePaymentDataParse('securityCode', securityCode);

    }

    handleDiscountCodeChange(discountCode) {
        this.onChangePaymentDataParse('discountCode', discountCode);

    }

    render() {
        const { cardTypeOptions , providerSubscribeOptions, landingProviderPaymentData } = this.props;
        const { subscriptionType, cardType, cardName, expDate, amount, cardNumber, securityCode, discountCode } = landingProviderPaymentData;

        return (
            <div className="landing-signup-provider-payment-component">
                <form
                    onSubmit={this.submitPaymentForm}
                    className="signup-provider-form"
                >
                    <h3 className="registration-title">Payment information</h3>

                    <div className="section-registration">
                        <InputSelectFormComponent
                            inputTitle="Subscription type:"
                            inputValue={subscriptionType}
                            onInputValueChange={this.handleSubscriptionTypeChange}
                            options={providerSubscribeOptions}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Amount:"
                            inputType="text"
                            inputValue={amount}
                            disabled
                        />
                    </div>
                    <div className="section-registration">
                        <InputSelectFormComponent
                            inputTitle="Card type:"
                            inputValue={cardType}
                            onInputValueChange={this.handleCardTypeChange}
                            options={cardTypeOptions}
                            isRequired
                        />

                        <InputFormComponent
                            inputTitle="Card number:"
                            inputType="text"
                            inputValue={cardNumber}
                            onInputValueChange={this.handleCardNumberChange}
                            isRequired
                        />
                    </div>
                    <div className="section-registration">
                        <InputFormComponent
                            inputTitle="Name on card:"
                            inputType="text"
                            inputValue={cardName}
                            onInputValueChange={this.handleCardNameChange}
                            isRequired
                        />

                        <div className="secure-block">
                            <InputFormComponent
                                inputTitle="Security code:"
                                inputType="text"
                                inputValue={securityCode}
                                onInputValueChange={this.handleSecurityCodeChange}
                                isRequired
                            />
                        </div>
                    </div>
                    <div className="section-registration">
                        <label className="date-picker-block">
                            <div className="date-titel">Expiry date:</div>
                            <div className="date-picker">
                                <DatePicker
                                    selected={expDate}
                                    onChange={this.handleExpDateChange}
                                    minDate={moment()}
                                    showYearDropdown
                                    required
                                />
                            </div>
                        </label>

                        <InputFormComponent
                            inputTitle="Discount code:"
                            inputType="text"
                            inputValue={discountCode}
                            onInputValueChange={this.handleDiscountCodeChange}
                            isRequired
                        />
                    </div>

                    <div className="verify-block">
                        <Link
                            to={Routes.LandingSignupProviderReturnPolicy}
                            className="black-button"
                        >
                            Previous
                        </Link>
                        <input type="submit" className="black-button" value='Submit'/>
                    </div>
                </form>
            </div>
        );
    }
}
