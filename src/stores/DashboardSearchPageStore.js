import alt from 'alt.js';
import _ from 'lodash';

import DashboardSearchPageActions from 'actions/DashboardSearchPageActions.js';

class DashboardSearchPageStore {
    constructor() {
        this.bindActions(DashboardSearchPageActions);
        this.medications = [];
        this.symptoms = [];
        this.searchResults = [];
        this.noResults = false;
        this.searchedBy = '';
        this.monographData = null;
        this.conditions=[];
        this.nutritions=[];
        this.labTests=[];
        this.selectedMonographSection = null;
     }

    onGetMedicationsSuccess(response) {
        this.medications = response;
    }

    onGetSymptomsSuccess(response) {
        this.symptoms = response;
    }

    onSearchSuccess({data, searchedBy}) {
        this.searchResults = data;
        if (data.length > 0) {
            this.noResults = false;
        } else {
            this.noResults = true;
        }
        this.searchedBy = searchedBy;
    }
 
    onGetMonographDetailsSuccess(data) {
        this.monographData = data;
        this.selectedMonographSection = data.Monograph? data.Monograph[0]:null;
    }
 
     getAllSearchDataSuccess(data) {
        this.medications = data.Medications;
        this.conditions= data.Conditions;
        this.symptoms=data.Symptoms;
        this.nutritions= data.Nutritions;
        this.labTests= data.LabTests;
    }
     searchNutritionSuccess(data) {
        this.searchResults = data;
        if (data.length > 0) {
            this.noResults = false;
        } else {
            this.noResults = true;
        }
      } 
    
    onClearSearchResult() {
        this.searchResults = [];
    }
    
    onSelectMonographSection(sectionId) {
       this.selectedMonographSection = _.find(this.monographData.Monograph, {'SectionId': sectionId});
    }

    onResetSelectedMonographSection() {
        this.selectedMonographSection = null;
    }
}

export default alt.createStore(DashboardSearchPageStore);