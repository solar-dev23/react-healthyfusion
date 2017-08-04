import React from 'react';


export default class AccountPatientShippingComponent extends React.Component {
     static propTypes = {
        addressType: React.PropTypes.string
    };

    render() {
        const { patientInfo, addressType } = this.props;

        return (
            <div className="dashboard-account-patient-info">
                <div className='dashboard-account-patient-info__col dashboard-account-patient-info__col--left'>
                    <span className='dashboard-account-patient-info__label'>State:</span>
                    <span className='dashboard-account-patient-info__label'>City:</span>
                    <span className='dashboard-account-patient-info__label'>Address:</span>
                    <span className='dashboard-account-patient-info__label'>ZIP Code:</span>
                </div>

                <div className='dashboard-account-patient-info__col'>
                    <span className='dashboard-account-patient-info__info'>
                        {addressType === 'Address1' && patientInfo.StateCode}
                        {addressType === 'Address2' && patientInfo.StateCode2}
                        {addressType === 'Address3' && patientInfo.StateCode3}
                    </span>
                    <span className='dashboard-account-patient-info__info'>
                        {addressType === 'Address1' && patientInfo.City}
                        {addressType === 'Address2' && patientInfo.City2}
                        {addressType === 'Address3' && patientInfo.City3}
                    </span>
                    <span className='dashboard-account-patient-info__info'>
                        {addressType === 'Address1' && patientInfo.Address1}
                        {addressType === 'Address2' && patientInfo.Address2}
                        {addressType === 'Address3' && patientInfo.Address3}
                    </span>
                    <span className='dashboard-account-patient-info__info'>
                        {addressType === 'Address1' && patientInfo.Zip}
                        {addressType === 'Address2' && patientInfo.Zip2}
                        {addressType === 'Address3' && patientInfo.Zip3}
                    </span>
                </div>
            </div>
        );
    }
}
