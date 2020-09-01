import React from "react";

const DropdownWidget = (props) => {
    return(
        <div>
             { props.data.map((item,i)=>
                <div className={`dropdown-item`} key={i}>
                    <div className="row">
                        <div className="col-8"><strong>{item.name}</strong></div>
                        <div className="col-4"><span className="badge badge-pill badge-danger">{item.code}</span></div>
                    </div>
                    <div className="row">
                        <div className="col-8">{item.city}</div>
                        <div className="col-4">{item.country}</div>
                    </div>
                    <div className="dropdown-divider"></div>
                </div>
             )}
        </div>
    )
}

export default DropdownWidget