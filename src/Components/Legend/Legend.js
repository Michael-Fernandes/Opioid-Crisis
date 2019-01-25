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
        this.filterCountries = this.filterCountries.bind(this)
    }

    toggleActive(country){
        this.props.toggleActive(country);
        this.setState({ isSearching:false, search:"" })
    }

    isSearching(){
        this.setState({ isSearching: !this.state.isSearching })
    }

    searchChange(event){
        let isSearching = this.state.search.length ? true : false;
        this.setState({ search: event.target.value, isSearching:isSearching })
    }

    filterCountries(countries){
        return countries.filter(elem => elem.name.toLowerCase().search(this.state.search.toLowerCase()) >= 0 )
    }

    render() {
        let { search, isSearching } = this.state;
        let { countries } = this.props;
        let activeCountries = getActive(countries);
        window.c = countries;
        return (
            <div className="LegendDisplay">
                
                <Active isSearching={isSearching} 
                        activeCountries={activeCountries}
                        toggleActive={this.toggleActive} />
                <div className="search">
                    <input type="text" placeholder="search" 
                                       value={this.state.search}  
                                       onChange={this.searchChange} />
                </div>
                
                <CountryList isSearching={isSearching} 
                             countries={this.filterCountries(countries)} 
                             toggleActive={this.toggleActive}/> 
            </div>
        )
    }
}
