import React from 'react';
import ActiveIcon from "./ActiveIcon";
import Search from "./Search";

const CountryList = (props) => {
    const {active, isSearching, countries, onChange, search} = props;

    const toggleActive =(country) =>{ 
        props.toggleActive(country) 
    }

    return (
            <div className="countryList">
                <Search search={search}
                        onChange={onChange} />
                { countries.map( (el, index) => {
                    let name = el.name;
                    return(
                        <div className="countryNameList mobileName" key={index} onClick={() => {toggleActive(name) }}>
                            <span><ActiveIcon active={el.active} name={el.name}/></span> 
                            <span> {name} </span>
                        </div>
                    )
                }) }
                <hr />
            </div>
    )
};

export default CountryList;
