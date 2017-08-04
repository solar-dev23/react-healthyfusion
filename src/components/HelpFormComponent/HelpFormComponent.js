import React from 'react';

import './HelpFormComponent.scss';

import HelpActions from 'actions/HelpActions.js';

export default class HelpFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            message: ''
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        HelpActions.sendHelp(this.state);
    }

    render() {

        return (
            <form className="help-form-component" onSubmit={this.handleFormSubmit.bind(this)}>
                <div className="modal-component__row">

                    <div className="modal-component__col">
                        <label className="modal-component__label">Your email:</label>
                        <input type="email"
                               required
                               className="modal-component__input modal-component__input--text"
                               value={this.state.email}
                               onChange={(e) => this.setState({email: e.target.value})}
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <div className="modal-component__col">
                        <label className="modal-component__label">Message:</label>
                        <textarea required
                                  className="modal-component__input modal-component__input--textarea"
                                  rows="6"
                                  value={this.state.message}
                                  onChange={(e) => this.setState({message: e.target.value})}
                        />
                    </div>
                </div>

                <div className="modal-component__row">
                    <input type="submit" className="modal-component__submit-btn" value="Send"/>
                </div>
            </form>
        );
    }
}
