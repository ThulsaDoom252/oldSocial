import React from 'react';

function ProfilePageInput(props, {...handleChange}) {
    return (
        <input className="profile-page-input"
               id={props.id}
               autoFocus={true}
               onBlur={() => {
                   props.handleSubmit()
                   props.editMode(props.state, props.changeState)
               }}
               type="text" value={props.value}
               onChange={handleChange}/>
    );
}

export default ProfilePageInput;