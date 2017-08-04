import BaseService from './BaseService.js';

class HelpService extends BaseService {
    sendHelp(data) {
        return this.post('help', data);
    }
    getDashboardFaqData(){
    	return this.get('help/GetFAQ');
    }
}

export default new HelpService();
