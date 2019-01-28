import React from 'react';

const Search = (props) => {
    const onChange = (event) => {
        props.onChange(event.target.value)
    }

    return (
        <span className="search">
            <input type="text" placeholder="search" 
                    value={props.search}  
                    onChange={onChange} />
        </span>
    );
};

export default Search;