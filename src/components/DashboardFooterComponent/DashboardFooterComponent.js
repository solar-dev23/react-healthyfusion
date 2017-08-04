import React from 'react';

import NavigationLinksComponent from 'components/NavigationLinksComponent/NavigationLinksComponent.js';

import './DashboardFooterComponent.scss'

export default class DashboardFooterComponent extends React.Component {
    render() {
        const { isPatient, isProvider } = this.props;

        return (
            <div className="dashboard-footer-component">
                <div className="dashboard-footer-component__row dashboard-footer-component__row--top">
                    <NavigationLinksComponent
                        isPatient={isPatient}
                        isProvider={isProvider}
                        isFooter={true}
                    />
                </div>

                <div className="dashboard-footer-component__row dashboard-footer-component__row--bottom">
                    <p className="dashboard-footer-component__copyright">© 2015. HEALTHY FUSION®. All right reserved.</p>
                </div>
            </div>
        );
    }
}
