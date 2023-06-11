import React from 'react';
import initializing from "./common/initializing2.gif"

const Initialize = () => {
    return (
        <div className={'container'}>
            <div className={"initializing-image"}>
                <img src={initializing} alt="app is initializing"/>
            </div>
        </div>


    );
}

export default Initialize;