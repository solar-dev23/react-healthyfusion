import React, { Component } from 'react';
import { Link } from 'react-router';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
import DashboardSearchPageStore from 'stores/DashboardSearchPageStore';
import DashboardSearchPageActions from 'actions/DashboardSearchPageActions';
import SearchBarComponent from 'components/SearchBarComponent/SearchBarComponent.js';
import Routes from 'routes.js';

import './DashboardSearchPage.scss';

@connectToStores
export default class DashboardSearchPage extends Component {
    constructor() {
        super();

        this.state = {
            searchIn: 'NutrientAnalyzer',
            searchInputValue: '',
            suggestions: this.getSuggestions('')
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.onSearchInChanged = this.onSearchInChanged.bind(this);
        this.handleClickMonograph =this.handleClickMonograph.bind(this);
    }

    componentDidMount() {
        DashboardSearchPageActions.clearSearchResult();
        DashboardSearchPageActions.getMedications();
        DashboardSearchPageActions.getAllSearchData();
    }

    static getStores() {
        return [DashboardSearchPageStore];
    }

    static getPropsFromStores() {
        return {
            ...DashboardSearchPageStore.getState()
        }
    }

    onSearchInChanged(e) {
        this.setState({
            searchIn: e.currentTarget.value,
            suggestions: this.getSuggestions(''),
            searchInputValue: ''
        });
        this.props.searchResults='';
    }

    searchInSelection() {
        const medicationClassName = classNames({
            'medications-btn': true,
            'search-active': this.state.searchIn === 'NutrientAnalyzer'
        });

        const symptomsClassName = classNames({
            'symptoms-btn-block': true,
            'search-active': this.state.searchIn !== 'NutrientAnalyzer'
        });

        return (
            <section>
                <form className="search-btn-nav">
                    <label className={medicationClassName}
                           htmlFor="nutrientAnalyzer" >

                        MEDICATIONS ANALYZER

                        <input type='radio' name='searchIn' id="nutrientAnalyzer" onChange={this.onSearchInChanged} checked={this.state.searchIn === 'NutrientAnalyzer'} value='NutrientAnalyzer'/>
                    </label>

                    <div className={symptomsClassName}>
                        <label className="clinical-btn" htmlFor="conditions">
                            CLINICAL APPLICATIONS
                        </label>

                        <div className="clinical-nav">
                            <ul>
                                <li className="styled-input">
                                    <input className="checked-input" type='radio' name='searchIn' id="conditions" onChange={this.onSearchInChanged} checked={this.state.searchIn === 'Conditions'} value='Conditions'/>
                                    <label htmlFor="conditions" className="clinical-nav-name">Conditions</label>
                                </li>
                                <li className="styled-input">
                                    <input className="checked-input" type='radio' name='searchIn' id="nutrientsHerbal" onChange={this.onSearchInChanged} checked={this.state.searchIn === 'NutrientsHerbal'} value='NutrientsHerbal'/>
                                    <label htmlFor="nutrientsHerbal" className="clinical-nav-name">Nutrients & Herbal Therapies</label>

                                </li>
                                <li className="styled-input">
                                    <input className="checked-input" type='radio' name='searchIn' id="labTest" onChange={this.onSearchInChanged} checked={this.state.searchIn === 'LabTest'} value='LabTest'/>
                                    <label htmlFor="labTest" className="clinical-nav-name">Lab Tests</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </form>
            </section>
        )
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const { searchIn } = this.state || '';
        let updatedSearchIn = null;


        if (searchIn && searchIn === 'NutrientAnalyzer') {
            updatedSearchIn = this.props.medications
        } else if (searchIn && searchIn === 'Conditions'){
            updatedSearchIn = this.props.conditions
        } else if (searchIn && searchIn === 'NutrientsHerbal'){
            updatedSearchIn = this.props.nutritions
        } else if ( searchIn &&   searchIn === 'LabTest') {
            updatedSearchIn = this.props.labTests
        } else if ( searchIn &&   searchIn === 'Symbols') {
            updatedSearchIn = this.props.symbols
        }

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
        console.log(newValue)
        this.setState({
            searchInputValue: newValue
        });
    }

    onSuggestionsUpdateRequested({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        DashboardSearchPageActions.searchNutrition(this.state.searchIn, this.state.searchInputValue);
    }

    searchBar() {
        const { searchInputValue, suggestions, searchIn } = this.state;
        const inputProps = {
            placeholder: '',
            value: searchInputValue,
            onChange: this.handleSearchInputChange
        };

        if (searchIn === 'NutrientAnalyzer') {
            inputProps.placeholder = 'Search medications';

        } else if (searchIn === 'Conditions') {
            inputProps.placeholder  = 'Search conditions' ;
        } else if (searchIn === 'NutrientsHerbal') {
            inputProps.placeholder  = 'Search nutrients or herbs' ;
        } else if (searchIn === 'LabTest') {
            inputProps.placeholder  = 'Search lab tests' ;
        } else if (searchIn === 'Symbols') {
            inputProps.placeholder  = 'Search symbols' ;
        }

        return (
            <SearchBarComponent
                suggestions={suggestions}
                inputProps={inputProps}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                handleSearchSubmit={this.handleSearchSubmit}
            />
        )
    }
    handleClickMonograph(Nutritent)
    {
      let TypeID=0
         if (this.state.searchIn === 'NutrientAnalyzer') {
            TypeID = 1;

        } else if (this.state.searchIn === 'Conditions') {
            TypeID = 3;
        } else if (this.state.searchIn === 'NutrientsHerbal') {
           TypeID = 2;
        } else if (this.state.searchIn === 'LabTest') {
           TypeID = 4;
        } 

        let monoID=Nutritent.split('/').join(' ')+':'+TypeID;
         appHistory.push(Routes.dashboardSearchPageMono.replace(':monoID', monoID));
       //  appHistory.push(Routes.dashboardSearchPageMono.replace(':TypeID', TypeID));
    }

    searchResults() {
        return (
            <div>
                {this.props.searchResults.map(result => {
                    return (
                        <div title="Click here for more information" 
                        className="monodiv" 
                         onClick={this.handleClickMonograph.bind(this, result.Nutritent)} 
                        tabIndex={result.Nutritent} key={result.Nutritent}>
                          
                               
                                {result.Nutritent} 
                             
                            
                        </div>
                    )
                })}
            </div>
        )
    }

    noResults() {
        const {searchIn } = this.state;
        if (searchIn === 'NutrientAnalyzer') {
            return (<div className="divvalstyle">No nutrients found for this medication</div>)
        }  else if (searchIn === 'Conditions') {
            return (<div className="divvalstyle">No nutrients found for this condition</div>)
        }
        else if (searchIn === 'NutrientsHerbal') {
            return (<div className="divvalstyle">No nutrients found for this nutrient or Herb name</div>)
        }
        else if (searchIn === 'LabTest') {
            return (<div className="divvalstyle">No nutrients found for this lab test</div>)
        }
    }

    render() {
        const { monographData, selectedMonographSection, searchResults, noResults, children, params } = this.props;

        return (
            <div className="dashboard-search-page">
                {!params.monoID && <div>
                    {this.searchInSelection()}
                    {this.searchBar()}
                    {searchResults.length > 0 && this.searchResults()}
                    {noResults && this.noResults()}
                </div>}

                {children && React.cloneElement(children, {
                    monographData: monographData,
                    selectedMonographSection: selectedMonographSection
                })}
            </div>
        );
    }
}