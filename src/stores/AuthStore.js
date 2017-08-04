import alt from 'alt.js';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router';
import _ from 'lodash';

import Routes from 'routes.js';
import AuthActions from 'actions/AuthActions.js';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

class AuthStore {
    constructor() {
        this.bindActions(AuthActions);

        this.currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
        this.loginFailed = null;
        this.changePasswordErrors = null;
        this.changePasswordSuccess = false;
        this.providerId = null;
        this.userNameIsAvailable = false;
        this.referralCode = '';
        this.isNoValidated = false;
        this.patientEmail = '';
        this.providerSettings = {};
        this.subscriptionOptions = [];
        this.providerTitleOptions = [];
        this.providerAreaOptions = [];
        this.providerSubscribeOptions = [];
        this.cardTypeOptions = [
            {key: '0', value: 'Visa'},
            {key: '1', value: 'Master Card'},
            {key: '2', value: 'Discover'}
        ];
        this.providerUserNameIsAvailable = null;
        this.states = [];

        this.isAgreement = false;
        this.isAgreementSalesPolicy = false;
        this.isAgreementReturnPolicy = false;
        this.landingProviderContactsData = {};
        this.landingProviderBusinessData = {};
        this.landingProviderPaymentData = {
            subscriptionType: '',
            cardType: '',
            cardName: '',
            expDate: '',
            amount: '',
            cardNumber: '',
            securityCode: '',
            discountCode: ''
        };

        this.verifyCodeData = {
            referralCode: '',
            practitionerLName: '',
            email: ''
        };
    }

    onLoginSuccess(data) {
        this.currentUser = data;

        localStorage.currentUser = JSON.stringify(data);

        appHistory.push(Routes.dashboard);
    }

    onLogoutSuccess() {
        this.currentUser = null;

        localStorage.removeItem('currentUser');
        appHistory.push(Routes.main);
    }

    onLoginFailed() {
        this.loginFailed = true;
    }

    onLoginFailedReset() {
        this.loginFailed = false;
    }

    onPasswordChangeSuccess() {
        this.changePasswordErrors = null;
        this.changePasswordSuccess = true;
    }

    onPasswordChangeFailed(response) {
        this.changePasswordSuccess = false;
        this.changePasswordErrors = response;
    }

    onValidateProviderCodeSuccess(response) {
        this.providerId = response.ProviderID;
        this.userNameIsAvailable = true;
        this.isNoValidated = false;
        this.verifyCodeData.email = response.Email;
        appHistory.push(Routes.landingSignupPatientRegistration);
    }

    onValidateProviderCodeFailed() {
        this.isNoValidated = true;
    }

    onVerifyDataOnChange({ field, fieldValue }) {
        this.verifyCodeData[field] = fieldValue;
    }

    onSendPatientRegistrationDataSuccess(response) {
        if(response.id > 0) {
            appHistory.push(Routes.main);

            this.onResetValidated();
        }
    }

    onResetValidated() {
        this.verifyCodeData = {
            referralCode: '',
            practitionerLName: '',
            email: ''
        };

        this.isNoValidated = false;
    }

    onGoToStep2(data) {
        this.landingProviderContactsData = data;
        this.providerUserNameIsAvailable = true;

        appHistory.push(Routes.landingSignupProviderBusiness);
    }

    onGoToStep3(data) {
        this.landingProviderBusinessData = data;

        appHistory.push(Routes.LandingSignupProviderAgreement);
    }

    onSetReferralCode(code) {
        this.referralCode = code;
    }

    onGetProviderSettings(data) {
        this.providerSettings = data;

        data['SubscriTypes'].map(subscribeValue => this.subscriptionOptions.push({
            key: subscribeValue.SubscriptionTypeID, value: subscribeValue.Description
        }));

        data['providerTitle'].map(title => this.providerTitleOptions.push({
            key: title.ProviderTitleID, value: title.ProviderTitle
        }));

        data['providerAreas'].map(area => this.providerAreaOptions.push({
            key: area.ProffessionalTitleID, value: area.Description
        }));

        data['SubscriTypes'].map(subscribe => this.providerSubscribeOptions.push({
            key: subscribe.SubscriptionTypeID, value: subscribe.Description
        }));
    }

    onGoToStep7(data) {
        this.landingProviderPaymentData = data;

        if (data['id'] > 0) {
            appHistory.push(Routes.landingSignupProviderGratitude);
        }
    }

    onCheckUsernameFailed() {
        this.providerUserNameIsAvailable = false;
    }
    onCheckUsername(data) {

    this.providerUserNameIsAvailable = data[0].UsenameAvailability > 0 ? true : false;

}
    onGetStates(data) {
        this.states = data['States'];
    }

    onHandleAgreementChange(value) {
        this.isAgreement = value;
    }

    onHandleAgreementSalesPolicyChange(value) {
        this.isAgreementSalesPolicy = value;
    }

    onHandleAgreementReturnPolicyChange(value) {
        this.isAgreementReturnPolicy = value;
    }

    onResetProviderRegistrationData() {
        this.providerUserNameIsAvailable = null;
        this.isAgreement = false;
        this.isAgreementSalesPolicy = false;
        this.isAgreementReturnPolicy = false;
        this.landingProviderContactsData = {};
        this.landingProviderBusinessData = {};
        this.landingProviderPaymentData = {
            subscriptionType: '',
            cardType: '',
            cardName: '',
            expDate: '',
            amount: '',
            cardNumber: '',
            securityCode: '',
            discountCode: ''
        };

        appHistory.push(Routes.dashboardHomePage);
    }

    onChangeLandingPaymentData({ field, fieldValue }) {
        if (field === 'subscriptionType') {
            const selectedSubscribtion =_.find(this.providerSettings['SubscriTypes'], { 'SubscriptionTypeID': +fieldValue });

            this.landingProviderPaymentData['subscriptionType'] = fieldValue;
            this.landingProviderPaymentData['amount'] = selectedSubscribtion.Rate;
        } else {
            this.landingProviderPaymentData[field] = fieldValue;
        }
    }
}

export default alt.createStore(AuthStore);