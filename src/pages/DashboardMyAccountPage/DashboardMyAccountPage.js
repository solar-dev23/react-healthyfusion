import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {Link} from 'react-router';

import Routes from 'routes.js';
import DashboardAccountPageStore from 'stores/DashboardAccountPageStore';
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions';
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import DashboardAccountEditFormComponent from 'components/DashboardAccountEditFormComponent/DashboardAccountEditFormComponent.js';
import DashboardDocumentAddFormComponent from 'components/DashboardDocumentAddFormComponent/DashboardDocumentAddFormComponent.js';
import DashboardAccountProviderInfoComponent from 'components/DashboardAccountProviderInfoComponent/DashboardAccountProviderInfoComponent.js';
import DashboardAccountProfInfoComponent from 'components/DashboardAccountProfInfoComponent/DashboardAccountProfInfoComponent.js';
import DashboardDocumentProviderInfoComponent from 'components/DashboardDocumentProviderInfoComponent/DashboardDocumentProviderInfoComponent.js';
import DashboardAccountPatientInfoComponent from 'components/DashboardAccountPatientInfoComponent/DashboardAccountPatientInfoComponent.js';

import DashboardOrderHistoryProviderInfoComponent from 'components/DashboardOrderHistoryProviderInfoComponent/DashboardOrderHistoryProviderInfoComponent.js'
import DashboardProviderProfileComponent from 'components/DashboardProviderProfileComponent/DashboardProviderProfileComponent.js';
import './DashboardMyAccountPage.scss';
import classNames from 'classnames';
@connectToStores
export default class DashboardAccountPage extends Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            formData: {},

            isProviderInfo: false,
            isProfInfo: false,
            isPatientInfo: false,
            isProfileClicked:true,
            isDocumentsClicked:false,
            isOrdersClicked:false,
            isAddressClicked:false,
            isPaymentClicked:false,
        };

        this.showPatientInfoModal = this.showPatientInfoModal.bind(this);
        this.showPatientPaymentDetailsModal = this.showPatientPaymentDetailsModal.bind(this);
        this.showPatientShippingDetailsModal = this.showPatientShippingDetailsModal.bind(this);
        this.showProviderInfoModal = this.showProviderInfoModal.bind(this);
        this.showProfInfoModal = this.showProfInfoModal.bind(this);

    }

    static getStores() {
        return [DashboardAccountPageStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardAccountPageStore.getState()
        }
    }

    componentDidMount() {
        this.props.isProvider ? DashboardAccountPageActions.getProviderDetails() : DashboardAccountPageActions.getPatientInfo();
    }

    showModal() {
        DashboardAccountPageActions.showEditAccountForm();
    }

    hideModal() {
        DashboardAccountPageActions.hideEditAccountForm();
    }

    showAddModal() {
        DashboardAccountPageActions.showDocumentAddform();
    }

    hideAddModal() {
        DashboardAccountPageActions.hideDocumentAddform();
    }

 

    showProviderInfoModal() {
        DashboardAccountPageActions.showEditAccountForm();

        this.setState({
            formData: this.props.providerDetails.tab1[0],
            isProviderInfo: true,
            isProfInfo: false,
        });
    }

    showPatientInfoModal() {
        DashboardAccountPageActions.showEditAccountForm();

        this.setState({
            formData: this.props.patientInfo,
            isPatientPaymentDetails: false,
            isPatientShippingDetails: false,
            isPatientPersonalInfo: true
        });
    }

    showPatientPaymentDetailsModal() {
        DashboardAccountPageActions.showEditAccountForm();

        this.setState({
            formData: this.props.patientInfo,
            isPatientPersonalInfo: false,
            isPatientShippingDetails: false,
            isPatientPaymentDetails: true
        });

    }

    showPatientShippingDetailsModal() {
        DashboardAccountPageActions.showEditAccountForm();

        this.setState({
            formData: this.props.patientInfo,
            isPatientPersonalInfo: false,
            isPatientPaymentDetails: false,
            isPatientShippingDetails: true
        });

    }

    showProfInfoModal() {
        DashboardAccountPageActions.showEditAccountForm();

        this.setState({
            formData: this.props.providerDetails.tab2[0],
            isProviderInfo: false,
            isProfInfo: true
        });

    }
    OnProfileClick()
    {
        this.setState( {isProfileClicked:true,
            isDocumentsClicked:false,
            isOrdersClicked:false,
            isAddressClicked:false,
            isPaymentClicked:false,});
    }
    OnDocumentsClick()
    {
        this.setState( {isProfileClicked:false,
            isDocumentsClicked:true,
            isOrdersClicked:false,
            isAddressClicked:false,
            isPaymentClicked:false,});
    }
    OnOrdersClick()
    {
        this.setState( {isProfileClicked:false,
            isDocumentsClicked:false,
            isOrdersClicked:true,
            isAddressClicked:false,
            isPaymentClicked:false,});
    }
    OnAddressClick()
    {
        this.setState( {isProfileClicked:false,
            isDocumentsClicked:false,
            isOrdersClicked:false,
            isAddressClicked:true,
            isPaymentClicked:false,});
    }

      render1(providerDetails) {
        const providerInfo = providerDetails;
        const {  selectedOrderId } = this.props;
        return (

            <div className="dashboard-history-provider-info-component">
                <table style={{width:'100%'}}>                    
                      <thead className="recent-orders__table-header">
                                <tr className="recent-orders__table-row">
                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                           Order ID<i className="fa fa-sort"/>
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
                                </tr>
                            </thead>
                    
                     

                      {providerInfo.map((Order, i) => {
                        const trClassName = classNames({
                            'tr-2': i % 2 === 0,
                            'tr-1': i % 2 !== 0,
                            'active': Order.OrderId === this.props.selectedOrderId
                        });

                        return (
                            <tbody key={Order.OrderId }>
                            <tr
                                className={trClassName}
                                onClick={() => DashboardAccountPageActions.selectOrder(Order)}
                            >

                     
                                        <td className="recent-orders__table-cell">{Order.OrderId}</td>
                                        <td className="recent-orders__table-cell">{Order.TotalProducts}</td>
                                        <td className="recent-orders__table-cell">{Order.TotalAmount}</td>
                                        <td className="recent-orders__table-cell">{Order.OrderDate}</td>
                                        <td className="recent-orders__table-cell">{Order.OrderStatus}</td>
                                    </tr>
                                      </tbody>
                                );
                            })}
                          
                </table>
            </div>
        );
    }

    OnPaymentClick()
    {
        this.setState( {isProfileClicked:false,
            isDocumentsClicked:false,
            isOrdersClicked:false,
            isAddressClicked:false,
            isPaymentClicked:true,});
    }
    render() {
        const {providerDetails, isProvider, isPatient, patientInfo, addressType} = this.props;
        const {isProviderInfo, isProfInfo, isPatientInfo, formData} = this.state;
        const ActiveDiv1=this.state.isProfileClicked?'MyAccountTabdiv MyAccountTabdivActive':'MyAccountTabdiv';
        const ActiveDiv2=this.state.isAddressClicked?'MyAccountTabdiv MyAccountTabdivActive':'MyAccountTabdiv';
        const ActiveDiv3=this.state.isPaymentClicked?'MyAccountTabdiv MyAccountTabdivActive':'MyAccountTabdiv';
        const ActiveDiv4=this.state.isDocumentsClicked?'MyAccountTabdiv MyAccountTabdivActive':'MyAccountTabdiv';
        const ActiveDiv5=this.state.isOrdersClicked?'MyAccountTabdiv MyAccountTabdivActive':'MyAccountTabdiv';

        return (
            <div>
            {isProvider  &&<div style={{paddingLeft:50}}>
                    <div onClick={this.OnProfileClick.bind(this)} className={ActiveDiv1} >
                   My Profile
                  </div>
                  
                   <div onClick={this.OnAddressClick.bind(this)} className={ActiveDiv2} >
                   Address Details
                  </div>
                   <div onClick={this.OnPaymentClick.bind(this)} className={ActiveDiv3} >
                   Payment Details
                  </div>
                  <div onClick={this.OnDocumentsClick.bind(this)} className={ActiveDiv4} >
                   Documents
                  </div>
                  <div onClick={this.OnOrdersClick.bind(this)} className={ActiveDiv5} >
                   My Orders
                  </div>
            </div>}
            <div className="dashboard-account-page">
           
                <div className={isProvider ? (this.state.isProfileClicked?'dashboard-account-page__wrapper':''):'dashboard-account-page__wrapper'}>
                   
                {(isProvider && this.state.isProfileClicked)&&
                     <DashboardProviderProfileComponent
                            providerDetails={providerDetails.tab1}
                            providerDetailsProff={providerDetails.tab2}
                            showProviderInfoModal={this.showProviderInfoModal}
                            showProfInfoModal={this.showProfInfoModal}
                            showPatientPaymentDetailsModal={this.showPatientPaymentDetailsModal}
                            showPatientShippingDetailsModal={this.showPatientShippingDetailsModal}
                            addressType={addressType}
                    />
   }

                    {isPatient && <DashboardAccountPatientInfoComponent
                            patientInfo={patientInfo}
                            showPatientInfoModal={this.showPatientInfoModal}
                            showPatientPaymentDetailsModal={this.showPatientPaymentDetailsModal}
                            showPatientShippingDetailsModal={this.showPatientShippingDetailsModal}
                            addressType={addressType}
                    />}

                </div>

                {(isProvider && this.state.isDocumentsClicked)&&
                <div className="dashboard-account-page__block dashboard-account-page__block--documents-upload">
                    <div className="dashboard-account-page__row">
                        <h3 className="dashboard-account-page__title">Documents Upload</h3>

                        <button
                            className="dashboard-account-page__add-document-btn"
                            onClick={() => DashboardAccountPageActions.showDocumentAddform()}
                        >
                            Add Document
                        </button>
                    </div>

                    <DashboardDocumentProviderInfoComponent providerDetails={providerDetails.tab3}/>
                </div>}

                  
                 {(isProvider && this.state.isOrdersClicked) &&
                <div className="dashboard-account-page__block dashboard-account-page__block--documents-upload">
                    <div className="dashboard-account-page__row">
                        <h3 className="dashboard-account-page__title">Product Order History</h3>

                        <button disabled={!Boolean(this.props.selectedOrderId)}
                            className="dashboard-account-page__add-document-btn"
                             onClick={() => {DashboardAccountPageActions.selectOrderDetails(this.props.selectedOrderId) }}
                        >
                           View Order Details
                        </button>
                    </div>

                   { this.render1(providerDetails.tab4)}
                </div>}
                {
                    ((isProvider && this.state.isAddressClicked)|| isProvider && this.state.isPaymentClicked)&&
                    <div><h2>Currently Not Available.</h2></div>
                }


                <ModalComponent
                    header={'Add Document'}
                    showModal={this.props.showDocumentAddform}
                    onHide={this.hideAddModal.bind(this)}
                    onShow={this.showAddModal.bind(this)}
                    hideOk={true}
                    modalStyle={{width: '50%'}}
                >
                    <DashboardDocumentAddFormComponent
                        formData={formData}
                    />

                </ModalComponent>

                <ModalComponent
                    header={isProviderInfo && 'Provider information' || isProfInfo && 'Professional information'}
                    showModal={this.props.showEditAccountForm}
                    onHide={this.hideModal.bind(this)}
                    onShow={this.showModal.bind(this)}
                    hideOk={true}
                    modalStyle={{width: '50%'}}
                >
                    <DashboardAccountEditFormComponent
                        formData={formData}
                        isProviderInfo={isProviderInfo}
                        isProfInfo={isProfInfo}
                        isPatientInfo={isPatientInfo}
                        allStatesData={this.props.allStatesData}
                        profTitleOptions={this.props.profTitleOptions}
                        providerInfoOptions={this.props.providerInfoOptions}
                        addressTypeOptions={this.props.addressTypeOptions}
                    />

                </ModalComponent>
            </div>
            </div>
        );
    }
}