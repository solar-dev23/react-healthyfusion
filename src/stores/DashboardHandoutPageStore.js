import alt from 'alt.js';

import DashboardHandoutPageActions from 'actions/DashboardHandoutPageActions.js';

class DashboardHandoutPageStore {
    constructor() {
        this.bindActions(DashboardHandoutPageActions);

        this.handoutPdf=[];
        this.loading = false;
    }

    onLoading() {
        this.loading = true;
    }

    offLoading() {
        this.loading = false;
    }

    onGetDashboardHandoutSuccess(data) {
        this.handoutPdf = data.productData;
        this.productDataAll=data.productDataAll;
    }
}

export default alt.createStore(DashboardHandoutPageStore);