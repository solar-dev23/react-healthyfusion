import React from 'react';

import DashboardProductsPageActions from 'actions/DashboardProductsPageActions.js';
import DashboardCheckoutPageActions from 'actions/DashboardCheckoutPageActions.js';
import DashboardSearchPageActions from 'actions/DashboardSearchPageActions.js';
import Collapsible from 'react-collapsible';
import './MonographComponent.scss'

export default class MonographComponent extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            selectedComposition: null
        }
    }

    selectedComposition(selectedComposition) {
        this.setState({selectedComposition});
    }

    componentDidMount() {
          let values = this.props.params.monoID.split(':');

        //let NutritionID = values[0];
       // let MonographTypeID = values[1];
        DashboardSearchPageActions.getMonographSections(values);
        DashboardSearchPageActions.resetSelectedMonographSection();
    }

    handleSelectMonograph(sectionId) {
        DashboardSearchPageActions.selectMonographSection(sectionId);
    }

    handleAddToCartClick(product) {
        DashboardProductsPageActions.addProductToBasket(product);
        DashboardCheckoutPageActions.addToProviderCheckout(product);
    }
    renderMonoGraphAccordian()
    {
        if(this.props.monographData.Monograph)
        {
                let MonoDatadetails=this.props.monographData.Monograph;

            return(
                <div>             
                    {MonoDatadetails.map((item,i) => {                            
                        return (                            
                            <Collapsible open={i==0 ? true:false} trigger={item.SectionName} >                                                            
                                     <p key={item.SectionId} dangerouslySetInnerHTML={{__html:item.Content}} style={{overflow:'auto'}}/>                                     
                            </Collapsible>                        
                        );
                    })}
                </div>                  
                )
        }
    }
    render() {
        const { monographData, selectedMonographSection } = this.props;
        const { selectedComposition } = this.state;
        const MonoID = this.props.params.monoID.split(':');
        const divval= (MonoID[1] == "1" || MonoID[1] == "2" )?'col-lg-6':'col-lg-12';
        const divval1= (MonoID[1] === "3" ||MonoID[1] === "4" )?'viewnone':'viewdiv col-lg-6';
        return (
            <div className="monograph-component">
                {monographData && <div className="row monograph-overview" style={{paddingBottom:50}}>
                    <div className={divval}>
                       
                      <div className='accordion'>
                            {this.renderMonoGraphAccordian()}
                        </div>
                    </div>        
                    <div className={divval1}>
                        <h4>Related products</h4>
                        {monographData.Product.map(product => <div
                            className="underProduct"
                            key={product.ProductID} >
                            <div className="product-image">
                                <img src={product.ImagePath} />
                            </div>
                            <div className="product-name">
                                <p>{product.Name}</p>
                            </div>
                            <p className="product-price">{product.Price.toFixed(2)}</p>
                            <button className="buy-product-button" onClick={this.handleAddToCartClick.bind(this, product)}>
                                <div>
                                    <i className="fa fa-shopping-cart" />
                                    Add to Cart
                                </div>
                            </button>
                        </div>)}

                    </div>
                </div>}
            </div>
        );
    }
}
