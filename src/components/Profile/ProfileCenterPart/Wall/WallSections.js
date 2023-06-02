import React from 'react';
import ReactionsBar from "./ReactionsBar";

function WallSections({
                          0: name, 1: firstPost, 2: secondPost, 3: largePhoto, 4: defaultAvatar, 5: isPostSectionActive,
                          6: isMediaSectionActive, 7: isLikesSectionActive, 8: isRepliesSectionActive
                      }) {

    const postData = [{name: name, post: firstPost, secondPost: secondPost, largePhoto: largePhoto},
        {name: name, post: secondPost, largePhoto: largePhoto}]
    console.log(postData);
    const plug = "wall-section-container"
    return (
        <div>
            {isPostSectionActive &&
                <div>
                    {postData.map(postData => <div className={"profile-page-post-container"}>
                            <img className="profile-page-post-avatar"
                                 src={postData.largePhoto ? postData.largePhoto : defaultAvatar}
                                 alt="large photo"/>
                            <div className={"profile-page-post-block"}>
                                <p className={"profile-page-post-name"}>{postData.name}</p>
                                <p className={"profile-page-post"}>{postData.post}</p>
                                <ReactionsBar/>
                            </div>
                        </div>
                    )}
                </div>
            }
            {isMediaSectionActive && <div className={plug}>No Media here yet...</div>}
            {isLikesSectionActive && <div className={plug}>No Likes here yet...</div>}
            {isRepliesSectionActive && <div className={plug}>No Replies here yet...</div>}
        </div>

    );
}

export default WallSections;