import BaseService from './BaseService.js';

class PatientsService extends BaseService {
    getPatients() {
        return this.get('providers/GetPatients');
    }

    getPatientsPage(pageNumber) {
        const rowsCount = 10;

        if (!pageNumber) {
            pageNumber = 0;
        }

        return this.get('providers/GetPatientsPage/' + pageNumber + '/' + rowsCount);
    }

    createPatient(patientData) {
        return this.post('providers/AddNewPatient', patientData);
    }

    createPatientExtended(patientData) {
        return this.post('Patient/', patientData);
    }

    getSinglePatient(patientId) {
        return this.get('Patient/' + patientId);
    }
    updatePatientInfo(requestData) {
        return this.put('providers/UpdatePatient', requestData);
    }
}

export default new PatientsService();
