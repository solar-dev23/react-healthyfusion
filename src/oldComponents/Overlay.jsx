
'use strict';

var React = require('react');

require('../oldStyles/Overlay.css');

var Overlay = React.createClass({

    render: function() {
        var label = <label> label </label>;
        var loading = <div className={'overlay loading androidStock'}>
            {label}
        </div>;

        var progressBar = <div className={"  overlay progress progress-striped active androidStock"}>
                <div className="progress-bar progress-bar-warning"
                     role="progressbar"
                     style= {{ width: 50 + '%' }}>

                    50 % Complete
                </div>
            </div>;

        var icon = <div className={'overlay icon-o  androidStock'}>
                <i className="fa fa-search"></i>
                {label}
            </div> ;

        var inlineStyle = {};
        if (this.props.zIndex) {
            inlineStyle.zIndex = this.props.zIndex;
        }
        return (
            <div className='Overlay' style={inlineStyle}>
                {loading}
            </div>
        );
    }
});

module.exports = Overlay;