import React from 'react';
import colors from '../../Resources/colors.json'

const ActiveIcon = (props) => {
    let style = props.active ? {'fill':colors[props.name],  ...props.style} : null;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" className="dot" style={style}>
            <circle cx="10" cy="10" r="10"/>
        </svg>
    );
};

export default ActiveIcon;