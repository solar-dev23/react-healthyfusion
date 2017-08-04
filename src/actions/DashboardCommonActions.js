import alt from 'alt.js'

class DashboardCommonActions {
    constructor() {
        this.generateActions(
            'onLoading',
            'offLoading'
        );
    }
}

export default alt.createActions(DashboardCommonActions);