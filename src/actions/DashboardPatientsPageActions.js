import alt from 'alt.js'

import PatientsService from 'services/PatientsService.js';

class DashboardPatientsPageActions {
    constructor() {
        this.generateActions(
            'getPatientsSuccess',
            'openPatientsFormModal',
            'closePatientsFormModal',
            'createPatientSuccess',
            'createPatientFailed',
            'selectPatient',
            'openPatientDetailsModal',
            'closePatientDetailsModal',
            'getSinglePatientSuccess',
            'getSinglePatientFailed',
            'closePatientCreatedSuccessModal',
            'showPatientEdit',
            'closePatientEdit',
            'onPaginate',
            'updatePatientInfoSuccess',
            'updatePatientInfoFailed'

        );
    }

    getPatients(pageNumber) {
        PatientsService.getPatientsPage(pageNumber)
            .then(data => this.actions.getPatientsSuccess(data))
            .catch(data => console.log(data));
    }

    createPatient(patientData) {
        PatientsService.createPatientExtended(patientData)
            .then(data => this.actions.createPatientSuccess(data))
            .catch(data => this.actions.createPatientFailed(data))
    }

    getSinglePatient(patientId) {
        PatientsService.getSinglePatient(patientId)
            .then(data => this.actions.getSinglePatientSuccess(data))
            .catch(data => this.actions.getSinglePatientFailed(data))
    }
   
    updatePatientInfo(patientData) {
        PatientsService.updatePatientInfo(patientData)
            .then(data => this.actions.updatePatientInfoSuccess(data))
            .catch(data => this.actions.updatePatientInfoFailed(data))
    }
}

export default alt.createActions(DashboardPatientsPageActions);