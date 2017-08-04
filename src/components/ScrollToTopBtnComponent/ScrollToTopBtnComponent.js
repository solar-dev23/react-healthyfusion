import React from 'react';

import Routes from 'routes.js';

import './ScrollToTopBtnComponent.scss'

export default class ScrollToTopBtnComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            isTop: true
        }
    }
    
    onScrolling() {
        document.body.scrollTop !== 0 ? this.setState({isTop: false}) : this.setState({isTop: true});
    }
    
    render() {
        const { contextRouter } = this.props;
        
        window.onscroll = () => {
            if (contextRouter.isActive(Routes.dashboardProductsPage) || contextRouter.isActive(Routes.dashboardQuickOrderPage)) {
                this.onScrolling()
            }
        }

        return (
            <div>
                {!this.state.isTop && <div className="scroll-to-top-btn-component">
                    <a onClick={() => window.scrollTo(0, 0)} className="scroll-to-top-btn-component__link">
                        <i className="fa fa-chevron-up"/>
                    </a>
                </div>}
            </div>
        );
    }
}
