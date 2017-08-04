import React, { Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import Routes from 'routes.js';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

import DashboardPatientPaymentPageStore from 'stores/DashboardPatientPaymentPageStore';
import DashboardAccountPageStore from 'stores/DashboardAccountPageStore.js';
import DashboardPatientPaymentPageActions from 'actions/DashboardPatientPaymentPageActions';
import DashboardAccountPageActions from 'actions/DashboardAccountPageActions.js'
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import classNames from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DashboardCheckoutPageActions  from 'actions/DashboardCheckoutPageActions.js'
import DashboardCheckoutPageStore from 'stores/DashboardCheckoutPageStore.js'

import './DashboardPatientPaymentPage.scss';

@connectToStores
export default class DashboardPatientPaymentPage extends Component {
     constructor(props) {
        super(props);
        
          
        this.state = {
            CurrentTab: 1,  
            ShippingAddressName:'',
            ShippingFirstName:'',
            ShippingLastName:'',
            ShippingCompany:'',
            ShippingAddress1:'',
            ShippingAddress2:'',
            ShippingCity:'',
            ShippingState:'',
            ShippingZip:'',
            ShippingPhone:'',
            ShippingAddressID:0,
            BillingAddressName:'',
            BillingFirstName:'',
            BillingLastName:'',
            BillingCompany:'',
            BillingAddress1:'',
            BillingAddress2:'',
            BillingCity:'',
            BillingState:'',
            BillingZip:'',
            BillingPhone:'',
            BillingAddressID:0,
            showconfirmAddress:false,
            ShowShippingAddressForm:false,
            ShowBillingAddressForm:false,
            shippingaddressButtonClicked:false,
            BillingaddressButtonClicked:false,
            CheckUpsGroundShipping:false,
            CheckUps2DayAir:false,
            CheckUpsNextDaySave:false,
            CheckUpsNextDayAir:false,
            CheckUpsNextDayEarly:false,           
            IsNewShippingAddress:false,
            IsNewBillingAddress:false,
            ShippingMethodID:0,
            ShippingMethodError:false,           
            Payamount:this.props.totalCountPrice,
            PayCardNum:'',
            PayCardType:'',
            PayCardName:'',    
            PayCID:'' ,
            PayExpDate:null, 
            PayorderId:this.props.orderId,
            ShippingCharge:0,
            UpsGroundShippingRate:0,
            Ups2DayAirRate:23.86,
            UpsNextDaySaveRate:54.88,
            UpsNextDayAirRate:60.07,
            UpsNextDayEarlyRate:91.20,
            placeOrderModal: props.sentPlaceOrder,
            ShippingCommonRate:7.00
           

        };

     this.handleShippingAddressFormSubmit = this.handleShippingAddressFormSubmit.bind(this);
     this.handleBillingAddressFormSubmit =this.handleBillingAddressFormSubmit.bind(this);
     this.handleShippingMethodsFormSubmit = this.handleShippingMethodsFormSubmit.bind(this);
     this.handleShippingMethodError = this.handleShippingMethodError.bind(this);
     this.handlePaymentForm = this.handlePaymentForm.bind(this);
     this.handlePreviousButtonClick = this.handlePreviousButtonClick.bind(this);
     this.onConfirmAddressYes = this.onConfirmAddressYes.bind(this);
     this.onConfirmAddressNo = this.onConfirmAddressNo.bind(this);
     this.showPlaceOrderModal = this.showPlaceOrderModal.bind(this);

    }
    static getStores() {
        return [DashboardPatientPaymentPageStore,DashboardAccountPageStore,DashboardCheckoutPageStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardPatientPaymentPageStore.getState(),
            ...DashboardAccountPageStore.getState(),
            ...DashboardCheckoutPageStore.getState()
        }
    }
     resetState() {
        this.setState({
            CurrentTab: 1,
            ShippingAddressName:'',
            ShippingFirstName:'',
            ShippingLastName:'',
            ShippingCompany:'',
            ShippingAddress1:'',
            ShippingAddress2:'',
            ShippingCity:'',
            ShippingState:'',
            ShippingZip:'',
            ShippingPhone:'',
            ShippingAddressID: 0,
            BillingAddressName:'',
            BillingFirstName:'',
            BillingLastName:'',
            BillingCompany:'',
            BillingAddress1:'',
            BillingAddress2:'',
            BillingCity:'',
            BillingState:'',
            BillingZip:'',
            BillingPhone:'',
            BillingAddressID: 0,
            CheckSameasBilling:'',
            showconfirmAddress:false,
            ShowShippingAddressForm:false,
            ShowBillingAddressForm:false,
            shippingaddressButtonClicked:false,
            BillingaddressButtonClicked:false,
            CheckUpsGroundShipping:false,
            CheckUps2DayAir:false,
            CheckUpsNextDaySave:false,
            CheckUpsNextDayAir:false,
            CheckUpsNextDayEarly:false,           
            IsNewShippingAddress:false,
            IsNewBillingAddress : false,
            ShippingMethodID:0,
            ShippingMethodError:false,           
            Payamount:this.props.totalCountPrice,
            PayCardNum:'',
            PayCardType:'',
            PayExpDate:null,
            PayorderId:'',
            PayCardName:'',
            PayCID:'' ,
            ShippingCharge:0,
            UpsGroundShippingRate:0,
            Ups2DayAirRate:23.86,
            UpsNextDaySaveRate:54.88,
            UpsNextDayAirRate:60.07,
            UpsNextDayEarlyRate:91.20,
            ShippingCommonRate:7.00

        })
    }
    componentDidMount() {
         DashboardAccountPageActions.getAllStates();
         DashboardCheckoutPageActions.hidePlaceOrderModal();
         var currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
            if(currentUser.role==='Provider')
            {
                DashboardPatientPaymentPageActions.getProviderAddressList();
            }
            else
            {
                DashboardPatientPaymentPageActions.getPatientAddressList();
            }
    }
    componentWillReceiveProps(newProps) { 
       
      if(newProps.shippingAddressDeatilsSuccess && this.state.shippingaddressButtonClicked  )      
      {
          this.ClearShippingAddressData();
          this.resetShippingStateValues(newProps);
      }
      else if(newProps.BillingAddressDeatilsSuccess && this.state.BillingaddressButtonClicked )
      {
          this.ClearBillingAddressData();
          this.resetBillingStateValues(newProps);
      }
    }
     ClearShippingAddressData() {
        this.setState({           
            ShippingAddressName:'',
            ShippingFirstName:'',
            ShippingLastName:'',
            ShippingCompany:'',
            ShippingAddress1:'',
            ShippingAddress2:'',
            ShippingCity:'',
            ShippingState:'',
            ShippingZip:'',
            ShippingPhone:'',
            ShippingAddressID:0,
            CheckSameasBilling:'',
        })
    }
    ClearBillingAddressData() {
        this.setState({
            BillingAddressName:'',
            BillingFirstName:'',
            BillingLastName:'',
            BillingCompany:'',
            BillingAddress1:'',
            BillingAddress2:'',
            BillingCity:'',
            BillingState:'',
            BillingZip:'',
            BillingPhone:'',
            BillingAddressID:0
        })
    }
    resetShippingStateValues(newProps) {
           this.setState({
            ShippingAddressID:newProps.PatientAddressItemDetails[0].AddressID,
            ShippingAddressName: newProps.PatientAddressItemDetails[0].AddressName,
            ShippingFirstName:newProps.PatientAddressItemDetails[0].Firstname,
            ShippingLastName:newProps.PatientAddressItemDetails[0].Lastname,
            ShippingCompany:newProps.PatientAddressItemDetails[0].Company,
            ShippingAddress1:newProps.PatientAddressItemDetails[0].Address1,
            ShippingAddress2:newProps.PatientAddressItemDetails[0].Address2,
            ShippingCity:newProps.PatientAddressItemDetails[0].City,
            ShippingState:newProps.PatientAddressItemDetails[0].StateCode,
            ShippingZip:newProps.PatientAddressItemDetails[0].Zip,
            ShippingPhone:newProps.PatientAddressItemDetails[0].Phone,
            ShowShippingAddressForm:true,           
            IsNewShippingAddress:false

        })
    }
    resetBillingStateValues(newProps) {
           this.setState({           
            BillingAddressID:newProps.PatientAddressItemDetails[0].AddressID,
            BillingAddressName: newProps.PatientAddressItemDetails[0].AddressName,
            BillingFirstName:newProps.PatientAddressItemDetails[0].Firstname,
            BillingLastName:newProps.PatientAddressItemDetails[0].Lastname,
            BillingCompany:newProps.PatientAddressItemDetails[0].Company,
            BillingAddress1:newProps.PatientAddressItemDetails[0].Address1,
            BillingAddress2:newProps.PatientAddressItemDetails[0].Address2,
            BillingCity:newProps.PatientAddressItemDetails[0].City,
            BillingState:newProps.PatientAddressItemDetails[0].StateCode,
            BillingZip:newProps.PatientAddressItemDetails[0].Zip,
            BillingPhone:newProps.PatientAddressItemDetails[0].Phone,
            ShowBillingAddressForm:true,           
            IsNewBillingAddress:false
        })
    }
    handleShippingAddressFormSubmit(e)
    {
      e.preventDefault();
      if(this.state.CheckSameasBilling ===  true)
      {
         this.setState({ showconfirmAddress:true,shippingaddressButtonClicked:false})
      }
      else
      {
        var currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
              if(this.state.IsNewShippingAddress)
              {
                    const AddressData = {
                        AddressName:this.state.ShippingAddressName,
                        Firstname:this.state.ShippingFirstName,
                        Lastname:this.state.ShippingLastName,
                        Company:this.state.ShippingCompany,
                        Address1:this.state.ShippingAddress1,
                        Address2:this.state.ShippingAddress2,
                        City:this.state.ShippingCity,
                        StateCode:this.state.ShippingState,
                        Zip:this.state.ShippingZip,
                        Phone:this.state.ShippingPhone,
                        CountryID:1
                    };
                     
                if(currentUser.role==='Provider')
                {
                    DashboardPatientPaymentPageActions.CreateNewProviderShippingAddress(AddressData);
                }
                else
                {
                    DashboardPatientPaymentPageActions.CreateNewPatientShippingAddress(AddressData);
                }
              }
              else
              {
                    const AddressDataUpdated = {
                        AddressID:this.props.ShippingAddressID,
                        AddressName:this.state.ShippingAddressName,
                        FirstName:this.state.ShippingFirstName,
                        LastName:this.state.ShippingLastName,
                        Company:this.state.ShippingCompany,
                        Address1:this.state.ShippingAddress1,
                        Address2:this.state.ShippingAddress2,
                        City:this.state.ShippingCity,
                        StateCode:this.state.ShippingState,
                        Zip:this.state.ShippingZip,
                        Phone:this.state.ShippingPhone                       
                    };
                    if(currentUser.role==='Provider')
                    {
                        DashboardPatientPaymentPageActions.UpdateProviderShippingAddress(AddressDataUpdated);
                    }
                    else
                    {
                        DashboardPatientPaymentPageActions.UpdatePatientShippingAddress(AddressDataUpdated);
                    }
              }
                setTimeout(() => {
               if(currentUser.role==='Provider')
                {
                    DashboardPatientPaymentPageActions.getProviderAddressList();
                    let newtab = this.state.CurrentTab + 1;
                    this.setState({ CurrentTab:   newtab   ,IsNewShippingAddress:false   })
                }
                else
                {
                    DashboardPatientPaymentPageActions.getPatientAddressList();
                    let newtab = this.state.CurrentTab + 1;
                    this.setState({ CurrentTab:   newtab   ,IsNewShippingAddress:false   })
                }
             }, 200);
            
        
      }
      
    }
    handleBillingAddressFormSubmit()
    {
         var currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
      if(this.state.IsNewBillingAddress)
      {
        const AddressData = {
            AddressName:this.state.BillingAddressName,
            Firstname:this.state.BillingFirstName,
            Lastname:this.state.BillingLastName,
            Company:this.state.BillingCompany,
            Address1:this.state.BillingAddress1,
            Address2:this.state.BillingAddress2,
            City:this.state.BillingCity,
            StateCode:this.state.BillingState,
            Zip:this.state.BillingZip,
            Phone:this.state.BillingPhone,
            CountryID:1
        };
           
            if(currentUser.role==='Provider')
            {
                DashboardPatientPaymentPageActions.CreateNewProviderBillingAddress(AddressData);
            }
            else
            {
                DashboardPatientPaymentPageActions.CreateNewPatientShippingAddress(AddressData);
            }
      }
      else
      {
            const AddressDataUpdated = {
                    AddressID:this.props.BillingAddressID,
                    AddressName:this.state.BillingAddressName,
                    FirstName:this.state.BillingFirstName,
                    LastName:this.state.BillingLastName,
                    Company:this.state.BillingCompany,
                    Address1:this.state.BillingAddress1,
                    Address2:this.state.BillingAddress2,
                    City:this.state.BillingCity,
                    StateCode:this.state.BillingState,
                    Zip:this.state.BillingZip,
                    Phone:this.state.BillingPhone,
          
                };
                    if(currentUser.role==='Provider')
                    {
                        DashboardPatientPaymentPageActions.UpdateProviderShippingAddress(AddressDataUpdated);
                    }
                    else
                    {
                        DashboardPatientPaymentPageActions.UpdatePatientShippingAddress(AddressDataUpdated);
                    }
      }
      var total = this.props.totalCountPrice + this.state.ShippingCommonRate; 
      let newtab = this.state.CurrentTab + 1;
      this.setState({ CurrentTab:   newtab  ,
                    IsNewBillingAddress:false ,
                    BillingaddressButtonClicked:false ,
                    ShippingMethodID: 6,
                    ShippingCharge:this.state.ShippingCommonRate,
                    Payamount:total  });
      setTimeout(() => {
               if(currentUser.role==='Provider')
                {
                    DashboardPatientPaymentPageActions.getProviderAddressList();                   
                }
                else
                {
                    DashboardPatientPaymentPageActions.getPatientAddressList();
                   
                }
             }, 200);
    }
    handleShippingMethodsFormSubmit()
    {
      if(this.state.ShippingMethodID === 0)
      {
          this.setState({ShippingMethodError:true});
      }
      else
      {
         let newtab = this.state.CurrentTab + 1;
         this.setState({ CurrentTab:   newtab      })
      }     
    }
    handleshowconfirmAddress()
    {
      this.setState({ showconfirmAddress:   true      })
    }
    handlehideconfirmAddress()
    {
      this.setState({ showconfirmAddress:   false      })
    }
    onConfirmAddressNo()
    {
         let newtab = this.state.CurrentTab + 1;
          this.setState({ CurrentTab:   newtab ,showconfirmAddress:   false      })
    }
    onConfirmAddressYes()
    {
          var currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
      if(this.state.IsNewShippingAddress)
      {
        const AddressData = {
            AddressName:this.state.ShippingAddressName,
            Firstname:this.state.ShippingFirstName,
            Lastname:this.state.ShippingLastName,
            Company:this.state.ShippingCompany,
            Address1:this.state.ShippingAddress1,
            Address2:this.state.ShippingAddress2,
            City:this.state.ShippingCity,
            StateCode:this.state.ShippingState,
            Zip:this.state.ShippingZip,
            Phone:this.state.ShippingPhone,
            CountryID:1
          };
          
            if(currentUser.role==='Provider')
            {
                DashboardPatientPaymentPageActions.CreateNewProviderShippingAddress(AddressData);
            }
            else
            {
                DashboardPatientPaymentPageActions.CreateNewPatientShippingAddress(AddressData);
            }
      }
      else
      {
                    const AddressDataUpdated = {
                        AddressID:this.props.ShippingAddressID,
                        AddressName:this.state.ShippingAddressName,
                        FirstName:this.state.ShippingFirstName,
                        LastName:this.state.ShippingLastName,
                        Company:this.state.ShippingCompany,
                        Address1:this.state.ShippingAddress1,
                        Address2:this.state.ShippingAddress2,
                        City:this.state.ShippingCity,
                        StateCode:this.state.ShippingState,
                        Zip:this.state.ShippingZip,
                        Phone:this.state.ShippingPhone                       
                    };
                    if(currentUser.role==='Provider')
                    {
                        DashboardPatientPaymentPageActions.UpdateProviderShippingAddress(AddressDataUpdated);
                    }
                    else
                    {
                        DashboardPatientPaymentPageActions.UpdatePatientShippingAddress(AddressDataUpdated);
                    }
      }
       var total = this.props.totalCountPrice + this.state.ShippingCommonRate; 
      let newtab = this.state.CurrentTab +2;
      this.setState({ CurrentTab:   newtab ,showconfirmAddress:   false  ,  ShippingMethodID: 6,
                    ShippingCharge:this.state.ShippingCommonRate,
                    Payamount:total    })
      setTimeout(() => {
               if(currentUser.role==='Provider')
                {
                    DashboardPatientPaymentPageActions.getProviderAddressList();                   
                }
                else
                {
                    DashboardPatientPaymentPageActions.getPatientAddressList();
                   
                }
             }, 200);
  
    }
    OnShippAddresItemClick(AddressID)
    {      
        let self=this;
        var currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
        if(currentUser.role==='Provider')
        {
            DashboardPatientPaymentPageActions.getProviderShippinngAddressDetailsByAddressID(AddressID);
        }
        else
        {
            DashboardPatientPaymentPageActions.getPatientShippinngAddressDetailsByAddressID(AddressID);
        }
        self.setState({ shippingaddressButtonClicked:   true      });
    }  
    OnBillAddresItemClick(AddressID)
    {
       this.setState({ BillingaddressButtonClicked:   true      });
        var currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
        if(currentUser.role==='Provider')
        {
            DashboardPatientPaymentPageActions.getProviderBillingAddressDetailsByAddressID(AddressID);    
        }
        else
        {
            DashboardPatientPaymentPageActions.getPatientBillingAddressDetailsByAddressID(AddressID); 
        }  
    }   
    AddNewShippingAddress(e)
    { 
       this.setState({ShowShippingAddressForm:true,IsNewShippingAddress:true});
       this.ClearShippingAddressData();
    }
    AddNewBillingAddress(e)
    { 
       this.setState({ShowBillingAddressForm:true,IsNewBillingAddress:true});
       this.ClearBillingAddressData();
    }
    
    onChangeUpsGround(e)
    {
        this.setState({CheckUpsGroundShipping: e.target.checked});
        this.setState({CheckUps2DayAir:false,
            CheckUpsNextDaySave:false,
            CheckUpsNextDayAir:false,
            CheckUpsNextDayEarly:false,});   
            if(e.target.checked === true)
            {
                var total = this.props.totalCountPrice + this.state.UpsGroundShippingRate;           
                this.setState({ ShippingMethodID: 1,ShippingCharge:this.state.UpsGroundShippingRate,Payamount:total});  
            }
            else
            {
                this.setState({ ShippingMethodID: 0,ShippingCharge:0,Payamount:this.props.totalCountPrice });  
            }
            
    }
    onChangeUps2DayAir(e)
    {
        this.setState({CheckUps2DayAir: e.target.checked});
        this.setState({CheckUpsGroundShipping:false,
            CheckUpsNextDaySave:false,
            CheckUpsNextDayAir:false,
            CheckUpsNextDayEarly:false,});      
            if(e.target.checked === true)
            {
                var total = this.props.totalCountPrice + this.state.Ups2DayAirRate;
                this.setState({ ShippingMethodID: 2,ShippingCharge:this.state.Ups2DayAirRate,Payamount:total});  
            }
            else
            {
                this.setState({ ShippingMethodID: 0,ShippingCharge:0,Payamount:this.props.totalCountPrice });  
            }           
    }
    onChangeUpsNextDaySave(e)
    {
        this.setState({CheckUpsNextDaySave: e.target.checked});
        this.setState({CheckUpsGroundShipping:false,
            CheckUps2DayAir:false,
            CheckUpsNextDayAir:false,
            CheckUpsNextDayEarly:false,});       
            if(e.target.checked === true)
            {
                var total = this.props.totalCountPrice + this.state.UpsNextDaySaveRate;
                this.setState({ ShippingMethodID: 3,ShippingCharge:this.state.UpsNextDaySaveRate,Payamount:total});  
            }
            else
            {
                this.setState({ ShippingMethodID: 0,ShippingCharge:0,Payamount:this.props.totalCountPrice});  
            } 
    }
    onChangeUpsNextDayAir(e)
    {
        this.setState({CheckUpsNextDayAir: e.target.checked});
        this.setState({CheckUpsGroundShipping:false,
            CheckUps2DayAir:false,
            CheckUpsNextDaySave:false,
            CheckUpsNextDayEarly:false,});       
            if(e.target.checked === true)
            {
                var total = this.props.totalCountPrice + this.state.UpsNextDayAirRate;
                this.setState({ ShippingMethodID: 4,ShippingCharge:this.state.UpsNextDayAirRate,Payamount:total});  
            }
            else
            {
                this.setState({ ShippingMethodID: 0,ShippingCharge:0,Payamount:this.props.totalCountPrice});  
            } 
    }
    onChangeUpsNextDayEarly(e)
    {
        this.setState({CheckUpsNextDayEarly: e.target.checked});
        this.setState({CheckUpsGroundShipping:false,
            CheckUps2DayAir:false,
            CheckUpsNextDaySave:false,
            CheckUpsNextDayAir:false,}); 
            if(e.target.checked === true)
            {
                var total = this.props.totalCountPrice + this.state.UpsNextDayEarlyRate;
                this.setState({ ShippingMethodID: 5,ShippingCharge:this.state.UpsNextDayEarlyRate,Payamount:total});  
            }
            else
            {
                this.setState({ ShippingMethodID: 0,ShippingCharge:0,Payamount:this.props.totalCountPrice});  
            }     
    }
    
     handleDateChange(date) {
        this.setState({
            PayExpDate: date
        });
    }

    handleShippingMethodError()
    {
         this.setState({ShippingMethodError:false});
    }
    handleEditCartClick()
    {
      appHistory.push(Routes.dashboardProductsPage);
    }
    handlePaymentForm(e) {
        e.preventDefault();
        var currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
        const payData = {
            Email: currentUser.Email,
            FName: this.state.PayCardName,
            LName: this.state.PayCardName,
            amount: this.state.Payamount,
            CardNo:this.state.PayCardNum,
            CardType:this.state.PayCardType,
            Address: '',
            ExpDate: this.state.PayExpDate,                
            City: '',           
            state: '',
            Zip: '',
            OrderID:this.state.PayorderId,
            Phone: '',
            shippingMethodId:this.state.ShippingMethodID,
            billAddressId:this.state.CheckSameasBilling === true?this.props.ShippingAddressID:this.props.BillingAddressID,
            shipAddressID:this.props.ShippingAddressID,
            PayCID:this.state.PayCID
        };

        DashboardCheckoutPageActions.OrderPayment(payData);
    };
    showPlaceOrderModal() {
        this.setState({placeOrderModal: true});
    }
    hidePlaceOrderModal() {
        DashboardCheckoutPageActions.hidePlaceOrderModal();
        this.props.appHistory.push(Routes.dashboardProductsPage);
    }
    handlePreviousButtonClick(){
       var currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
        if( this.state.CurrentTab == 3 && this.state.CheckSameasBilling === true)
        {
           
                if(currentUser.role==='Provider')
                {
                    DashboardPatientPaymentPageActions.getProviderShippinngAddressDetailsByAddressID(this.props.ShippingAddressID);    
                }
                else
                {
                    DashboardPatientPaymentPageActions.getPatientShippinngAddressDetailsByAddressID(this.props.ShippingAddressID); 
                } 
                 let newtab = this.state.CurrentTab -2;
                this.setState({ CurrentTab:   newtab  });
        }
        else
        {
            
             if( this.state.CurrentTab == 3)
             {
                    if(currentUser.role==='Provider')
                    {
                        DashboardPatientPaymentPageActions.getProviderBillingAddressDetailsByAddressID(this.props.BillingAddressID);    
                    }
                    else
                    {
                        DashboardPatientPaymentPageActions.getPatientBillingAddressDetailsByAddressID(this.props.BillingAddressID); 
                    } 
             }
             else
             {
                    if(currentUser.role==='Provider')
                    {
                        DashboardPatientPaymentPageActions.getProviderShippinngAddressDetailsByAddressID( this.props.ShippingAddressID);    
                    }
                    else
                    {
                        DashboardPatientPaymentPageActions.getPatientShippinngAddressDetailsByAddressID(this.props.ShippingAddressID); 
                    } 
             }
             let newtab = this.state.CurrentTab -1;
            this.setState({ CurrentTab:   newtab     });
        }

    }
    renderShippAddressList(){
      return(
                <div >
                {this.props.AddressList && this.props.AddressList.map(Address =>
                  <div key={Address.key} className="addressdiv" onClick={this.OnShippAddresItemClick.bind(this,Address.key)}>
                    {Address.value}
                  </div>

                )} 
                <div style={{float:'left','paddingLeft':3,'paddingTop':3}}> 
                                    <button  style={{ 'width':147,height:43}} onClick={this.AddNewShippingAddress.bind(this)}
                                     type="button" className="btn btn-style success " >
                                      <div>
                                          <div style={{float:'left'}}>
                                          </div>
                                          <div className='AddButton'>
                                              <i className="fa fa-plus" aria-hidden="true"/>
                                              {"New Address"}
                                          </div>
                                      </div>
                                    </button>
                                </div > 
                </div>                               
        )
    } 
    renderBillAddressList(){
      return(
                <div >
                {this.props.AddressList && this.props.AddressList.map(Address =>
                  <div key={Address.key} className="addressdiv" onClick={this.OnBillAddresItemClick.bind(this,Address.key)}>
                    {Address.value}
                  </div>
                )}    
                <div style={{float:'left','paddingLeft':3,'paddingTop':3}}> 
                                    <button  style={{ 'width':147,height:43}} onClick={this.AddNewBillingAddress.bind(this)}
                                     type="button" className="btn btn-style success " >
                                      <div>
                                          <div style={{float:'left'}}>
                                          </div>
                                          <div className='AddButton'>
                                              <i className="fa fa-plus" aria-hidden="true"/>
                                              {"New Address"}
                                          </div>
                                      </div>
                                    </button>
                                </div >  
                </div>                               
        )
    } 
    shipphonechanged(e){ 
        if(!isNaN(e.target.value)) {
            if(e.target.value.length<=10){
            this.setState({ShippingPhone: e.target.value})}
            else{
                 return false;
            }
        }
        else{
            return false;
        }
    
    }
    shipzipChanged(e){
         if(!isNaN(e.target.value)) {
                if(e.target.value.length<=5){
                this.setState({ShippingZip: e.target.value})}
                else{
                     return false;
                }
            }
            else{
                return false;
            }
    }
    rendershipzipErrors() {
        if (this.state.ShippingZip.length  !=0 && this.state.ShippingZip.length !=5 ) {
            return <label className="verify-errors" style={{color: 'red'}}>Zip/Postal code should be a number with 5 characters.</label>;
        }
    }
    renderShipPhoneErrors() {
        if (this.state.ShippingPhone.length  !=0 && this.state.ShippingPhone.length !=10 ) {
            return <label className="verify-errors" style={{color: 'red'}}>Phone Number should be a number with 10 characters.</label>;
        }
    }
    renderShippingAddressForm() {
        return (
          <div >
          <div className="contentDiv"> 
                  <div style={{'fontSize':17,'fontWeight':'bold',color:'black','paddingBottom':20}}> Select a Shipping Address</div>
                      <label>
                            <div style={{'fontSize':14,'fontWeight': 'normal','paddingBottom':10}}>
                                Please select from these available addresses or click the button to add new address.
                            </div>
                            <div style={{float:'left'}}>     
                                 <div style={{float:'left'}}>                                   
                                   {this.props.AddressList ? this.renderShippAddressList()  : ''}
                                   
                                 </div > 
                                
                             </div> 
                      </label>
                 
                  </div>
                  
          <div className="formMain">
          {this.state.ShowShippingAddressForm && 

            <div style={{float:'left'}}>
            <div style={{float:'right',marginRight:'5%'}}>
                    <button type="button" style={{width:100,height:50,fontSize:17}} disabled={(this.state.ShippingAddressName !=="" 
                    && this.state.ShippingFirstName !=="" && this.state.ShippingLastName != "" && this.state.ShippingAddress1 != "" 
                    && this.state.ShippingCity !== "" && this.state.ShippingState !== "" && this.state.ShippingZip.length === 5 &&this.state.ShippingPhone.length === 10 )? false : true }
                    onClick={this.handleShippingAddressFormSubmit } className="btn btn-style success " >
                                          Next</button>
                </div>
              <div className="formDiv">                  
                    <div className="col-sm-10">  
                      <label>  
                       <div className="payformlabel" >Address Name <span style={{color:'red'}}>*</span></div>       
                            <div className="inner-addon left-addon">
                              <i className="fa fa-newspaper-o"></i>
                                  <input type="text"
                                   placeholder="Address Name(eg:Office)"
                                   required
                                   maxLength="16"
                                   className="forminput"
                                   value={this.state.ShippingAddressName?this.state.ShippingAddressName:''}
                                   onChange={(e) => this.setState({ShippingAddressName: e.target.value})}/>
                            </div> 
                      </label>  
                    </div>
                    <div className="col-sm-10"> 
                      <label> 
                       <div className="payformlabel" >First Name <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-user"></i>                      
                                  <input type="text"
                                         placeholder="First Name"
                                         required
                                         className="forminput"
                                         value={this.state.ShippingFirstName}
                                         onChange={(e) => this.setState({ShippingFirstName: e.target.value})}
                                  />
                            </div>  
                      </label>
                    </div>
                    <div className="col-sm-10">  
                      <label>
                       <div className="payformlabel" >Last Name <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-user"></i>                      
                                  <input type="text"
                                         placeholder="Last Name"
                                         required
                                         className="forminput"
                                         value={this.state.ShippingLastName}
                                         onChange={(e) => this.setState({ShippingLastName: e.target.value})}
                                  />
                            </div> 
                      </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Company</div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-briefcase"></i> 
                                <input type="text"
                                   placeholder="Company"                                   
                                   required
                                   className="forminput"                                 
                                   value={this.state.ShippingCompany}
                                   onChange={(e) => this.setState({ShippingCompany: e.target.value})} />
                            </div> 
                        </label>
                    </div> 
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Address Line1 <span style={{color:'red'}}>*</span></div>
                              <div className="inner-addon left-addon">
                              <i className="fa fa-map-marker"></i>
                                <input type="text"
                                   placeholder="Address Line1"
                                   className="forminput"
                                   required
                                   value={this.state.ShippingAddress1}
                                   onChange={(e) => this.setState({ShippingAddress1: e.target.value})} />
                              </div> 
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Address Line2</div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-map-marker"></i>
                             <input type="text"
                                   placeholder="Address Line2"
                                   className="forminput"
                                   value={this.state.ShippingAddress2}
                                   onChange={(e) => this.setState({ShippingAddress2: e.target.value})}/>
                             </div> 
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Country</div>
                         <div className="inner-addon left-addon">
                            <input type="text"
                                  disabled="true"
                                   className="forminput"
                                   value="United States"/>
                           </div> 
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >City <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-map-marker"></i>
                             <input type="text"
                                   placeholder="City"
                                   className="forminput"
                                   required
                                   value={this.state.ShippingCity}
                                   onChange={(e) => this.setState({ShippingCity: e.target.value})}/>
                             </div> 
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >State <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">  
                            <i className="fa fa-map-marker"></i>                           
                            <select className="forminput"
                                    required
                                    value={this.state.ShippingState}
                                    onChange={(e) => this.setState({ShippingState: e.target.value})} >
                                    <option disabled value="">Select</option>
                                    {this.props.allStatesData && this.props.allStatesData.map((state) => {
                                        return <option value={state.key} key={state.key}>{state.value}</option>
                                    })}
                                </select>
                             </div> 
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Zip / Postal Code <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-map-marker"></i>
                               <input type="text"
                                   placeholder="Zip/Postal Code"
                                   pattern='^[0-9]{0,19}'
                                   required
                                   className="forminput"
                                   value={this.state.ShippingZip}
                                   onChange={this.shipzipChanged.bind(this)} />
                            </div> 
                            {this.rendershipzipErrors()}
                        </label>

                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Phone <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-phone"></i>
                             <input type="text"
                                   placeholder="Phone"
                                   required
                                   className="forminput"
                                   value={this.state.ShippingPhone}
                                   onChange={this.shipphonechanged.bind(this)}/>
                             </div> 
                             {this.renderShipPhoneErrors()}
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label style={{'fontSize': 14}}>
                                    <div>
                                      <div style={{float: 'left'}} className="col-sm-1">
                                           <input type="checkbox"                                             
                                             value={this.state.CheckSameasBilling}                                             
                                             className="forminput1"
                                             checked={this.state.CheckSameasBilling?'checked':null}
                                             onChange={(e) => this.setState({CheckSameasBilling: e.target.checked})}/>
                                        </div>
                                        <div style={{float: 'left','paddingLeft':20,'paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>Use same address as billing address</div>
                                    </div>
                        </label>
                                
                
                    </div>
                    
                </div>
                <div className="buttons-container11">
                    <button type="button" style={{width:100,height:50,fontSize:17}} disabled={(this.state.ShippingAddressName !=="" 
                    && this.state.ShippingFirstName !=="" && this.state.ShippingLastName != "" && this.state.ShippingAddress1 != "" 
                    && this.state.ShippingCity !== "" && this.state.ShippingState !== "" && this.state.ShippingZip.length === 5 && this.state.ShippingPhone.length === 10 )? false : true }
                     onClick={this.handleShippingAddressFormSubmit } className="btn btn-style success " >
                                          Next</button>
                    
                </div>

            </div>
            }
            </div>
            </div>
        )
    }
    BillingZipChanged(e){       
         if(!isNaN(e.target.value)) {
            if(e.target.value.length<=5){
                this.setState({BillingZip: e.target.value})}
            else{
                 return false;
            }
        }
        else{
            return false;
        }

    }
    BillingPhoneChanged(e){
         if(!isNaN(e.target.value)) {
            if(e.target.value.length<=10){
                this.setState({BillingPhone: e.target.value})}
            else{
                 return false;
            }
        }
        else{
            return false;
        }
    }
    renderBillzipErrors() {
        if (this.state.BillingZip.length  !=0 && this.state.BillingZip.length !=5 ) {
            return <label className="verify-errors" style={{color: 'red'}}>Zip/Postal code should be a number with 5 characters.</label>;
        }
    }
    renderBillPhoneErrors() {
        if (this.state.BillingPhone.length  !=0 && this.state.BillingPhone.length !=10 ) {
            return <label className="verify-errors" style={{color: 'red'}}>Phone Number should be a number with 10 characters.</label>;
        }
    }
    renderBillingAddressForm() {
        return (
        <div>
          <div className="contentDiv"> 
                  <div style={{'fontSize':17,'fontWeight':'bold',color:'black','paddingBottom':20}}> Select a Billing Address</div>
                      <label>
                            <div style={{'fontSize':14,'fontWeight': 'normal','paddingBottom':10}}>
                                Please select from these available addresses or click the button to add new address.
                            </div>
                            <div style={{float:'left'}}>     
                                 <div style={{float:'left'}}>                                   
                                   {this.props.AddressList ? this.renderBillAddressList()  : ''}
                                    
                                 </div > 
                                
                             </div> 
                      </label>
              
                  </div>
                  
          <div className="formMain" style={{width:'100%'}}>
          <div style={{ float:'right',marginRight:'5%'}}>
                    <div style={{float:'left',margin:5}}>
                            <button type="button" style={{width:100,height:50,fontSize:17}} onClick={this.handlePreviousButtonClick } className="btn btn-style success " >
                                    Previous</button>
                    </div>
                    <div style={{float:'left',margin:5}}>
                            <button disabled={(this.state.BillingAddressName !=="" 
                            && this.state.BillingFirstName !=="" && this.state.BillingLastName != "" && this.state.BillingAddress1 != "" 
                            && this.state.BillingCity !== "" && this.state.BillingState !== "" && this.state.BillingZip.length === 5 &&this.state.BillingPhone.length === 10 && this.state.ShowBillingAddressForm)? false : true }
                            type="button" style={{width:100,height:50,fontSize:17}} onClick={this.handleBillingAddressFormSubmit } className="btn btn-style success " >
                                    Next</button>
                    </div>
                </div>
          {this.state.ShowBillingAddressForm &&
            <div style={{float:'left'}}>
              <div className="formDiv">                  
                    <div className="col-sm-10">  
                      <label>     
                       <div className="payformlabel" >Address Name <span style={{color:'red'}}>*</span></div>    
                            <div className="inner-addon left-addon">
                              <i className="fa fa-newspaper-o"></i>
                                  <input type="text"
                                   placeholder="Address Name(eg:Office)"
                                   required
                                   className="forminput"
                                   maxLength="16"
                                   value={this.state.BillingAddressName}
                                   onChange={(e) => this.setState({BillingAddressName: e.target.value})}/>
                            </div> 
                      </label>  
                    </div>
                    <div className="col-sm-10"> 
                      <label> 
                       <div className="payformlabel" >First Name <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-user"></i>                      
                                  <input type="text"
                                         placeholder="First Name"
                                         required
                                         className="forminput"
                                         value={this.state.BillingFirstName}
                                         onChange={(e) => this.setState({BillingFirstName: e.target.value})}
                                  />
                            </div>  
                      </label>
                    </div>
                    <div className="col-sm-10">  
                      <label>
                       <div className="payformlabel" >Last Name <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-user"></i>                      
                                  <input type="text"
                                         placeholder="Last Name"
                                         required
                                         className="forminput"
                                         value={this.state.BillingLastName}
                                         onChange={(e) => this.setState({BillingLastName: e.target.value})}
                                  />
                            </div> 
                      </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Company</div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-briefcase"></i> 
                                <input type="text"
                                   placeholder="Company"                                  
                                   required
                                   className="forminput"                                 
                                   value={this.state.BillingCompany}
                                   onChange={(e) => this.setState({BillingCompany: e.target.value})} />
                            </div> 
                        </label>
                    </div> 
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Address Line1 <span style={{color:'red'}}>*</span></div>
                              <div className="inner-addon left-addon">
                              <i className="fa fa-map-marker"></i>
                                <input type="text"
                                   placeholder="Address Line1"
                                   className="forminput"
                                   required
                                   value={this.state.BillingAddress1}
                                   onChange={(e) => this.setState({BillingAddress1: e.target.value})} />
                              </div> 
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Address Line2</div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-map-marker"></i>
                             <input type="text"
                                   placeholder="Address Line2"
                                   className="forminput"
                                   value={this.state.BillingAddress2}
                                   onChange={(e) => this.setState({BillingAddress2: e.target.value})}/>
                             </div> 
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Country</div>
                         <div className="inner-addon left-addon">
                            <input type="text"
                                  disabled="true"
                                   className="forminput"
                                   value="United States"/>
                           </div> 
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >City <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-map-marker"></i>
                             <input type="text"
                                   placeholder="City"
                                   required
                                   className="forminput"
                                   value={this.state.BillingCity}
                                   onChange={(e) => this.setState({BillingCity: e.target.value})}/>
                             </div> 
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >State <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                            <i className="fa fa-map-marker"></i>
                            <select className="forminput"
                                    required
                                    value={this.state.BillingState}
                                    onChange={(e) => this.setState({BillingState: e.target.value})} >
                                    <option disabled value="">Select</option>
                                    {this.props.allStatesData && this.props.allStatesData.map((state) => {
                                        return <option value={state.key} key={state.key}>{state.value}</option>
                                    })}
                                </select>
                             </div> 
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Zip /Postal Code <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-map-marker"></i>
                               <input type="text"
                                   placeholder="Zip /Postal Code"
                                   pattern='^[0-9]{0,19}'
                                   className="forminput"
                                   required
                                   value={this.state.BillingZip}
                                   onChange={this.BillingZipChanged.bind(this)} />
                            </div> 
                            {this.renderBillzipErrors()}
                        </label>
                    </div>
                    <div className="col-sm-10">
                        <label>
                         <div className="payformlabel" >Phone <span style={{color:'red'}}>*</span></div>
                            <div className="inner-addon left-addon">
                              <i className="fa fa-phone"></i>
                             <input type="text"
                                   placeholder="Phone"
                                   required
                                   className="forminput"
                                   value={this.state.BillingPhone}
                                   onChange={this.BillingPhoneChanged.bind(this)}/>
                             </div> 
                             {this.renderBillPhoneErrors()}
                        </label>

                    </div>
                    <div className="col-sm-10">
                        <label style={{height:50}}>
                            <div className="inner-addon left-addon">
                              
                             
                             </div> 
                        </label>
                    </div>
                    
                </div>
                <div>
                
                <div className="buttons-container11">

                    <div style={{float:'left',margin:5}}>
                            <button type="button" style={{width:100,height:50,fontSize:17}} onClick={this.handlePreviousButtonClick } className="btn btn-style success " >
                                        Previous</button>
                    </div>
                    <div style={{float:'left',margin:5}}>
                            <button type="button"  disabled={(this.state.BillingAddressName !=="" 
                            && this.state.BillingFirstName !=="" && this.state.BillingLastName != "" && this.state.BillingAddress1 != "" 
                            && this.state.BillingCity !== "" && this.state.BillingState !== "" && this.state.BillingZip.length === 5 &&this.state.BillingPhone.length === 10 )? false : true }
                             style={{width:100,height:50,fontSize:17}} onClick={this.handleBillingAddressFormSubmit } className="btn btn-style success " >
                                        Next</button>
                    </div>
                </div>
                </div>
            </div>}
            </div>
            </div>
        )
    }  
    renderShppingMethodsForm(){
     return (  
      <div >
          <div className="contentDiv" style={{'width':'100%'}}> 
                  <div style={{'fontSize':17,'fontWeight':'bold',color:'black','paddingBottom':20}}> Select a Shipping Method Below</div>                    
                            <div className="divstylelabel" style={{'fontSize':14,'fontWeight': 'normal','paddingBottom':5}}>
                              &#9888; Please allow (2) business days for processing.
                            </div>                      
                  </div>                  
          <div className="formMain">          
            <div  style={{float:'left'}}>
              <div className="formDiv">
                    <div className="col-sm-9">
                        <label style={{'fontSize': 14}}>
                                    <div>
                                      <div style={{float: 'left'}} className="col-sm-1">
                                           <input type="checkbox"                                             
                                             value={this.state.CheckUpsGroundShipping}  
                                             checked={this.state.CheckUpsGroundShipping?'checked':null}
                                             onChange={this.onChangeUpsGround.bind(this)}/>
                                        </div>
                                        <div style={{float: 'left',width:420,'paddingLeft':20,'paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>UPS Standard Ground Shipping</div>
                                   <div style={{float: 'left','paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>$0.00</div>
                                    </div>
                        </label>
                     <hr className="hrule"/>
                    </div>
                    <div className="col-sm-9">
                        <label style={{'fontSize': 14}}>
                                    <div>
                                      <div style={{float: 'left'}} className="col-sm-1">
                                           <input type="checkbox"                                             
                                             value={this.state.CheckUps2DayAir}  
                                             checked={this.state.CheckUps2DayAir?'checked':null}
                                             onChange={this.onChangeUps2DayAir.bind(this)}/>
                                        </div>
                                        <div style={{float: 'left',width:420,'paddingLeft':20,'paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>UPS - 2 Day Air:</div>
                                   <div style={{float: 'left','paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>$23.86</div>
                                    </div>
                        </label>
                     <hr className="hrule"/>
                    </div>
                    <div className="col-sm-9">
                        <label style={{'fontSize': 14}}>
                                    <div>
                                      <div style={{float: 'left'}} className="col-sm-1">
                                           <input type="checkbox"                                             
                                             value={this.state.CheckUpsNextDaySave} 
                                             checked={this.state.CheckUpsNextDaySave?'checked':null}
                                             onChange={this.onChangeUpsNextDaySave.bind(this)}/>
                                        </div>
                                        <div style={{float: 'left',width:420,'paddingLeft':20,'paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>UPS - Next Day Saver(Signature Required):</div>
                                   <div style={{float: 'left','paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>$54.88</div>
                                    </div>
                        </label>
                     <hr className="hrule"/>
                    </div>
                     <div className="col-sm-9">
                        <label style={{'fontSize': 14}}>
                                    <div>
                                      <div style={{float: 'left'}} className="col-sm-1">
                                           <input type="checkbox"                                             
                                             value={this.state.CheckUpsNextDayAir}
                                             checked={this.state.CheckUpsNextDayAir?'checked':null}
                                             onChange={this.onChangeUpsNextDayAir.bind(this)}/>
                                        </div>
                                        <div style={{float: 'left',width:420,'paddingLeft':20,'paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>UPS - Next Day Air:</div>
                                   <div style={{float: 'left','paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>$60.07</div>
                                    </div>
                        </label>
                     <hr className="hrule"/>
                    </div>
                    <div className="col-sm-9">
                        <label style={{'fontSize': 14}}>
                                    <div>
                                      <div style={{float: 'left'}} className="col-sm-1">
                                           <input type="checkbox"                                             
                                             value={this.state.CheckUpsNextDayEarly}
                                             checked={this.state.CheckUpsNextDayEarly?'checked':null}
                                             onChange={this.onChangeUpsNextDayEarly.bind(this)}/>
                                        </div>
                                        <div style={{float: 'left',width:420,'paddingLeft':20,'paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>UPS - Next Day Early AM:</div>
                                   <div style={{float: 'left','paddingTop':15,'fontSize':17,'fontWeight': 'normal'}}>$91.20</div>
                                    </div>
                        </label>
                     <hr className="hrule"/>
                    </div>
     
                </div>
                <div className="buttons-container11" style={{float: 'left','paddingTop':100}}>
                      <button type="button" style={{width:60}} onClick={this.handleShippingMethodsFormSubmit } className="btn btn-style success " >
                                          Next</button>
                </div>
            </div>            
          </div>
        </div>
     );
    }
    renderPaymentInfoForm() {
        return (   
            <div >
          <div className="contentDiv" style={{'width':'100%'}}> 

                  <div style={{'fontSize':17,'fontWeight':'bold',color:'black','paddingBottom':20}}>Credit or Debit Cards</div>                    
                            {/*<div style={{'float':'right',marginRight:'10%'}}>
                                <div style={{float:'left',margin:5}}><button type="button" style={{width:80}} onClick={this.handlePreviousButtonClick } className="btn btn-style success " >
                                          Previous</button></div>
                                <div style={{float:'left',margin:5}}>   <button type="button" style={{width:70}} onClick={this.handlePaymentForm } className="btn btn-style success " >
                                          Submit</button></div>
                            </div>*/}
                            <div className="payformlabel" style={{paddingLeft:60}}>
                               Enter your card information.
                            </div>                      
                  </div>                  
          <div style={{paddingLeft:'5%',float:'left'}}>  
            <div   style={{float:'left'}}>                
             
                <div className="formDiv" style={{float:'left'}} > 
                        <div className="col-sm-10"> 
                            <label>
                              <div className="inner-addon left-addon">
                              <i className="fa fa-user"></i>  
                                <input type="text"
                                       placeholder="Name on Card"
                                       required
                                       className="forminput"
                                       value={this.state.PayCardName}
                                       onChange={(e) => this.setState({PayCardName: e.target.value})}
                                /><span style={{color:'red'}}> {'  '}*</span>
                                </div>
                            </label>
                        </div>
                        <div className="col-sm-10">
                            <label>
                            <div className="payformlabel" >Card Type <span style={{color:'red'}}>*</span></div>
                               <div className="inner-addon left-addon">
                              <i className="fa fa-credit-card"></i>                                
                                    <select
                                      required
                                      className="forminput"
                                      value={this.state.PayCardType}
                                      onChange={(e) => this.setState({PayCardType: e.target.value})}>
                                      <option selected value="">Select</option>
                                      <option value="Visa">Visa</option>
                                      <option value="American Express">American Express</option>
                                      <option value="MasterCard">MasterCard</option>
                                      <option value="Discover">Discover</option>
                                     
                                    </select>  
                                 </div>
                            </label>
                        </div>
                        <div className="col-sm-10"> 
                            <label>
                            <div className="payformlabel">Account Number <span style={{color:'red'}}>*</span></div>
                              <div className="inner-addon left-addon">
                              <i className="fa fa-credit-card"></i>  
                                <input type="text"
                                       placeholder="Card Number"
                                       required
                                       className="forminput"
                                       value={this.state.PayCardNum}
                                       onChange={(e) => this.setState({PayCardNum: e.target.value})}
                                />
                                </div>
                            </label>
                        </div>
                        <div className="col-sm-10"> 
                            <label>
                            <div className="payformlabel">Security Code <span style={{color:'red'}}>*</span></div>
                              <div className="inner-addon left-addon">
                              <i className="fa fa-lock"></i>  
                                <input type="password"
                                       placeholder="CID"
                                       required
                                       className="forminput"
                                       value={this.state.PayCID}
                                       onChange={(e) => this.setState({PayCID: e.target.value})}
                                />
                                </div>
                            </label>
                        </div>     
                        
                        <div className="col-sm-10"> 
                            <label>
                            <div className="payformlabel">Expiry Date <span style={{color:'red'}}>*</span></div>
                                <div className="inner-addon left-addon">
                              <i className="fa fa-calendar"></i> 
                                 <div className="date-picker">
                                    <DatePicker
                                        selected={this.state.PayExpDate}
                                        onChange={this.handleDateChange.bind(this)}
                                        className="forminput"
                                        minDate={moment()}
                                        placeholderText="Expiry Date"
                                        showYearDropdown
                                        required
                                    />
                                </div>
                               
                                </div>
                            </label>
                        </div>
                                 
                                        
                </div>
                <div className="buttons-container11" style={{'float':'right',marginRight:'10%'}}>
                    <div style={{float:'left',margin:5}}>
                                    <button type="button" style={{width:100,height:50,fontSize:17}} onClick={this.handlePreviousButtonClick } className="btn btn-style success " >
                                          Previous</button>
                    </div>
                    <div style={{float:'left',margin:5}}>   
                                    <button type="button"  style={{width:100,height:50,fontSize:17}} disabled={(this.state.PayCardName !=="" && this.state.PayCardType !== "" &&
                                      this.state.PayCardNum !== "" &&  this.state.PayCID !== "" && this.state.PayExpDate !== null ) ? false :true}
                                      onClick={this.handlePaymentForm } className="btn btn-style success " >
                                          Submit</button>
                    </div>
                </div>
            </div>   
             </div>
        </div>
        )
    }
    render() {
    const modalStyle = {
            width: '785px',
            maxWidth: '100%'
        };
        var currentUser = (localStorage.currentUser && JSON.parse(localStorage.currentUser)) || null;
        var Tab1=this.state.CurrentTab === 1?'circleTab1 glyphicon glyphicon-home':'circle glyphicon glyphicon-home';
        var Tab2=this.state.CurrentTab === 2?'circleTab1 glyphicon glyphicon-briefcase':'circle glyphicon glyphicon-briefcase';
        //var Tab3=this.state.CurrentTab === 3?'circleTab1 glyphicon glyphicon-tasks':'circle glyphicon glyphicon-tasks';
        var Tab4=this.state.CurrentTab === 3?'circleTab1 glyphicon glyphicon-usd':'circle glyphicon glyphicon-usd';

        var progress1 ='';
        var progress2 = '';
        var progress3 = '';
        if(this.state.CurrentTab === 2)
          progress1 =   'myBar1';
        else if(this.state.CurrentTab >= 2 )
        {
          progress1 = 'myBar1';
          progress2 = 'myBar1';
          if(this.state.CurrentTab === 3){
             progress3 = 'myBar1';}
        }
        else
        {
          progress1 = 'myBar';
          progress2 = 'myBar';
          progress3 = 'myBar';
        }
        return (
        <div>
            
     {this.props.orderpayment === false && <div className="dashboard-Providers-form-modal-component">
      <div className="mainDiv"> 
           <div className="subDiv">
                <div className="subdivHeaderlabel1">STEP 1</div> 
                <div className="progressdiv">
                    <div  className={Tab1} ></div>
                    <div style={{float:'left'}} className="myProgress">
                        <div className={progress1}></div>
                    </div>
                </div>
                <div className="subdivHeaderlabel">Shipping Address</div>
           </div>
            <div  className="subDiv"> 
                <div className="subdivHeaderlabel1">STEP 2</div>
                <div className="progressdiv"> 
                     <div  className={Tab2}></div>
                     <div style={{float:'left'}} className="myProgress">
                            <div className={progress2}></div>
                     </div>
                </div>
                <div className="subdivHeaderlabel">Billing Address</div>
            </div>
            {/*<div  className="subDiv">
                <div className="subdivHeaderlabel1">STEP 3</div> 
                 <div className="progressdiv" > 
                     <div className={Tab3}></div>
                     <div style={{float:'left'}} className="myProgress">
                                <div className={progress3}></div>
                      </div>
                  </div>
                <div className="subdivHeaderlabel">Shipping method</div>
            </div>*/}
            <div className="subDiv"> 
                <div className="subdivHeaderlabel1">STEP 3</div> 
                <div className="progressdiv" > 
                     <div className={Tab4}></div>
                     <div style={{float:'left','backgroundColor':'white'}} className="myProgress">
                               
                      </div>
                  </div> 
                <div className="subdivHeaderlabel">Payment method</div>
            </div>
        </div>
       <div style={{width:'100%','paddingBottom':'22%','paddingRight':'1%'}}>
                <div className="maincontent">
                {this.state.CurrentTab === 1 && this.renderShippingAddressForm() || this.state.CurrentTab ===2 && this.renderBillingAddressForm() 
                  || this.state.CurrentTab === 3 && this.renderPaymentInfoForm()
                      }
                </div>
                
                <div className='CheckPaymentDiv'>
                            <div>
                                <div style={{float:'left',padding:12}}>
                                    <i className="fa fa-shopping-cart" aria-hidden="true" style={{fontSize: '25px', color: '#020000'}}/>
                                </div>
                                <div>
                                <div className='checkoutlabel' style={{float:'left'}}>
                                    Cart Totals
                                </div>
                                <div style={{float:'right','paddingTop':10,'paddingRight':20}}>
                                          <button type="button" style={{width:60}} onClick={this.handleEditCartClick} className="btn btn-style success " >
                                          Edit</button>
                                 </div>
                            </div>
                            <div className='checkpaneldiv'>
                                <div className='checkoutPaylabelsDiv'>
                                    <label className='checkoutPaylabels'>Cart Subtotal</label>
                                    <label className='checkoutPaylabels1'> ${this.props.totalCountPrice.toFixed(2)}</label>
                                </div>
                                <div className='checkoutPaylabelsDiv'>
                                    <label className='checkoutPaylabels'> Shipping </label>
                                    <label className='checkoutPaylabels1'> ${this.state.ShippingCharge.toFixed(2)} </label>
                                </div>
                                <div className='checkoutPaylabelsDiv'>
                                    <label className='checkoutPaylabels'> Order Total </label>
                                    <label className='checkoutPaylabels1'> ${this.state.Payamount.toFixed(2)}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    </div>
                <ModalComponent
                    showModal={this.state.showconfirmAddress}
                    onHide={this.handleshowconfirmAddress}
                    onShow={this.handlehideconfirmAddress}
                    hideOk={true}

                >
                    <div style={{padding: '1rem'}} className="clearfix">
                        <p>Are you sure do you want use this address as billing address?</p>
                          <div>                            
                            <div style={{float:"left",'paddingLeft':20}}>
                        <button
                            className="Button btn btn-success m-l btn-fixed pull-right yes-btn"
                            onClick={this.onConfirmAddressYes.bind(this)}
                        >Yes</button>
                         </div>
                         <div style={{float:"left",'paddingLeft':20}}>
                        <button
                            className="Button btn btn-danger m-l btn-fixed pull-right no-btn"
                            onClick={this.onConfirmAddressNo.bind(this)}
                        >No</button>
                        </div>
                        </div>
                    </div>
                </ModalComponent>
                <ModalComponent
                    showModal={this.state.ShippingMethodError}
                    onHide={this.handleShippingMethodError}
                >
                    <div>Please select one shipping method from the list.</div>
                </ModalComponent>
                {/*<ModalComponent
                    showModal={this.props.orderpayment}
                    onHide={this.hidePlaceOrderModal}
                    onShow={this.showPlaceOrderModal}
                    hideOk={true} >
                    <div style={{padding: '1rem'}} className="clearfix">
                        {currentUser.role==='Patient' && <p> The patient cart payment processed successfully.</p>||
                            currentUser.role==='Provider' &&<p> The provider cart payment processed successfully. </p>}
                        <button
                            className="Button btn btn-success m-l btn-fixed pull-right yes-btn"
                            onClick={this.hidePlaceOrderModal.bind(this)}
                        >OK</button>
                    </div>
                </ModalComponent>*/}
            </div>}
            {this.props.orderpayment === true && 
                <div style={{textAlign:'center',fontSize:18,paddingTop:70}}>
                <div><p>Thank you for your purchase! Your order Number is {this.props.orderId}.</p></div>
                <div><p>We have received your information and will begin processing it immediately.</p></div>
                <div><p>You will receive an email from Healthy Fusion confirming this transaction within next 24 hours.</p></div>
                </div>
            }
               </div>
            
            
        );
    }
}