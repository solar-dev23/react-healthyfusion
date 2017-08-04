import alt from 'alt.js'

import HelpService from 'services/HelpService.js';

class HelpActions {
    constructor() {
        this.generateActions(
            'sendHelpSuccess'
        );
    }

    sendHelp(data) {
        HelpService.sendHelp(data)
            .then(() => this.actions.sendHelpSuccess());
    }
}

export default alt.createActions(HelpActions);