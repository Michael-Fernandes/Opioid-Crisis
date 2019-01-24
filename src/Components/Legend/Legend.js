import React, { Component } from 'react'
import Active from "./Active"
import CountryList from "./CountryList"
import "./Legend.css"

const getActive = (countries) => {
    return countries.filter(el => el.active === true)
}

export default class Legend extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSearching: false,
            search:""
        }

        this.toggleActive = this.toggleActive.bind(this);
        this.isSearching = this.isSearching.bind(this);
        this.searchChange = this.searchChange.bind(this)
    }

    toggleActive(country){
        this.props.toggleActive(country);
        this.setState({isSearching:false, search:""})
    }

    isSearching(){
        this.setState({isSearching: ! this.state.isSearching})
    }

    searchChange(event){
        let isSearching = false;
        if(this.state.search.length){
            isSearching = true;
        }
        this.setState({ search: event.target.value, isSearching:isSearching })
    }

    render() {
        let { search, isSearching } = this.state;
        let { countries } = this.props;
        let activeCountries = getActive(countries);

        return (
            <div className="LegendDisplay">
                <div className="Search">
                    <input type="text" placeholder="search" 
                                       value={this.state.search}  
                                       onChange={this.searchChange} />
                </div>
                <Active isSearching={isSearching} 
                        activeCountries={activeCountries}
                        toggleActive={this.toggleActive} />

                <CountryList isSearching={isSearching} 
                             countries={countries} 
                             toggleActive={this.toggleActive}/> 
            </div>
        )
    }
}
