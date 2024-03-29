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
  const [camera, setCamera] = useState<boolean>(false);
  const [mic, setMic] = useState<boolean>(true);
  const [localStream, setLocalStream] = useState<any>();
  const peerConnection = useRef<any>();

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

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
      //{urls:"turn:numb.viagenie.ca", username:"webrtc@live.com", credential:"muazkh"}
    ],
  };
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
      console.log("videocall", { result });
      setOtherUser(result);
    });
  };

  const handleMessageFromPeer = async (message: any) => {
    console.log("videocall", "videoCall  handleMessageFromPeer", message.data);
    console.log(
      "videoCall  handleMessageFromPeer",
      authUser.id,
      call?.caller_id,
      peerConnection.current
    );
    let data = message.data;
    if (`user-id-${authUser.id}` === `user-id-${call?.caller_id}`) {
      console.log("videocall messageclientId", message);

      if (data.type === "answer") {
        if (!answerAdded) {
          console.log("videocall", "enter answer", answerAdded);
          //setAnswerAdded(true);

          if (peerConnection.current?.signalingState !== "have-local-offer") {
            console.error("Invalid state for setting remote answer");
            return;
          }
          answerAdded = true;
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );
        }
      }
      if (data.type === "candidate" && data.sendBy != authUser.id) {
        console.log(
          "videocall",
          "enter should candidate",
          peerConnection.current
        );
        if (peerConnection.current?.remoteDescription?.type === "") {
          console.error(
            "Remote description not set. Cannot add ICE candidate."
          );
          return;
        }
        if (!candidateCreated && peerConnection.current?.addIceCandidate) {
          console.log("videocall", "enter candidate");
          //  candidateCreated = true;
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
      }

      return;
    }
    // Directly access the data object.

    try {
      if (data.type === "offer") {
        if (!answerCreated) {
          answerCreated = true;
          console.log("videocall", "enter offer", answerCreated);
          //  setAnswerCreated(true);
          await createPeerConnection(data.userId);
          //hussein
          //peerConnection.current = data.peerConnection.current;
          console.log("videoCall data.peerConnection.current", data);
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(data.offer)
          );
          let answer = await peerConnection.current.createAnswer();
          console.log("videocall", "answer", answer);
          await peerConnection.current.setLocalDescription(answer);
          channel.publish(`answer-${room_id}`, {
            type: "answer",
            answer: answer,
            userId: data.userId,
          });
        }
      }

      if (data.type === "candidate" && data.sendBy != authUser.id) {
        console.log(
          "videocall",
          "enter should candidate",
          peerConnection.current
        );
        if (peerConnection.current.remoteDescription?.type === "") {
          console.log(
            "videocall Remote description not set. Cannot add ICE candidate."
          );
          return;
        }
        if (!candidateCreated) {
          console.log("videocall", "enter candidate");

          //candidateCreated = true;
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
      }
    } catch (error) {
      console.error("Error handling message from peer:", error);
    }
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

  async function getMedia() {
    try {
      // const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("videocall", { stream });
      setLocalStream(stream);
      video1.current.srcObject = stream;
      if (peerConnection.current) {
        stream.getTracks().forEach((track: any) => {
          peerConnection.current.addTrack(track, stream);
        });
      }
      let videoTrack = stream
        .getTracks()
        .find((track: any) => track.kind === "video");

      if (videoTrack?.enabled) {
        videoTrack.enabled = false;
      }
      return stream;
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  }
  console.log("videocall", { localStream });
  useEffect(() => {
    presenceData.map((msg, index) => handleUserJoined(msg.clientId));
  }, [presenceData]);

  let handleUserJoined = async (clientId: String) => {
    console.log("videocall", "handleUserJoined", clientId, call);
    if (`user-id-${authUser.id}` !== `user-id-${call?.caller_id}`) {
      console.log("videocall", "A new user joined the channel:", clientId);

      return;
    }
    if (!offerCreated) {
      offerCreated = true;
      createOffer(clientId);
    }
  };

  let addAnswer = async (answer: any) => {
    if (!peerConnection.current.currentRemoteDescription) {
      peerConnection.current.setRemoteDescription(answer);
    }
  };

  let leaveChannel = async () => {
    await channel.detach();
    //  await client.close()
  };

  const leaveCall = async () => {
    localStorage.removeItem("call");
    router.replace("/").then(() => router.reload());
  };
  let createOffer = async (MemberId: any) => {
    console.log("videocall createOffer");
    await createPeerConnection(MemberId);

    let offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    try {
      channel.publish(`offer-${room_id}`, {
        type: "offer",
        offer: offer,
        userId: MemberId,
      });
    } catch (error) {
      console.log("videocall", "hhhhh", error);
    }
  };

  const createPeerConnection = async (MemberId: any) => {
    console.log("enter createPeerConnection");
    peerConnection.current = new RTCPeerConnection(servers);

    video1.current.classList.add("smallFrame");
    //video2.current.classList.add("smallFrame");

    if (!localStream) {
      var new_stream: MediaStream | undefined = await getMedia();
      console.log("videocall", "aaaaaaa", new_stream);
      if (new_stream) {
      }
    } else {
      console.log("videocall", "bbbbb", localStream);
      localStream.getTracks().forEach((track: any) => {
        peerConnection.current.addTrack(track, localStream);
      });
    }
    if (isEmpty(video2.current.srcObject)) {
      peerConnection.current.ontrack = (event: any) => {
        console.log("videocall peerConnection.current.ontrack", event);
        event.streams[0].getTracks().forEach((track: any) => {
          remoteStream.addTrack(track);
        });
      };
      video2.current.srcObject = remoteStream;
    }

    console.log("videocall", peerConnection.current, "peerConnection.current");

    //   peerConnection.current.addEventListener('track', async (event:any) => {
    //     console.log("videocall",{event})
    //     const [remoteStream1] = event.streams;
    //
    //  //   video2.current.srcObject = remoteStream1;
    // });

    peerConnection.current.onicecandidate = async (event: any) => {
      console.log("videocall", event, "onicecandidate");
      if (event.candidate) {
        channel.publish(`candidate-${room_id}`, {
          type: "candidate",
          candidate: event.candidate,
          userId: MemberId,
          sendBy: authUser.id,
        });
      }
    };
    console.log("videocall", { remoteStream });

    video2.current.style.display = "block";

    return peerConnection.current;
  };

  const toggleCamera = async () => {
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
      setMic(false);
    } else {
      audioTrack.enabled = true;
      setMic(true);
    }
  };

  console.log("videocall", "videoCall presenceData", presenceData);

  console.log("videocall", localStream, "localStream");

  const video1 = useRef<any>();
  const video2 = useRef<any>();

  const members = presenceData.map((msg, index) => (
    <li key={index}>{/* {msg.clientId}: {msg.data} */}</li>
  ));
  //video1.srcObject =localStream
  // document.getElementById('user-1').srcObject = localStream

  let createAnswer = async (MemberId: any, offer: any) => {
    console.log("videocall", "createAnswer", offer);
    await createPeerConnection(MemberId);

    await peerConnection.current.setRemoteDescription(offer);

    let answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    channel.publish(`answer-${room_id}`, {
      type: "answer",
      answer: answer,
      userId: MemberId,
    });
  };
  // useEffect(() => {
  //   console.log(remoteStream.getVideoTracks(), 'VideoCall remoteStream.getVideoTracks()[0]');
  // },[remoteStream.getTracks()])

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14">
      <div id="videos">
        <video
          ref={video1}
          className="video-player"
          id="user-1"
          autoPlay
          playsInline
          muted
        />
        {/* <img src="https://picsum.photos/200/300" className="video-player -z-1" /> */}

        <video
          ref={video2}
          className="video-player"
          id="user-2"
          autoPlay
          playsInline
        />
      </div>
      {video1?.current?.srcObject?.id ? (
        <>
          video1: {video1.current?.srcObject?.id} <br />
          video2: {video2.current?.srcObject?.id}
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
          <MicrophoneIcon className="h-6 w-6"  />
        </div>

        <a onClick={() => leaveCall()}>
          <div className="control-container" id="leave-btn">
            <PhoneIcon className="h-6 w-6" />
          </div>
        </a>
      </div>
    </div>
  );
}
export default VideoCall;
