import React from 'react';

function WallNavbar({0: activeBlock, 1: handleClick}) {
    return (
        <div className={"profile-page-navBar-container"}>
            <button onClick={() => handleClick("Posts")}
                    className={activeBlock === "Posts" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Posts
            </button>
            <button onClick={() => handleClick("Media")}
                    className={activeBlock === "Media" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Media
            </button>
            <button onClick={() => handleClick("Likes")}
                    className={activeBlock === "Likes" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Likes
            </button>
            <button onClick={() => handleClick("Replies")}
                    className={activeBlock === "Replies" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Replies
            </button>
        </div>
    );
}

export default WallNavbar;