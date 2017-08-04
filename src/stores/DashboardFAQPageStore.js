import alt from 'alt.js';

import DashboardFAQPageActions from 'actions/DashboardFAQPageActions.js';

class DashboardFAQPageStore {
    constructor() {
        this.bindActions(DashboardFAQPageActions);

        this.faqData=[];
        this.loading = false;
    }

    onLoading() {
        this.loading = true;
    }

    offLoading() {
        this.loading = false;
    }

    onGetDashboardFaqDataSuccess(data) {
        this.faqData = data;
    }
}

export default alt.createStore(DashboardFAQPageStore);