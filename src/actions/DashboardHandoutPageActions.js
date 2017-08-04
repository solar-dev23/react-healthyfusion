import alt from 'alt.js'

import DashboardHandoutService from 'services/DashboardHandoutService.js';

class DashboardHandoutPageActions {
    constructor() {
        this.generateActions(
            'getDashboardHandoutSuccess'
        );
    }

    getDashboardHandoutpdf(search) {
        DashboardHandoutService.getDashboardHandoutpdf(search)
            .then(data => this.actions.getDashboardHandoutSuccess(data))
            .catch(data => console.log(data))
    }
}

export default alt.createActions(DashboardHandoutPageActions);