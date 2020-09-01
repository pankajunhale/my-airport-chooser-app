import React from "react";

const TextBoxWidget = (props) => {

    const handleChange = (e) => {
        props.onFilterChange(e.target.value);
    }
    return(
        <React.Fragment>
            <input type="text" onChange={handleChange} className="form-control" placeholder={props.placeholderName}></input>
        </React.Fragment>
    )
}

export default TextBoxWidget