import React from 'react';
import { Form } from "formsy-react";
import autobind from 'autobind-decorator'
import _ from 'lodash';

import InputComponent from "components/InputComponent/InputComponent.js";
import AccountPatientShippingComponent from 'components/AccountPatientShippingComponent/AccountPatientShippingComponent.js';
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions.js';
import SelectComponent from 'components/SelectComponent/SelectComponent.js';

@autobind
export default class PatientPaymentDetailsComponent extends React.Component {
    state = {
        patientCardNumber: '',
        patientExpiryDate: '',
        patientCardVerificationNumber: '',
        patientPaymentType: this.props.formData.patientPaymentType || '',
        canSubmit: ''
    };

    submitPaymentDetailsForm(data) {
        console.log(data)
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

    changePaymentMethodValue(value) {
        this.setState({ patientPaymentType: value });
    }

    render() {
        const { paymentMethodOptions } = this.props;

        const patientPaymentType = _.find(paymentMethodOptions, ['value', this.state.patientPaymentType]) || _.find(paymentMethodOptions, ['key', this.state.patientPaymentType]);

        return (
            <Form
                onSubmit={this.submitPaymentDetailsForm}
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                className="dashboard-account-edit-form-component"
            >
                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <SelectComponent
                            selectClassName="modal-component__input modal-component__input--select"
                            value={patientPaymentType}
                            changeSelectValue={this.changePaymentMethodValue}
                            options={paymentMethodOptions}
                            title="Payment method"
                            name="PaymentMethod"
                            required
                        />
                    </div>

                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.patientCardNumber}
                            title="Card number"
                            name="CardNumber"
                            required
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.patientExpiryDate}
                            title="Expiry date:"
                            name="ExpiryDate"
                            required
                        />
                    </div>

                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.patientCardVerificationNumber}
                            title="Card verification number"
                            name="CardVerificationNumber"
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
}
