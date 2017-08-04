import React from 'react';

import './DashboardSortingComponent.scss';
import SearchBarComponent from 'components/SearchBarComponent/SearchBarComponent.js';
// import SearchBarComponent from 'components/SearchBarComponent/SearchBarComponent.js';

export default class DashboardSortingComponent extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            category: true,
            searchitem :'',
            
        };
    }


    changeValue(event) {
        var option=event.currentTarget.value;       
        this.props.changeSelectValue(option);
    }
    handlechangeAtoZ(e){
        var Searchtext=e.currentTarget.value;       
        this.props.handlechangeAtoZ(Searchtext);
    }
    
    render() {
 

  const options = this.props.options.map((option, i) => (
            <option key={option.key+option.value} value={option.key}>
                {option.value}
            </option>
        ));
        return (
            <div className="dashboard-sorting-component">

                {/* <SearchBarComponent/> */}

                <div className="dashboard-sorting-component__select-wrapper">
                    <select onChange={this.handlechangeAtoZ.bind(this)} name="dashboard-sorting-component__filter-by-name" id="dashboard-sorting-component__filter-by-name" className="dashboard-sorting-component__select-input">
                        <option selected="selected" value="">Filter by A-Z</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="J">J</option>
                        <option value="K">K</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                        <option value="O">O</option>
                        <option value="P">P</option>
                        <option value="Q">Q</option>
                        <option value="R">R</option>
                        <option value="S">S</option>
                        <option value="T">T</option>
                        <option value="U">U</option>
                        <option value="V">V</option>
                        <option value="W">W</option>
                        <option value="X">X</option>
                        <option value="Y">Y</option>
                        <option value="Z">Z</option>
                    </select>
                </div> 
                <div className="dashboard-sorting-component__select-wrapper" style={{display:this.state.category?'':'none'}}>
                 <select name="dashboard-sorting-component__filter-by-parameter" id="dashboard-sorting-component__filter-by-parameters" className="dashboard-sorting-component__select-input" onChange={this.changeValue.bind(this)}>
                        <option value="select">Filter by Category</option>
                    {options}    
                    </select>
                       
                </div>
            </div>
        );
    }
}
