import React from 'react';

function Switch(props) {
    const {option, setOption, disabled} = props
    return (
        <div id="app" className={"switch-container"}>
            <label className="checker">
                <input className="checkbox" disabled={disabled} onClick={() => !option ? setOption(true) : setOption(false)} checked={option} type="checkbox"/>
                <div className="check-bg"></div>
                <div className="checkmark">
                    <svg viewBox="0 0 100 100">
                        <path d="M20,55 L40,75 L77,27" fill="none" stroke="#FFF" stroke-width="15"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </label>
        </div>

    );
}

export default Switch;