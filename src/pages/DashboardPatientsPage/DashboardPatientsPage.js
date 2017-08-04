import React, { Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link, useRouterHistory } from 'react-router';
import Routes from 'routes.js';

import DashboardPatientsPageStore from 'stores/DashboardPatientsPageStore'
import DashboardPatientsPageActions from 'actions/DashboardPatientsPageActions';
import DashboardPatientsFormModalComponent from "components/DashboardPatientsFormModalComponent/DashboardPatientsFormModalComponent.js";
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import PaginationComponent from 'components/PaginationComponent/PaginationComponent.js';
import classNames from 'classnames';
import AuthStore from 'stores/AuthStore'
import AuthActions from 'actions/AuthActions.js';
import './DashboardPatientsPage.scss';

@connectToStores
export default class DashboardPatientsPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            selectedDirectPatient: null
        }
    }

    selectedDirectPatient(selectedDirectPatient) {
        this.setState({selectedDirectPatient});

        DashboardPatientsPageActions.getSinglePatient(selectedDirectPatient.Patientid);
    }

    componentDidMount() {
        DashboardPatientsPageActions.getPatients();
    }

    static getStores() {
        return [DashboardPatientsPageStore, AuthStore];
    }

    static getPropsFromStores() {
        return {
             ...AuthStore.getState(),  
            ...DashboardPatientsPageStore.getState()
        }
    }
    
    showPatientEdits(e) {
        e.preventDefault();
        
        DashboardPatientsPageActions.showPatientEdit();
        DashboardPatientsPageActions.openPatientsFormModal();
    }

    onPaginate(pageNumber) {
        DashboardPatientsPageActions.onPaginate(pageNumber);
        DashboardPatientsPageActions.getPatients(pageNumber - 1);
    }

    render() {
        const { patientsData, contextRouter, selectedPatient, pageNumber } = this.props;
        const { selectedDirectPatient } = this.state;

        return (
            <div className="dashboard-patients-page">
                { contextRouter.isActive(Routes.dashboardPatientsPage) && <span className="add-new-patient">
                    <button
                        onClick={() => {
                            DashboardPatientsPageActions.closePatientEdit();
                            DashboardPatientsPageActions.openPatientsFormModal();
                        }}
                    >
                        <span className="m-l-xs">Add New Patient</span>
                    </button>
                </span>}

                <table>
                    <thead>
                    <tr className="tr-title">
                        <td>
                            <div className="td-title">
                                Patient
                                <div className="sort-list">
                                    <i className="fa fa-angle-up" aria-hidden="true"/>
                                    <i className="fa fa-angle-down" aria-hidden="true"/>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="td-title">
                                Orders
                                <div className="sort-list">
                                    <i className="fa fa-angle-up" aria-hidden="true"/>
                                    <i className="fa fa-angle-down" aria-hidden="true"/>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="td-title">
                                Total Amount
                                <div className="sort-list">
                                    <i className="fa fa-angle-up" aria-hidden="true"/>
                                    <i className="fa fa-angle-down" aria-hidden="true"/>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="td-title">
                                Last Order
                                <div className="sort-list">
                                    <i className="fa fa-angle-up" aria-hidden="true"/>
                                    <i className="fa fa-angle-down" aria-hidden="true"/>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="td-title">
                                Join Date
                                <div className="sort-list">
                                    <i className="fa fa-angle-up" aria-hidden="true"/>
                                    <i className="fa fa-angle-down" aria-hidden="true"/>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="td-title">
                                Total Earnings
                                <div className="sort-list">
                                    <i className="fa fa-angle-up" aria-hidden="true"/>
                                    <i className="fa fa-angle-down" aria-hidden="true"/>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="td-title">
                                Status
                                <div className="sort-list">
                                    <i className="fa fa-angle-up" aria-hidden="true"/>
                                    <i className="fa fa-angle-down" aria-hidden="true"/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </thead>
                    {patientsData.map((patient, i) => {
                        const trClassName = classNames({
                            'tr-2': i % 2 === 0,
                            'tr-1': i % 2 !== 0,
                            'active': patient.Patientid === this.props.selectedPatientId
                        });

                        return (
                            <tbody key={patient.Patientid}>
                            <tr
                                className={trClassName}
                                onClick={() => DashboardPatientsPageActions.selectPatient(patient.Patientid)}
                            >
                                <td onClick={this.selectedDirectPatient.bind(this, patient)}>{patient.PatientName}</td>
                                <td onClick={this.selectedDirectPatient.bind(this, patient)}>{patient.Orders}</td>
                                <td onClick={this.selectedDirectPatient.bind(this, patient)}>{patient.TotalAmount}</td>
                                <td onClick={this.selectedDirectPatient.bind(this, patient)}>{patient.LastOrder}</td>
                                <td onClick={this.selectedDirectPatient.bind(this, patient)}>{patient.JoinDate}</td>
                                <td onClick={this.selectedDirectPatient.bind(this, patient)}>{patient.TotalEarnings}</td>
                                <td onClick={this.selectedDirectPatient.bind(this, patient)}>{patient.Status}</td>
                            </tr>

                            {selectedPatient && selectedDirectPatient && selectedDirectPatient === patient && <tr className="patient-detail">
                                <td colSpan="2" className="personal-info">
                                    <h4>Patient Info</h4>
                                    <p>First Name: {selectedPatient.FirstName}</p>
                                    <p>Last Name: {selectedPatient.LastName}</p>
                                    <p>Phone: {selectedPatient.Phone}</p>
                                    <p>Email: {selectedPatient.Email}</p>
                                </td>
                                <td colSpan="2" className="address-info">
                                    <br/>
                                    <p>Address Type: {selectedPatient.AddressType}</p>
                                    <p>Address1: {selectedPatient.Address1}</p>
                                    <p>Address2: {selectedPatient.Address2}</p>
                                    <p>City: {selectedPatient.City}</p>
                                </td>
                                <td colSpan="4" className="state-info">
                                    <br/>
                                    <p>State Code: {selectedPatient.StateCode}</p>
                                    <p>Zip: {selectedPatient.Zip}</p>
                                    <p>Country: {selectedPatient.CountryVchID}</p>
                                    <a
                                        onClick={this.showPatientEdits.bind(this)}
                                        className="edit-button"
                                        href="#"
                                    >Edit Patient Info</a>
                                </td>
                            </tr>}
                            </tbody>
                        )
                    })}
                </table>

                {this.props.totalPatientsPages > 10 && <PaginationComponent
                    paginationParams = "showpatients"
                    totalCountPage = {parseInt(this.props.totalPatientsPages / 10)}
                    onPaginate={this.onPaginate.bind(this)}
                    contextRouter={contextRouter}
                    pageNumber={pageNumber}
                />}

                <DashboardPatientsFormModalComponent
                    openPatientsFormModal={this.props.openPatientsFormModal}
                    states={this.props.states}
                    patientCreationErrors={this.props.patientCreationErrors}
                    selectedPatient={this.props.selectedPatient}
                    showPatientEdit={this.props.showPatientEdit}
                    providerUserNameIsAvailable={this.props.providerUserNameIsAvailable}
                />

                <ModalComponent
                    showModal={this.props.patientCreated}
                    onHide={DashboardPatientsPageActions.closePatientCreatedSuccessModal}
                >
                    {this.props.existingUsername && <div>Patient with this username already exists. Patient not added</div> || <div>Patient Added Successfully</div>}
                </ModalComponent>
            </div>
        );
    }
}