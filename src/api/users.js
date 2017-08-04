'use strict';

function Users (requestSender) {
    this.rs = requestSender;
}

Users.prototype = {
    index: function(companyId) {
        return this.rs().get('companies/'+companyId+'/users');
    },

    get: function(companyId, userId) {
        return this.rs().get('companies/'+companyId+'/users/' + userId);
    },

    add: function(companyId, user) {
        return this.rs().post('companies/'+companyId+'/users', {
            positionId: user.positionId,
            address: user.address,
            createdDate: user.createdDate,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            userName: user.userName,
            positionName: user.positionName,
            signature: user.signature,
            password: user.password
        });
    },

    update: function(companyId, id, user) {
        return this.rs().put('companies/'+companyId+'/users/'+id, {
            positionId: user.positionId,
            address: user.address,
            createdDate: user.createdDate,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            userName: user.userName,
            positionName: user.positionName,
            signature: user.signature,
            password: user.password
        });
    },

    delete: function(companyId, id) {
        return this.rs().delete('companies/'+companyId+'/users/'+id);
    },

    params: function(companyId) {
        return this.rs().get('companies/'+companyId+'/users/params');
    },

    regeneratePassword: function(companyId, id) {
        return this.rs().post('companies/'+companyId+'/users/'+id + '/regeneratePassword');
    },

    restore: function(companyId, id) {
        return this.rs().post('companies/'+companyId+'/users/'+id + '/restore');
    },

    isUserNameAvialable: function(companyId, username) {
        return this.rs().get('companies/' + companyId + '/users/isUsernameAvailable/' + username);
    },

    getPendingApprovalsCount: function(companyId) {
        return this.rs().get('companies/'+ companyId +'/users/me/pendingApprovalsCount');
    },

    signature: function(companyId, userId) {
        return this.rs().get('companies/'+companyId+'/users/'+userId + '/signature'); 
    }
}

module.exports = Users;