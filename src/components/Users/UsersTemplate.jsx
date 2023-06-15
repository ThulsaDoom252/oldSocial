import React from 'react';
import {fetchUsers} from "../../common/commonData";

const UsersTemplate = () => {
    return (
        <div className={"users-page-container"}>
            {fetchUsers}
        </div>
    );
};

export default UsersTemplate;