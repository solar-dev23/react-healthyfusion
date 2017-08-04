import BaseService from './BaseService.js';

class AccountService extends BaseService {
    getProviderDetails() {
        return this.get('providers/GetProviderDetails');
    }

    getAllStates() {
        return this.get('companies/users/GetAllStates');
    }

    updateProvidersProfInfo(requestData) {
        return this.put('providers/UpdateProviderEmergencyContact', requestData);
    }

    updateProfInfo(requestData) {
        return this.put('providers/UpdateProvider', requestData);
    }
    getEulaLicense(){
         return this.get('auth/getEulaLicense');
    }

    getPatientInfo() {
        return this.get('Patient/GetPatientinfo');
    }

    updatePatientInfo(requestData) {
        return this.put('Patient/UpdatePatient', requestData);
    }

    UploadDocument(data)
    {
        return this.post('providers/UploadDocument',data);
    }
    getProviderLicense(data){
         return this.get('providers/GetProviderLicense/'+data);
    }
    getPatientLicense(data){
         return this.get('Patient/GetPatientLicense/'+data);
    }
    
    UpdateProviderLicense(providerId){
        return this.put('providers/UpdateProviderLicense',providerId)
    }
    UpdateEulaLicense(data){
         return this.post('auth/UpdateEulaLicense',data)
    }
    UpdatePatientLicense(patientId){
        return this.put('Patient/UpdatePatientLicense',patientId)
    }
    getProviderSettings()
    {
          return this.get('providers/getProviderSettings');
    }

     selectOrder(OrderId){
         return this.get('providers/GetOrderDetails/'+OrderId);
    }
}

export default new AccountService();
