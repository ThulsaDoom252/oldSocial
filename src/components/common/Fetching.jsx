import React from "react";
import loading from "./loader.gif";

let Fetching = (props) => {
    return <div className={"fetching-container"}>
        {props.isFetching ? <img className={"fetching"} src={loading} alt={'loading'}/> : null}
    </div>

}

export default Fetching