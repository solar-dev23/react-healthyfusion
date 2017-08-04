import React from "react";
import "./PaymentFormModalComponent.scss";
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import DashboardPatientsPageActions from "actions/DashboardPatientsPageActions";
import DashboardAccountPageActions from "actions/DashboardAccountPageActions";
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class PaymentFormModalComponent extends React.Component {
    constructor(props) {
        super(props);

        let total = 0;
   
           props.Total.forEach((product) => {
               total += product.Total
             });
        this.state = {
            CardNum: '',
            CardType: '',
            ExpDate: moment(),           
            Description: '',
            firstName: '',
            lastName: '',
            amount: total,
             email: '',
            phone: '',
            address: '', 
            state: '',
            city: '',
            PostalCode: '',
            zip: '',
             Notes: '',
             orderId:props.orderId,
             states:props.states
        };

         this.handlePaymentForm = this.handlePaymentForm.bind(this);
       
    }
    
            
    componentWillReceiveProps(newProps) {
         
           
            this.resetState();
      
    }
  handleDateChange(date) {
        this.setState({
            ExpDate: date
        });
    }
    resetState() {
        this.setState({
             CardNum: '',
            CardType: '',
            ExpDate: moment(),           
            Description: '',
            firstName: '',
            lastName: '',           
             email: '',
            phone: '',
            address: '', 
            state: '',
            city: '',
            PostalCode: '',
            zip: '',
             Notes: ''           
            
        })
    }

   
    handlePaymentForm(e) {
        e.preventDefault();

        const payData = {
            Email: this.state.email,
            FName: this.state.firstName,
            LName: this.state.lastName,
            amount: this.state.amount,
            CardNo:this.state.CardNum,
            CardType:this.state.CardType,
            Address: this.state.address,
            ExpDate: this.state.ExpDate,                
            City: this.state.city,           
            state: this.state.state,
            Zip: this.state.zip,
            OrderID:this.state.orderId,
            Phone: this.state.phone
        };

        DashboardCheckoutPageActions.OrderPayment(payData);
    };

    renderPaymentInfoForm() {
        return (
            <form className="row" onSubmit={this.handlePaymentForm}>
              
                <div className="clearfix">


                    <div className="row">
                        <div className="col-sm-6">
                            <label>
                                <div>First name:</div>
                                <input type="text"
                                       placeholder="Enter first name"
                                       required
                                       className="form-control"
                                       value={this.state.firstName}
                                       onChange={(e) => this.setState({firstName: e.target.value})}
                                />
                            </label>
                        </div>
                        <div className="col-sm-6">
                            <label>
                                <div>Last name:</div>
                                <input type="text"
                                       placeholder="Enter last name"
                                      
                                       className="form-control"
                                       value={this.state.lastName}
                                       onChange={(e) => this.setState({lastName: e.target.value})}
                                />
                            </label>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-sm-6">
                            <label>
                                <div>Email:</div>
                                <input type="email"
                                       placeholder="Enter email"
                                      
                                       className="form-control"                                      
                                       title="user@example.com"
                                       onChange={(e) => this.setState({email: e.target.value})}
                                />
                            </label>
                        </div>
                        <div className="col-sm-6">
                            <label>
                                <div>Card Number:</div>
                                <input type="text"
                                       placeholder="Enter Card Number"
                                       required
                                       className="form-control"
                                       value={this.state.CardNum}
                                       onChange={(e) => this.setState({CardNum: e.target.value})}
                                />
                            </label>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-sm-6">
                            <label>
                                <div>Card Type:</div>
                                <input type="text"
                                       placeholder="Enter Card Type"
                                       value={this.state.CardType}
                                       onChange={(e) => this.setState({CardType: e.target.value})}
                                       required
                                       className="form-control"
                                />
                            </label>
                        </div>
                        <div className="col-sm-6">
                            <label>
                                <div>Expiry Date:</div>
                                 <div className="date-picker">
                                    <DatePicker
                                        selected={this.state.ExpDate}
                                        onChange={this.handleDateChange.bind(this)}
                                        className="form-control"
                                        minDate={moment()}
                                        name="ExpDate"
                                        showYearDropdown
                                        required
                                    />
                                </div>
                               
                               
                            </label>
                        </div>
                    </div>



                  <div className="row">
                        <div className="col-sm-6">
                            <label>
                                <div>Phone:</div>
                                <input type="text"
                                       placeholder="Enter Phone No"
                                       
                                       className="form-control"
                                       value={this.state.phone}
                                       onChange={(e) => this.setState({phone: e.target.value})}
                                />
                            </label>
                        </div> 
                        <div className="col-sm-6">
                            <label>
                                <div>Address1:</div>
                                <input type="text"
                                       placeholder="Enter Address"
                                      
                                       className="form-control"
                                       value={this.state.address}
                                       onChange={(e) => this.setState({address: e.target.value})}
                                />
                            </label>
                        </div>
                    </div>



                  <div className="row">
                        <div className="col-sm-6">
                            <label>
                                <div>City:</div>
                                <input type="text"
                                       placeholder="Enter City"
                                      
                                       className="form-control"
                                       value={this.state.city}
                                       onChange={(e) => this.setState({city: e.target.value})}
                                />
                            </label>
                        </div>
                        <div className="col-sm-6">
                            <label>
                                <div>Zip:</div>
                                <input type="text"
                                       placeholder="Enter ZIP"
                                      
                                       className="form-control"
                                       pattern='^[0-9]{0,19}'
                                       value={this.state.zip}
                                       onChange={(e) => this.setState({zip: e.target.value})}
                                />
                            </label>
                        </div>
                        </div>

                         <div className="row">
                       
                        <div className="col-sm-6">
                            <label>
                                <div>State</div>
                                <select
                                   
                                    className="form-control"
                                    value={this.state.state}
                                    onChange={(e) => this.setState({state: e.target.value})}
                                >
                                    <option disabled value="">Select</option>
                                    {this.props.states && this.props.states.map((state) => {
                                        return <option value={state.key} key={state.key}>{state.value}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                    </div>



                </div>
                <div className="buttons-container">
                    <input type="submit" className="btn btn-primary" value='Submit'/>
                </div>
            </form>
        )
    }

   

    render() {
        
     
        const headerText = "Payment Form";

        return (
            <div className="dashboard-pay-form-modal-component">
              {this.renderPaymentInfoForm()}
            </div>
        );
    }
}
