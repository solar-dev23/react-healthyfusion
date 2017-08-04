import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router';
import _ from 'lodash';

import Routes from 'routes.js';
import LandingPageStore from 'stores/LandingPageStore.js';
import AuthStore from 'stores/AuthStore.js';
import DashboardCommonStore from 'stores/DashboardCommonStore.js';
import LoginFormComponent from 'components/LoginFormComponent/LoginFormComponent.js';

var Overlay = require('oldComponents/Overlay');

import './LandingPage.scss';

@connectToStores
export default class LandingPage extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    static getStores() {
        return [LandingPageStore, AuthStore, DashboardCommonStore];
    }

    static getPropsFromStores() {
        return {
            ...LandingPageStore.getState(),
            ...AuthStore.getState(),
            ...DashboardCommonStore.getState()
        }
    }

    render() {
        const { children, loading } = this.props;
        const { router } = this.context;
        const isLandingSignupPage = router.isActive(Routes.landingSignupPage);

        return (
            <div className="landing-layout">
                {/*<div className="landing-layout__bg-wrapper">*/}
                <header className="landing-layout-header landing-top-navigation">
                    <div className="landing-layout-header__top-row">
                        <div className="landing-layout__container">
                            <div className="landing-layout-header__call-us-block">
                                <span className="landing-layout-header__call-us">Call Us: <b>(248) 948-9900</b></span>
                            </div>

                            <div className="landing-layout-header__email-block">
                                <span className="landing-layout-header__email">Email: <b>example@healthyfusion.com</b></span>
                            </div>

                            <LoginFormComponent
                                currentUser={this.props.currentUser}
                                showFailedModal={this.props.loginFailed}
                            />
                        </div>
                    </div>

                    <div className="landing-layout-header__bottom-row">
                        <div className="landing-layout__container landing-layout__container--space-between">
                            <div className="landing-layout-header__main-logo" style={isLandingSignupPage ? {margin: 'auto'} : null} />
                            {!isLandingSignupPage && <ul className="landing-layout-header__main-menu">
                                <li className="landing-layout-header__main-menu-item">
                                    <a href="#about-us" className="landing-layout-header__main-menu-link">About Us</a>
                                </li>

                                <li className="landing-layout-header__main-menu-item">
                                    <a href="#hf-brads" className="landing-layout-header__main-menu-link">Our Brands</a>
                                </li>

                                <li className="landing-layout-header__main-menu-item">
                                    <a href="#register_provider" className="landing-layout-header__main-menu-link">Provider</a>
                                </li>

                                <li className="landing-layout-header__main-menu-item">
                                    <a href="#register_patient" className="landing-layout-header__main-menu-link">Patient</a>
                                </li>

                                <li className="landing-layout-header__main-menu-item">
                                    <a href="#contacts" className="landing-layout-header__main-menu-link">Contact Us</a>
                                </li>
                            </ul>}

                            {!isLandingSignupPage && <input type="search" className="landing-layout-header__search" placeholder="Search..."/>}
                        </div>
                    </div>
                </header>

                {children}

                <footer className="landing-layout-footer">
                    <div className="landing-layout-footer__top-row">
                        <div className="landing-layout__container landing-layout__container--space-between landing-layout__container--align-top">
                            <div className="landing-layout-footer__links-block">
                                <h3 className="landing-layout-footer__links-title">Links</h3>

                                <ul className="landing-layout-footer__links-list">
                                    <li className="landing-layout-footer__links-item"><a href="#" className="landing-layout-footer__link">Home</a></li>

                                    <li className="landing-layout-footer__links-item"><a href="#about-us" className="landing-layout-footer__link">About Us</a></li>

                                    <li className="landing-layout-footer__links-item"><a href="#register_provider" className="landing-layout-footer__link">Providers</a></li>

                                    <li className="landing-layout-footer__links-item"><a href="#register_patient" className="landing-layout-footer__link">Patients</a></li>

                                    <li className="landing-layout-footer__links-item"><a href="#contact-us" className="landing-layout-footer__link landing-layout-footer__link--contact-us">Contact Us</a></li>
                                </ul>
                            </div>

                            <div className="landing-layout-footer__contact-info-block" id="contacts">
                                <h3 className="landing-layout-footer__contact-info-title">CORPORATE OFFICE:</h3>

                                <ul className="landing-layout-footer__contact-info-list">
                                    <li className="landing-layout-footer__contact-info-list-item">26711 Northwestern Highway, Suite 550</li>
                                    <li className="landing-layout-footer__contact-info-list-item"> Southfield, MI 48033-2154</li>
                                </ul>

                                <ul className="landing-layout-footer__contact-info-list">
                                    <li className="landing-layout-footer__contact-info-list-item">Phone: (248) 204-6304</li>
                                    <li className="landing-layout-footer__contact-info-list-item">Toll-Free: (877) 204-6304</li>
                                    <li className="landing-layout-footer__contact-info-list-item">Fax: T.B.D.</li>
                                </ul>

                                <ul className="landing-layout-footer__contact-info-list">
                                    <li className="landing-layout-footer__contact-info-list-item">Hours Of Operation</li>
                                    <li className="landing-layout-footer__contact-info-list-item">Customer Support:  Monday – Friday 9:00 a.m. to 6:00 p.m. Eastern</li>
                                    <li className="landing-layout-footer__contact-info-list-item">Toll-Free (877) 204-6304</li>
                                </ul>

                                <ul className="landing-layout-footer__contact-info-list">
                                    <li className="landing-layout-footer__contact-info-list-item">Monday - Friday;</li>
                                    <li className="landing-layout-footer__contact-info-list-item">8:00 a.m. - 6:00 p.m. (EST.)</li>
                                </ul>
                            </div>

                            <form action="post" className="landing-layout-footer__contact-us-form" id="contact-us">
                                <h3 className="landing-layout-footer__contact-us-title">Contact Us</h3>

                                <div className="landing-layout-footer__contact-us-row">
                                    <input type="text" className="landing-layout-footer__contact-us-input" placeholder="Name"/>
                                    <input type="email" className="landing-layout-footer__contact-us-input" placeholder="Email"/>
                                </div>

                                <div className="landing-layout-footer__contact-us-row">
                                    <input type="text" className="landing-layout-footer__contact-us-input phone-feedback" placeholder="Phone"/>
                                </div>

                                <textarea name="" id="" cols="30" rows="10" className="landing-layout-footer__contact-us-textarea" placeholder="Message"></textarea>

                                <button type="submit" className="landing-layout-footer__contact-us-send-btn">Send</button>
                            </form>
                        </div>
                    </div>


                    <div className="landing-layout-footer__bottom-row">
                        <p className="landing-layout-footer__copyright-text">&copy; 2016 Healthy Fusion &reg; | All Rights Reserved</p>
                    </div>
                </footer>

                {loading && <Overlay/>}
            </div>
        );
    }
}