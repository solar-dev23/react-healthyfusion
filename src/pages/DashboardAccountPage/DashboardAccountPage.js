import React, { Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router';

import Routes from 'routes.js';
import DashboardAccountPageStore from 'stores/DashboardAccountPageStore'
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions'
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import DashboardAccountEditFormComponent from 'components/DashboardAccountEditFormComponent/DashboardAccountEditFormComponent.js';
import DashboardDocumentAddFormComponent from 'components/DashboardDocumentAddFormComponent/DashboardDocumentAddFormComponent.js';
import DashboardAccountProviderInfoComponent from 'components/DashboardAccountProviderInfoComponent/DashboardAccountProviderInfoComponent.js';
import DashboardAccountProfInfoComponent from 'components/DashboardAccountProfInfoComponent/DashboardAccountProfInfoComponent.js';
import DashboardDocumentProviderInfoComponent from 'components/DashboardDocumentProviderInfoComponent/DashboardDocumentProviderInfoComponent.js';
import DashboardAccountPatientInfoComponent from 'components/DashboardAccountPatientInfoComponent/DashboardAccountPatientInfoComponent.js';

import DashboardOrderHistoryProviderInfoComponent from 'components/DashboardOrderHistoryProviderInfoComponent/DashboardOrderHistoryProviderInfoComponent.js'
import './DashboardAccountPage.scss';

@connectToStores
export default class DashboardAccountPage extends Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            formData: {},
            isProviderInfo: false,
            isProfInfo: false,
            isPatientPersonalInfo: false,
            isPatientPaymentDetails: false,
            isPatientShippingDetails: false
        };

        this.showPatientInfoModal = this.showPatientInfoModal.bind(this);
        this.showPatientPaymentDetailsModal = this.showPatientPaymentDetailsModal.bind(this);
        this.showPatientShippingDetailsModal = this.showPatientShippingDetailsModal.bind(this);
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

    render() {
        const { providerDetails, isProvider, isPatient, patientInfo, addressType, paymentMethodOptions } = this.props;
        const { isProviderInfo, isProfInfo, isPatientPersonalInfo, isPatientPaymentDetails, isPatientShippingDetails, formData } = this.state;

        return (
            <div className="dashboard-account-page">
                <div className="dashboard-account-page__wrapper">
                    {isProvider && <div className="dashboard-account-page__block dashboard-account-page__block--provider-information">
                        <h3 className="dashboard-account-page__title">Provider Information</h3>
                        <DashboardAccountProviderInfoComponent providerDetails={providerDetails.tab1}/>

                        <button
                            className="dashboard-account-page__edit-btn"
                            onClick={this.showProviderInfoModal.bind(this)}
                        >
                            Edit
                        </button>
                    </div>}

                    {isProvider && <div className="dashboard-account-page__block dashboard-account-page__block--professional-information">
                        <h3 className="dashboard-account-page__title">Professional Information</h3>
                        <DashboardAccountProfInfoComponent providerDetails={providerDetails.tab2}/>

                        <button
                            className="dashboard-account-page__edit-btn"
                            onClick={this.showProfInfoModal.bind(this)}
                        >
                            Edit
                        </button>
                    </div>}

                    {isPatient && <DashboardAccountPatientInfoComponent
                        patientInfo={patientInfo}
                        showPatientInfoModal={this.showPatientInfoModal}
                        showPatientPaymentDetailsModal={this.showPatientPaymentDetailsModal}
                        showPatientShippingDetailsModal={this.showPatientShippingDetailsModal}
                        addressType={addressType}
                    />}
                </div>

                {isProvider &&
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


                 {isProvider &&
                <div className="dashboard-account-page__block dashboard-account-page__block--documents-upload">
                    <div className="dashboard-account-page__row">
                        <h3 className="dashboard-account-page__title">Product Order History</h3>

                       
                    </div>

                    <DashboardOrderHistoryProviderInfoComponent providerDetails={providerDetails.tab4}/>
                </div>}


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
                    header={isProviderInfo && 'Provider information'
                        || isProfInfo && 'Professional information'
                        || isPatientPersonalInfo && 'Personal Information'
                        || isPatientPaymentDetails && 'Payment Details'
                        || isPatientShippingDetails && 'Shipping Details'}
                    showModal={this.props.showEditAccountForm}
                    onHide={this.hideModal.bind(this)}
                    onShow={this.showModal.bind(this)}
                    hideOk={true}
                    modalStyle={{
                        width: '780px',
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}
                >
                    <DashboardAccountEditFormComponent
                        formData={formData}
                        isProviderInfo={isProviderInfo}
                        isProfInfo={isProfInfo}
                        isPatientPersonalInfo={isPatientPersonalInfo}
                        isPatientPaymentDetails={isPatientPaymentDetails}
                        isPatientShippingDetails={isPatientShippingDetails}
                        allStatesData={this.props.allStatesData}
                        profTitleOptions={this.props.profTitleOptions}
                        providerInfoOptions={this.props.providerInfoOptions}
                        addressTypeOptions={this.props.addressTypeOptions}
                        paymentMethodOptions={paymentMethodOptions}
                    />

                </ModalComponent>
            </div>
        );
    }
}