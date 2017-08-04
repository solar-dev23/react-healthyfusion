import React from 'react';
import Autosuggest from 'react-autosuggest';

import './SearchBarComponent.scss'

export default class SearchBarComponent extends React.Component {
    render() {
        const { suggestions, inputProps } = this.props;

        return (
            <form className="SearchMain search-bar-component"
                  onSubmit={this.props.handleSearchSubmit}
            >
                <div className="Searchlayout">
                    <Autosuggest className="form-control ui-autocomplete-input"
                                 suggestions={suggestions}
                                 onSuggestionsUpdateRequested={this.props.onSuggestionsUpdateRequested}
                                 getSuggestionValue={this.props.getSuggestionValue}
                                 renderSuggestion={this.props.renderSuggestion}
                                 inputProps={inputProps}
                    />
                    <div className="Searchlayout search-button">
                        <button type="submit" className="Button btn btn-info m-l-xs" value='Search'>
                            <i className="fa fa-search" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
