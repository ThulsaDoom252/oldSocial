import React from 'react';

const Switch = (props) => {
    const {option, setOption, disabled, handleChange} = props
    return (
        <div id="app" className={"switch-container"}>
            <label className="checker">
                <input className="checkbox" disabled={disabled}
                       onClick={() => !option ? setOption(true) : setOption(false)} onChange={handleChange}
                       checked={option}
                       type="checkbox"/>
                <div className="check-bg"></div>
                <div className="checkmark">
                    <svg viewBox="0 0 100 100">
                        <path d="M20,55 L40,75 L77,27" fill="none" stroke="#FFF" strokeWidth="15"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </label>
        </div>

    );
}

export default Switch;