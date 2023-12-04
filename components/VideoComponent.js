import React, { useEffect, useState, useRef } from 'react';

const VideoComponent = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{backgroundColor: "black"}}
        />
    );
};

export default VideoComponent;
