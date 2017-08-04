import React from 'react';
// import { propTypes } from 'react';

import './PaginationItemPageComponent.scss'

export default class PaginationItemPageComponent extends React.Component {
    static propTypes = {
        numberPage: React.PropTypes.number.isRequired,
        paginationClass: React.PropTypes.string.isRequired,
        onPaginate: React.PropTypes.func
    };

    onPaginate(numberPage) {
        this.props.onPaginate(numberPage - 1);
    }

    render() {
        const { paginationClass, numberPage } = this.props;
        const paginationClassName = `pagination-item-page-component pagination__page-btn pagination__page-btn--${paginationClass}`;
        
        return (
            <li className={paginationClassName}>
                <a
                    className="pagination__link"
                    onClick={this.onPaginate.bind(this, numberPage)}
                >
                    {numberPage}
                </a>
            </li>
        );
    }
}
