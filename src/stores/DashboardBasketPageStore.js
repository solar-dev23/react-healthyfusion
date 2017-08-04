import alt from 'alt.js';

import DashboardBasketPageActions from 'actions/DashboardBasketPageActions.js';

class DashboardBasketPageStore {
    constructor() {
        this.bindActions(DashboardBasketPageActions);

        this.basketData = null;
    }

    onGetPatientsBasketSuccess(data) {
        this.basketData = data.Basket;
        // this.orderHistoryData = data.OrderHistory;
        this.providerId = data.ProviderId;
    }
}

export default alt.createStore(DashboardBasketPageStore);