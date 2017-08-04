import alt from 'alt.js';
// import _ from 'lodash';

import LandingPageActions from 'actions/LandingPageActions.js';

class LandingPageStore {
    constructor() {
        this.bindActions(LandingPageActions);

        this.data = 'Hello';
    }

    onTest() {
        this.data = 'BYEEE';
    }
}

export default alt.createStore(LandingPageStore);