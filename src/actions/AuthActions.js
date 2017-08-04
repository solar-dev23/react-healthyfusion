import alt from 'alt.js'

import AuthService from 'services/AuthService.js';

class AuthActions {
    constructor() {
        this.generateActions(
            'loginSuccess',
            'logoutSuccess',
            'loginFailed',
            'loginFailedReset',
            'logoutFailed',
            'passwordChangeSuccess',
            'passwordChangeFailed',
            'validateProviderCodeSuccess',
            'validateProviderCodeFailed',
            'sendPatientRegistrationDataSuccess',
            'sendPatientRegistrationDataFailed',
            'resetValidated',
            'goToStep2',
            'goToStep3',
            'setReferralCode',
            'handleAgreementChange',
            'handleAgreementSalesPolicyChange',
            'handleAgreementReturnPolicyChange',
            'resetProviderRegistrationData',
            'checkUsernameFailed',
            'onChangeLandingPaymentData',
            'verifyDataOnChange',
            'checkUsername'
        );
    }

    login(loginData) {
        AuthService.login(loginData)
            .then(data => this.actions.loginSuccess(data))
            .catch(() => this.actions.loginFailed());
    }

    logout() {
        AuthService.logout();

        this.actions.logoutSuccess();
    }

    changePassword(data) {
        AuthService.changePassword(data)
            .then((data) => this.actions.passwordChangeSuccess())
            .catch((data) => this.actions.passwordChangeFailed(data));
    }

    validateProviderCode(data) {
        AuthService.validateProviderCode(data).then(data => {
            const responseData = data[0];

            if (responseData.ProviderID > 0 && responseData.UnameAvailable === 1) {
                this.actions.validateProviderCodeSuccess(responseData)
            } else {
                this.actions.validateProviderCodeFailed();
            }
        });
    }

    sendPatientRegistrationData(data) {
        AuthService.sendPatientRegistrationData(data)
            .then(data => this.actions.sendPatientRegistrationDataSuccess(data))
            .catch(data => this.actions.sendPatientRegistrationDataFailed(data));
    }

    getProviderSettings() {
        AuthService.getProviderSettings().then(data => this.dispatch(data));
    }

    checkUsername(username, state) {
        AuthService.checkUsername(username).then(data => {
            if (data[0].UsenameAvailability > 0) {
                this.actions.goToStep2(state);
            } else {
                this.actions.checkUsernameFailed();
            }
        });
    }

    checkUsernamePatient(username)
    {
             AuthService.checkUsername(username).then((data) => this.actions.checkUsername(data));
    }

    getStates() {
        AuthService.getStates().then(data => this.dispatch(data));
    }

    goToStep7(requestData) {
        AuthService.addProvider(requestData).then(data => this.dispatch(data));
    }
}

export default alt.createActions(AuthActions);