'use strict';

var createVendor = function(vendor) {
    return {
        name: vendor.name,
        bill1: vendor.bill1,
        bill2: vendor.bill2,
        bill3: vendor.bill3,
        bill4: vendor.bill4,
        bill5: vendor.bill5,
        taxId: vendor.taxId,
        accountNumber: vendor.accountNumber,
        mainEmail: vendor.mainEmail,
        mainPhone: vendor.mainPhone,
        costDistributions: vendor.costDistributions ? vendor.costDistributions.map(function(cd) { return {
            name:cd.name,
            payments: cd.payments.map(function(payment){
                  return  {
                    costCenterId: payment.costCenterId,
                    accountId: payment.accountId,
                    fundId: payment.fundId,
                    briefDescription: payment.briefDescription,
                    amountPercent: parseFloat(payment.amountPercent) / 100
                  }
            })
        }}) : []
    };
};

function Vendors (requestSender) {
    this.rs = requestSender;
}

Vendors.prototype = {
    index: function(companyId) {
        return this.rs().get('companies/'+companyId+'/vendors')
                 .then(function(vendors) {
                    vendors.forEach(function(vendor) {
                        if(vendor.costDistributions) {
                            vendor.costDistributions.forEach(function(item) {
                                item.payments.forEach(function(payment){
                                    payment.amountPercent = parseFloat((payment.amountPercent * 100).toFixed(5)).toString();
                                })
                            });
                        }
                    });

                    return vendors;
                 });
    },

    indexActive: function(companyId) {
        return this.rs().get('companies/'+companyId+'/vendors/active');
    },

    params: function(companyId) {
        return this.rs().get('companies/'+companyId+'/vendors/params');
    },

    add: function(companyId, vendor) {
        return this.rs().post('companies/'+companyId+'/vendors', createVendor(vendor));
    },

    update: function(companyId, id, vendor) {
        return this.rs().put('companies/'+companyId+'/vendors/'+id, createVendor(vendor));
    },

    delete: function(userId) {
        
        return this.rs().delete('companies/users/'+userId);
    },

    restore: function(companyId, id) {
        return this.rs().put('companies/'+companyId+'/vendors/'+id+'/restore');
    },

    isVendorNameAvialable: function(companyId, vendorName) {
        return this.rs().get('companies/' + companyId + '/vendors/isVendornameAvailable/?vendorName=' + vendorName);
    },
     GetUsers: function() {
        return this.rs().get('companies/users');
    },
     
EditUserByID:function(userId,data) {
        return this.rs().put('companies/users/'+userId,
                       {  
        Phone:data.Phone,
        FirstName:data.FirstName,
        LastName:data.LastName,
        UserName:data.Username,        
        Email:data.Email,
        Role:Number(data.role)

                       });
    },

 addUser: function(data) {
        return this.rs().post('companies/users/AddUser',
                       {  
        Phone:data.Phone,
        FirstName:data.FirstName,
        LastName:data.LastName,
        UserName:data.Username,
        Password:data.Password,
        Email:data.Email,
        RoleID:Number(data.role)

                       });
    },

     getUserbyID: function(userId) {
        return this.rs().get('companies/users/' + userId);
    },
 DeleteUserByID:function(data,userId) {
        return this.rs().delete('companies/users/'+userId,
                       {  
        Reason:data.reason      

                       });
    },
    AddPatient:function(data) {

        return this.rs().post('Patient',{Phone:data.patient.Phone,
       FirstName:data.patient.Firstname,
      LastName:data.patient.LastName,
       UserName:data.patient.Username,
      password:data.patient.Password,
       Email:data.patient.Email,
         TitleID:data.patient.Travelradius


    });
}
}

module.exports = Vendors;
