import React from 'react';
import ActiveIcon from "./ActiveIcon"

const Active = (props) => {
    const {active, isSearching, activeCountries} = props;

    const toggleActive =(country) => { 
        props.toggleActive(country);
    }

    if(activeCountries.length && !isSearching){
        return (
            <div className="legendActive"> 
                {activeCountries.map( (el, index) => { 
                    let name = el.name;
                    return(
                    <div className="countryNameList" key={index} onClick={() => {toggleActive(el.name) }}>
                        <span><ActiveIcon active={el.active} name={name} style={{padding:"0px 5px 0px 0px"}}/></span>
                        <span>{name}</span>
                    </div>) 
                })}
                <hr />
            </div>
        )
    } 
    return null;
};

export default Active;
