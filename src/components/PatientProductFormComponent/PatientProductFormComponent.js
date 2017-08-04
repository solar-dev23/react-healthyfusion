import React from 'react';

import './PatientProductFormComponent.scss';
import connectToStores from 'alt/utils/connectToStores';
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import DashboardCheckoutPageStore from 'stores/DashboardCheckoutPageStore.js';
import DashboardProductsPageStore from 'stores/DashboardProductsPageStore';
@connectToStores
export default class PatientProductFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
            total:this.props.selectedProduct.Price,
            Dosage:'2',
            selectedproductid: this.props.selectedProduct.ProductID
        }
    }
    static getStores() {
        return [DashboardProductsPageStore,DashboardCheckoutPageStore];
    }
    componentDidMount() {
        this.props.getProductVariantdetails && DashboardProductsPageActions.getProductVariantdetails(this.state.selectedproductid)
    }
    static getPropsFromStores() {
        return {
              ...DashboardProductsPageStore.getState(),
              ...DashboardCheckoutPageStore.getState()
        }
    }

   
    handleViewCartClick() {
      DashboardCheckoutPageActions.closePatientProductPopWithRedirect();
    }
    handleKeepShoppingClick()
    {
        DashboardCheckoutPageActions.closePatientProductPopup();
    }
    handleAddtoCartClick()
    {
        const product=[{
                Description:this.props.selectedProduct.Description,
                ImagePath:this.props.selectedProduct.ImagePath,
                Name:this.props.selectedProduct.Name,
                Price:this.props.selectedProduct.Price,
                ProductCategory:"",
                ProductID:this.props.selectedProduct.ProductID,
                Quantity:this.state.quantity,
                ShortDescription:this.props.selectedProduct.ImagePath,
                Total: this.state.total
        }]
        DashboardCheckoutPageActions.addToCheckout(product);
    }
    handleQuantityChange(e) {
        const quantity = e.target.value ? parseInt(e.target.value, 10): 0;
        const total = quantity * this.props.selectedProduct.Price;

        this.setState({
            quantity: quantity,
            total: total
        });

      
    }
      handleVariantchange(e){

      this.setState({selectedproductid:e.target.value})  ;
      //this.props.getProductVariantdetails && DashboardProductsPageActions.getProductVariantdetails(this.state.selectedproductid)
    }
 renderProductVariants(){
       if(this.props.getProductVariantdetails.ProductVariantsName){
        let ProductVariantsSize=this.props.getProductVariantdetails.ProductVariantsSize[0];
            let VariantSizeCount = this.props.getProductVariantdetails.ProductVariantsName[0].VariantSizeCount;
            let VariantFlavorCount = this.props.getProductVariantdetails.ProductVariantsName[0].VariantFlavorCount ;
            let SelectedproductIdValue =this.state.selectedproductid;
        return(
          <div className="VariantNamePop">
                    {(VariantSizeCount ==1 && (VariantFlavorCount ==1 || VariantFlavorCount ==0)) && <div>{ProductVariantsSize.value}</div>}
                            <div >
                             {(VariantSizeCount > 1 && VariantFlavorCount ==0 )&& 
                                    <div >
                                        <select style={{width:150}} 
                                        value={SelectedproductIdValue}
                                        onChange={this.handleVariantchange.bind(this)}>                                    
                                            {this.props.getProductVariantdetails.ProductVariantsSize && this.props.getProductVariantdetails.ProductVariantsSize.map((varsize) => {
                                                return <option value={varsize.key} key={varsize.key}>{varsize.value}</option>
                                            })}
                                        </select>
                                    </div>
                                }
                                {(VariantSizeCount >= 1 && VariantFlavorCount !=0 )&& 
                                    <div >
                                        <select style={{width:150}} disabled="true" 
                                        value={SelectedproductIdValue}
                                        onChange={this.handleVariantchange.bind(this)}>                                    
                                            {this.props.getProductVariantdetails.ProductVariantsSize && this.props.getProductVariantdetails.ProductVariantsSize.map((varsize) => {
                                                return <option value={varsize.key} key={varsize.key}>{varsize.value}</option>
                                            })}
                                        </select>
                                    </div>
                                }
                                {VariantFlavorCount >1  && 
                                    <div style={{'marginTop':5}}>  
                                        <select style={{width:150}} disabled="true"  value={SelectedproductIdValue} onChange={this.handleVariantchange.bind(this)}>                                    
                                            {this.props.getProductVariantdetails.ProductVariantsFlavor && this.props.getProductVariantdetails.ProductVariantsFlavor.map((varflavour) => {
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
    render() {
        return (
            <form className="PatientProduct-form-component" >
                <div>
                    <div style={{float:'left'}}>
                    <div style={{float:'left','paddingTop': 25}}>
                        <img  style={{height: 250, margin: '0 auto'}} src={this.props.selectedProduct.ImagePath}/>
                    </div>
                    <div style={{float:'left'}}>
                        <div style={{width:300}}>
                        <p className="paragraph" style={{'paddingLeft':20,'paddingTop':20}}><b>{this.props.selectedProduct.Name}</b></p>
                        </div>
                     <div className='popupQuantity' >
                                        <div>
                                              <div className="col-xs-6" style={{float: 'left'}}>
                                                   <input type="number" className="form-control"  pattern="\d*" min="0" value={this.state.quantity} onChange={this.handleQuantityChange.bind(this)}/>
                                              </div>
                                               <div style={{float: 'left',  'fontSize':20 ,color:'black'}}>
                                                   <b>${this.state.total.toFixed(2)}</b>
                                               </div>                                               
                                        </div>
                                        <div style={{paddingTop:50}}>
                                        {this.renderProductVariants()} 
                                        </div>
                                         <div style={{ 'paddingLeft':40,float:'left'}}>
                                         <button onClick={this.handleAddtoCartClick.bind(this)} style={{ 'width':120}} type="button" className="btn btn-style success btn-styleproduct " >
                                    <div>
                                        <div style={{float:'left'}}>

                                        </div>
                                        <div className='cartButton'>
                                            <i className="fa fa-shopping-cart" aria-hidden="true"/>

                                            {"Add to Cart"}
                                        </div>
                                    </div>
                                </button>
                                 </div>
                        </div>
                    </div>
                    </div>
                      {this.props.selectedProduct.ShortDescription && <div className="success desclabel">{this.props.selectedProduct.ShortDescription}</div>}
                      {this.props.addedtocart && <div className="successcart" >Item(s) added to the cart</div>}

                </div>
                <div className="buttons-container">
                            <div style={{'textAlign':'center',color:'white','fontSize':14,'paddingTop':15}}>
                                ITEMS IN YOUR CART : {this.props.cartItems.length}
                            </div>
                            <div style={{float:"left",'paddingLeft':15}}>
                                <button type="button"  onClick={this.handleKeepShoppingClick} className="btn btn-style success " >
          Keep Shopping</button>
                            </div>
                            <div className="pull-right" >
                               <button type="button" onClick={this.handleViewCartClick} className="btn btn-style success btn-styleproduct " >
          View Cart
          </button>
          </div>

                                   
                             

                </div>
            </form>
        );
    }
}
