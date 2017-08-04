import React from 'react';
var cx = require('react-classset');

import './SectionComponent.css'

export default class SectionComponent extends React.Component {
    render() {
        let sectionCSS = cx({
            'Section ' : true,
            'panel panel-default' : this.props.style=='default',
            'panel panel-info' : this.props.style=='info',
            'panel panel-success' : this.props.style=='success',
            'panel panel-warning' : this.props.style=='warning',
            'panel panel-warning-custom' : this.props.style=='warning-custom',
            'panel panel-success-custom' : this.props.style=='success-custom',
            'panel panel-inside-panel' : this.props.style=='panel-inside-panel',
            'patientinfo'               :this.props.style=='patientinfo',
            'vbox' : this.props.style=='big',
            'wrapper' : this.props.type=='wrapper',
            'merge-left' : this.props.mergeLeft
        });

        sectionCSS+=this.props.className ? ' ' + this.props.className : '';

        let sectionId = '';

        if (this.props.type=='biggest-container') { sectionId='container'; }
        if (this.props.type=='main-content') { sectionId='main-content'; }

        return (
            <section id={sectionId} className={sectionCSS} style={this.props.inlineStyle}>
                {this.props.children}
            </section>
        );
    }
}
