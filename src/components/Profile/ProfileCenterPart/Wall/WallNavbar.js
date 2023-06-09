import React from 'react';

const WallNavbar = ({0: activeBlock, 1: handleClick}) => {
    return (
        <div className={"profile-page-navBar-container"}>
            <button onClick={() => handleClick("Posts")}
                    className={activeBlock === "Posts" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Posts
            </button>
            <button
                disabled={true}
                onClick={() => handleClick("Media")}
                className={activeBlock === "Media" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Media
            </button>
            <button onClick={() => handleClick("Likes")}
                    disabled={true}
                    className={activeBlock === "Likes" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Likes
            </button>
            <button onClick={() => handleClick("Replies")}
                    disabled={true}
                    className={activeBlock === "Replies" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Replies
            </button>
        </div>
    );
}

export default WallNavbar;