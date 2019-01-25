import React, { Component } from 'react'
import Active from "./Active"
import CountryList from "./CountryList"
import Search from "./Search"
import "./Legend.css"

export default class Legend extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSearching: false,
            search:""
        }

        this.toggleActive = this.toggleActive.bind(this);
        this.isSearching = this.isSearching.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.filterCountries = this.filterCountries.bind(this);
        this.getActive = this.getActive.bind(this);
    }

    getActive(countries){
        return countries.filter(el => el.active === true)
    }

    toggleActive(country){
        this.props.toggleActive(country);
        this.setState({ isSearching:false, search:"" })
    }

    isSearching(){
        this.setState({ isSearching: !this.state.isSearching })
    }

    searchChange(value){
        let isSearching = this.state.search.length ? true : false;
        this.setState({ search: value, isSearching:isSearching })
    }

    filterCountries(countries){
        return countries.filter(elem => elem.name.toLowerCase().search(this.state.search.toLowerCase()) >= 0 )
    }

    render() {
        let { search, isSearching } = this.state;
        let { countries } = this.props;
        let activeCountries = this.getActive(countries);

        return (
            <div className="LegendDisplay">
                <Active isSearching={isSearching} 
                        activeCountries={activeCountries}
                        toggleActive={this.toggleActive} />

                <Search search={search}
                        onChange={this.searchChange} />

                <CountryList isSearching={isSearching} 
                             countries={this.filterCountries(countries)} 
                             toggleActive={this.toggleActive} /> 
            </div>
        )
    }
}
