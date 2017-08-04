'use strict';

var Q = require('q');

function Auth (rs) {
    this.rs = rs;
}

Auth.prototype = {
    login: function(loginData){
        return this.rs().post('auth/login', { Username: loginData.username, Password: loginData.password })
                 .then(function(data){
                    this.rs().setAuthToken(data.authToken);

                    return data;
                }.bind(this));
    },

    resetPassword: function(resetPasswordData) {
        return this.rs().post('auth/resetPassword',
                       {
                            oldPassword: resetPasswordData.oldPassword,
                            newPassword: resetPasswordData.newPassword
                       });
    },

    forgotPassword: function(forgotPasswordData) {
        return this.rs().post('auth/forgotPassword',
                       {
                            username: forgotPasswordData.username,
                       });
    },

    restorePassword: function(restorePasswordData) {
        return this.rs().post('auth/restorePassword',
                       {
                            newPassword: restorePasswordData.newPassword,
                            hash: restorePasswordData.hash
                       })
                 .then(function(data){

                   // this.rs().setAuthToken(data.authToken);

                    return data;
                 });
    },

    logout: function(){
        return this.rs().post('auth/logout', {});
    },

    relogin: function(data){
        return this.rs().post('auth/reloginAs/' + data.userId, {}).then(function(data){
            this.rs().setAuthToken(data.authToken);

                    return data;
                }.bind(this));
    },


    registerCompany: function(company) {

        var bool=company.quickbook==true? 1 : 0 ;
        company.quickbook=bool;
       
        return this.rs().post('auth/registerCompany', {
            Name:  company.companyName,
            Address: company.companyAddress,
            AdminUsername: company.userName,
            AdminFirstName: company.firstName,
            AdminLastName: company.lastName,
            AdminEmail: company.emailAddress,
            Quickbook: company.quickbook
            
            
        });
    },

    getLicenseAgreement: function() {
        return this.rs().get('auth/licenseAgreement');
    },

    acceptLicenseAgreement: function() {
        return this.rs().post('auth/acceptLicenseAgreement');
    }
}

module.exports = Auth;

