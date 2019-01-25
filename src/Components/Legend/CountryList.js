import React from 'react';
import ActiveIcon from "./ActiveIcon"

const CountryList = (props) => {
    const {active, isSearching, countries} = props;

    const toggleActive =(country) =>{ 
        props.toggleActive(country) 
    }

    return (
        <div>
            <div className="countryList">
                { countries.map( (el, index) => {
                    let name = el.name;
                    return(
                        <div className="countryNameList" key={index} onClick={() => {toggleActive(name) }}>
                            <span><ActiveIcon active={el.active} name={el.name}/></span> 
                            <span> {name} </span>
                        </div>
                    )
                }) }
                <hr />
            </div>
        </div>
    )
};

export default CountryList;
