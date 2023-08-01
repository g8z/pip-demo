import React, { useState, useRef } from 'react';

const VideoPlayer = () => {
    // State to track whether Picture-in-Picture (PIP) mode is enabled
    const [isPipEnabled, setIsPipEnabled] = useState(false);

    // Ref to reference the video element in the DOM
    const videoRef = useRef(null);

    // Function to handle the button click for toggling PIP mode
    const handleClick = () => {
        if (document.pictureInPictureElement) {
            // If PIP mode is already enabled, exit PIP mode
            document.exitPictureInPicture().then(() => {
                // Set the state to indicate that PIP mode is disabled
                setIsPipEnabled(false);
            }).catch((error) => {
                console.error('Error while exiting PIP:', error);
            });
        } else {
            // If PIP mode is not enabled, request entering PIP mode
            videoRef.current
                .requestPictureInPicture()
                .then(() => {
                    // Set the state to indicate that PIP mode is enabled
                    setIsPipEnabled(true);
                })
                .catch((error) => {
                    console.error('Error while entering PIP:', error);
                });
        }
    };

    return (
        <div style={{ width: '500px', height: '300px' }}>
            <h2>Local Video</h2>
            {/* Video element with a reference to the videoRef */}
            <video ref={videoRef} width="100%" height="100%" controls>
                <source src='/sample.mp4' type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Button to toggle PIP mode */}
            <button style={{ cursor: "pointer", fontSize: "large" }} onClick={handleClick}>
                {isPipEnabled ? 'Exit PIP' : 'Use PIP'}
            </button>
        </div>
    );
};

export default VideoPlayer;
