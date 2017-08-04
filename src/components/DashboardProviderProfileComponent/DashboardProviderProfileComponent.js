import React from 'react';

import AccountPatientShippingComponent from 'components/AccountPatientShippingComponent/AccountPatientShippingComponent.js';
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions.js';

export default class DashboardProviderProfileComponent extends React.Component {
    static propTypes = {
        showPatientPaymentDetailsModal: React.PropTypes.func,
        showProviderInfoModal: React.PropTypes.func,
        showProfInfoModal:React.PropTypes.func,
        showPatientShippingDetailsModal: React.PropTypes.func,
        patientInfo: React.PropTypes.object
    };

    onSelectAddressType(type) {
        //DashboardAccountPageActions.onSelectAddressType(type);
    }

    render() {
        const {
            patientInfo,
            showProviderInfoModal,
            showPatientPaymentDetailsModal,
            showProfInfoModal,
            showPatientShippingDetailsModal,
            addressType
        } = this.props;

        const addressClassDefault = 'dashboard-account-page__tab';
        const addressClassCurrent = 'dashboard-account-page__tab--current';
        const providerInfo = this.props.providerDetails && this.props.providerDetails[0];
         const profInfo = this.props.providerDetailsProff && this.props.providerDetailsProff[0];
        return ( 
            <div className="dashboard-account-patient-info-component">
            <div className="dashboard-account-page__block dashboard-account-page__block--payment-details">
                <h3 className="dashboard-account-page__title">Provider Information</h3>
                <div className="dashboard-account-patient-info">
                    <div className='dashboard-account-provider-info-component__col dashboard-account-provider-info-component__col--left'>

                        <span className='dashboard-account-provider-info-component__label'>First Name:</span>
                        <span className='dashboard-account-provider-info-component__label'>Last Name:</span>
                        <span className='dashboard-account-provider-info-component__label'>Title:</span>
                        <span className='dashboard-account-provider-info-component__label'>Phone:</span>
                        <span className='dashboard-account-provider-info-component__label'>Email:</span>
                        <span className='dashboard-account-provider-info-component__label'>Provider Code:</span>
                    </div>

                    <div className='dashboard-account-provider-info-component__col'>
                        <span className='dashboard-account-provider-info-component__info'>{providerInfo && providerInfo.firstName}</span>
                        <span className='dashboard-account-provider-info-component__info'>{providerInfo && providerInfo.lastName}</span>
                        <span className='dashboard-account-provider-info-component__info'>{providerInfo && providerInfo.pTitle}</span>
                        <span className='dashboard-account-provider-info-component__info'>{providerInfo && providerInfo.phone}</span>
                        <span className='dashboard-account-provider-info-component__info'>{providerInfo && providerInfo.email}</span>
                        <span className='dashboard-account-provider-info-component__info'>{providerInfo && providerInfo.ProviderCode}</span>
                    </div>
                  </div>
                 <button
                        className="dashboard-account-page__edit-btn"
                        onClick={showProviderInfoModal}
                    >
                        Edit
                    </button>
            </div>
            <div className="dashboard-account-page__block dashboard-account-page__block--payment-details">
             <h3 className="dashboard-account-page__title">Professional Information</h3>

            <div className="dashboard-account-patient-info">
                <div className='dashboard-account-prof-info-component__col dashboard-account-prof-info-component__col--left'>
                    <span className='dashboard-account-prof-info-component__label'>Professional Title:</span>
                    <span className='dashboard-account-prof-info-component__label'>Business Name:</span>
                    <span className='dashboard-account-prof-info-component__label'>License Name:</span>
                    <span className='dashboard-account-prof-info-component__label'>License Number:</span>
                    <span className='dashboard-account-prof-info-component__label'>License State:</span>
                    <span className='dashboard-account-prof-info-component__label'>License Expiry Date:</span>
                </div>

                <div className='dashboard-account-prof-info-component__col dashboard-account-prof-info-component__col--right'>
                    <span className='dashboard-account-prof-info-component__info'>{profInfo && profInfo.PTitle}</span>
                    <span className='dashboard-account-prof-info-component__info'>{profInfo && profInfo.PBus}</span>
                    <span className='dashboard-account-prof-info-component__info'>{profInfo && profInfo.Lname}</span>
                    <span className='dashboard-account-prof-info-component__info'>{profInfo && profInfo.Lnum}</span>
                    <span className='dashboard-account-prof-info-component__info'>{profInfo && profInfo.LstateId}</span>
                    <span className='dashboard-account-prof-info-component__info'>{profInfo && profInfo.Ldate}</span>
                </div>
                   </div>
                 <button
                        className="dashboard-account-page__edit-btn"
                        onClick={showProfInfoModal}
                    >
                        Edit
                    </button>
            </div>
                {/*<div className="dashboard-account-page__block dashboard-account-page__block--payment-details">
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

                    <button
                        className="dashboard-account-page__edit-btn"
                        onClick={showPatientPaymentDetailsModal}
                    >
                        Edit
                    </button>
                </div>*/}

                { /* <div className="dashboard-account-page__block dashboard-account-page__block--shipping-details">
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
                        
                    />

                  <button
                        className="dashboard-account-page__edit-btn"
                        onClick={showPatientShippingDetailsModal}
                    >
                        Edit
                    </button>
                </div>*/}
            </div>
        );
    }
}
