import React from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';

import Routes from 'routes.js';
import './LandingContentInfoComponent.scss'

export default class LandingContentInfoComponent extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            draggable: true,
            pauseOnHover: true,
            arrows: false
        };

        return (
            <div className="main-container">
                <Slider {...settings}>
                    <div className="slick-slider__slide slick-slider__slide--1">
                        <div className="landing-layout__container">
                            <div className="slick-slider__slide-info">
                                <h3 className="slick-slider__slide-title">Personalized Nutrition</h3>
                                <p className="slick-slider__slide-text">
                                    Certain illnesses and symptoms may be alleviated by correcting the nutrient levels in your body.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="slick-slider__slide slick-slider__slide--2">
                        <div className="landing-layout__container">
                            <div className="slick-slider__slide-info">
                                <h3 className="slick-slider__slide-title">medication analysis</h3>
                                <p className="slick-slider__slide-text">
                                    The medications you use may result in major nutritional depletions of critical nutrients key to maintaining wellness.  We can guide you to nutrients and herbs for optimal health.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="slick-slider__slide slick-slider__slide--3">
                        <div className="landing-layout__container">
                            <div className="slick-slider__slide-info">
                                <h3 className="slick-slider__slide-title">
                                    achieving wellness
                                </h3>
                                <p className="slick-slider__slide-text">
                                    Everyone’s body uses nutrients differently to function at peak efficiency.  If test results are out of the norm, we can help you bring them back to optimal levels.
                                </p>
                            </div>
                        </div>
                    </div>
                </Slider>

                <div className="landing-layout__contact-us-row">
                    <div className="landing-layout__container landing-layout__container--center">
                        <div className="landing-layout__contact-us-information-block">
                            <h3 className="landing-layout__contact-us-information-title">Have a Suggestion?</h3>
                            <p className="landing-layout__contact-us-information-text">We want to hear from you.</p>
                        </div>
                        <a href="#contact-us" className="landing-layout__contact-us-btn">Contact Us</a>
                    </div>
                </div>

                <div className="landing-layout__about-us-row" id="about-us">
                    <div className="landing-layout__container landing-layout__container--column">
                        <h2 className="landing-layout__about-us-title landing-layout__about-us-title--big">What is Healthy Fusion?</h2>
                        <h3 className="landing-layout__about-us-title">Where we are passionate about helping individuals achieve their best possible health</h3>
                        <p className="landing-layout__about-us-text">
                            Healthy Fusion provides treatment protocols of nutritional and herbal therapies focused on supporting overall health and wellness.  Protocols may be based on a prescription or over-the-counter medication being taken, a clinical condition, a specific nutrient or herbs, or an out-of-the-norm lab test results.  Nutraceutical products to support the nutritional and herbal therapies are also recommended here on our site.
                        </p>
                        <a href="#" className="landing-layout__about-us-btn">About Us</a>
                    </div>
                </div>

                <div className="landing-layout__our-brands-row">
                    <div className="landing-layout__container landing-layout__container--space-around landing-layout__container--extend">
                        <div className="landing-layout__our-brand landing-layout__our-brand--3" id="hf-brads"/>
                    </div>
                </div>

                <div className="landing-layout__register-row" id="register_provider">
                    <div className="landing-layout__container landing-layout__container--column">
                        <h2 className="landing-layout__register-title">JOIN THE HEALTHY FUSION TEAM</h2>
                        <p className="landing-layout__register-text">
                            Benefits include: <br />
                            <marquee behavior="scroll" direction="left">A user-friendly, one stop electronic solution for up-to-date functional medicine information (including monographs and handouts) and ordering of medical grade nutraceuticals at a discounted price. A convenient home delivery system for medical grade nutraceuticals at an affordable price. Additional income based on the nutraceutical sales to patients. Relief from the burden and wasted time of accessing multiple sites for both functional medicine information and nutraceuticals. Removal of the “hassle factor” of maintaining and stocking nutraceutical inventory in office clinics.</marquee>
                        </p>
                        <Link
                            className="landing-layout__register-btn"
                            to={Routes.landingSignupProvider}
                        >
                            Register
                        </Link>
                    </div>
                </div>

                <div className="landing-layout__info-blocks-row">
                    <a href="#" className="landing-layout__info-block">
                        <div className="landing-layout__info-block-icon landing-layout__info-block-icon--find-a-practitioner">
                            <i className="fa fa-search"/>
                        </div>
                        <h3 className="landing-layout__info-block-title">Find a practitioner</h3>
                    </a>

                    <a href="#" className="landing-layout__info-block">
                        <div className="landing-layout__info-block-icon landing-layout__info-block-icon--faq">
                            <i className="fa fa-question"/>
                        </div>
                        <h3 className="landing-layout__info-block-title">FAQ</h3>
                    </a>

                    <a href="#" className="landing-layout__info-block">
                        <div className="landing-layout__info-block-icon landing-layout__info-block-icon--news-and-events">
                            <i className="fa fa-paper-plane"/>
                        </div>
                        <h3 className="landing-layout__info-block-title">News & Events</h3>
                    </a>
                </div>

                <div className="landing-layout__register-row" id="register_patient">
                    <div className="landing-layout__container landing-layout__container--column">
                        <h2 className="landing-layout__register-title">patient registration</h2>
                        <p className="landing-layout__about-us-text" style={{fontSize: '24px'}}>
                            Patients of health professionals who are Healthy Fusion members may complete their purchase of recommended nutraceutical products by registering here.
                        </p>
                        <p className="landing-layout__about-us-text" style={{fontSize: '24px'}}>
                            First time users will provide information during a short registration process that will make any future orders quick and easy!  Please click the Register button below to begin.
                        </p>
                        <p className="landing-layout__about-us-text" style={{fontSize: '24px'}}>
                            Returning users should login at the top of this page by entering the username and password provided to you after you registered.  You will then be shown your shopping cart filled with your recommended products so you can finalize the purchasing process.
                        </p>

                        <Link
                            className="landing-layout__register-btn"
                            to={Routes.landingSignupPatient}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>

        );
    }
}
