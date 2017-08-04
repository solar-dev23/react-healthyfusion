import alt from 'alt.js';
// import _ from 'lodash';

import DashboardQuickOrderPageActions from 'actions/DashboardQuickOrderPageActions.js';

class DashboardQuickOrderPageStore {
    constructor() {
        this.bindActions(DashboardQuickOrderPageActions);
    }
}

export default alt.createStore(DashboardQuickOrderPageStore);