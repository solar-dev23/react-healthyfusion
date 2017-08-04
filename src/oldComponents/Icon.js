
'use strict';

var React = require('react');
var cx = require('react-classset');

var Icon = React.createClass({
    getIconCSS: function(type) {
        var style = this.props.style;
        var offset = this.props.offset;
        var size = this.props.size;
        var position = this.props.position;

        return cx({
            'Icon' : true,
            'text-muted '     : style == 'nav',
            'text-info-lt'    : style == 'info',
            'text-primary-lt' : style == 'primary',
            'text-success-lt' : style == 'success',
            'text-danger-lt red'  : style == 'danger',
            'text-warning-lt' : style == 'warning',
            'fa fa-tasks'           : type == 'about',
            'fa fa-bolt'            : type == 'admin',
            'fa fa-arrow-circle-left'  : type == 'arrow-circle-left',
            'fa fa-arrow-circle-right' : type == 'arrow-circle-right',
            'fa fa-arrow-circle-up'    : type == 'arrow-circle-up',
            'fa fa-arrow-circle-down'  : type == 'arrow-circle-down',
            'fa fa-angle-left'      : type == 'arrow-angle-left',
            'fa fa-angle-right'     : type == 'arrow-angle-right',
            'fa fa-angle-up'        : type == 'arrow-angle-up',
            'fa fa-angle-down'      : type == 'arrow-angle-down',
            'fa fa-reply'           : type == 'back',
            'fa fa-ban'             : type == 'ban',
            'fa fa-bullseye '       : type =='bullseye',
            'fa fa-bar-chart-o'     : type == 'chart',
            'fa fa-calendar'        : type == 'calendar',
            'fa fa-check'           : type == 'check',
            'fa fa-check-square-o'  : type == 'square-check',
            'fa fa-eraser'          : type == 'clear',
            'fa fa-clock-o '        : type == 'clock',
            'fa fa-times '          : type == 'close',
            'fa fa-calculator'      : type == 'calculator',
            'fa fa-cog '            : type == 'cog',
            'fa fa-dashboard'       : type == 'dashboard',
            'fa fa-edit'            : type == 'edit',
            'fa fa-file-excel-o'    : type == 'excel',
            'fa fa-flash'           : type == 'flash',
            'fa fa-file-o'          : type == 'file',
            'fa fa-group'           : type == 'group',
            'fa fa-history'         : type == 'history',
            'fa fa-file-image-o'    : type == 'image',
            'fa fa fa-spinner fa-spin' : type == 'loading',
            'fa fa fa-spin fa-cog' : type == 'gear-spinning',
            'fa fa-sign-out'        : type == 'logout',
            'fa fa-comments'        : type == 'messages',
            'fa fa-power-off red'   : type == 'off',
            'fa fa-file-pdf-o'      : type == 'pdf',
            'fa fa-paper-plane'     : type == 'paper-plane',
            'fa fa-ban on fa-file-pdf-o'      : type == 'no-pdf',
            'fa fa-plus'            : type == 'plus',
            'fa fa-random'         : type == 'random',
            'fa fa-refresh'         : type == 'refresh',
            'fa fa-retweet'         : type == 'retweet',
            'fa fa-files-o'         : type == 'reports',
            'fa fa-angle-right menu-arrow' : type == 'right-arrow',
            'fa fa-search '         : type == 'search',
            'fa fa-sitemap'         : type == 'sitemap',
            'fa fa-sort-asc'        : type == 'sort-up',
            'fa fa-sort-desc'       : type == 'sort-down',
            'fa fa-spinner fa-spin' : type == 'spinner',
            'fa fa-sort text-muted' : type == 'sort',
            'fa fa-trash-o'         : type == 'trash',
            'fa fa-user'            : type == 'user',
            'fa fa-external-link'   : type == 'view',
            'fa fa-question-circle' : type == 'question-circle',
            'fa fa-warning'   : type == 'warning',
            'm-n'    : !offset,
            'm-r-sm' : offset == 'right' ||  offset == 'right-sm',
            'm-r-xs' : offset == 'right-small' ||  offset == 'right-xs',
            'm-l-xs' : offset == 'left-small',
            'small' : size == 'small',
            'pull-right' : position == 'right',
            'pull-left'  : position == 'left',
            'fa fa-chevron-right' : type == 'chevron-right',
            'fa fa-chevron-left' : type == 'chevron-left',

        });
    },

    render: function() {
        var type = this.props.type;
        var secondType = this.props.secondType;

        var mainIconCSS = this.getIconCSS(type);

        if(secondType) {
            return (<span className="fa-stack">
                      <i className={ this.getIconCSS(secondType) + " fa-stack-1x" }></i>
                      <i className={ mainIconCSS + " fa-stack-2x" }></i>
                    </span>
            );
        } else {
            return (
                <i className={mainIconCSS}> </i>
            );
        }
    }
});

module.exports = Icon;