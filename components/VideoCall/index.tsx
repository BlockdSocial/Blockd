import {
  MicrophoneIcon,
  PhoneIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { parseQueryString } from "../../utils";
import { useChannel, configureAbly, usePresence } from "@ably-labs/react-hooks";
import { config } from "../../constants";
import { getCookie, deleteCookie } from "cookies-next";

import { useEffect, useRef, useState } from "react";

// const call =
// typeof window !== "undefined"
//   ? JSON.parse(localStorage.getItem("call") as any)
//   : "";
// configureAbly({
//   authUrl: `${config.url.API_URL}/call/token/generate/${call?.id}`,
//   authHeaders: {
//     Authorization: "Bearer " + getCookie("token"),
//   },
// });

function VideoCall() {

  const [stream, setStream] = useState();

  const router = useRouter();
const video1 = useRef<any>();
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


  //useEffect(() => {}, [call]);


  


  // @ts-ignore
  const [channel, ably] = useChannel(
    // @ts-ignore
    `offer`,
    (message) => {
      console.log("videoCall offer cannel", message);
    }
  );
 // @ts-ignore
  const [presenceData] = usePresence(
    // @ts-ignore
    `${room_id}`,
  // (member) => {
  //   console.log("videoCall room cannel", member);
  // }
  );
  //console.log(`videoCall ${config.url.API_URL}/call/token/generate/${call?.id}`,getCookie("token"))

  const members = presenceData.map((msg, index) => <li key={index}>{msg.clientId}: {msg.data}</li>);

  useEffect(() => {
    const localStream = async ()  => { await navigator.mediaDevices.getUserMedia(constraints)}


          video1.current.srcObject = localStream;
        
      },[]);


  //video1.srcObject =localStream
 // document.getElementById('user-1').srcObject = localStream

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14">
      <div id="videos">
        <video ref={video1} className="video-player" id="user-1" autoPlay playsInline />
        <video className="video-player" id="user-2" autoPlay playsInline />
      </div>
{members}
      <div id="controls">
        <div className="control-container" id="camera-btn">
          <VideoCameraIcon className="h-6 w-6 text-gray-500" />
        </div>

        <div className="control-container" id="mic-btn">
          <MicrophoneIcon className="h-6 w-6 text-gray-500" />
        </div>

        <a href="lobby.html">
          <div className="control-container" id="leave-btn">
            <PhoneIcon className="h-6 w-6 text-gray-500" />
          </div>
        </a>
      </div>
    </div>
  );
}
export default VideoCall;
