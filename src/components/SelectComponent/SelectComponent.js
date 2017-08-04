import React from 'react';
import Formsy from 'formsy-react';

const MySelect = React.createClass({
    mixins: [Formsy.Mixin],

    getInitialState() {
        return {
            selectValue: 0
        }
    },

    changeValue(event) {
        console.log(event.currentTarget.value);
        this.props.changeSelectValue(event.currentTarget.value);

        // this.setState({selectValue: event.currentTarget.value});
    },

    componentWillReceiveProps(newProps) {
        newProps.value && this.setState({ selectValue: newProps.value.key });
    },

    render() {
        const className = 'form-group' + (this.props.className || ' ') +
            (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
        const errorMessage = this.getErrorMessage();

        const options = this.props.options.map((option, i) => (
            <option key={option.key+option.value} value={option.key}>
                {option.value}
            </option>
        ));

        return (
            <div className={className}>
                <label htmlFor={this.props.name}>{this.props.title}</label>
                <select name={this.props.name} onChange={this.changeValue} value={this.state.selectValue} className={this.props.selectClassName}>
                    <option value="select">Select</option>
                    {options}
                </select>
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }

});

export default MySelect;