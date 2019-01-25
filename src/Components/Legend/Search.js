import React from 'react';

const Search = (props) => {
    const onChange = (event) => {
        props.onChange(event.target.value)
    }

    return (
        <div className="search">
            <input type="text" placeholder="search" 
                    value={props.search}  
                    onChange={onChange} />
        </div>
    );
};

export default Search;