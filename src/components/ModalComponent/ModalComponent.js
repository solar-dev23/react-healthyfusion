import React from 'react';
import WaveModal from 'boron/WaveModal';
import _ from 'lodash';
import classNames from 'classnames';


import './ModalComponent.scss';

export default class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.showModal) {
            this.showModal();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal) {
            this.showModal();
        } else if (this.props.showModal && !nextProps.showModal) {
            this.hideModal();
        }
    }

    showModal() {
        this.refs.modal.show();
    }

    hideModal() {
        this.refs.modal.hide();
    }

    renderModalHeader() {
        const headerClasses = classNames({
            'modal-component__header': true,
             'transparent':this.props.type == 'transparent',
              'confirm': this.props.type === 'confirm'
        });

        if (this.props.type === 'error') {
            return (
                <div className={headerClasses}>
                    error
                    <button className="modal-component__close-btn" type="button" onClick={this.hideModal.bind(this)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        } 

        else if (this.props.type === 'confirm') {
            return (
                <div className={headerClasses}>
                    
                      {this.props.header}
                </div>
            )
        } 
        else {
            if (this.props.header) {
                return (
                    <div className={headerClasses}>
                        {this.props.header}
                        <button className={this.props.type != 'transparent'? 'modal-component__close-btn': 'close-btn'} type="button" onClick={this.hideModal.bind(this)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            } else {
                return (
                    <div className={headerClasses}>
                        Message to Healthy Fusion
                        <button className={this.props.type != 'transparent'? 'modal-component__close-btn': 'close-btn'} type="button" onClick={this.hideModal.bind(this)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            }
        }
    }

    render() {
        const backdropStyle = {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        };

        const defaultModalStyle = {
            maxWidth: '100%',
            maxHeight: '100%',
        };

        const defaultContentStyle = {
            maxHeight: 'calc(100% - 50px)',
            overflowY: 'auto',
            outline: 'none'
        };
       if (this.props.type === 'confirm') {
            const errorStyles = {
                border: '1px solid #3c763d'
            };

            _.extend(defaultContentStyle, errorStyles)
        }
        const buttonsClasses = classNames({
            'btn': true,
            'btn-success': !Boolean(this.props.type) || this.props.type === 'success' || this.props.type === 'confirm',
            'btn-danger': this.props.type == 'error'
        });
          var divval=this.props.type == 'transparent'?'transparent-modal-container':'modal-component__body';
        return (
            <div className="modal-component">
                <WaveModal
                    ref="modal"
                    onHide={this.props.onHide}
                    onShow={this.props.onShow}
                    backdropStyle={backdropStyle}
                    contentStyle={defaultContentStyle}
                    modalStyle={this.props.modalStyle || defaultModalStyle}
                    closeOnClick={false}
                >
                    {!this.props.hideHeader && this.renderModalHeader()}
                   <div className={divval}>
                        {this.props.children}

                        {!this.props.hideOk && <div className="func-buttons">
                            <span className={buttonsClasses} onClick={this.hideModal.bind(this)}>
                                Ok
                            </span>
                        </div>}
                    </div>
                </WaveModal>
            </div>
        );
    }
}
