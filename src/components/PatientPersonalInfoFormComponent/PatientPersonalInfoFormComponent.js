import React from 'react';
import { Form } from "formsy-react";
import autobind from 'autobind-decorator'

import InputComponent from "components/InputComponent/InputComponent.js";
import AccountPatientShippingComponent from 'components/AccountPatientShippingComponent/AccountPatientShippingComponent.js';
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions.js';

@autobind
export default class PatientPersonalInfoFormComponent extends React.Component {
    state = {
        patientFirstName: '',
        patientLastName: '',
        patientEmail: '',
        patientPhone: '',
        patientPassword: '',
        confirmPassword: '',
        canSubmit: ''
    };

    submitPersonalInfoForm(data) {
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

    render() {
        return (
            <Form
                onSubmit={this.submitPersonalInfoForm}
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                className="dashboard-account-edit-form-component"
            >
                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.patientFirstName}
                            title="First name"
                            name="FirstName"
                            required
                        />
                    </div>

                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.patientLastName}
                            title="Last name"
                            name="LastName"
                            required
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.patientEmail}
                            title="Email"
                            name="Email"
                            type="email"
                            required
                        />
                    </div>

                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.patientPhone}
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
                            value={this.state.patientPassword}
                            title="Password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>

                    <div className="modal-component__col">
                        <InputComponent
                            inputClassName="modal-component__input modal-component__input--text"
                            value={this.state.confirmPassword}
                            title="Confirm Password"
                            name="ConfirmPassword"
                            type="password"
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
