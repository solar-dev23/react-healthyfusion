import React from 'react';
import { Form } from "formsy-react";
import _ from 'lodash';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import InputComponent from "components/InputComponent/InputComponent.js";
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions';
import SelectComponent from 'components/SelectComponent/SelectComponent.js';
import PatientShippingDetailsFormComponent from 'components/PatientShippingDetailsFormComponent/PatientShippingDetailsFormComponent.js';
import PatientPersonalInfoFormComponent from 'components/PatientPersonalInfoFormComponent/PatientPersonalInfoFormComponent.js';
import PatientPaymentDetailsComponent from 'components/PatientPaymentDetailsComponent/PatientPaymentDetailsComponent.js';

import 'react-datepicker/dist/react-datepicker.css';
import './DashboardAccountEditFormComponent.scss';

export default class DashboardAccountEditFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            FirstName: props.formData.firstName || '',
            LastName: props.formData.lastName || '',
            TitleID: props.formData.pTitleID || '',
            Phone: props.formData.phone || '',
            Email: props.formData.email || '',

            ProfessionalId: props.formData.PID || '',
            PracticeBusiness: props.formData.PBus || '',
            LicenceName: props.formData.Lname || '',
            LicenceNum: props.formData.Lnum || '',
            LicenseStateID: props.formData.LstateId || '',
            LicenseExpDate: moment(props.formData.Ldate) || moment()
        };
    }

    componentDidMount() {
        if (this.props.isProfInfo || this.props.isPatientInfo) {
            DashboardAccountPageActions.getAllStates();
        }
        if (this.props.isProfInfo || this.props.isProviderInfo) {
            DashboardAccountPageActions.getProviderSettings();
        }
    }

    enableButton() {
        this.setState({
            canSubmit: true
        });
    }

    disableButton() {
        this.setState({
            canSubmit: false
        });
    }

    submitPfoviderInfoForm(data) {
        let requestData = data;

        requestData['TitleID'] = data.TitleID.key;

        DashboardAccountPageActions.updateProfInfo(requestData);
        DashboardAccountPageActions.hideEditAccountForm();

        setTimeout(() => {
            DashboardAccountPageActions.getProviderDetails();
        }, 500);
    }

    submitProfInfoForm(data) {
        let requestData = data;
        requestData['ProfessionalId'] = data.ProfessionalId.key;
        requestData['LicenseStateID'] = data.LicenseStateID.key;
        requestData['LiscenceName'] = data.LicenceName;
        requestData['LiscenceNum'] = data.LicenceNum;
        requestData['PracticeBusiness'] = data.PracticeBusiness;
        requestData['LicenseExpDate'] = moment(this.state.LicenseExpDate).format('MM/DD/YYYY');
  
        DashboardAccountPageActions.updateProvidersProfInfo(requestData);
        DashboardAccountPageActions.hideEditAccountForm();

        setTimeout(() => {
            DashboardAccountPageActions.getProviderDetails();
        }, 500);
    }

    submitPatientInfoForm(data) {
        const requestData = {};
        requestData['Address1'] = data.patientAddress1;
        requestData['Address2'] = data.patientAddress2;
        requestData['StateCode'] = data.patientState.key;
        requestData['AddressTypeID'] = data.patientAddressType.key;
        requestData['City'] = data.patientCity;
        requestData['CountryID'] = this.props.formData.CountryID || 1;
        requestData['Email'] = data.patientEmail;
        requestData['FirstName'] = data.patientFirstName;
        requestData['LastName'] = data.patientLastName;
        requestData['Phone'] = data.patientPhone;
        requestData['Zip'] = data.patientZip;

        DashboardAccountPageActions.updatePatientInfo(requestData);
        DashboardAccountPageActions.hideEditAccountForm();

        setTimeout(() => {
            DashboardAccountPageActions.getPatientInfo();
        }, 500);
    }

    changeStateValue(value) {
        this.setState({
            LicenseStateID: value
        });
    }

    changeProfTitleValue(value) {
        this.setState({
            ProfessionalId: value
        });
    }

    changeProviderInfoValue(value) {
        this.setState({
            TitleID: value
        });
    }

    changeAddressTypeValue(value) {
        this.setState({
            patientAddressType: value
        });
    }

    changePatientStateValue(value) {
        this.setState({
            patientState: value
        });
    }

    handleDateChange(date) {
        this.setState({
            LicenseExpDate: date
        });
    }

    renderProviderInfoForm() {
        const { providerInfoOptions } = this.props,
            providerInfoValue= _.find(providerInfoOptions, ['key', Number(this.state.TitleID)]);

        return (
            <Form
                onSubmit={this.submitPfoviderInfoForm.bind(this)}
                onValid={this.enableButton.bind(this)}
                onInvalid={this.disableButton.bind(this)}
                className="dashboard-account-edit-form-component"
            >
                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.FirstName}
                            title="First Name"
                            name="FirstName"
                            required
                        />
                    </div>

                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.LastName}
                            title="Last Name"
                            name="LastName"
                            required
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <SelectComponent
                            selectClassName="modal-component__input modal-component__input--select"
                            value={providerInfoValue}
                            changeSelectValue={this.changeProviderInfoValue.bind(this)}
                            options={providerInfoOptions}
                            title="Title"
                            name="TitleID"
                            required
                        />
                    </div>

                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.Phone}
                            title="Phone"
                            name="Phone"
                            required
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.Email}
                            type="email"
                            title="Email"
                            name="Email"
                            required
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <button
                        className="modal-component__submit-btn"
                        type="submit"
                        disabled={!this.state.canSubmit}
                    >
                        Submit
                    </button>
                </div>
            </Form>
        );
    }

    renderProfInfoForm() {
        const { profTitleOptions, allStatesData } = this.props,
            profTitleValue = _.find(profTitleOptions, ['key', Number(this.state.ProfessionalId)]),
            profStateValue = _.find(allStatesData, ['key', this.state.LicenseStateID]);

        return (
            <Form
                onSubmit={this.submitProfInfoForm.bind(this)}
                onValid={this.enableButton.bind(this)}
                onInvalid={this.disableButton.bind(this)}
                className="dashboard-account-edit-form-component"
            >
                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <SelectComponent
                            selectClassName="modal-component__input modal-component__input--select"
                            value={profTitleValue}
                            changeSelectValue={this.changeProfTitleValue.bind(this)}
                            options={profTitleOptions}
                            title="Professional Title"
                            name="ProfessionalId"
                            required
                        />
                    </div>

                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.PracticeBusiness}
                            title="Business Name"
                            name="PracticeBusiness"
                            required
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.LicenceName}
                            title="License Name"
                            name="LicenceName"
                            required
                        />
                    </div>

                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.LicenceNum}
                            title="License Number"
                            name="LicenceNum"
                            required
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <SelectComponent
                            selectClassName="modal-component__input modal-component__input--select"
                            value={profStateValue}
                            changeSelectValue={this.changeStateValue.bind(this)}
                            options={allStatesData}
                            title="License State"
                            name="LicenseStateID"
                            required
                        />
                    </div>

                    <div className="modal-component__col">
                        <label htmlFor="LicenseExpDate">License Expiry Date</label> <br/>

                        <DatePicker
                            className="modal-component__input modal-component__input--date-picker"
                            selected={this.state.LicenseExpDate}
                            onChange={this.handleDateChange.bind(this)}
                            minDate={moment()}
                            name="LicenseExpDate"
                            showYearDropdown
                            required
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <button
                        className="modal-component__submit-btn"
                        type="submit"
                        disabled={!this.state.canSubmit}
                    >
                        Submit
                    </button>
                </div>
            </Form>
        );
    }

    render() {
        const { isProviderInfo, isProfInfo, isPatientPersonalInfo, isPatientPaymentDetails, isPatientShippingDetails, paymentMethodOptions, formData } = this.props;

        return (
            <div className="dashboard-account-edit-form-component">
                { isProviderInfo && this.renderProviderInfoForm() }
                { isProfInfo && this.renderProfInfoForm() }

                {isPatientPersonalInfo && <PatientPersonalInfoFormComponent />}
                {isPatientPaymentDetails && <PatientPaymentDetailsComponent
                    formData={formData}
                    paymentMethodOptions={paymentMethodOptions}
                />}

                {isPatientShippingDetails && <PatientShippingDetailsFormComponent />}
            </div>
        );
    }
}
