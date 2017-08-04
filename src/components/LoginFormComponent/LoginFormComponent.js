import React from "react";
import { Form } from "formsy-react";
import InputComponent from "components/InputComponent/InputComponent.js";
import ModalComponent from "components/ModalComponent/ModalComponent.js";
import AuthActions from "actions/AuthActions.js";
import "./LoginFormComponent.css";


export default class LoginFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            username: '',
            password: '',
            modal: props.showFailedModal || false
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps) {
            this.setState({
                modal: newProps.showFailedModal
            })
        }
    }

    enableButton() {
        this.setState({
            canSubmit: true
        });
    }

    disableButton() {
        this.setState({
            canSubmit: false
        });
    }

    submit(data) {
        AuthActions.login(data);
    }

    showModal() {
        this.setState({modal: true});
    }

    hideModal() {
        this.setState({modal: false});
        AuthActions.loginFailedReset();
    }

    render() {
        return (
            <Form
                onSubmit={this.submit.bind(this)}
                onValid={this.enableButton.bind(this)}
                onInvalid={this.disableButton.bind(this)}
                className="landing-layout-header__login-block"
            >
                <InputComponent
                    value={this.state.username}
                    placeholder="Username"
                    name="username"
                    validationError="Please enter username"
                    required
                />
                <InputComponent
                    value={this.state.password}
                    placeholder="Password"
                    name="password"
                    type="password"
                    required
                />
                <button type="submit" disabled={!this.state.canSubmit} className="landing-layout-header__go-btn">Go</button>
                <ModalComponent
                    showModal={this.state.modal}
                    onHide={this.hideModal.bind(this)}
                    onShow={this.showModal.bind(this)}
                    type="error"
                >
                <div style={{padding: '1rem'}} className="clearfix">
                        <p> Wrong username or/and password. Please try again</p>

                        
                    </div>
                  
                </ModalComponent>
            </Form>
        );
    }
}