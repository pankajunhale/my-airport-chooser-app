import React from "react";

const ButtonWidget = (props) => {

    const handleClick = (e)=>{
        props.onLoadAirports();
    }
    return(
        <React.Fragment>
            <button onClick={handleClick} className={`btn btn-warning ${props.myClass}`}>{props.title}</button>     
        </React.Fragment>
    )
}

export default ButtonWidget