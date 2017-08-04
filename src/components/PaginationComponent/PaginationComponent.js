import React from 'react';

import PaginationItemPageComponent from 'components/PaginationItemPageComponent/PaginationItemPageComponent.js';

import './PaginationComponent.scss'

export default class PaginationComponent extends React.Component {
    onPaginate(numberPage) {
        this.props.onPaginate(numberPage);
    }

    render() {
        const { pageNumber, totalCountPage, onPaginate } = this.props;
        const pagesCount = parseFloat(totalCountPage / 10) * 10;

        return (
            <div className="pagination pagination-component">
                <ul className="pagination__page-list">
                    
                    {pageNumber > 3 &&
                    <PaginationItemPageComponent
                        numberPage={1}
                        paginationClass="first"
                        onPaginate={this.onPaginate.bind(this, 1)}
                    />}

                    {pageNumber > 3 && <li>
                        <div className="ellipsis-block">
                            <i className="fa fa-ellipsis-h" aria-hidden="true"/>
                        </div>
                    </li>}

                    {pageNumber > 1 &&
                    <PaginationItemPageComponent
                        numberPage={pageNumber - 1}
                        paginationClass="previous"
                        onPaginate={this.onPaginate.bind(this, pageNumber - 1)}
                    />}


                    <PaginationItemPageComponent
                        numberPage={pageNumber}
                        paginationClass="current"
                    />

                    {pageNumber < pagesCount &&
                    <PaginationItemPageComponent
                        numberPage={pageNumber + 1}
                        paginationClass="next"
                        onPaginate={this.onPaginate.bind(this, pageNumber + 1)}
                    />
                    }

                   
                    
                    {pageNumber > 0 && pageNumber < pagesCount - 1 && <li>
                        <div className="ellipsis-block">
                            <i className="fa fa-ellipsis-h" aria-hidden="true"/>
                        </div>
                    </li>}

                    {pageNumber < pagesCount + 1 &&
                    <PaginationItemPageComponent
                        numberPage={pagesCount + 1}
                        paginationClass="last"
                        onPaginate={this.onPaginate.bind(this, pagesCount + 1)}
                    />}
                </ul>
            </div>
        );
    }
}