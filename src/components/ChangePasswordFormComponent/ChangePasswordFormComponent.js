import React from 'react';

import connectToStores from 'alt/utils/connectToStores';

import AuthActions from 'actions/AuthActions.js';
import AuthStore from 'stores/AuthStore';

import './ChangePasswordFormComponent.scss'

@connectToStores
export default class ChangePasswordFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
            newPasswordError: false,
            changeSuccess: false,
            passwordvalidationerror:false
        }
    }

    static getStores() {
        return [AuthStore];
    }

    static getPropsFromStores() {
        return {
            ...AuthStore.getState()
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.changePasswordSuccess && (this.props.changePasswordSuccess != newProps.changePasswordSuccess)) {
            this.handlePasswordChangedSuccess();
        }
    }

    handleNewPassChange(e) {
        this.setState({
            newPassword: e.target.value
        });

        this.resetNewPasswordError();
         if(e.target.value.length<8)
          {
         this.setState({
                passwordvalidationerror: true
            });
        
          }

        
    }

    handleNewPassConfirmChange(e) {
        this.setState({
            newPasswordConfirm: e.target.value
        });

       // this.resetNewPasswordError();
    }

    resetNewPasswordError() {
     
            this.setState({
                newPasswordError: false,
                passwordvalidationerror:false
            });
        
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if (this.state.newPassword === this.state.newPasswordConfirm) {
            AuthActions.changePassword({newPassword: this.state.newPassword, oldPassword: this.state.oldPassword});
        } else {
            this.setState({
                newPasswordError: true
            });
        }
    }

    handlePasswordChangedSuccess() {
        const self = this;
        this.setState({
            changeSuccess: true
        });

        setTimeout(function () {
            self.props.onSuccess();
        }, 2000);
    }

    render() {
        return (
            <form className="change-password-form-component" onSubmit={this.handleFormSubmit.bind(this)}>
                {this.state.changeSuccess && <div className="success">Password successfully changed</div>}
                {this.state.newPasswordError && <div className="error">New password and password confirm does not match</div>}
                {this.props.changePasswordErrors && <div className="error">{this.props.changePasswordErrors.responseJSON.Message}</div>}
     {this.state.passwordvalidationerror && <div className="success">Password should be minimum 8 characters with use of an uppercase alphabet, a lowercase alphabet, and a number</div>}
                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <label className="modal-component__label">Old password:</label>
                        <input type="password"
                               required
                               className="modal-component__input modal-component__input--text"
                               value={this.state.oldPassword}
                               autoComplete="off"
                               onChange={(e) => this.setState({oldPassword: e.target.value})}
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <label className="modal-component__label">New password:</label>
                        <input type="password"
                               required
                               className="modal-component__input modal-component__input--text"
                               pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
                               value={this.state.newPassword}
                               autoComplete="off"
                               onChange={this.handleNewPassChange.bind(this)}
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <label className="modal-component__label">Confirm new password:</label>
                        <input type="password"
                               required
                               className="modal-component__input modal-component__input--text"                             
                               value={this.state.newPasswordConfirm}
                               autoComplete="off"
                               onChange={this.handleNewPassConfirmChange.bind(this)}
                        />
                    </div>
                </div>


                <div className="modal-component__row">
                    <input type="submit" value="Submit" className="modal-component__submit-btn"/>
                </div>
            </form>
        );
    }
}
