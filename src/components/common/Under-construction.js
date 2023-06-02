import React from 'react';
import construction from "./construction.gif"

function UnderConstruction(props) {
    return (
        <div className={"under-construction-container"}>
                <img src= {construction} alt="under-construction"/>
        </div>
    );
}

export default UnderConstruction;