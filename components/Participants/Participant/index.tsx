import React from "react";
import Card from "../../Shared/Card/Card.component";
import { CiMicrophoneOff } from "react-icons/ci";

interface Props {
  curentIndex: any;
  currentParticipant: any;
  hideVideo: any;
  videoRef: any;
  showAvatar: any;
  currentUser: any;
}
function Participant({
  curentIndex,
  currentParticipant,
  hideVideo,
  videoRef,
  showAvatar,
  currentUser,
}: Props) {
  console.log("showAvatarvideo showAvatar", currentParticipant);

  if (!currentParticipant) return <> </>;

  return (
    <div className={`participant ${hideVideo ? "hide" : ""} `}>
      <Card>
        <video
          ref={videoRef}
          className={!currentParticipant.video ? "hidden" : "video"}
          id={`participantVideo${curentIndex}`}
          //style={showAvatar ? "display:none" : "display:block"}
          autoPlay
          playsInline
        ></video>{" "}
        {!currentParticipant.audio && <CiMicrophoneOff className={"mute"} />}{" "}
        {!currentParticipant.video && (
          <div className="participant-avatar">
            <div
              style={{ background: currentParticipant.avatarColor }}
              className="avatar"
            >
              {" "}
              {currentParticipant.name[0]}{" "}
            </div>
          </div>
        )}{" "}
        <div className="name">
          {" "}
          {currentParticipant.name} {currentUser ? "(You)" : ""}{" "}
        </div>
      </Card>
    </div>
  );
}
export default Participant;
