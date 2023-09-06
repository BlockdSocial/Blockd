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
import { forEach } from "lodash";

const call =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("call") as any)
    : "";
// configureAbly({
//   authUrl: `${config.url.API_URL}/call/token/generate/${call?.id}`,
//   authHeaders: {
//     Authorization: "Bearer " + getCookie("token"),
//   },
// });

function VideoCall() {
  const dispatch = useAppDispatch();
  const { authUser }: any = useAppSelector((state) => state.authUserReducer);
  const [stream, setStream] = useState();
  const [offerCreated, setOfferCreated] = useState<boolean>(false);
  const [candidateCreated, setCandidateCreated] = useState<boolean>(false);
  const [answerCreated, setAnswerCreated] = useState<boolean>(false);
  const [answerAdded, setAnswerAdded] = useState<boolean>(false);



  const [otherUser, setOtherUser] = useState();
  const [camera, setCamera] = useState<boolean>(true);
  const [mic, setMic] = useState<boolean>(false);
  const [localStream, setLocalStream] = useState<any>();

  let peerConnection: any;
let old_candidate :any;
  let remoteStream: any;

  const router = useRouter();
  const room_id =
    router.query.room_id ||
    parseQueryString(window.location.search.substring(1)).room_id;

  console.log({ room_id });
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };
  let constraints = {
    video: {
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 480, ideal: 1080, max: 1080 },
    },
    audio: true,
  };
  const authToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token") as any)
      : "";

  useEffect(() => {
    getOtherUser();
  }, []);
  const getOtherUser = async () => {
    var otherUser_id = "";
    if (authUser?.id == call?.caller_id) {
      otherUser_id = call?.receiver_id;
    } else {
      otherUser_id = call?.caller_id;
    }
    await dispatch(fetchUser(call?.caller_id)).then((result: any) => {
      console.log({ result });
      setOtherUser(result);
    });
  };

  const handleMessageFromPeer = async (message: any) => {
    if (message.clientId === `user-id-${authUser.id}`) {
      return;
    }
    // Directly access the data object.
    let data = message.data;
    console.log("videoCall handleMessageFromPeer", message.data);
  
    try {
      if (data.type === "offer") {
        await createPeerConnection(data.userId);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        let answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        channel.publish(`answer-${room_id}`, {
          type: "answer",
          answer: answer,
          userId: data.userId,
        });
      }
  
      if (data.type === "answer") {
        if (peerConnection.signalingState !== "have-local-offer") {
          console.error("Invalid state for setting remote answer");
          return;
        }
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
  
      if (data.type === "candidate") {
        if (peerConnection.remoteDescription.type === '') {
          console.error("Remote description not set. Cannot add ICE candidate.");
          return;
        }
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    } catch (error) {
      console.error("Error handling message from peer:", error);
    }
  };

//   const handleMessageFromPeer = (message: any) => {
//     if (message.user_id === `user-id-${authUser.id}`) {
//       return;
//     }
//     // Directly access the data object.
//     let data = message.data;

//     if (data.type === "offer") {
//       if(!answerCreated) {
//         setAnswerCreated(true);
//         console.log("videoCall handleMessageFromPeer", message.data);
//         console.log(answerCreated,'handleMessageFromPeer')
//         createAnswer(data.userId, data.offer.sdp);
//       }
    
//     }

//     if (data.type === "answer") {
//       if(!answerAdded) {
//         setAnswerAdded(true);
//         console.log("videoCall handleMessageFromPeer", message.data);

//        addAnswer(data.answer.sdp);
//       }
//     }

//     if (data.type === "candidate") {
//       if (peerConnection && !candidateCreated) {
//         if(old_candidate != data.candidate.candidate) {
//           console.log("videoCall handleMessageFromPeer", message.data);
//           console.log(old_candidate,'handleMessageFromPeer')

// setCandidateCreated(true);
//         old_candidate = data.candidate.candidate;
//        peerConnection.addIceCandidate(data.candidate);
//       }
//       }
//     }
//   };

  // @ts-ignore
  const [channel] = useChannel(
    // @ts-ignore
    `${room_id}`,
    (message) => {
      handleMessageFromPeer(message);
      console.log("videoCall room_id cannel", message);
    }
  );

  // // @ts-ignore
  // const [channel_offer] = useChannel(
  //   // @ts-ignore
  //   `offer-${room_id}`,
  //   (message) => {
  //     handleMessageFromPeer(message);
  //     console.log("videoCall offer offer", message);
  //   }
  // );

  // // @ts-ignore
  // const [channel_candidate] = useChannel(
  //   // @ts-ignore
  //   `candidate-${room_id}`,
  //   (message) => {
  //     handleMessageFromPeer(message);
  //     console.log("videoCall candidate  candidate", message);
  //   }
  // );

  // // @ts-ignore
  // const [channel_answer] = useChannel(
  //   // @ts-ignore
  //   `answer-${room_id}`,
  //   (message) => {
  //     handleMessageFromPeer(message);
  //     console.log("videoCall answer  answer", message);
  //   }
  // );

  // @ts-ignore
  const [presenceData] = usePresence(
    // @ts-ignore
    `${room_id}`
  );
  useEffect(() => {
    getMedia();
  }, []);

  async function getMedia() {
    try {
     // const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log({ stream });
      setLocalStream(stream);
      video1.current.srcObject = stream;
      return stream;
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  }
  console.log({localStream});
  useEffect(() => {
    presenceData.map((msg, index) => handleUserJoined(msg.clientId));
  }, [presenceData]);

  let handleUserJoined = async (clientId: String) => {
    if (clientId === `user-id-${authUser?.id}`) {
      return;
    }
    console.log("A new user joined the channel:", clientId);
    if(!offerCreated) {
      setOfferCreated(true)
      createOffer(clientId);
    }
    
  };
  console.log(peerConnection?.ontrack,'peerConnection.ontrack')

  let createAnswer = async (MemberId: any, offer: any) => {
    console.log("createAnswer",offer);
    await createPeerConnection(MemberId);

    await peerConnection.setRemoteDescription(offer);

    let answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    channel.publish(`answer-${room_id}`, {
      type: "answer",
      answer: answer,
      userId: MemberId,
    });
  };

  let addAnswer = async (answer: any) => {
    if (!peerConnection.currentRemoteDescription) {
      peerConnection.setRemoteDescription(answer);
    }
  };

  let leaveChannel = async () => {
    await channel.detach();
    //  await client.close()
  };

  let createOffer = async (MemberId: any) => {
    await createPeerConnection(MemberId);

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log("ssss", offer);
    try {
      channel.publish(`offer-${room_id}`, {
        type: "offer",
        offer: offer,
        userId: MemberId,
      });
    } catch (error) {
      console.log("hhhhh", error);
    }
  };

  const createPeerConnection = async (MemberId: any) => {
    peerConnection = new RTCPeerConnection(servers);
  
    remoteStream = new MediaStream();
   
  
    video1.current.classList.add("smallFrame");
    //video2.current.classList.add("smallFrame");

  
    if (!localStream) {
      var new_stream: MediaStream | undefined = await getMedia();
      console.log("aaaaaaa", new_stream);
      // @ts-ignore
      new_stream.getTracks().forEach((track: any) => {
        peerConnection.addTrack(track, new_stream);
      });
    } else {
      console.log("bbbbb", localStream);
      localStream.getTracks().forEach((track: any) => {
        peerConnection.addTrack(track, localStream);
      });
    }
  
    peerConnection.ontrack = (event: any) => {
      event.streams[0].getTracks().forEach((track: any) => {
        remoteStream.addTrack(track);
        video2.current.srcObject = remoteStream;
      });
    };
    peerConnection.addEventListener('track', async (event:any) => {
      console.log({event})
      const [remoteStream1] = event.streams;
      console.log({remoteStream1})
   //   video2.current.srcObject = remoteStream1;
  });

    peerConnection.onicecandidate = async (event: any) => {
      if (event.candidate) {
        channel.publish(`candidate-${room_id}`, {
          type: "candidate",
          candidate: event.candidate,
          userId: MemberId,
        });
      }
    };
    console.log({remoteStream})
  
    video2.current.style.display = "block";
  
    return peerConnection;
  };

  const toggleCamera = async () => {
    console.log({camera})
    let videoTrack = localStream
      .getTracks()
      .find((track: any) => track.kind === "video");

    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setCamera(false);
    } else {
      videoTrack.enabled = true;
      setCamera(true);
    }
  };

  let toggleMic = async () => {
    let audioTrack = localStream
      .getTracks()
      .find((track: any) => track.kind === "audio");

    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setMic(true);
    } else {
      audioTrack.enabled = true;
      setMic(false);
     
    }
  };

  //console.log(`videoCall ${config.url.API_URL}/call/token/generate/${call?.id}`,getCookie("token"))
  console.log("videoCall presenceData", presenceData);
  const members = presenceData.map((msg, index) => (
    <li key={index}>
      {msg.clientId}: {msg.data}
    </li>
  ));

  // localStream = async () => {
  //   await navigator.mediaDevices
  //     .getUserMedia(constraints)
  //     .then((localStream) => {
  //       
  //     });
  // };

  console.log(localStream, "localStream");

  const video1 = useRef<any>();
  const video2 = useRef<any>();

  //video1.srcObject =localStream
  // document.getElementById('user-1').srcObject = localStream

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14">
      <div id="videos">
        <video
          ref={video1}
          className="video-player"
          id="user-1"
          autoPlay
          playsInline
        />
        <video
          ref={video2}
          className="video-player"
          id="user-2"
          autoPlay
          playsInline
        />
      </div>
      {members}
      <div id="controls">
        <div
        onClick={toggleCamera}
          className={
            camera
              ? "control-container bg-[#B366F9]"
              : "control-container bg-[#FF6666]"
          }
          id="camera-btn"
        >
          <VideoCameraIcon className="h-6 w-6"  />
        </div>

        <div
          className={
            mic
              ? "control-container bg-[#B366F9]"
              : "control-container bg-[#FF6666]"
          }
          id="mic-btn"
        >
          <MicrophoneIcon className="h-6 w-6" onClick={() => toggleMic()} />
        </div>

        <a href="/">
          <div className="control-container" id="leave-btn">
            <PhoneIcon className="h-6 w-6" />
          </div>
        </a>
      </div>
    </div>
  );
}
export default VideoCall;
