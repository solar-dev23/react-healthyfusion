import BaseService from './BaseService.js';

class ProductsService extends BaseService {
    getSymptoms() {
        return this.get('search/Symptom');
    }

    getMedications() {
        return this.get('search/Medication');
    }

    searchBySymptom(searchString) {
        return this.post('search/SearchNutrientsBySymtoms', {stringtosearch: searchString})
    }

    searchByMedication(searchString) {
        return this.post('search/SearchNutrientsByMedication', {stringtosearch: searchString})
    }

    getMonographDetails() {
        return this.get('providers/GetMonographDetails');
    }

    getAllSearchData() {
        return this.get('search/AllSearchData');
    }

    searchNutrition(type,searchString) {
        return this.post('search/SearchNutrition', { Type: type, SearchString: searchString })
    }

    getMonographDetailsById(monoId) {
        return this.get(`providers/GetMonographDetailsbyID/${monoId}`)
    }


    getMonographSections(values){
         return this.post('search/GetMonographSections',{MonographTypeID:values[1],SelectedItem:values[0]});
    }

}

export default new ProductsService();
