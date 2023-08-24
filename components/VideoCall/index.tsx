import {
  MicrophoneIcon,
  PhoneIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/outline";
function VideoCall() {
    let client;
    let channel;

  return (
    <div
    className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14"
    
  >
      <div id="videos">
        <video className="video-player" id="user-1" autoPlay playsInline />
        <video className="video-player" id="user-2" autoPlay playsInline />
      </div>

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
