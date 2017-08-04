import React, { Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';

import DashboardHandoutPageStore from 'stores/DashboardHandoutPageStore'
import DashboardHandoutPageActions from 'actions/DashboardHandoutPageActions';
import classNames from 'classnames';
import SearchBarComponent from 'components/SearchBarComponent/SearchBarComponent.js';
import './DashboardHandoutPage.scss';

@connectToStores
export default class DashboardHandoutPage  extends Component {
    constructor() {
        super();
        this.flag=0;

        this.state = {
            searchInputValue: '',
            suggestions: this.getSuggestions('')
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
        this.handleSearchSubmit=this.handleSearchSubmit.bind(this);
    }
    componentDidMount() {
        DashboardHandoutPageActions.getDashboardHandoutpdf();
    }

    static getStores() {
        return [DashboardHandoutPageStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardHandoutPageStore.getState()
        }
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let updatedSearchIn = null;

        if(this.props)
            updatedSearchIn = this.props.productDataAll;


        return inputLength === 0 ? [] : updatedSearchIn.filter(element =>
            element.Name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    getSuggestionValue(suggestion) { // when suggestion is selected, this function tells
        return suggestion.Name;                 // what should be the value of the input
    }

    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.Name}</span>
        );
    }

    handleSearchInputChange(event, { newValue }) {
        this.setState({
            searchInputValue: newValue
        });
    }

    onSuggestionsUpdateRequested({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }
    handleSearchSubmit(e) {
        if(this.state.searchInputValue){
        e.preventDefault();      
        DashboardHandoutPageActions.getDashboardHandoutpdf(this.state.searchInputValue);      
        this.flag=1;
    }
    else{
         this.flag=0;
    }

    }



    searchBar() {

        const { searchInputValue,suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search handouts',
            value: searchInputValue,
            onChange: this.handleSearchInputChange
        };

        return (
           <SearchBarComponent
               suggestions={suggestions}
               inputProps={inputProps}
               getSuggestionValue={this.getSuggestionValue}
               renderSuggestion={this.renderSuggestion}
               onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}

                handleSearchSubmit={this.handleSearchSubmit}/>

        )
    }
    searchResults() {

        const { handoutPdf ,productDataAll} = this.props;

        return (
            <div className="dashboard-patients-page">
                <table>
                    <thead>
                    <tr className="tr-title">
                        <td>
                            <div className="td-title">
                                Name  <i className="fa fa-sort"/>
                            </div>
                        </td>
                       

                      <td>
                            <div className="td-title">
                                Name  <i className="fa fa-sort"/>
                            </div>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {handoutPdf.map((pdf, i) => {
                        const trClassName = classNames({
                            'tr-2': i % 2 === 0,
                            'tr-1': i % 2 !== 0,
                        });
                        const divvalue=pdf.Url!=null? 'viewdiv' : 'viewnone';
                       
                        return (
                            <tr
                                key={pdf.id}
                                className={trClassName}
                            >
                                <td><a href={pdf.Url} target='_blank'>{pdf.Name}</a></td>
                                <td className={divvalue}><a href={pdf.Url} target='_blank'>View</a></td>
                              
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {

        return (
            <div className="dashboard-search-page">
                {this.searchBar()}
                {this.flag===1?this.searchResults():''}
            </div>
        );
    }
}