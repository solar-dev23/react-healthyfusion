import React from 'react';
import { Link, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import Routes from 'routes.js';
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import DashboardCheckoutPageActions  from 'actions/DashboardCheckoutPageActions.js';
import AddPatientFormComponent from 'components/AddPatientFormComponent/AddPatientFormComponent.js';
import './ProviderProductsBasketPatientsComponent.scss';
import AuthStore from 'stores/AuthStore'
import AuthActions from 'actions/AuthActions.js';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export default class ProviderProductsBasketPatientsComponent extends React.Component {
    componentWillReceiveProps(newProps) {
     

        if (newProps.addedToCart && newProps.addedToCart !== this.props.addedToCart) {
            appHistory.push(Routes.dashboardProductsPage);
            this.props.showAddedToCartModal();
        }
    }
    static getStores() {
        return [ AuthStore];
    }

    static getPropsFromStores() {
        return {
          
             ...AuthStore.getState()
        }
    }
    showNewPatientForm() {
        DashboardProductsPageActions.showNewPatientForm();
    }

    searchPatient() {
        DashboardProductsPageActions.searchPatient(this.refs.SearchKeyword.value);
    }
    
    showCheckoutForm(){
         DashboardProductsPageActions.showCheckoutForm();
        // appHistory.push(Routes.dashboardCheckoutPage);

    }
    AddPatientFormComponent()
    {
         return (
           <AddPatientFormComponent
            providerUserNameIsAvailable={this.props.providerUserNameIsAvailable}
              
              />

        )
    }
    render() {
        return (
            <div className='patient-search-main-block'>
                <div className='patient-search-block'>
                    <div className='PatientSearchMain'>

                   
                        <button
                            className="Button  btn btn-info m-l-xs add-new-patient"
                            onClick={this.showNewPatientForm.bind(this)}
                        >
                            Add New patient
                        </button>
                        <div className="search-patient-block">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search patient"
                                ref="SearchKeyword"
                            />
                            <div>
                                <button
                                    className="Button  btn btn-info m-l-xs"
                                    onClick={this.searchPatient.bind(this)}
                                >
                                    <i className="fa fa-search" aria-hidden="true"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="searched-patient">
                    <div className="table-wrapper">
                        {this.props.searchedPatientsList && <table>
                            <tbody>
                            <tr className="table-head">
                                <td>
                                    <span>First Name</span>
                                    <div className="sort-list">
                                        <i className="fa fa-angle-up" aria-hidden="true"/>
                                        <i className="fa fa-angle-down" aria-hidden="true"/>
                                    </div>
                                </td>
                                <td>
                                    <span>Last Name</span>
                                    <div className="sort-list">
                                        <i className="fa fa-angle-up" aria-hidden="true"/>
                                        <i className="fa fa-angle-down" aria-hidden="true"/>
                                    </div>
                                </td>
                                <td>
                                    <span>City</span>
                                    <div className="sort-list">
                                        <i className="fa fa-angle-up" aria-hidden="true"/>
                                        <i className="fa fa-angle-down" aria-hidden="true"/>
                                    </div>
                                </td>
                                <td>
                                    <span>Phone</span>
                                    <div className="sort-list">
                                        <i className="fa fa-angle-up" aria-hidden="true"/>
                                        <i className="fa fa-angle-down" aria-hidden="true"/>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            {this.props.searchedPatientsList.map((patient, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{patient.FirstName}</td>
                                        <td>{patient.LastName}</td>
                                        <td>{patient.City}</td>
                                        <td>{patient.Phone}</td>
                                        <td className="add-to-patient">
                                            <a href="#" onClick={() => {DashboardCheckoutPageActions.clearCheckout(); this.props.addToCart(patient.PatientID)} }>Add to Patient</a>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>}
                    </div>
                </div>
               <div style={{paddingTop:50}}> {this.props.newPatientFormShow && this.AddPatientFormComponent()}</div>
            </div>

        );
    }
}
