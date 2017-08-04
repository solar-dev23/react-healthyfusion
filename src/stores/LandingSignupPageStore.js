import alt from 'alt.js';
// import _ from 'lodash';

import LandingSignupPageActions from 'actions/LandingSignupPageActions.js';

class LandingSignupPageStore {
    constructor() {
        this.bindActions(LandingSignupPageActions);
    }
}

export default alt.createStore(LandingSignupPageStore);