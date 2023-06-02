import React, {useEffect, useState} from 'react';
import {fetchUiSpin} from "../../../redux/commonSlice";

const Status = ({0: propStatus, 1: isCurrentUser, 2: updateStatus, 3: fetchStatusData}) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(propStatus)
    const lengthError = status !== null && status.length > 300
    const changeStatus = (e) => {
        setStatus(e.currentTarget.value)
    }
    const white = {"background-color": "white"}
    useEffect(() => {
        setStatus(propStatus)
    }, [propStatus])
    const toggleEditMode = () => {
        if (editMode) {
            setEditMode(false)
            updateStatus(status)
        } else if (!editMode && isCurrentUser) {
            setEditMode(true)
        }
    }

    // STYLE REFS
    const pointerCursor = {
        cursor: isCurrentUser ? "pointer" : "default"
    }
    return (
        <div className="status-wrapper">
            <p hidden={!lengthError} style={{"color": "red"}}>Status length can't exceed 300 characters!</p>
            <div className="status-container">
                {fetchStatusData ? <p>{fetchUiSpin}</p> : editMode && !fetchStatusData ? <input style={white}
                                                                                                autoFocus={true}
                                                                                                onBlur={toggleEditMode}
                                                                                                onChange={changeStatus}
                                                                                                type={"text"}
                                                                                                value={status}/> :
                    <p style={pointerCursor} className="status"
                       onClick={toggleEditMode}>{propStatus || "No Status"}</p>}
            </div>
        </div>
    );
}

export default Status;