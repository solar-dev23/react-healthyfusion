import alt from 'alt.js';
// import _ from 'lodash';

import DashboardPatientsPageActions from 'actions/DashboardPatientsPageActions.js';
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions';

class DashboardPatientsPageStore {
    constructor() {
        this.bindActions(DashboardPatientsPageActions);
        this.bindActions(DashboardAccountPageActions);

        this.patientsData = [];
        this.openPatientsFormModal = false;
        this.openPatientDetailsModal = false;
        this.states = null;
        this.patientCreated = false;
        this.patientCreationErrors = '';
        this.selectedPatient = {};
        this.totalPatientsPages = null;
        this.existingUsername = false;
        this.showPatientEdit = false;

        this.pageNumber = 1;

    }

    onGetPatientsSuccess(data) {
        this.totalPatientsPages = data.Count[0].TotalCount;

        this.patientsData = data.Patients;
    }

    onOpenPatientsFormModal() {
        this.openPatientsFormModal = true;
    }

    onClosePatientsFormModal() {
        this.openPatientsFormModal = false;
        this.patientCreationErrors = '';
    }

    onOpenPatientDetailsModal() {
        this.openPatientDetailsModal = true;
    }

    onClosePatientDetailsModal() {
        this.openPatientDetailsModal = false;
    }

    onGetAllStatesSuccess(response) {
        this.states = response;
    }

    onCreatePatientSuccess(response) {
        console.log(response);
        this.openPatientsFormModal = false;
        this.patientCreated = true;
        if (response.id == 0) {
            this.existingUsername = true;
        }
    }

    onClosePatientCreatedSuccessModal() {
        this.patientCreated = false;
        this.existingUsername = false;
    }

    onCreatePatientFailed(response) {
        this.patientCreationErrors = response.responseJSON.Message;
    }

    onSelectPatient(patientId) {
        this.selectedPatientId = patientId;
        this.selectedPatient = {}
    }

    onGetSinglePatientSuccess(patientData) {
        this.selectedPatient = patientData[0]
    }
    
    onShowPatientEdit() {
        this.showPatientEdit = true;
    }
    
    onClosePatientEdit() {
        this.showPatientEdit = false;
    }

    
    onPaginate(pageNumber) {
        this.pageNumber = pageNumber;
    }
    onUpdatePatientInfoSuccess(response) {    
        this.openPatientsFormModal = false;
       
    }
    onUpdatePatientInfoFailed(response) {
        this.patientCreationErrors = response.responseJSON.Message;
    }
}

export default alt.createStore(DashboardPatientsPageStore);