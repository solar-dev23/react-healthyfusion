import React, { Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router';
import Routes from 'routes.js';
import DashboardAccountPageStore from 'stores/DashboardAccountPageStore'
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions';
import './OrderViewPage.scss';
import classNames from 'classnames';
import moment from 'moment';



@connectToStores
export default class OrderViewPage extends Component {
     constructor() {
        super();
        
}    

    static getStores() {
        return [DashboardAccountPageStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardAccountPageStore.getState()
        }
    }

   
    render() {
        
        var details = this.props.OrderDetails;
        return (
<div className="order1-view-page">
          

            <div className="panel panel-default">

             <div className="panel-body">

                        <div className="prof-info__row">
                       
                        <p className="prof-info__label">
                            Provider's Name: <span className="prof-info__output">{details.Order[0].Provider}</span>
                        </p>
                         <p className="prof-info__label">
                            Order #: <span className="prof-info__output">{details.Order[0].OrderId}</span>
                        </p>
                       
                        </div> 
                         <div className="prof-info__row">
                          <p className="prof-info__label">
                            Order Date: <span className="prof-info__output">{moment(details.Order[0].OrderDate).format('MM/DD/YYYY')}</span>
                        </p>
                         </div>

                <div className="panel panel-default panelStyle">
                    <div className="panel-body">
                         <div className="prof-info__row">
                          <p className="prof-info__labelHeading">
                           Shipping Address:
                        </p>
                        </div> 
                        <div className="prof-info__row">
                          <p className="prof-info__label">
                           Address1: <span className="prof-info__output">{details.shipping.length>0?details.shipping[0].Address1:''}</span>
                        </p>
                         <p className="prof-info__label">
                           Address2: <span className="prof-info__output">{details.shipping.length>0?details.shipping[0].Address2:''}</span>
                        </p>
                         <p className="prof-info__label">
                           City: <span className="prof-info__output">{details.shipping.length>0?details.shipping[0].City:''}</span>
                        </p>
                   
                        </div> 
                        <div className="prof-info__row">
                          <p className="prof-info__label">
                           State: <span className="prof-info__output">{details.shipping.length>0?details.shipping[0].StateCode:''}</span>
                        </p>
                        <p className="prof-info__label">
                           Zip: <span className="prof-info__output">{details.shipping.length>0?details.shipping[0].Zip:''}</span>
                        </p>
                        <p className="prof-info__label">
                            <span className="prof-info__output"></span>
                        </p>
                        </div> 
                    </div> 
                </div> 

                 <div className="panel panel-default panelStyle">
                    <div className="panel-body">

                    <div className="prof-info__row">
                          <p className="prof-info__labelHeading">
                           Product Details:
                        </p>
                    </div> 
                     <div className="prof-info__row">
                           <p className="prof-info__label">
                           Status: <span className="prof-info__output">{details.Order[0].OrderStatus==1?'Order Created':(details.Order[0].OrderStatus==2?'Order Paid':'Submitted to Xymogen')}</span>
                           </p>
                            <p className="prof-info__label">
                           Tracking #: <span className="prof-info__output">4455969</span>
                           </p>
                    </div>

                
                   
                     <table>
                    <thead>
                    <tr className="tr-title">
                        <td>
                            <div className="td-title">
                                Product Number<i className="fa fa-sort"/>
                            </div>
                        </td>
                        <td>
                            <div className="td-title">
                                Product Name<i className="fa fa-sort"/>
                            </div>
                        </td>
                        <td>
                            <div className="td-title">
                                Price <i className="fa fa-sort"/>
                            </div>
                        </td>
                         <td>
                            <div className="td-title">
                                Quantity<i className="fa fa-sort"/>
                            </div>
                        </td>
                        
                         
                    </tr>
                    </thead>
                    <tbody>
                    {details.Items.map((Items, i) => {
                        const trClassName = classNames({
                            'tr-2': i % 2 === 0,
                            'tr-1': i % 2 !== 0
                        });
                        return (
                            <tr  
                                key={Items.ProductNumber}
                                className={trClassName}
                               
                            >
                                <td>{Items.ProductNumber}</td>
                                <td>{Items.Name}</td>
                                <td>{Items.Price}</td>
                                <td>{Items.Quantity}</td>
                               
                           
                    
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                   
                       
                    

                 </div> 
                </div>  

                <div className="panel panel-default panelStyle">
                    <div className="panel-body">

                         <div className="prof-info__row">
                          <p className="prof-info__labelHeading">
                           Order Summary:
                        </p>
                        </div> 
                        <div className="prof-info__row">
                          <p className="prof-info__label">
                           Item(s) SubTotal: <span className="prof-info__output">{details.Order[0].TotalAmount!=null?'$'+details.Order[0].TotalAmount:''}</span>
                        </p>
                         <p className="prof-info__label">
                           Discount: <span className="prof-info__output">{details.Order[0].Discount!=null?'$'+details.Order[0].Discount:''}</span>
                        </p>
                         <p className="prof-info__label">
                           Shipping & Handling: <span className="prof-info__output">{details.Order[0].ShippingCharge!=null?'$'+details.Order[0].ShippingCharge:''}</span>
                        </p>
                   
                        </div>
                         <div className="prof-info__row">
                           <p className="prof-info__label">
                           Tax To Be Collected: <span className="prof-info__output">{details.Order[0].Tax!=null?'$'+details.Order[0].Tax:''}</span>
                           </p>
                          <p className="prof-info__label">
                           Total Products: <span className="prof-info__output">{details.Order[0].TotalProducts}</span>
                        </p>
                         <p className="prof-info__label">
                           Grand Total: <span className="prof-info__output">{details.Order[0].TotalAmount!=null?'$'+details.Order[0].TotalAmount:''}</span>
                        </p>
                       
                   
                        </div>
                     </div> 
                </div>   

                
  
                       





             </div>
              </div>

 </div>
             
        );
    }
}