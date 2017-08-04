import React, { PropTypes } from 'react';
import autobind from 'autobind-decorator';

import './InputFormComponent.scss'

@autobind
export default class InputFormComponent extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        onInputValueChange: PropTypes.func,
        inputType: PropTypes.string,
        isRequired: PropTypes.bool,
        inputTitle: PropTypes.string,
        inputName: PropTypes.string,
        isChecked: PropTypes.bool,
        inputPattern: PropTypes.string
    };

    handleValueChange(e) {
        const { onInputValueChange, inputType } = this.props;

        if ( onInputValueChange ) {
            inputType === 'checkbox' ? onInputValueChange(e) : onInputValueChange(e.target.value);
        }
    }

    render() {
        const { inputValue, inputTitle, isRequired, inputType, inputName, disabled, isChecked, inputPattern } = this.props;

        return (
            <div className="form-group">

                
             <label>{inputTitle}</label>
                <input
                    type={inputType}
                    value={inputValue}
                    onChange={this.handleValueChange}
                    required={isRequired}
                    name={inputName}
                    disabled={disabled}
                    checked={isChecked}
                    pattern={inputPattern}
                />
               
            </div>
        );
    }
}
