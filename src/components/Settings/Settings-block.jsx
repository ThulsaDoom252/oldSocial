import React from 'react';
import Switch from "./Switch";
import {AiOutlineInfoCircle} from "react-icons/ai";

const SettingsBlock = ({label, option, setOption, disabled, className, title, toggleInfo, handleChange}) => {
    return (
        <div className={"settings-block"}>
            <div className={`sbl ${className}`}>
                <span className={"settings-block-label"}>
                    {toggleInfo && <AiOutlineInfoCircle title={title} className={"settings-block-info"}/>}{label}</span>
            </div>
            <div className={`sbs ${className}`}>
                <button><Switch {...{option, setOption, disabled, handleChange}}/></button>
            </div>
        </div>
    );
}

export default SettingsBlock;