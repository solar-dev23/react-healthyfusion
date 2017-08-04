import React from 'react';

import './DashboardDocumentProviderInfoComponent.scss'
import classNames from 'classnames';

export default class DashboardDocumentProviderInfoComponent extends React.Component {

    render() {
      const providerInfo = this.props.providerDetails;

        return (
            <div className="dashboard-document-provider-info-component">
                {<table className="dashboard-document-provider-info-component__table">
                    <thead className="dashboard-document-provider-info-component__table-heading">
                    <tr>
                        <td>
                            <div>
                                ID <i className="fa fa-sort"/>
                            </div>
                        </td>
                        <td>
                            <div>
                                File Name <i className="fa fa-sort"/>
                            </div>
                        </td>
                        <td>
                            <div>
                                Created Date <i className="fa fa-sort"/>
                            </div>
                        </td>

                        <td />
                    </tr>
                    </thead>
                    <tbody className="dashboard-document-provider-info-component__table-body">
                        {providerInfo.map((doc, i) => {
                            return (
                                <tr key={doc.ID}>
                                    <td>{doc.ID}</td>
                                    <td>{doc.FileName}</td>
                                    <td>{doc.CreatedDate}</td>
                                    <td className='table-item'>
                                        <i className="fa fa-trash-o" aria-hidden="true"/>
                                        <i className="fa fa-download" aria-hidden="true"/>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>}
            </div>
        );
    }
}
