import {
  MicrophoneIcon,
  PhoneIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { parseQueryString } from "../../utils";
import { useChannel, configureAbly, usePresence } from "@ably-labs/react-hooks";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { config } from "../../constants";
import { getCookie, deleteCookie } from "cookies-next";

import { useEffect, useRef, useState } from "react";
import { fetchUser } from "../../stores/user/UserActions";
import { forEach, isEmpty } from "lodash";
import toast, { Toaster } from "react-hot-toast";
import Participants from "../Participants/Participants.component";


import { fetchAuthUser } from "../../stores/authUser/AuthUserActions";

function VideoCall() {
  const call =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("call") as any)
      : "";
  const authUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("authUser") as any)
      : "";

  if (call?.id) {
    configureAbly({
      authUrl: `${config.url.API_URL}/call/token/generate/${call?.id}`,
      authHeaders: {
        Authorization: "Bearer " + getCookie("token"),
      },
    });
  } else {
    configureAbly({
      authUrl: `${config.url.API_URL}/subscribe/token/generate`,
      authHeaders: {
        Authorization: "Bearer " + getCookie("token"),
      },
    });
  }
  const dispatch = useAppDispatch();
  //const { authUser }: any = useAppSelector((state) => state.authUserReducer);
  const [stream, setStream] = useState();
  let offerCreated: boolean = false;
  let candidateCreated: boolean = false;
  let answerCreated: boolean = false;
  let answerAdded: boolean = false;

  const [otherUser, setOtherUser] = useState();
  const [participants, setParticipants] = useState();
  const [camera, setCamera] = useState<boolean>(false);
  const [mic, setMic] = useState<boolean>(true);
  const localStream = useRef<any>();
  const peerConnection = useRef<any>();
  const participantsRef = useRef<any>({});
  const queue = useRef<any>({});

  
  const createPeerConnectionMembersId = useRef<any>([]);
  const originalpresenceData = useRef<any>([]);

  const video1 = useRef<any>();
  //const video2 = useRef<any>();

  //let peerConnection.current: any;
  let old_candidate: any;
  let remoteStream: any;
  var options = { mimeType: "video/webm; codecs=vp9" };
  let mediaRecorder = null;
  let recordedChunks: Blob[] = [];
  remoteStream = new MediaStream();
  const router = useRouter();
  const room_id =
    router.query.room_id ||
    parseQueryString(window.location.search.substring(1)).room_id;

  // const servers = {
  //   iceServers: [
  //     {
  //       urls: [
  //         "stun:stun1.l.google.com:19302",
  //         "stun:stun2.l.google.com:19302",
  //       ],
  //     },
  //     //{urls:"turn:numb.viagenie.ca", username:"webrtc@live.com", credential:"muazkh"}
  //   ],
  // };
  // const servers = {
  //   iceServers: [
  //     {
  //       urls: "stun:143.244.152.126:3478",
  //     },
  //     {
  //       urls: "turn:143.244.152.126:3478",
  //       username: "turnuser",
  //       credential: "turn456",
  //     },
  //   ],
  // };

  const servers = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
      {
        urls: "turn:143.244.152.126:3478",
        username: "turnuser",
        credential: "turn456",
      },
    ],
  };
  let constraints = {
    video: true,
    audio: true,
    screen: false,
  };
  const authToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token") as any)
      : "";

  useEffect(() => {
    //getOtherUser();
  }, []);
  const setNewUserJoined = async (user_id: any) => {
    await dispatch(fetchUser(user_id)).then((result: any) => {
      console.log("videocall", { result });
      //  await new Promise((f) => setTimeout(f, 1000));
      toast(result?.name + " join the call");
    });
  };

  const handleMessageFromPeer = async (message: any) => {
    let data =   message.data;
    let userId = await data?.userId;
 
    console.log("functiuon  handleMessageFromPeer", data);
    console.log(
      participantsRef.current,
      "participantsRef handleMessageFromPeer"
    );

    let peerConnection = participantsRef.current[userId]?.["peerConnection"];
    if (!peerConnection) return;
    console.log(
      participantsRef.current[userId],
      "participantsRef handleMessageFromPeer"
    );

 
  
      if (data.type === "answer"  && call?.caller_id === authUser.id) {
        console.log("videocall", "enter answer", data);
        if (peerConnection?.signalingState !== "have-local-offer") {
          console.log("Invalid state for setting remote answer");
          return;
        }
        if (!peerConnection.currentRemoteDescription) {
          peerConnection.setRemoteDescription(data?.answer);
          console.log(`addIceCandidate setRemoteDescription for ${userId}:`)
         
      // peerConnection.onicecandidate = async (event: any) => {
      //     console.log(`ICE candidate event for offer send to  befor event ${userId}`);
      //     if (event.candidate) {
      //       console.log(`ICE candidate event for offer send to  ${userId}:`, JSON.stringify(event.candidate));

      //       channel.publish(`candidate-${room_id}`, {
      //         type: "candidate",
      //         candidate: event.candidate,
      //         //sdpMid: event.candidate.sdpMid,
      //        // sdpMLineIndex: event.candidate.sdpMLineIndex,
      //         userId: authUser.id,
      //         sendBy: authUser.id,
      //       });
      //     }
      //   };
        participantsRef.current[userId]["peerConnection"] =
        peerConnection;
        setParticipants(participantsRef.current);
       

        }
  
      }

      if (data.type === "offer" && !peerConnection.remoteDescription && call?.caller_id !== authUser.id) {
        console.log("videocall", "enter offer", data, peerConnection.currentRemoteDescription);
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
        console.log(`addIceCandidate setRemoteDescription for ${userId}:`)

        peerConnection.onicecandidate = async (event: any) => {
          console.log(`ICE candidate event for offer send to  befor event ${userId}`);
          if (event.candidate) {
            console.log(`ICE candidate event for offer send to  ${userId}:`, JSON.stringify(event.candidate));

            channel.publish(`candidate-${room_id}`, {
              type: "candidate",
              candidate: event.candidate,
              //sdpMid: event.candidate.sdpMid,
             // sdpMLineIndex: event.candidate.sdpMLineIndex,
              userId: authUser.id,
              sendBy: authUser.id,
            });
          }
        };

        let answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        channel.publish(`answer-${room_id}`, {
          type: "answer",
          answer: answer,
          userId: authUser.id,
          sendBy: authUser?.id,
        });
        participantsRef.current[userId]["peerConnection"] =
          peerConnection;
          setParticipants(participantsRef.current);
      }

      if (data.type === "candidate") {
        console.log("videocall", "enter should candidate", data);
        const candidate = data.candidate;
      
        if(!peerConnection || !peerConnection.remoteDescription){
          console.log(
            "videocall Remote description not set. Cannot add ICE candidate."
          );

          /// add addIceCandidate to queue
          console.log(' queue push ',userId,candidate)
          queue.current[userId] =[...queue.current[userId], candidate]
          return;
        }
        console.log(`addIceCandidate for ${userId}:`)
        console.log("videocall", "enter candidate");
        console.log(`ICE candidate event for enter candidate ${userId}:`, JSON.stringify(data.candidate));

        //candidateCreated = true;
        // await peerConnection.addIceCandidate(
        //   new RTCIceCandidate(await data.candidate)
        // );

      try{
            await peerConnection.addIceCandidate(
          new RTCIceCandidate({candidate: data.candidate})
        );
        console.log("successfully added candidate :", candidate);

      } catch (error) {
      console.error("Error handling message from candidate:", error);
      console.log(' queue push ',userId,candidate)
      queue.current[userId] =[...queue.current[userId], candidate]

    }

      peerConnection.oniceconnectionstatechange = () => {
        console.log(
          `ICE connection state change for ${userId}:`,
          peerConnection.iceConnectionState
        );
      };
  

        participantsRef.current[data?.userId]["peerConnection"] = peerConnection;
          setParticipants(participantsRef.current);
      }
      console.log(participantsRef.current, "participantsRef");
     
    
  };

  // @ts-ignore
  const [channel] = useChannel(
    // @ts-ignore
    `${room_id}`,
    (message) => {
      handleMessageFromPeer(message);
    }
  );

  // @ts-ignore
  const [presenceData] = usePresence(
    // @ts-ignore
    `${room_id}`
  );
  useEffect(() => {
    getMedia();
  }, []);
  useEffect(() => {
    console.log(participants, "participants");
  }, [participants]);

  async function getMedia() {
    console.log("functiuon getMedia");

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localStream.current = stream

    return stream;
  }

  useEffect(() => {
    
  })


  useEffect(() => {
    const interval = setInterval(() => {
     checkQueue();
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const checkQueue = async () => {
    if(!queue.current) return;
    let queueKey = Object.keys(queue.current);
    queueKey.map(async (userId, index) => {
      if(!isEmpty(queue.current[userId])) {
        console.log('queue', userId, queue.current[userId][0] )
        let array = queue.current[userId];
        let pc = participantsRef.current[userId]["peerConnection"];
        for (let index = 0; index < array.length; index++) {
          let candidate =array[index];

          if(pc && pc.remoteDescription && candidate){
            await pc.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
            console.log("successfully added candidate from que:", candidate);
            participantsRef.current[userId]["peerConnection"] = pc
            setParticipants( participantsRef.current)
            queue.current[userId][index] = null;
          }
         
          
        }
      }
    })
  }

  function delay(milliseconds:any){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

  useEffect(() => {
    presenceData.map((msg, index) => handleUserJoined(msg.clientId));
  }, [presenceData]);

  let handleUserJoined = async (clientId: String) => {
    console.log("functiuon handleUserJoined", originalpresenceData);
    if (!originalpresenceData.current.includes(clientId)) {
      await originalpresenceData.current.push(clientId);
     
      addParticipant(clientId);
      var user_id = clientId.split("-")[2];

      if (user_id != authUser.id && user_id != call?.caller_id) {
        await setNewUserJoined(user_id);
      }
    }
  };

  const addParticipant = async (clientId: any) => {
    var user_id = clientId.split("-")[2];
    var name;
    if (authUser.id === user_id) {
      name = authUser.name;
    } else {
      await dispatch(fetchUser(user_id)).then((result: any) => {
        name = result.name;
      });
    }
    var newUser: any = {};
    newUser.id = user_id;
    newUser.name = name;
    participantsRef.current[user_id] = newUser;
    queue.current[user_id] = [];
    if (authUser.id != user_id) {
      
      if (!localStream.current) {
        let stream = await getMedia();
        addConnection(newUser, authUser, stream);
      } else {
        console.log('add new localStream.current')
        addConnection(newUser, authUser, localStream.current);
      }
    } else {
      participantsRef.current[user_id]['video'] = 'false';
      console.log("hussein not handleMessageFromPeer ", authUser.id, user_id);
    }
  };
  const addConnection = (newUser: any, currentUser: any, stream: any) => {
    const peerConnection = new RTCPeerConnection(servers);
    stream.getTracks().forEach((track: any) => {
      peerConnection.addTrack(track, stream);
    });
    const newUserId = newUser.id;
    const currentUserId = currentUser.id;

    const offerIds: any = [newUserId, currentUserId].sort((a, b) => a - b);
    participantsRef.current[newUserId]["peerConnection"] = peerConnection;
    if (call?.caller_id === currentUserId) {
      createOffer(peerConnection, currentUserId, newUserId);
    }
  };

  const createOffer = async (
    peerConnection: any,
    createdID: any,
    receiverId: any
  ) => {
 

    const offerDescription = await peerConnection.createOffer({
      offerToReceiveAudio: true,
                offerToReceiveVideo: true,
    });
    await peerConnection.setLocalDescription(offerDescription);

    channel.publish(`offer-${room_id}`, {
      type: "offer",
      offer: offerDescription,
      userId: createdID,
    });
    console.log(
      "hussein enter handleMessageFromPeer createdID",
      createdID,
      receiverId
    );
   // await delay(3000);

    peerConnection.onicecandidate = async (event: any) => {
      if (event.candidate) {
        console.log(`ICE candidate event for createOffer send to  ${createdID}:`, JSON.stringify(event.candidate));


        channel.publish(`candidate-${room_id}`, {
          type: "candidate",
          candidate: event.candidate,
          //sdpMid: event.candidate.sdpMid,
         // sdpMLineIndex: event.candidate.sdpMLineIndex,
          userId: createdID,
          sendBy: authUser.id,
        });
      }
    };

    //participantsRef.current[receiverId]["peerConnection"] = peerConnection;
    //setParticipants(participantsRef.current);
  };

  let leaveChannel = async () => {
    await channel.detach();
    //  await client.close()
  };

  const leaveCall = async () => {
    localStorage.removeItem("call");
    router.replace("/").then(() => router.reload());
  };

  const toggleCamera = async () => {
    let videoTrack = localStream.current
      .getTracks()
      .find((track: any) => track.kind === "video");

    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      participantsRef.current[authUser?.id]['video'] = false;
      setCamera(false);
    } else {
      videoTrack.enabled = true;
      participantsRef.current[authUser?.id]['video'] = true;
      setCamera(true);
    }
    console.log('toggleCamera',participantsRef)
    setParticipants(participantsRef.current);
  };

  let toggleMic = async () => {
    let audioTrack = localStream.current
      .getTracks()
      .find((track: any) => track.kind === "audio");

    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setMic(false);
    } else {
      audioTrack.enabled = true;
      setMic(true);
    }
    setParticipants(participantsRef.current);
  };

  return (
    <>
      <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14">
        {video1.current?.srcObject?.id ? (
          <>
            video1: {video1.current?.srcObject?.id} <br />
            {/* video2: {video2.current?.srcObject?.id} */}
          </>
        ) : (
          <></>
        )}
        <div id="controls">
          <div
            onClick={() => toggleCamera()}
            className={
              camera
                ? "control-container bg-[#FF6666]"
                : "control-container bg-[#FF6666] opacity-80"
            }
            id="camera-btn"
          >
            {camera ? (
              <VideoCameraIcon className="h-6 w-6" />
            ) : (
              <VideoCameraSlashIcon className="h-6 w-6" />
            )}
          </div>

          <div
            onClick={() => toggleMic()}
            className={
              mic
                ? "control-container bg-[#FF6666]"
                : "control-container bg-[#FF6666] opacity-80"
            }
            id="mic-btn"
          >
            <MicrophoneIcon className="h-6 w-6" />
          </div>

          <a onClick={() => leaveCall()}>
            <div className="control-container" id="leave-btn">
              <PhoneIcon className="h-6 w-6" />
            </div>
          </a>
        </div>
      </div>
      <div id="videos">
        {!isEmpty(participants) &&  (
          <>
          <>sds</>
 <Participants 
 participants ={participants}
 currentUser = {authUser}
 stream = {localStream.current}
/>
</>
        )}
     
        {/* <video
          //poster={'https://picsum.photos/200/300'}
          ref={video1}
          className="video-player"
          id="video1"
          autoPlay
          playsInline
          muted
        /> */}
        {/* <img src="https://picsum.photos/200/300" className="video-player -z-1" /> */}

        {/* <video
          ref={video2}
          className="video-player"
          id="video2"
          autoPlay
          playsInline
        /> */}
      </div>
    </>
  );
}
export default VideoCall;
