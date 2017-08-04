import React from 'react';
import { Form } from "formsy-react";
import autobind from 'autobind-decorator'

import InputComponent from "components/InputComponent/InputComponent.js";
import AccountPatientShippingComponent from 'components/AccountPatientShippingComponent/AccountPatientShippingComponent.js';
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions.js';
import SelectComponent from 'components/SelectComponent/SelectComponent.js';

@autobind
export default class DashboardAccountPatientInfoComponent extends React.Component {
    static propTypes = {
        showPatientPaymentDetailsModal: React.PropTypes.func,
        showPatientInfoModal: React.PropTypes.func,
        showPatientShippingDetailsModal: React.PropTypes.func,
        patientInfo: React.PropTypes.object
    };

    state = {
        patientFirstName: '',
        patientLastName: '',
        patientEmail: '',
        patientPhone: '',
        patientPassword: '',
        patientCardNumber: '',
        patientExpiryDate: '',
        patientCardVerificationNumber: ''
    };

    onSelectAddressType(type) {
        DashboardAccountPageActions.onSelectAddressType(type);
    }

    submitPersonalfInfoForm() {

    }

    changePaymentMethodValue() {

    }

    render() {
        const {
            patientInfo,
            showPatientInfoModal,
            showPatientPaymentDetailsModal,
            showPatientShippingDetailsModal,
            addressType
        } = this.props;

        const addressClassDefault = 'dashboard-account-page__tab';
        const addressClassCurrent = 'dashboard-account-page__tab--current';

        return (
            <div className="dashboard-account-patient-info-component">
                <div className="dashboard-account-page__block dashboard-account-page__block--personal-information">
                    <h3 className="dashboard-account-page__title">Personal Information</h3>

                    <div className="dashboard-account-patient-info">
                        <div className='dashboard-account-patient-info__col dashboard-account-patient-info__col--left'>
                            <span className='dashboard-account-patient-info__label'>First Name:</span>
                            <span className='dashboard-account-patient-info__label'>Last Name:</span>
                            <span className='dashboard-account-patient-info__label'>Phone:</span>
                            <span className='dashboard-account-patient-info__label'>Email:</span>
                        </div>

                        <div className='dashboard-account-patient-info__col'>
                            <span className='dashboard-account-patient-info__info'>{patientInfo && patientInfo.FirstName}</span>
                            <span className='dashboard-account-patient-info__info'>{patientInfo && patientInfo.LastName}</span>
                            <span className='dashboard-account-patient-info__info'>{patientInfo && patientInfo.Phone}</span>
                            <span className='dashboard-account-patient-info__info'>{patientInfo && patientInfo.Email}</span>
                        </div>
                    </div>

                    {/*<button
                        className="dashboard-account-page__edit-btn"
                        onClick={showPatientInfoModal}
                    >
                        Edit
                    </button>*/}
                </div>

                <div className="dashboard-account-page__block dashboard-account-page__block--payment-details">
                    <h3 className="dashboard-account-page__title">Payment Details</h3>

                    <div className="dashboard-account-patient-info">
                        <div className='dashboard-account-patient-info__col dashboard-account-patient-info__col--left'>
                            <span className='dashboard-account-patient-info__label'>Payment method:</span>
                            <span className='dashboard-account-patient-info__label'>Card number:</span>
                            <span className='dashboard-account-patient-info__label'>Expiry date:</span>
                            <span className='dashboard-account-patient-info__label'>Card verification number:</span>
                        </div>

                        <div className='dashboard-account-patient-info__col'>
                            <span className='dashboard-account-patient-info__info'></span>
                            <span className='dashboard-account-patient-info__info'></span>
                            <span className='dashboard-account-patient-info__info'></span>
                            <span className='dashboard-account-patient-info__info'></span>
                        </div>
                    </div>

                   {/*<button
                        className="dashboard-account-page__edit-btn"
                        onClick={showPatientPaymentDetailsModal} >
                        Edit
                    </button>*/}
                </div>

                <div className="dashboard-account-page__block dashboard-account-page__block--shipping-details">
                    <h3 className="dashboard-account-page__title">Shipping Details</h3>

                    <ul className="dashboard-account-page__tabs">
                        <li
                            className={`${addressClassDefault} ${addressType == 'Address1' && addressClassCurrent}`}
                            onClick={this.onSelectAddressType.bind(this, 'Address1')}
                        >
                            Address 1
                        </li>
                        <li
                            className={`${addressClassDefault} ${addressType == 'Address2' && addressClassCurrent}`}
                            onClick={this.onSelectAddressType.bind(this, 'Address2')}
                        >
                            Address 2
                        </li>
                        <li
                            className={`${addressClassDefault} ${addressType == 'Address3' && addressClassCurrent}`}
                            onClick={this.onSelectAddressType.bind(this, 'Address3')}
                        >
                            Address 3
                        </li>
                    </ul>

                    <AccountPatientShippingComponent
                        patientInfo={patientInfo}
                        addressType={addressType}
                    />

                    {/*<button
                        className="dashboard-account-page__edit-btn"
                        onClick={showPatientShippingDetailsModal}
                    >
                        Edit
                    </button>*/}
                </div>
            </div>
        );
    }
}
