import alt from 'alt.js'

import SearchService from 'services/SearchService.js';

class DashboardSearchPageActions {
    constructor() {
        this.generateActions(
            'getMedicationsSuccess',
            'getSymptomsSuccess',
            'searchSuccess',
            'getMonographDetailsSuccess',
            'getAllSearchDataSuccess',
            'searchNutritionSuccess',
            'clearSearchResult',
            'selectMonographSection',
            'resetSelectedMonographSection'
        );
    }

    getMedications() {
        SearchService.getMedications()
            .then(data => this.actions.getMedicationsSuccess(data))
    }

    getSymptoms() {
        SearchService.getSymptoms()
            .then(data => this.actions.getSymptomsSuccess(data))
    }

    searchByMedication(searchString) {
        SearchService.searchByMedication(searchString)
            .then(data => this.actions.searchSuccess({data: data, searchedBy: 'medication'}))
    }

    searchBySymptom(searchString) {
        SearchService.searchBySymptom(searchString)
            .then(data => this.actions.searchSuccess({data: data, searchedBy: 'symptom'}))
    }
    
    getMonographDetails() {
        SearchService.getMonographDetails()
            .then(data => this.actions.getMonographDetailsSuccess(data));
    }
    
    getAllSearchData() {
        SearchService.getAllSearchData()
            .then(data => this.actions.getAllSearchDataSuccess(data))
    }
    
    searchNutrition(type,searchString) {
        SearchService.searchNutrition(type,searchString)
            .then(data => this.actions.searchNutritionSuccess(data))
    }
    
    getMonographDetailsById(monoId) {
        SearchService.getMonographDetailsById(monoId)
            .then(data => this.actions.getMonographDetailsSuccess(data));
    }

    getMonographSections(values)
    {
         SearchService.getMonographSections(values)
            .then(data => this.actions.getMonographDetailsSuccess(data));
    }

}

export default alt.createActions(DashboardSearchPageActions);