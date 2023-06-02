import React, {useEffect, useState} from 'react';
import Switch from "./Switch";

function SettingsBlock(props) {
    const {label, option, setOption, disabled, className} = props

    return (
        <div className={"settings-block"}>
            <div className={`sbl ${className}`}>
                <span className={"settings-block-label"}>{label}</span>
            </div>
            <div className={`sbs ${className}`}>
                <button><Switch option={option} setOption={setOption} disabled={disabled}/></button>
            </div>
        </div>
    );
}

export default SettingsBlock;