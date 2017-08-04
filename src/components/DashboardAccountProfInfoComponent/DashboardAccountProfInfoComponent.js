import React from 'react';

import './DashboardAccountProfInfoComponent.scss'

export default class DashboardAccountProfInfoComponent extends React.Component {
    render() {
        const profInfo = this.props.providerDetails && this.props.providerDetails[0];

        return (
            <div className="dashboard-account-prof-info-component">
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
        );
    }
}
