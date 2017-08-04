import alt from 'alt.js'

import ProductsService from 'services/ProductsService.js';

class DashboardBasketPageActions {
    constructor() {
        this.generateActions(
            'getPatientsBasketSuccess'
        );
    }

    getPatientsBasket() {
        ProductsService.getPatientsBasket()
            .then(data => this.actions.getPatientsBasketSuccess(data));
    }
}

export default alt.createActions(DashboardBasketPageActions);