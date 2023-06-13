import React from 'react';

const Gallery = ({handleOverlay, photos, nightMode}) => {
    return (
        <div style={nightMode ? nightModeStyles.centerBlock : null} className={"gallery-container"}>
            <p className={"gallery-photo-label"}>Your photos:</p>
            <div className={"gallery-photos-block"}>
                {photos.map((photo, index) => <div className={"photo-block"}><img
                    onClick={() => handleOverlay(index)}
                    className={"photo"} src={require(`../../redux/profile/${photo}`)} alt={`photo${index}`}/></div>)}
            </div>
            <div className={"gallery-footer"}></div>
        </div>
    );
};

export default Gallery;