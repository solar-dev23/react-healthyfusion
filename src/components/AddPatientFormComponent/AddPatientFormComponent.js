import React from 'react';
import { Form } from "formsy-react";

import InputComponent from "components/InputComponent/InputComponent.js";
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import AuthStore from 'stores/AuthStore'
import AuthActions from 'actions/AuthActions.js';
import './AddPatientFormComponent.scss'

export default class AddPatientFormComponent extends React.Component {
     componentWillReceiveProps(newProps) {
     
        this.props.providerUserNameIsAvailable;
        // if (newProps.addedToCart && newProps.addedToCart !== this.props.addedToCart) {
        //     appHistory.push(Routes.dashboardProductsPage);
        //     this.props.showAddedToCartModal();
        // }
    }
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
           // UserNameError: true,
        };
          this.onSetUNameCheckSuccess = this.onSetUNameCheckSuccess.bind(this);
    }
static getStores() {
        return [ AuthStore];
    }

    static getPropsFromStores() {
        return {
          
             ...AuthStore.getState()
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

     submit(data) {

     this.setState({data: data});    
       AuthActions.checkUsernamePatient(data.email);
             setTimeout(() => {
                this.props.providerUserNameIsAvailable
            }, 700);
             AuthStore.listen(this.onSetUNameCheckSuccess);  

      
}

        onSetUNameCheckSuccess(){

           
        let onSuccess = 'success';
         AuthStore.unlisten(this.onSetUNameCheckSuccess); 
        
            if(this.props.providerUserNameIsAvailable === false){
                // this.setState({UserNameError: false});
                 onSuccess = 'failed'; 
             }
          
               if(onSuccess == 'success'){

                    const Data = this.state.data;
                      setTimeout(() => {
                   DashboardProductsPageActions.addNewPatient(Data);
                 DashboardCheckoutPageActions.clearCheckout();
                  }, 500); 
                

               }
    

            
         
    }
     renderCheckUsernameErrors() {
        if (this.props.providerUserNameIsAvailable === false) {
            return <label className="verify-errors" style={{color: 'red'}}>Username is unavailable</label>;
        }

    }
   
    render() {
        return (
            <div className="add-patient-form-component viewdiv">
                <Form onSubmit={this.submit.bind(this)}
                      onValid={this.enableButton.bind(this)}
                      onInvalid={this.disableButton.bind(this)}
                      className="addPatientbox"
                >  {this.renderCheckUsernameErrors()}
                    <div className='buttonDiv'>
                        <label className='patientlabel'>Add New Patient</label>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <InputComponent
                                title="First Name:"
                                value={this.state.firstName}
                                placeholder="Enter First Name"
                                name="firstName"
                                validationError="Please enter First Name"
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <InputComponent
                                title="Last Name:"
                                value={this.state.lastName}
                                placeholder="Enter Last Name"
                                name="lastName"
                                validationError="Please enter Last Name"
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <InputComponent
                                title="Phone:"
                                value={this.state.phoneNumber}
                                placeholder="Enter Phone No"
                                name="phoneNumber"
                                validationError="Please enter Phone Number"
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <InputComponent
                                title="Email"
                                value={this.state.email}
                                placeholder="Enter Email"
                                name="email"
                                validationError="Please enter Email"
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div>
                                <div className='buttonDiv'>
                                    <button
                                        type="submit"
                                        className="Button  btn btn-info m-l-xs"
                                        disabled={!this.state.canSubmit}
                                    >Register New Patient and Add Basket</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}
