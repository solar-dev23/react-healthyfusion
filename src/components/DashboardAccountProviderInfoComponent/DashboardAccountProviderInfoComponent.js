import React from 'react';

import './DashboardAccountProviderInfoComponent.scss'

export default class DashboardAccountProviderInfoComponent extends React.Component {
    render() {
        const providerInfo = this.props.providerDetails && this.props.providerDetails[0];

        return (
            <div className="dashboard-account-provider-info-component">

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
        );
    }
}
