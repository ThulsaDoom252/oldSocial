import React from 'react';
import {fetchUiSpin} from "../../../common/commonData";

const Status = ({statusProps}) => {
    const [status, statusEditMode, statusValue, statusLengthError, handleChangeStatus, toggleStatusEdit,
        pointerCursor, fetchStatusData, statusDataUploadStatus] = statusProps

    return (
        <div className="status-wrapper">
            <p hidden={!statusLengthError || !statusEditMode} style={{"color": "red"}}>Status length can't exceed 300
                characters!</p>
            <div className={`status-container ${statusDataUploadStatus && "status-container-data-uploaded"}`}>
                {fetchStatusData ? <p>{fetchUiSpin}</p> : statusEditMode && !fetchStatusData ?
                    <input className={'status-input'}
                           autoFocus={true}
                           onBlur={toggleStatusEdit}
                           onChange={handleChangeStatus}
                           type={"text"}
                           value={statusValue}/> :
                    <p style={pointerCursor} className="status"
                       onClick={toggleStatusEdit}>{status || "No Status"}</p>}
            </div>
        </div>
    );
}

export default Status;

