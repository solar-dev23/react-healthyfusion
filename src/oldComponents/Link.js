'use strict';

var React = require('react');


var Link = React.createClass({
    getDefaultProps: function() {
        return {
            href: '#'
        };
    },

    handleClick: function(e) {
        if(this.props.onClick) {
            this.props.onClick(e);
        }
        if(this.props.href=='#') {
            e.preventDefault();
        }
    },

    render: function() {
        var linkCSS = this.props.className ? 'Link ' + this.props.className : 'Link';

        linkCSS+=this.props.datatoggle ? ' dropdown-toggle' : '';

        return (
            <a className={linkCSS}
               href={this.props.href}
               data-toggle={this.props.datatoggle}
               data-hover={this.props.datahover}
               onClick={this.handleClick}
               target={this.props.target}
               style={this.props.inlineStyle}
               title={this.props.title}
            >

                {this.props.value}
                {this.props.children}
            </a>
        );
    }
});

module.exports = Link;