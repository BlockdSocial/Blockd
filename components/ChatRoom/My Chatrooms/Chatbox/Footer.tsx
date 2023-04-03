import React, { useState, useRef, useEffect } from "react";
import Picker from "@emoji-mart/react";
import {
  FaceSmileIcon,
  PhotoIcon,
  PaperAirplaneIcon,
  GifIcon,
} from "@heroicons/react/24/outline";
import ReactGiphySearchbox from "react-giphy-searchbox";
import { useAppDispatch, useAppSelector } from "../../../../stores/hooks";
import {
  createChat,
  createChatroomMessage,
  createMessage,
} from "../../../../stores/chat/ChatActions";
import { isEmpty } from "lodash";
import AutoResizeTextarea from "./AutoResizeTextArea";
import { toast } from "react-hot-toast";

function Footer({
  messages,
  receiver,
  getMessages,
  room,
  fetchRoomMessages,
}: any) {
  //************************** EMOJI Handeling **************************//
  //************************** EMOJI Handeling **************************//
  //************************** EMOJI Handeling **************************//

  let [showEmojis, setShowEmojis] = useState<boolean>(false);
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { error } = useAppSelector((state) => state.chatReducer);
  const [input, setInput] = useState<string>("");
  const [gifUrl, setGifUrl] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const dispatch = useAppDispatch();

  const emoji = useRef<any>(null);

  const handleClick = () => {
    if (showGifs === true) {
      setShowGifs(!showGifs);
    }
    setShowEmojis(!showEmojis);
  };

  // useEffect(() => {
  //   if (!isEmpty(error)) {
  //     toast.error(error);
  //   }
  // }, [error]);

  useEffect(() => {
    // only add the event listener when the emoji is opened
    if (!showEmojis) return;
    function handleClick(event: any) {
      if (showEmojis === true) {
        if (emoji.current && !emoji.current.contains(event.target)) {
          setShowEmojis(false);
        }
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showEmojis]);

  const addEmoji = (e: any) => {
    const sym = e.unified.split("-");
    const codesArray: any[] = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  //************************** GIF Handeling **************************//
  //************************** GIF Handeling **************************//
  //************************** GIF Handeling **************************//

  const [showGifs, setShowGifs] = useState<boolean>(false);

  const gif = useRef<any>(null);

  useEffect(() => {
    // only add the event listener when the gif is opened
    if (!showGifs) return;
    function handleClick(event: any) {
      if (showGifs === true) {
        if (gif.current && !gif.current.contains(event.target)) {
          setShowGifs(false);
        }
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showGifs]);

  const [gifBoxIsOpen, setGifBoxIsOpen] = useState<boolean>(false);
  //Set a color for the frame

  const addGif = (gify: any, event: any) => {
    if (gifBoxIsOpen === false) {
      setGifBoxIsOpen(!gifBoxIsOpen);
    }
    let gifUrl = gify.images.downsized.url;
    setGifUrl(gifUrl);
  };

  //************************** Picture Handeling **************************//
  //************************** Picture Handeling **************************//
  //************************** Picture Handeling **************************//

  const inputAddPicture = useRef<HTMLInputElement | null>(null);

  const onAddPictureClick = () => {
    // `current` points to the mounted file input element
    if (inputAddPicture.current) {
      inputAddPicture.current.click();
    }
  };

  const handleUploadPicture = (e: any) => {
    setUploadedImage(e.target.files[0]);
  };

  useEffect(() => {
    handleSendMessage();
  }, [uploadedImage, gifUrl]);

  const maxRows = 5; // Maximum number of rows
  const textArea = document.getElementById("myTextArea") as HTMLTextAreaElement;

  const handleSendMessage = async () => {
    if (!isEmpty(receiver)) {
      if (isEmpty(messages)) {
        await dispatch(createChat(receiver?.id));
      }
      if (uploadedImage) {
        await dispatch(
          createMessage({
            receiver_id: receiver?.id,
            image: uploadedImage,
          })
        ).then(() => {
          setUploadedImage("");
          getMessages();
        });
      } else if (gifUrl.length > 0) {
        await dispatch(
          createMessage({
            receiver_id: receiver?.id,
            gif: gifUrl,
          })
        ).then(() => {
          setGifUrl("");
          getMessages();
        });
      } else if (!isEmpty(input)) {
        await dispatch(
          createMessage({
            receiver_id: receiver?.id,
            content: input,
          })
        ).then(() => {
          setInput("");
          getMessages();
        });
      }
    }
    if (!isEmpty(room)) {
      if (uploadedImage) {
        await dispatch(
          createChatroomMessage(room?.roomId, {
            image: uploadedImage,
            user_id: authUser?.id,
          })
        ).then(() => {
          setUploadedImage("");
          fetchRoomMessages();
        });
      } else if (gifUrl.length > 0) {
        await dispatch(
          createChatroomMessage(room?.roomId, {
            gif: gifUrl,
            user_id: authUser?.id,
          })
        ).then(() => {
          setGifUrl("");
          fetchRoomMessages();
        });
      } else if (!isEmpty(input)) {
        await dispatch(
          createChatroomMessage(room?.roomId, {
            content: input,
            user_id: authUser?.id,
          })
        ).then(() => {
          setInput("");
          fetchRoomMessages();
        });
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);

    // Split the text into lines
    const lines = textArea.value.split("\n");

    // Set the number of rows based on the number of lines
    textArea.rows = Math.min(maxRows, lines.length);

    event.target.style.height = "auto";
    // event.target.style.height = `${textArea.scrollHeight}px`;
  };

  return (
    <div className="flex items-center justify-between sticky bottom-0 h-auto w-full dark:bg-darkgray bg-gray-50">
      <div className="flex space-x-1 p-1 w-full">
        <div className="w-full">
          <textarea
            className="flex items-center justify-center resize-none w-full px-1 py-2 text-gray-700 dark:text-white border bg-gray-200 dark:bg-lightgray rounded-md focus:outline-none focus:shadow-outline-blue focus:border-orange-300"
            value={input}
            onChange={handleChange}
            placeholder="Send a message"
            rows={1}
            id="myTextArea"
          />
        </div>
        {/* <input
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          className='flex-1 rounded-lg bg-gray-200 dark:bg-lightgray p-2 outline-none dark:text-white dark:placeholder:text-white placeholder:text-black placeholder:font-semibold'
          type="text"
          placeholder='Send a Message ...'
        /> */}
        <div className="flex items-end justify-end space-x-2 text-[#181c44] dark:text-white pb-2">
          <PaperAirplaneIcon
            onClick={() => handleSendMessage()}
            className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
          />
          <PhotoIcon
            onClick={() => onAddPictureClick()}
            className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
          />
          <GifIcon
            ref={gif}
            onClick={() => setShowGifs((b) => !b)}
            className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
          />
          <FaceSmileIcon
            ref={emoji}
            onClick={() => handleClick()}
            className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
          />
        </div>
        <input
          type="file"
          id="file"
          ref={inputAddPicture}
          className="hidden"
          accept="image/*"
          onChange={handleUploadPicture}
        />
      </div>
      <div className="relative">
        {showGifs && (
          <div className="absolute right-2 bottom-6 z-0 p-1 bg-white dark:bg-darkgray border border-gray-200 dark:border-lightgray rounded-lg">
            <ReactGiphySearchbox
              apiKey="MfOuTXFXq8lOxXbxjHqJwGP1eimMQgUS" // Required: get your on https://developers.giphy.com
              onSelect={(item: any, event: any) => addGif(item, event)}
              mansonryConfig={[
                { columns: 2, imageWidth: 140, gutter: 10 },
                { mq: "700px", columns: 3, imageWidth: 200, gutter: 10 },
                { mq: "1000px", columns: 4, imageWidth: 220, gutter: 10 },
              ]}
              wrapperClassName="p-4"
            />
          </div>
        )}
        {showEmojis && (
          <div className="absolute right-2 bottom-6">
            <Picker
              set="apple"
              onEmojiSelect={addEmoji}
              theme="dark"
              icons="outline"
              previewPosition="none"
              size="1em"
              perLine="6"
              maxFrequentRows="2"
              searchPosition="none"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
