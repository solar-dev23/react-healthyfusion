import React from "react";
import "./DashboardPatientsFormModalComponent.scss";
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import DashboardPatientsPageActions from "actions/DashboardPatientsPageActions.js";
import DashboardAccountPageActions from "actions/DashboardAccountPageActions.js";
import AuthActions from 'actions/AuthActions.js';
import AuthStore from 'stores/AuthStore';

export default class DashboardPatientsFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPatientInfoForm: true,
            password: '',
            passwordConfirm: '',
            passwordError: false,
            email: '',
            firstName: '',
            lastName: '',
            userName: '',
            phone: '',
            passwordvalidationerror:false,
             usernameError:false,
            address1: '',
            address2: '',
            addressTypeId: '',
            state: '',
            city: '',
            stateCode: '',
            zip: '',
            PatientID:0
        };

        this.handlePatientInfoFormSubmit = this.handlePatientInfoFormSubmit.bind(this);
        this.handlePatientAddressFormSubmit = this.handlePatientAddressFormSubmit.bind(this);
    }
     static getStores() {
        return [
            AuthStore,           
            DashboardPatientsPageStore,
            DashboardAccountPageStore
        ];
    }

    static getPropsFromStores() {
        return {
            ...AuthStore.getState(),           
            ...DashboardPatientsPageStore.getState(),
            ...DashboardAccountPageStore.getState()
        }
    }
    componentDidMount() {
        DashboardAccountPageActions.getAllStates();
    }

    componentWillReceiveProps(newProps) {
        if ((newProps.openPatientsFormModal != this.props.openPatientsFormModal) && newProps.openPatientsFormModal) {
            this.resetState();
        }

        const { selectedPatient } = this.props;

        if (newProps.showPatientEdit) {
            this.setState({
                firstName: selectedPatient.FirstName,
                lastName: selectedPatient.LastName,
                email: selectedPatient.Email,
                userName: selectedPatient.UserName,
                password: selectedPatient.Password,
                phone: selectedPatient.Phone,
                addressTypeId: selectedPatient.addressTypeId,
                address1: selectedPatient.Address1,
                address2: selectedPatient.Address2,
                zip: selectedPatient.Zip,
                city: selectedPatient.City,
                state: selectedPatient.StateCode,
                passwordConfirm:selectedPatient.Password,
                PatientID:selectedPatient.PatientID
            });
        }
    }

    resetState() {
        this.setState({
            showPatientInfoForm: true,
            password: '',
            passwordConfirm: '',
            passwordError: false,
            email: '',
            firstName: '',
            lastName: '',
            userName: '',
            phone: '',
            address1: '',
            passwordvalidationerror:false,
            usernameError:false,
            address2: '',
            addressTypeId: '',
            state: '',
            city: '',
            stateCode: '',
            zip: '',
            PatientID:0
        })
    }

    handlePatientInfoFormSubmit(e) {
        e.preventDefault();

        if (this.state.password === this.state.passwordConfirm) {
             AuthActions.checkUsernamePatient(this.state.userName);
             setTimeout(() => {
                this.props.providerUserNameIsAvailable
            }, 700);
           
           if( this.props.providerUserNameIsAvailable===true && this.props.providerUserNameIsAvailable!=null)
           {
            this.setState({
                showPatientInfoForm: false

            });
         }
         else
         {
             this.setState({
                usernameError: true

            });
            
         }

        } else {
            this.setState({
                passwordError: true
            });
        }


    }

      handleNewPassChange(e) {
       
        this.setState({
            password: e.target.value
        });


       this.resetNewPasswordError();

         if(e.target.value.length<8)
          {
         this.setState({
                passwordvalidationerror: true
            });
        
          }
        
    }
        resetNewPasswordError() {
     
            this.setState({
                passwordError: false,
                passwordvalidationerror:false
            });
        
    }
    handlePatientAddressFormSubmit(e) {
        e.preventDefault();      

       
        if(this.props.showPatientEdit == true )
        {
             const UpdatedpatientData = {          
                    FirstName: this.state.firstName,
                    LastName: this.state.lastName, 
                    Phone: this.state.phone,  
                    Email: this.state.email,  
                    AddressTypeID: 1,   
                    Address1: this.state.address1,
                    Address2: this.state.address2,              
                    City: this.state.city,
                    CountryID: 1,
                    StateCode: this.state.state,
                    zip: this.state.zip ,
                    PatientId: this.state.PatientID
           
            };
            DashboardPatientsPageActions.updatePatientInfo(UpdatedpatientData);
        }
        else
        {
             this.setState({
                passwordvalidationerror: false
            });
             const patientData = {
            Email: this.state.email,
            FirstName: this.state.firstName,
            LastName: this.state.lastName,
            Password: this.state.password,
            PatientAddress: {
                Address1: this.state.address1,
                Address2: this.state.address2,
                AddressTypeID: 1,
                City: this.state.city,
                CountryID: 1,
                StateCode: this.state.state,
                Zip: this.state.zip
            },
            Phone: this.state.phone,
            UserName: this.state.userName,
            TitleID: 1
        };
            DashboardPatientsPageActions.createPatient(patientData);
        }
        
         setTimeout(() => {
                DashboardPatientsPageActions.onPaginate(1);
                DashboardPatientsPageActions.getPatients(0);
             }, 200);
    } 
    renderCheckUsernameErrors() {
        if (this.props.providerUserNameIsAvailable === false && this.state.usernameError===true) {
            return <label className="verify-errors" style={{color: 'red'}}>Username is unavailable</label>;
        }
    }

    renderPatientInfoForm() {
        return (
            <form className="patient-form-modal patient-form-modal--info" onSubmit={this.handlePatientInfoFormSubmit}>
                {this.state.passwordError &&
                <div className="patient-form-modal__error">Password and password confirm does not match.</div>}
                  {this.state.passwordvalidationerror && <div className="success">Password should be minimum 8 characters with use of an uppercase alphabet, a lowercase alphabet, and a number</div>}
                    {this.renderCheckUsernameErrors()}
                <div className="modal-component__row">
                    <label className="modal-component__col">
                        <span className="modal-component__label">First name:</span>
                        <input type="text"
                               className="modal-component__input modal-component__input--text"
                               value={this.state.firstName}
                               onChange={(e) => this.setState({firstName: e.target.value})}
                               required
                        />
                    </label>

                    <label className="modal-component__col">
                        <span className="modal-component__label">Last name:</span>
                        <input type="text"
                               className="modal-component__input modal-component__input--text"
                               value={this.state.lastName}
                               onChange={(e) => this.setState({lastName: e.target.value})}
                               required
                        />
                    </label>
                </div>

                <div className="modal-component__row">
                    <label className="modal-component__col">
                        <span className="modal-component__label">Email:</span>
                        <input type="email"
                               className="modal-component__input modal-component__input--text"
                               title="user@example.com"
                               value={this.state.email}
                               onChange={(e) => this.setState({email: e.target.value,userName: e.target.value})}
                               required
                        />
                    </label>
                  
                    <label className="modal-component__col">
                        <span className="modal-component__label">Username:</span>
                        <input type="text"
                                disabled={true}
                               className="modal-component__input modal-component__input--text"
                               value={this.state.userName}
                               onChange={(e) => this.setState({userName: e.target.value})}
                               required
                        />
                    </label>
                </div>

                <div className="modal-component__row">
                    <label className="modal-component__col">
                        <span className="modal-component__label">Password:</span>
                        <input type="password"
                               className="modal-component__input modal-component__input--text"
                               value={this.state.password}
                                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
                                 onChange={this.handleNewPassChange.bind(this)}
                              
                               required
                               disabled={this.props.showPatientEdit == true? true:false}
                        />
                    </label>

                    <label className="modal-component__col">
                        <span className="modal-component__label">Confirm password:</span>
                        <input type="password"
                               className="modal-component__input modal-component__input--text"
                               value={this.state.passwordConfirm}                               
                               onChange={(e) => this.setState({passwordConfirm: e.target.value})}
                               required
                                disabled={this.props.showPatientEdit == true? true:false}
                        />
                    </label>
                </div>

                <div className="patient-form-modal__row">
                    <input type="submit" className="modal-component__submit-btn" value='Next'/>
                </div>
            </form>
        )
    }

    renderPatientAddressForm() {
        return (
            <form className="patient-form-modal patient-form-modal--address" onSubmit={this.handlePatientAddressFormSubmit}>
                {this.props.patientCreationErrors && <div className="error col-sm-12">{this.props.patientCreationErrors}</div>}

               <div className="modal-component__row">
                    <label className="modal-component__col">
                        <span className="modal-component__label">Address 1:</span>
                        <input type="text"
                               className="modal-component__input modal-component__input--text"
                               value={this.state.address1}
                               onChange={(e) => this.setState({address1: e.target.value})}
                               required
                        />
                    </label>

                    <label className="modal-component__col">
                        <span className="modal-component__label">Address 2:</span>
                        <input type="text"
                               className="modal-component__input modal-component__input--text"
                               value={this.state.address2}
                               onChange={(e) => this.setState({address2: e.target.value})}
                               required
                        />
                    </label>
                </div>

                <div className="modal-component__row">
                    

                    <label className="modal-component__col">
                        <span className="modal-component__label">City:</span>
                        <input type="text"
                               className="modal-component__input modal-component__input--text"
                               value={this.state.city}
                               onChange={(e) => this.setState({city: e.target.value})}
                               required
                        />
                    </label>

                    <label className="modal-component__col">
                        <span className="modal-component__label">State</span>
                        <select className="modal-component__input modal-component__input--select"
                                value={this.state.state}
                                onChange={(e) => this.setState({state: e.target.value})}
                                required
                        >
                            <option disabled value="">Select</option>
                            {this.props.states && this.props.states.States.map((state) => {
                                return <option value={state.key} key={state.key}>{state.value}</option>
                            })}
                        </select>
                    </label>

                </div>

                <div className="modal-component__row">
                    <label className="modal-component__col">
                        <span className="modal-component__label">Zip:</span>
                        <input type="text"
                               className="modal-component__input modal-component__input--text"
                               pattern='^[0-9]{0,19}'
                               value={this.state.zip}
                               onChange={(e) => this.setState({zip: e.target.value})}
                               required
                        />
                    </label>
                     <label className="modal-component__col">
                        <span className="modal-component__label">Phone:</span>
                        <input type="text"
                               className="modal-component__input modal-component__input--text"
                               value={this.state.phone}
                               onChange={(e) => this.setState({phone: e.target.value})}
                               required
                        />
                    </label>
                </div>

                <div className="modal-component__row">
                    <input type="submit" className="modal-component__submit-btn" value='Submit'/>
                </div>
            </form>
        )
    }

    render() {
        const modalStyle = {
            width: '785px',
            maxWidth: '100%'
        };
        
        const headerText = this.props.showPatientEdit == true ?  this.state.showPatientInfoForm ? "Step 1 of 2 - Edit patient" : "Step 2 of 2 - Edit patient":(this.state.showPatientInfoForm ? "Step 1 of 2 - Add new patient" : "Step 2 of 2 - Add new patient");
        return (
            <div className="dashboard-patients-form-modal-component">
                <ModalComponent
                    showModal={this.props.openPatientsFormModal}
                    onHide={DashboardPatientsPageActions.closePatientsFormModal}
                    onShow={DashboardPatientsPageActions.openPatientsFormModal}
                    header={headerText}
                    hideOk={true}
                    modalStyle={modalStyle}
                >
                    {this.state.showPatientInfoForm && this.renderPatientInfoForm() ||  this.renderPatientAddressForm()}
                </ModalComponent>
            </div>
        );
    }
}