import React from 'react';
import {Form} from "formsy-react";
import _ from 'lodash';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import InputComponent from "components/InputComponent/InputComponent.js";
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions';
import SelectComponent from 'components/SelectComponent/SelectComponent.js';

import 'react-datepicker/dist/react-datepicker.css';
import './DashboardDocumentAddFormComponent.scss';

export default class DashboardDocumentAddFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
        };
    }

    componentDidMount() {
        if (this.props.isProfInfo || this.props.isPatientInfo) {
            DashboardAccountPageActions.getAllStates();
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

    changeTitleID(value) {
        this.setState({
            DocTitleID: value
        });
    }

    AddDocumentForm(e) {

        var file = e.target.files.length > 0 ? e.target.files[0] : null;
        var name = file ? file.name : '';

        var extIndex = '';
        var extension = '';

        extIndex = name.lastIndexOf('.');
        extension = extIndex > -1 ? name.substring(extIndex + 1).toLowerCase() : '';

        var DocAttachment = {
            name: name,
            fileBase64Edit: '',
            extension: extension
        };

        var reader = new FileReader();
        var self = this;

        reader.onload = function (e) {

            DocAttachment.fileBase64Edit = e.target.result;
            self.state.OtherDocs = [];
            self.state.OtherDocs.push(DocAttachment);
        };

        reader.readAsDataURL(file);
    }

    submitOtherDocsForm() {
        const docData = {
            Document: this.state.OtherDocs[0].fileBase64Edit,
            FileName: this.state.OtherDocs[0].name,
            DocTypeID: this.state.DocTitleID,
            FileExtension: this.state.OtherDocs[0].extension

        };

        DashboardAccountPageActions.UploadDocument(docData);

        

            DashboardAccountPageActions.hideDocumentAddform();
      

        setTimeout(() => {

            DashboardAccountPageActions.getProviderDetails();
        }, 100);
    }

    render() {

        var options = [{
            key: 1,
            value: 'Passport'
        }, {
            key: 2,
            value: 'License'
        }];
  
        return (
            <div className="dashboard-account-edit-form-component">
                <Form
                    onSubmit={this.submitOtherDocsForm.bind(this)}
                    className="dashboard-account-edit-form-component__form"
                >
                    <div className="modal-component__row">
                        <label className="modal-component__col">
                            <SelectComponent
                                name="docTitle"
                                selectClassName="modal-component__input modal-component__input--select"
                                value={this.state.DocTitleID}
                                changeSelectValue={this.changeTitleID.bind(this)}
                                title='Document Type'
                                options={options}
                                required
                            >
                            </SelectComponent>
                        </label>

                        <label className="modal-component__col">
                             <input type="file" 
                                inputClassName="modal-component__input modal-component__input--file"
                                onChange={this.AddDocumentForm.bind(this)}
                                type='file'
                                title='Upload Document'
                                name="uploadDocument"
                                ref='newAttachment'
                                required
                            />
                        </label>
                    </div>

                    <div className="modal-component__row">
                        <button type="submit" className="modal-component__submit-btn">Submit</button>
                    </div>
                </Form>
            </div>
        );
    }
}