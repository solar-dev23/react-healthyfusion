import React, { PropTypes } from 'react';
import autobind from 'autobind-decorator';

import './InputSelectFormComponent.scss'

@autobind
export default class InputSelectFormComponent extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        onInputValueChange: PropTypes.func,
        inputType: PropTypes.string,
        isRequired: PropTypes.bool,
        options: PropTypes.array,
        inputTitle: PropTypes.string
    };

    onInputValueChange(e) {
        this.props.onInputValueChange(e.target.value);
    }

    render() {
        const { inputValue, isRequired, options, inputTitle } = this.props;

        return (
            <div className="form-group-select">
                {inputTitle && <label>{inputTitle}</label>}

                <select
                    value={inputValue}
                    onChange={this.onInputValueChange}
                    required={isRequired}
                >
                    <option value="" disabled>Select</option>
                    {options.map(option => <option key={option.value} value={option.key}>{option.value}</option>)}
                </select>
            </div>
        );
    }
}
