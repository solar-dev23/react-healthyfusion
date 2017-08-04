'use strict';

function patients (requestSender) {
    this.rs = requestSender;
}

patients.prototype = {
    show: function(pageNumber) {
        var rowsCount = 10;

        if (!pageNumber) {
            pageNumber = 0;
        }

        return this.rs().get('providers/GetPatientsPage/' + pageNumber + '/' + rowsCount);
    },
     showpatientAccount: function() {
        return this.rs().get('Patient/GetPatientinfo');
    },
    getStates:function() {
        return this.rs().get('companies/users/GetAllStates');
    },
    getStateslog:function() {
        return this.rs().get('auth/GetAllStates');
    },
    getProvidercode:function(){
     return this.rs().get('Patient/GetProviderCode');
    },
    deletePatient: function(id) {
        return this.rs().delete('Patient/'+id);
    },
     getProviderslog: function() {
        return this.rs().get('auth/GetProviderCode');
    },



  AddPatient:function(data) {
   // alert(JSON.stringify(data.Adrressdetails))

      return this.rs().post('Patient',{Phone:data.userinfo.Phone,
       FirstName:data.userinfo.FirstName,
      LastName:data.userinfo.LastName,
       UserName:data.userinfo.Username,
      Password:data.userinfo.Password,
       Email:data.userinfo.Email,
       DOB:data.userinfo.dob,
         TitleID:1,
        PatientAddress:data.Adrressdetails


   });
},
getDetails: function(id) {
 
        return this.rs().get('Patient/'+id);
    },

  UpdatePatient:function(data) {
   // alert(JSON.stringify(data.Adrrssdetails))

      return this.rs().put('Patient/UpdatePatient',{Phone:data.Phone,
       FirstName:data.FirstName,
      LastName:data.LastName,
       Email:data.Email,
     
       AddressTypeID:data.AddressTypeID,
           Address1:data.Address1,
            Address2:data.Address1,
           StateCode: data.StateCode,
           City:data.City,
           CountryID:1,
            Zip: data.Zip


   });
},

  AddPatientlog:function(data) {
    var s='1990-06-28';
     return this.rs().post('auth',{Phone:data.update.userinfo.Phone,
       FirstName:data.update.userinfo.FirstName,
      LastName:data.update.userinfo.LastName,
       UserName:data.update.userinfo.Username,
      Password:data.update.userinfo.Password,
       Email:data.update.userinfo.Email,
       DOB:s,
       providercode:data.update.userinfo.ProviderCode,
         TitleID:1,
        PatientAddress:data.update.Adrressdetails
        

   });
},


}
module.exports = patients;