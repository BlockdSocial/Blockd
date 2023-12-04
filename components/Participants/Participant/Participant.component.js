import React from "react";
import Card from "../../Shared/Card/Card.component";
import { CiMicrophoneOff } from "react-icons/ci";

export const Participant = (props) => {
  const {
    curentIndex,
    currentParticipant,
    hideVideo,
    videoRef,
    showAvatar,
    currentUser,
  } = props;
  console.log('showAvatarvideo showAvatar',showAvatar)

  if (!currentParticipant) return <> </>;

  return (
    <div className={`participant ${hideVideo ? "hide" : ""}`}>
      <Card>
        <video
          ref={videoRef}
          className={!showAvatar ? "hidden" : "video"}
          id={`participantVideo${curentIndex}`}
          //style={showAvatar ? "display:none" : "display:block"}
          autoPlay
          playsInline
        ></video>{" "}
        {!currentParticipant.audio && <CiMicrophoneOff />}{" "}
        {showAvatar && (
          <div
            style={{ background: currentParticipant.avatarColor }}
            className="avatar"
          >
            {currentParticipant.name[0]}{" "}
          </div>
        )}{" "}
        <div className="name">
          {" "}
          {currentParticipant.name} {currentUser ? "(You)" : ""}{" "}
        </div>{" "}
      </Card>{" "}
    </div>
  );
};
