'use strict';

function Providers (requestSender) {
    this.rs = requestSender;
}

Providers.prototype = {
    index: function(companyId) {
        return this.rs().get('companies/'+companyId+'/funds');
    },

    add: function(companyId, fund) {
        return this.rs().post('companies/'+companyId+'/funds', {description: fund.description});
    },

    update: function(companyId, id, fund) {
        return this.rs().put('companies/'+companyId+'/funds/'+id, {description: fund.description});
    },

    delete: function(companyId, id) {
        return this.rs().delete('companies/'+companyId+'/funds/'+id);
    },

    getProviders: function() {
        return this.rs().get('providers/GetProviderDetails');
    },

    getAllProducts: function() {
        return this.rs().get('products/GetProducts');
    },

    getProductsByPage: function(pageNumber) {
        var productCount = 2;

        if (!pageNumber) {
            pageNumber = 0;
        }

        return this.rs().get('products/GetProductsByPage/' + pageNumber + '/' + productCount);
    },
    getProvidersprofile: function() {
        return this.rs().get('auth/GetProviderAgreement');
    },

   // submitProvider: function(data,info) {
   //      return this.rs().post('providers/AddProvider',
   //                     {  
   //                          Phone:info.phone,
   //                          FirstName: info.firstname,
   //                          LastName: info.lastname,
   //                          UserName: info.username,
   //                          Password:info.password,
   //                          Email:info.email,
   //                          LiscenceName: data.licensename,
   //                          LiscenceNum:data.licenseno,
   //                          PracticeBusiness: data.bname,
   //                          TitleID:Number(info.title),
   //                          LicenseExpDate:'2018-06-28',
   //                          LicenseStateID:data.licensestate

   //                     });
   //  },

    submitProvider: function(data,info) {
        return this.rs().post('auth/AddProvider',
                       {  
                            Phone:info.userInfo.phone,
                            FirstName: info.userInfo.firstname,
                            LastName: info.userInfo.lastname,
                            UserName: info.userInfo.username,
                            Password:info.userInfo.password,
                            Email:info.userInfo.email,
                            LiscenceName: info.licensename,
                            LiscenceNum:info.licenseno,
                            PracticeBusiness: info.bname,
                            TitleID:Number(info.userInfo.title),
                            LicenseExpDate:info.licexpdate,
                            LicenseStateID:info.licensestate,
                            LicenseAgrID :data.checkedid,
                             PTitleID: info.ptitle

                       });
    },


     deleteProvider: function(id) {
        return this.rs().delete('providers/'+id);
    },
    saveProviders: function(data) {
     // alert("hai");
     // alert(JSON.stringify(data))
      return this.rs().put('providers/UpdateProvider',
                       {  
                            Phone: data.phone,
                            FirstName: data.firstName,
                            LastName: data.lastName,
                             Email: data.email,
                                TitleID:Number( data.pTitleID)
                                });
                         
                           

                        
    },
     saveProvidersAppinfo: function(data) {
     // alert("hai");
     // alert(JSON.stringify(data))
      return this.rs().put('providers/UpdateProviderEmergencyContact',
                       {  
                             LiscenceName:data.Lname,
                           LiscenceNum:data.Lnum,
                            PracticeBusiness: data.PBus,
                          ProfessionalId:Number(data.PID),
                            LicenseExpDate:data.Ldate,
                            LicenseStateID:data.LstateId
                           
 });
                        
    }
}
module.exports = Providers;