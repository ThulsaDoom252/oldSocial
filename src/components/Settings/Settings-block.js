import React from 'react';
import Switch from "./Switch";

const SettingsBlock = ({label, option, setOption, disabled, className}) => {
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