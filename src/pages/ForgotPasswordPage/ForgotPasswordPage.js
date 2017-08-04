import React, { Component } from 'react';
import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
import Routes from 'routes.js';

import './ForgotPasswordPage.scss';

export default class ForgotPasswordPage extends Component {
    componentDidMount () {
        const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
        !this.props.location.query.ID && appHistory.push(Routes.main);
    }

    render() {
        return (
            <div className="forgot-password-page">
                query ID {this.props.location.query.ID}
            </div>
        );
    }
}