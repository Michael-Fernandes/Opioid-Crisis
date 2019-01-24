import React from 'react';
import colors from '../../Resources/colors.json'

const ActiveIcon = (props) => {
    let style;
    if(props.active){
        style = { 
                    'fill':colors[props.name], 
                    ...props.style //hack to fix active spacing
                }
        console.log(style);
    }

    if(props.active){
        console.log("styled");
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" className="dot" style={style}>
            <circle cx="12" cy="12" r="12"/>
        </svg>
    );
};


export default ActiveIcon;