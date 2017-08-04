
import BaseService from './BaseService.js';

class DashboardHandoutService extends BaseService {
    getDashboardHandoutpdf(key) {
        //return this.get('handout');

           return this.post('handout',{searchItem:key!=null?key:""            
        });
    }
}

export default new DashboardHandoutService();