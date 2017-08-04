import BaseService from './BaseService.js';

class AuthService extends BaseService {
    login(loginData) {
        return this.post('auth/login', { Username: loginData.username, Password: loginData.password });
    }

    logout() {
        return this.post('auth/logout', {});
    }

    changePassword(data) {
        return this.post('auth/resetPassword', {newPassword: data.newPassword, oldPassword: data.oldPassword});
    }

    validateProviderCode(data) {
        return this.post('portal/searchProviderCode', {providercode: data.referralCode, lastname: data.practitionerLName, email: data.email});
    }

    sendPatientRegistrationData(data) {
        const requestData = {
            FirstName: data.firstName,
            LastName: data.lastName,
            UserName: data.email,
            Password: data.password,
            Phone: data.phone,
            Email: data.email,
            providercode: data.referralCode,
            PatientAddress: {
                AddressTypeId: 1,
                Address1: data.streetAddress1,
                Address2: data.streetAddress2,
                City: data.city,
                StateCode: data.state,
                zip: data.zipCode,
                CountryId: data.country
            }
        };

        return this.post('portal/AddPatient', requestData);
    }

    getProviderSettings() {
        return this.get('portal/ProviderSettings');
    }

    checkUsername(username) {
        return this.get(`portal/checkUNameAvailability/${username}`);
    }

    getStates() {
        return this.get('portal/StateList');
    }

    addProvider(requestData) {
        return this.post('portal/AddProviderData', requestData);
    }
}

export default new AuthService();
