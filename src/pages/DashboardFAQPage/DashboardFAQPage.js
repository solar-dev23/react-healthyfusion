import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {Link} from 'react-router';
import DashboardFAQPageStore from 'stores/DashboardFAQPageStore.js';
import DashboardFAQPageActions from 'actions/DashboardFAQPageActions.js';
import { Accordion, AccordionItem } from 'react-sanfona';
import Collapsible from 'react-collapsible';
@connectToStores
export default class DashboardFAQPage extends Component{
	componentDidMount(){
		DashboardFAQPageActions.getDashboardFaqData()

	}
	static getStores() {
        return [DashboardFAQPageStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardFAQPageStore.getState()
        }
    }
    renderFAQ(){
    	if(this.props.faqData.faqData)
	    {
	    		let faqDatadetails=this.props.faqData.faqData;

	    	return(
	    		<div>
	                {faqDatadetails.map((item) => {
	                    return (
	                    	<Collapsible trigger={item.Title}>		                                                      
	                                 <p key={item.TypeID} dangerouslySetInnerHTML={{__html:item.Description}} style={{overflow:'auto'}}/> 			                          
	                        </Collapsible>
	                    );
	                })}
		        </div>		            
	    		)
	    }
    }
     render() {
     	 const { faqData } = this.props;
     	 return(
     	 	<div className='container'>
	     	 	<div className='row'>
	     	 		<div className='col-md-12 col-sm-4 col-lg-12'>
		     	 		<div className='accordion'>
		     	 			{this.renderFAQ()}
		     	 		</div>
		     	 	</div>	     	 	
	     	 	</div>
     	 	</div>



     	 	)
     }

}