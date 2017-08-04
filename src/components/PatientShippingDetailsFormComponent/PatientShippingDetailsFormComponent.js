import React from 'react';
import { Form } from 'formsy-react';
import autobind from 'autobind-decorator';
import _ from 'lodash';

import InputComponent from "components/InputComponent/InputComponent.js";
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions.js';
import SelectComponent from 'components/SelectComponent/SelectComponent.js';

@autobind
export default class PatientShippingDetailsFormComponent extends React.Component {

    state = {
        patientCardNumber: '',
        patientExpiryDate: '',
        patientCardVerificationNumber: '',
        patientPaymentType: '',
        canSubmit: '',
        patientShippingType: ''
    };

    submitPaymentDetailsForm(data) {
        console.log(data)
    };

    enableButton() {
        this.setState({
            canSubmit: true
        });
    };

    disableButton() {
        this.setState({
            canSubmit: false
        });
    };

    changeShippingStatesValue(value) {
        this.setState({ patientShippingType: value });
    };

    render() {
        const { paymentMethodOptions } = this.props;

        const shippingStatesOptions = [{key: '1', value: 'state1'}, {key: '2', value: 'state2'}];

        const patientShippingType = _.find(shippingStatesOptions, ['value', this.state.patientShippingType]) || _.find(shippingStatesOptions, ['key', this.state.patientShippingType]);

        return (
            <div>
                <div className="modal-component__row">
                    <ul className="modal-component__tabs">
                        <li className="modal-component__tab modal-component__tab--current">Address 1</li>
                        <li className="modal-component__tab">Address 2</li>
                        <li className="modal-component__tab">Address 3</li>
                        <li className="modal-component__add-btn">+</li>
                    </ul>
                </div>

                <Form
                    onSubmit={this.submitPaymentDetailsForm}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    className="dashboard-account-edit-form-component"
                >
                    <div className="modal-component__row">
                        <div className="modal-component__col">
                            <InputComponent
                                inputClassName="modal-component__input modal-component__input--text"
                                value={this.state.AddressName}
                                title="Address name:"
                                name="AddressName"
                                required
                            />
                        </div>

                        <div className="modal-component__col">
                            <button className="modal-component__remove-address-btn">Remove address</button>
                        </div>
                    </div>

                    <div className="modal-component__row">
                        <div className="modal-component__col">
                            <SelectComponent
                                selectClassName="modal-component__input modal-component__input--select"
                                value={patientShippingType}
                                changeSelectValue={this.changeShippingStatesValue}
                                options={shippingStatesOptions}
                                title="State:"
                                name="PaymentMethod"
                                required
                            />
                        </div>

                        <div className="modal-component__col">
                            <InputComponent
                                inputClassName="modal-component__input modal-component__input--text"
                                value={this.state.LicenceNum}
                                title="City:"
                                name="City"
                                required
                            />
                        </div>
                    </div>

                    <div className="modal-component__row">
                        <div className="modal-component__col">
                            <InputComponent
                                inputClassName="modal-component__input modal-component__input--text"
                                value={this.state.LicenceNum}
                                title="Address:"
                                name="Address"
                                required
                            />
                        </div>

                        <div className="modal-component__col">
                            <InputComponent
                                inputClassName="modal-component__input modal-component__input--text"
                                value={this.state.LicenceNum}
                                title="Zip:"
                                name="Zip"
                                required
                            />
                        </div>
                    </div>

                    <div className="modal-component__row">
                        <button className="modal-component__apply-btn">Apply</button>
                        <button type="submit" className="modal-component__submit-btn">Submit</button>
                    </div>
                </Form>
            </div>
        );
    }
}
