import React from 'react';
import ActiveIcon from "./ActiveIcon"

const Active = (props) => {
    const {active, isSearching, activeCountries} = props;

    const toggleActive =(country) => { 
        props.toggleActive(country);
    }

    return (
        <div className="legendActive"> 
            <p className="legendTitle mobileName">Legend </p>
            { activeCountries.length && !isSearching 
                ? activeCountries.map( (el, index) => { 
                    let name = el.name;
                    return(
                        <div className="countryNameList mobileName" key={index} onClick={() => {toggleActive(el.name) }}>
                            <span><ActiveIcon active={el.active} name={name} style={{padding:"0px 5px 0px 0px"}}/></span>
                            <span>{name}</span>
                        </div>
                    ) 
                })
            : null}
            <hr className="mobileName"/>
        </div>
    )
};

export default Active;
