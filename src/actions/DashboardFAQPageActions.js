import alt from 'alt.js'

import HelpService from 'services/HelpService.js';

class DashboardFAQPageActions {
    constructor() {
        this.generateActions(
            'getDashboardFaqDataSuccess'
        );
    }

    getDashboardFaqData() {
        HelpService.getDashboardFaqData()
            .then(data => this.actions.getDashboardFaqDataSuccess(data))
            .catch(data => console.log(data))
    }
}

export default alt.createActions(DashboardFAQPageActions);