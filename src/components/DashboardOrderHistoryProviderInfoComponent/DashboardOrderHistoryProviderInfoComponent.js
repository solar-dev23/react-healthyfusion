import React from 'react';

import './DashboardOrderHistoryProviderInfoComponent.scss'
import classNames from 'classnames';

export default class DashboardOrderHistoryProviderInfoComponent extends React.Component {

    render() {
        const providerInfo = this.props.providerDetails;

        return (

            <div className="dashboard-history-provider-info-component">
                <table style={{width:'100%'}}>                    
                      <thead className="recent-orders__table-header">
                                <tr className="recent-orders__table-row">
                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                           Order ID<i className="fa fa-sort"/>
                                        </div>
                                    </td>

                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                            Total Products<i className="fa fa-sort"/>
                                        </div>
                                    </td>

                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                            Total Amount<i className="fa fa-sort"/>
                                        </div>
                                    </td>

                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                            Order Date<i className="fa fa-sort"/>
                                        </div>
                                    </td>

                                    <td className="recent-orders__table-cell">
                                        <div className="recent-orders__table-cell-wrapper">
                                            Order Status<i className="fa fa-sort"/>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                    
                     <tbody className="recent-orders__table-body">
                            {providerInfo.map(order => {
                                return (
                                    <tr
                                        className="recent-orders__table-row"
                                        key={order.OrderId}
                                    >
                                        <td className="recent-orders__table-cell">{order.OrderId}</td>
                                        <td className="recent-orders__table-cell">{order.TotalProducts}</td>
                                        <td className="recent-orders__table-cell">{order.TotalAmount}</td>
                                        <td className="recent-orders__table-cell">{order.OrderDate}</td>
                                        <td className="recent-orders__table-cell">{order.OrderStatus}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                </table>
            </div>
        );
    }
}
