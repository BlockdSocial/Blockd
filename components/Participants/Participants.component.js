import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Participant } from "./Participant/Participant.component";
import { isEmpty } from "lodash";

// interface Props {
//   participants: Object;
//   currentUser:any
//   stream:any
// }
const Participants = ({participants,currentUser,stream}) => {
  const videoRef = useRef(null);
  console.log(participants, 'currentParticipant');
  let showAvatarvideo = true
  if(!isEmpty(participants) && !isEmpty(participants[currentUser.id])){
     showAvatarvideo = participants[currentUser.id]['video'];

  }

  console.log(showAvatarvideo,'showAvatarvideo')

 
  let participantKey = Object.keys(participants);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
    }
  }, [currentUser, stream]);


  let gridCol =
    participantKey.length === 1 ? 1 : participantKey.length <= 4 ? 2 : 4;
  const gridColSize = participantKey.length <= 4 ? 1 : 2;
  let gridRowSize =
    participantKey.length <= 4
      ? participantKey.length
      : Math.ceil(participantKey.length / 2);

  // const screenPresenter = participantKey.find((element) => {
  //   const currentParticipant = participants[element];
  //   return currentParticipant.screen;
  // });

  // if (screenPresenter) {
  //   gridCol = 1;
  //   gridRowSize = 2;
  // }
  const participantsRender = participantKey.map((element, index) => {
    const currentParticipant = participants[element];
    console.log(element, 'currentParticipant', currentParticipant)
    const isCurrentUser = currentParticipant.id == currentUser.id;
   

    if (isCurrentUser) {
      return null;
    }

    console.log('isCurrentUser false',currentParticipant,  currentUser )
    const pc = currentParticipant.peerConnection;
    
    const remoteStream = new MediaStream();
    console.log('hussein1', pc, `${index}`)
    let curentIndex = index;
    if (pc) {
      console.log('hussein2', `participantVideo${curentIndex}`)
       pc.ontrack = (event) => {
        console.log(event.streams[0],'track');
        event.streams[0].getTracks().forEach((track) => {
      
          remoteStream.addTrack(track);
        });
        const videElement = document.getElementById(
          `participantVideo${curentIndex}`
        );
        console.log('hussein3', remoteStream, videElement)
        if (videElement && !videElement.srcObject){
          videElement.srcObject = remoteStream;

        }
      };
    }

    return (
      <Participant
        //key={curentIndex}
        currentParticipant={currentParticipant}
        curentIndex={curentIndex}
        // hideVideo={screenPresenter && screenPresenter !== element}
        hideVideo={false}
        showAvatar={
          !currentParticipant.video &&
           !currentParticipant.screen &&
          currentParticipant.name
        }
      />
    );
  });


  return (
    <div
      style={{
        "--grid-size": 1,
        "--grid-col-size": 1,
        "--grid-row-size": 1,
      }}
      className={`participants`}
    >
      {participantsRender}{" "}
      <Participant
        currentParticipant={currentUser}
        curentIndex={participantKey.length}
        // hideVideo={screenPresenter && !currentUser.screen}
        hideVideo={false}
        videoRef={videoRef}
        showAvatar={currentUser && showAvatarvideo}
        currentUser={true}
      />{" "}
    </div>
  );
};


export default Participants;
