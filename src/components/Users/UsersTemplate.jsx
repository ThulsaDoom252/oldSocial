import React from 'react';
import {fetchUsers} from "../../redux/commonSlice";

const UsersTemplate = () => {
    return (
        <div className={"users-page-container"}>
            {fetchUsers}
        </div>
    );
};

export default UsersTemplate;