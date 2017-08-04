import React, { Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router';
import { Accordion, AccordionItem } from 'react-sanfona';
import Routes from 'routes.js';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router';
import Collapsible from 'react-collapsible';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import DashboardProductsPageStore from 'stores/DashboardProductsPageStore';
import DashboardCheckoutPageStore from 'stores/DashboardCheckoutPageStore.js';
import PaginationComponent from 'components/PaginationComponent/PaginationComponent.js';
import PatientProductFormComponent from 'components/PatientProductFormComponent/PatientProductFormComponent.js'
import ScrollToTopBtnComponent from 'components/ScrollToTopBtnComponent/ScrollToTopBtnComponent.js'
import './DashboardProductDetailsPage.scss';



@connectToStores
export default class DashboardProductDetailsPage extends Component {

	constructor(props) {
	        super(props);
	        this.state = {
	        modal: false,
	        selectedProduct: [],
            selectedproductid:this.props.location.query.productId
	    	}
	    }
	componentDidMount() {
        this.props.getSingleProductDetails && DashboardProductsPageActions.getSingleProductDetails(this.state.selectedproductid)
    }
    
    static getStores() {
        return [DashboardProductsPageStore,DashboardCheckoutPageStore];
    }

    static getPropsFromStores() {
        return {
           ...DashboardProductsPageStore.getState(),
           ...DashboardCheckoutPageStore.getState()
        }
    }
    renderProductDescription(){
    	if(this.props.getSingleProductDetails.ProductDescription)
    	{
    		let ProductDescription=this.props.getSingleProductDetails.ProductDescription;
    		return(
    				<ul>
				     {ProductDescription.map(ProductDescription=>{
				       return <li key={ProductDescription.Description}>{ProductDescription.Description}</li>
				     })}
				   </ul>

    			)
    	}
    }
    handleVariantchange(e){

         //appHistory.push(Routes.dashboardProductDetails, query: { productId: e.target.value });
        this.props.getSingleProductDetails && DashboardProductsPageActions.getSingleProductDetails(e.target.value);
    }
    renderProductVariants(){
    	 if(this.props.getSingleProductDetails.ProductVariantsName){
    	 	let ProductVariantsSize=this.props.getSingleProductDetails.ProductVariantsSize[0];
            let VariantSizeCount = this.props.getSingleProductDetails.ProductVariantsName[0].VariantSizeCount;
            let VariantFlavorCount = this.props.getSingleProductDetails.ProductVariantsName[0].VariantFlavorCount ;
            let SelectedproductIdValue =this.props.getSingleProductDetails.Productgeneral[0].ProductID;
    	 	return(
    	 		<div className="VariantName">
    	 			        {(VariantSizeCount ==1 && (VariantFlavorCount ==1 || VariantFlavorCount ==0)) && <h3>{ProductVariantsSize.value}</h3>}
                            <div >
                             {(VariantSizeCount > 1 && VariantFlavorCount ==0 )&& 
                                    <div >
                                        <select style={{width:150}} 
                                        value={SelectedproductIdValue}
                                        onChange={this.handleVariantchange.bind(this)}>                                    
                                            {this.props.getSingleProductDetails.ProductVariantsSize && this.props.getSingleProductDetails.ProductVariantsSize.map((varsize) => {
                                                return <option value={varsize.key} key={varsize.key}>{varsize.value}</option>
                                            })}
                                        </select>
                                    </div>
                                }
                                {(VariantSizeCount >= 1 && VariantFlavorCount !=0 )&& 
                                    <div style={{float:'left'}}>
                                        <select style={{width:150}} disabled={VariantSizeCount==1} 
                                        value={SelectedproductIdValue}
                                        onChange={this.handleVariantchange.bind(this)}>                                    
                                            {this.props.getSingleProductDetails.ProductVariantsSize && this.props.getSingleProductDetails.ProductVariantsSize.map((varsize) => {
                                                return <option value={varsize.key} key={varsize.key}>{varsize.value}</option>
                                            })}
                                        </select>
                                    </div>
                                }
                                {VariantFlavorCount >1  && 
                                    <div>  
                                        <select style={{width:150}}  value={SelectedproductIdValue} onChange={this.handleVariantchange.bind(this)}>                                    
                                            {this.props.getSingleProductDetails.ProductVariantsFlavor && this.props.getSingleProductDetails.ProductVariantsFlavor.map((varflavour) => {
                                                return <option value={varflavour.key} key={varflavour.key}>{varflavour.value}</option>
                                            })}
                                        </select>
                                    </div>
                                 }
                             </div>
    	 		</div>
    	 		)
    	 }
    }   
    renderProductUsage()
    {
    	if(this.props.getSingleProductDetails.ProductUsage)
    	{
    		let ProductDescription=this.props.getSingleProductDetails.ProductUsage;
        return(
    		<div>
	                {ProductDescription.map((item) => {
	                    return (
	                        <Collapsible trigger={item.Name}>
                                <p dangerouslySetInnerHTML={{__html:item.Description}} style={{overflow:'auto'}}></p>
                    
                            </Collapsible>
	                    );
	                })}
            </div>        
	    )
    	}	

    }
    renderProductContents(){


    	if(this.props.getSingleProductDetails.ProductContents)
    	{
	    	let PContents=this.props.getSingleProductDetails.ProductContents;
    		
    	return(
    		<div className="table-div">
    		<div style={{color:'#00b2e2',fontSize: 17,fontWeight: 'bold',paddingBottom:20}}>Supplement Facts</div>
    		<table cellSpacing="10" className="table-content">
	    		<tbody>	

	    		<tr>
				<th></th>
				<th>Amount Per Serving</th>
				<th>% Daily Value</th>
				</tr>    		
	    		{PContents.map((i)=>{
	    			return(
	    				<tr><td>{i.Ingredient}</td><td>{i.ServingAmount}</td><td>{i.DailyPercent}</td></tr>
	    				

	    				)

	    			})
	    		}

	    		</tbody>
	    	


	    		</table>
    		</div>


    		)
	    }
    }
        handleAddToCartClick(product) {
        this.setState({selectedProduct: []});
        if (this.props.isProvider)
        {
            DashboardProductsPageActions.addProductToBasket(product)
             DashboardCheckoutPageActions.addToProviderCheckout(product);
         var selectedvalue = []
            selectedvalue.push(product);
            if (_.isArray(selectedvalue)) {
                
                selectedvalue.map(Product => {
                    let existProduct = null;
                    existProduct = _.find(this.props.checkoutData, ['ProductID', Product.ProductID])
                    if (!_.isNull(existProduct) && existProduct !== undefined) {
                        this.setState({selectedProduct: product});
                      //  DashboardCheckoutPageActions.productAlreadyExisting()
                    }
                   
                })
            }
           
        }
        else {
            var selectedvalue = []
            selectedvalue.push(product);
            if (_.isArray(selectedvalue)) {
                selectedvalue.map(Product => {
                    let existProduct = null;
                    existProduct = _.find(this.props.checkoutData, ['ProductID', Product.ProductID])
                    if (!_.isNull(existProduct) && existProduct !== undefined) {
                        this.setState({selectedProduct: product});
                        DashboardCheckoutPageActions.productAlreadyExisting()
                    }
                    else {
                        this.setState({selectedProduct: product});
                        DashboardCheckoutPageActions.showPatientProductPopup();
                    }
                })
            }
            else {
                this.setState({selectedProduct: product});
                DashboardCheckoutPageActions.showPatientProductPopup();
            }
        }
    }



    renderProductgeneral(){
    		
     if(this.props.getSingleProductDetails.Productgeneral){
     	let Productgeneral=this.props.getSingleProductDetails.Productgeneral[0];
     	return(
     		<div>
	     		<div className="left-wrap">
					<div className="pi-img-w pi-img-round-corners pi-img-shadow pi-img-with-overlay">
						<img src={Productgeneral.LargeImgPath}/>
						<hr/>
						<div>
							<p><b>SHARE THIS:</b></p>
							<div>
								<a  className="btn btn-social-icon btn-facebook">
							    <i className="fa fa-facebook"></i></a> 
							     <a className="btn btn-social-icon btn-google-plus"><i className="fa fa-google-plus"></i></a>
							    <a className="btn btn-social-icon btn-instagram"><i className="fa fa-instagram"></i></a>
							    <a className="btn btn-social-icon btn-linkedin"><i className="fa fa-linkedin"></i></a>
							   
							    <a className="btn btn-social-icon btn-twitter"><i className="fa fa-twitter"></i></a>
							   

							</div>
						</div>
						<div>{this.renderProductDescription()}</div>
						
						{/*<div className="gap-between row"><a  href={Productgeneral.DRS} target="_blank"><button className="btn btn-primary btn-sm" style={{fontSize:15}}>Download DRS</button></a></div>
						<div className="gap-between row"><a href={Productgeneral.Label} target="_blank"><button className="btn btn-primary btn-sm" style={{fontSize:15}}>Download Label</button></a></div>*/}
					</div>

				</div>
				<div className="right-div">
					<div className="common-content">
							<h2>{Productgeneral.Name}</h2>
                            <p dangerouslySetInnerHTML={{__html:Productgeneral.ShortDescription}} style={{fontSize:22,color:'#00b2e2',overflow:'auto'}}/>
							
                            <hr style={{border: '1px solid'}}/>
							{this.renderProductVariants()}
							
					</div>
					<div className="row gap-between">
						<div className="row gap-between" style={{paddingLeft: '35%',paddingBottom: 20}}>
							
                            <button type="button" onClick={this.handleAddToCartClick.bind(this, Productgeneral)}
                                            className="product-card__add-to-cart-btn btn btn-style success">
                                        <div>
                                            <div style={{float: 'left'}}>

                                            </div>
                                            <div className='cartButton'>
                                                <i className="fa fa-shopping-cart" aria-hidden="true"/>
                                                     Add to Cart 
                                            </div>
                                        </div>
                                    </button>
						</div>	
						
					</div>
					<div className="product-desc gap-between">	
						<div>
							<p dangerouslySetInnerHTML={{__html:Productgeneral.Description}} style={{overflow:'auto'}} />
						</div> 
					</div>
					<div className="accordion">
						{this.renderProductUsage()}
					</div>
					
					
				</div>
				
				

			</div>	

     	)
     	
     }
     
    	
    }
    render() {
    	const { Productgeneral,ProductVariants,ProductUsage,ProductDescription,ProductContents } = this.props.getSingleProductDetails;
        const modalStyle = {
            width: '565px',
            maxWidth: '100%',
        };
        const modalStyleAlert = {
            width: '465px',
            maxWidth: '100%'
        };
    return (
    	<div className="main_content"> 
	    	<div className="top-div">
		    	<div className="row" style={{paddingBottom:30}}>
			    	<div className="pi-tab-pane pi-active">
				    	<div className="pi-row">
								<div className="pi-col-sm-6 pi-padding-bottom-40">
									<div className="cart-items-detail pi-visible-xs">
										{this.renderProductgeneral()}
									</div>							
								</div>
						</div>
					</div>
				</div>
				<div className="table-main row gap-between">
					{this.renderProductContents()}
				</div>	
			</div>
		        <ModalComponent
                showModal={this.props.showPatientProductPopup}
                onHide={DashboardCheckoutPageActions.closePatientProductPopup}
                onShow={DashboardCheckoutPageActions.showPatientProductPopup}
                modalStyle={modalStyle}
                type="transparent"
                header="Add to your cart"
                hideOk={true}>
                <PatientProductFormComponent selectedProduct={this.state.selectedProduct}
                                             cartItems={this.props.checkoutData}
                                             addedtocart={this.props.addedtocart}/>
                </ModalComponent>

                <ModalComponent
                    showModal={this.props.productAlreadyExisting}
                    onHide={DashboardCheckoutPageActions.hideproductAlreadyExistingpop}
                    onShow={DashboardCheckoutPageActions.productAlreadyExisting}
                    hideOk={true}
                    modalStyle={modalStyleAlert}
                    type="transparent">
                    <div style={{padding: '1rem'}} className="clearfix">
                        <p>Item has been already added to your cart.What would you like to do next?</p>
                        <div>
                            <div style={{float: "left", 'padding-left': 20}}>
                                <button
                                    className="btn btn-style success "
                                    onClick={DashboardCheckoutPageActions.showPatientProductPopup}>
                                    Continue Shopping
                                </button>
                            </div>
                            <div style={{float: "left", 'padding-left': 20}}>
                                <button style={{width: 100}}
                                        className="btn btn-style success"
                                        onClick={DashboardCheckoutPageActions.gotoCartpage}>
                                    Go To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalComponent>

                <ScrollToTopBtnComponent contextRouter={this.props.contextRouter} />
		</div>			
		);
	}
				


}	