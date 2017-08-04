import alt from 'alt.js';

import Routes from 'routes.js';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router';
import HelpActions from 'actions/HelpActions.js';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

class HelpStore {
    constructor() {
        this.bindActions(HelpActions);

        this.helpSendSuccess = false;
    }

    onSendHelpSuccess() {
        this.helpSendSuccess = true;

        appHistory.push(Routes.dashboard);
    }
}

export default alt.createStore(HelpStore);