import React, { Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router';

import _ from 'lodash';
import Routes from 'routes.js';
import DashboardHomePageActions from 'actions/DashboardHomePageActions';
import DashboardHomePageStore from 'stores/DashboardHomePageStore.js';
import ReactHighcharts from 'react-highcharts';
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import './DashboardHomePage.scss';
import ModalComponent from "components/ModalComponent/ModalComponent.js";
@connectToStores
export default class DashboardHomePage extends Component {

    static getStores() {
        return [DashboardHomePageStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardHomePageStore.getState()
        }
    }

    constructor(props) {
        
        super(props);
        this.state = {
            step:0,
            ModelVisible:false,
            config:'',
            licensecheked:false
        }
        this.onStatusChange = this.onStatusChange.bind(this);
    }
     onStatusChange(){   
         DashboardHomePageStore.unlisten(this.onStatusChange);
         this.loadGraph(0);
    }

    componentWillMount() {
      DashboardHomePageActions.getDashboardData(); 
            DashboardHomePageStore.listen(this.onStatusChange); 
    }
    componentDidMount() {

        if(this.props.isProvider)
        { 
            DashboardHomePageActions.getEulaLicense();           
            //DashboardHomePageActions.getProviderLicense(JSON.parse(localStorage.currentUser).ProviderID);
             DashboardHomePageActions.getDashboardDataForProduct();      
            DashboardHomePageActions.getDashboardData(); 
        DashboardHomePageStore.listen(this.onStatusChange); 

        }
        if(this.props.isPatient){
            DashboardHomePageActions.getPatientsBasket();
             DashboardHomePageActions.getEulaLicense();
            //DashboardHomePageActions.getPatientLicense(JSON.parse(localStorage.currentUser).PatientID);
        }
       
    }
    handleProviderLicenceFormSubmit()
    {
        let counter=this.state.step;        
        this.setState({
            step:counter+1
        })
    }
    handleUpdateLicenceSubmit(){
         //DashboardHomePageActions.UpdateProviderLicense(this.props.currentUser.ProviderID);
         let data={"isPatient":this.props.currentUser.role==='Patient'?1:0,"EulaID":1};
        
           DashboardHomePageActions.UpdateEulaLicense(data);
           this.setState({
             ModelVisible:true
        })
    }
    handlePatientLicenceFormSubmit()
    {
        let counter=this.state.step;        
        this.setState({
            step:counter+1
        })
    }
    handleUpdatePatientLicenceSubmit(){
         DashboardHomePageActions.UpdatePatientLicense(this.props.currentUser.ProviderID);
           this.setState({
             ModelVisible:true
        })
    }
    renderAgreement(){
        console.log('render Agreementdata');
        

         const modalStyle = {
            width: '100%',
            maxWidth: '870px',
            height:'650px'
        };
        let agreementdata=[];
        agreementdata=this.props.Agreementdata;
        console.log("agreementdata" + agreementdata[this.state.step].IsActive)
        

        return (
            <div className='Model-layout'>      
                <ModalComponent
                        showModal={!this.state.ModelVisible}
                        onHide={this.state.ModelVisible}
                        onShow={!this.state.ModelVisible}
                        type="confirm"
                        modalStyle={modalStyle}
                        hideOk={true}

                        header="License Agreement"                       
                    >  
                    <div>          
                    <div className='Model-layout' style={{borderBottom: '1px solid #ccc'}} > 
                        <div>
                            <div dangerouslySetInnerHTML={{__html: agreementdata[this.state.step].Description}}>  


                            </div>                            
                        </div>
                    </div>
                    <div style={{paddingTop:10}}>
                                <div style={{float:'left',paddingLeft:20,'paddingTop':18}}>
                                    <input className="common-label" type="checkbox"
                                       required
                                       checked={null}
                                       value={this.state.licensecheked} 
                                             checked={this.state.licensecheked?'checked':null}
                                             onChange={(e) => this.setState({licensecheked: e.target.checked})}
                                       name='licencecheck'/>
                                </div>
                                <div  className="col-md-7" style={{float: 'left',paddingLeft:30,color:'black','paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>
                                     I have read and agree to the Terms & Conditions.
                                </div>
                            </div>
                            
                        <div className="row buttons-container" style={{float:'right'}}>
                        <button type="button" disabled ={this.state.licensecheked?false:true}
                         style={{width:100,height:40,fontSize:17}} onClick={this.state.step+1===agreementdata.length?this.handleUpdateLicenceSubmit.bind(this):this.handleProviderLicenceFormSubmit.bind(this)} className="btn btn-style success " >
                                   {this.state.step+1===agreementdata.length?'Submit':'Next'} </button>
                     
                           
                        </div>
                    </div>
                </ModalComponent>
            </div>
            )
     

        
        

    }
    renderPatientAgreement(){
        const modalStyle = {
            width: '785px',
            maxWidth: '100%',
            height:'500px'
        };
        let Patientagreementdata=[];
        Patientagreementdata=this.props.PatientLicenseAgreementdata;

        if(Patientagreementdata[this.state.step].Status===1)
        {
            return (
            <div className='Model-layout'>      
                <ModalComponent
                        showModal={!this.state.ModelVisible}
                        onHide={this.state.ModelVisible}
                        onShow={!this.state.ModelVisible}
                        type="confirm"
                        modalStyle={modalStyle}
                        hideOk={true}
                        header="License Agreement"                       
                    >            
                    <form className='Model-layout' onSubmit={this.state.step+1===Patientagreementdata.length?this.handleUpdatePatientLicenceSubmit.bind(this):this.handlePatientLicenceFormSubmit.bind(this)}> 
                        <div>
                            <div dangerouslySetInnerHTML={{__html: Patientagreementdata[this.state.step].Description}}>
                                

                            </div>
                            <div>
                                    <label style={{'font-size': 14}}>
                                     <input type="checkbox"
                                       required
                                       checked={null}
                                       name='licencecheck'
                                       />
                                       I have read and agree to the Terms & Conditions.</label></div>
                        </div>
                        <div className="buttons-container">
                            <input type="submit" className="btn btn-primary" value={this.state.step+1===Patientagreementdata.length?'Submit':'Next'}/>
                        </div>
                    </form>
                </ModalComponent>
            </div>
            )
        }
    }

    renderRecommendedBlock() {
        const { providerId, basketData } = this.props;
        
        return providerId.map(provider => {
            return basketData.map(product => {
                if (provider.ProviderID === product.ProviderID) {
                    return (
                        <div className='underProduct' key={product.ProductID}>
                            <div style = {{float:'left'}}>
                                <Link to={Routes.dashboardBasketPage}>
                                    <img style={{height: 180}} src={product.ImagePath} />
                                </Link>
                                <div>
                                    <label className ='PLabel1'>{product.Name}</label>
                                </div>
                            </div>
                        </div>
                    );
                }
            });
        });
    }

    loadGraph(type) {

    var titles;
    if(type== 0)
        titles = this.props.chartData;
    else
        titles = this.props.productData;

  this.state.config = {
             chart: {
            type: 'column'
        },
        credits: {
           enabled: false
       },
        title: {
            text: type==0?'Patients with recommended products v/s Patients who purchased recommended products':'Purchased Unique products v/s Recommended unique products'
        },
      
        xAxis: {
            

            crosshair: true,
            categories: (function () {
                    // generate an array of random data
                    var data = [];
                     
               if(titles.length>0) {
                var i,elem;
                     for (i = 0; i < titles.length; i += 1) {
                        if(type == 0)
                           data.push(titles[i].MonthName);
                       else
                           data.push(titles[i].Column1);
                    }  
                }
                    return data;
                }()),
        },
        yAxis: {
            min: 0,
            title: {
                text: type==0?'# of Patients':'# of Products'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: this.props.tooltipPointFormat || ('<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>'),
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: type==0?'Patients who purchased recommended products':'Purchased unique products',
            data:(function () {
                    // generate an array of random data
                    var data = [];
                     
               if(titles.length>0)       {
                var i,elem;
                     for (i = 0; i < titles.length; i += 1) {

                           data.push(titles[i].recCount);
                        
                        }  
                    }
                    return data;
                }())
          

        }, {
            name: type==0?'Patients with recommended products':'recommended unique products',
             data:(function () {
                    // generate an array of random data
                    var data = [];
                     
               if(titles.length>0){
                var i,elem;
                     for (i = 0; i < titles.length; i += 1) {
                        if(type == 0)
                             data.push(titles[i].totCount);
                         else
                            data.push(titles[i].purCount);
                    }
                }
                    return data;
                }())

        }]
};
this.forceUpdate();
    }

     loadHomeGraph(e) {
         this.state.config = 'underConstruction';
        this.forceUpdate();
     }

    render() {
        var dashboard = '';
        var headerBtn = '';
         const { orderHistoryData, isProvider, isPatient, basketData,Agreementdata,PatientLicenseAgreementdata } = this.props;
        if(isProvider)
        {
            headerBtn = ( <div className="box">
            
            <div className="row">
            

        <div className="col-md-2">
         <a onClick={this.loadGraph.bind(this,0)}>
          <div className="panel panel-success panel-stat">
            <div className="panel1-heading">

              <div className="stat">
                <div >
                  <div className="col-xs-4">
                 
                    <i className="fa fa-users fa-3x" > </i>
                  </div>
                  <div className="col-xs-8">
                    <small className="stat-label">Patients</small>
                    <h1>200+</h1>
                  </div>
                </div>
                <div className="row">
                </div>
              </div>
            </div>
          </div>
           </a>
        </div>

        <div className="col-md-2">
         <a onClick={this.loadGraph.bind(this,1)}>
          <div className="panel panel-success panel-stat">
            <div className="panel2-heading">

              <div className="stat">
                <div >
                  <div className="col-xs-4">
                 
                    <i className="fa fa-shield fa-3x" > </i>
                  </div>
                  <div className="col-xs-8">
                    <small className="stat-label">Products</small>
                    <h1>500+</h1>
                  </div>
                </div>
                <div className="row">
                </div>
              </div>
            </div>
          </div>
           </a>
        </div>

         <div className="col-md-2">
            <a onClick={this.loadHomeGraph.bind(this)}>
          <div className="panel panel-success panel-stat">
            <div className="panel3-heading">

              <div className="stat">
                <div >
                  <div className="col-xs-4">
                 
                    <i className="fa fa-compass fa-3x" > </i>
                  </div>
                  <div className="col-xs-8">
                    <small className="stat-label">Compliance</small>
                    <h1>50%</h1>
                  </div>
                </div>
                <div className="row">
                </div>
              </div>
            </div>
          </div>
           </a>
        </div>

        <div className="col-md-2">
            <a onClick={this.loadHomeGraph.bind(this)}>
          <div className="panel panel-success panel-stat">
            <div className="panel4-heading">

              <div className="stat">
                <div >
                  <div className="col-xs-4">
                 
                    <i className="fa fa-cube fa-3x" > </i>
                  </div>
                  <div className="col-xs-8">
                    <small className="stat-label">Commission</small>
                    <h1>80%</h1>
                  </div>
                </div>
                <div className="row">
                </div>
              </div>
            </div>
          </div>
           </a>
        </div>


    </div>
   
    </div>

    
    );
           if(this.state.config=='underConstruction')
            {
              dashboard = (  <div className="undercon">
                <h1>Data not available now</h1> 
            </div> )
            }else if(this.state.config=='')
            {
              dashboard = (  <div className="undercon">
                <h1>Loading....</h1> 
            </div> )
            }
            else if(this.state.config!='')
              dashboard = (<div><ReactHighcharts type="column" ref="chart" config = {this.state.config}></ReactHighcharts></div>);
           
        }
       
        
        return (
            <div className="dashboard-home-page">
           
                 {headerBtn}
                {dashboard}

                 {isPatient && <div className="dashboard-patient-home-block">
                    <div className="recent-orders">
                        <h3 className="recent-orders__title">Recent Orders</h3>

                        {orderHistoryData && orderHistoryData.length > 0 && <table>
                            <thead className="recent-orders__table-header">
                                <tr className="recent-orders__table-row">
                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                           Order<i className="fa fa-sort"/>
                                        </div>
                                    </td>

                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                            Total Products<i className="fa fa-sort"/>
                                        </div>
                                    </td>

                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                            Total Amount<i className="fa fa-sort"/>
                                        </div>
                                    </td>

                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                            Order Date<i className="fa fa-sort"/>
                                        </div>
                                    </td>

                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                            Order Status<i className="fa fa-sort"/>
                                        </div>
                                    </td>

                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                            Tracking<i className="fa fa-sort"/>
                                        </div>
                                    </td>
                                </tr>
                            </thead>

                            <tbody className="recent-orders__table-body">
                            {orderHistoryData.map(order => {
                                return (
                                    <tr
                                        className="recent-orders__table-row"
                                        key={order.OrderId}
                                    >
                                        <td className="recent-orders__table-cell">{order.OrderId}</td>
                                        <td className="recent-orders__table-cell">{order.TotalProducts}</td>
                                        <td className="recent-orders__table-cell">{order.TotalAmount}</td>
                                        <td className="recent-orders__table-cell">{order.OrderDate}</td>
                                        <td className="recent-orders__table-cell">{order.OrderStatus}</td>
                                        <td className="recent-orders__table-cell">{order.OrderTrackingID}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>}

                        {orderHistoryData && orderHistoryData.length == 0 &&
                        <p className="recent-orders__no-orders">No Recent Orders</p>}
                    </div>

                    <div className="recommended-products">
                        <div className="recommended-products__title">Recommended Products</div>

                        <ul className="recommended-products__list">
                            {basketData.length == 0 ?
                                <div>
                                    <p>No Recommended Products</p>
                                </div> : this.renderRecommendedBlock()
                            }
                        </ul>
                    </div>
                </div>}
                <div>
                        {(isProvider || isPatient) && Agreementdata.length>0 ? this.renderAgreement():''}
                        
                </div>
            </div>
        );
    }
}
