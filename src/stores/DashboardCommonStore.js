import alt from 'alt.js';
// import _ from 'lodash';

import DashboardCommonActions from 'actions/DashboardCommonActions.js';

class DashboardCommonStore {
    constructor() {
        this.bindActions(DashboardCommonActions);

        this.loading = false;
    }

    onLoading() {
        this.loading = true;
    }

    offLoading() {
        this.loading = false;
    }

}

export default alt.createStore(DashboardCommonStore);