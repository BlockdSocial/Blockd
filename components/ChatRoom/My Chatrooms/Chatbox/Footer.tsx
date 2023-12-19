import React, { useState, useRef, useEffect } from "react";
import Picker from "@emoji-mart/react";
import {
  FaceSmileIcon,
  PhotoIcon,
  PaperAirplaneIcon,
  GifIcon,
  XMarkIcon,
  PhoneIcon,
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
import { config } from "../../../../constants";
import darkMode from "../../../../styles/darkMode.module.scss";
import lightMode from "../../../../styles/lightMode.module.scss";
import { MentionsInput, Mention } from "react-mentions";
import { searchTagUsers } from "../../../../stores/user/UserActions";
import { searchTagParticipants } from "../../../../stores/user/UserActions";
import { encodeQuery, renderCommentText, getLocationOrigin } from "../../../../utils";
import { chatApi } from "../../../../api";
import { configureAbly } from "@ably-labs/react-hooks";
import { getCookie } from "cookies-next";
import router from "next/router";

function Footer({
  setReply,
  reply,
  messages,
  receiver,
  getMessages,
  room,
  fetchRoomMessages,
  replyMessage,
  setReplyMessage,
  setLoad,
  setRepliedUser,
  repliedUser,
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
          // setShowGifs(false);
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

  const handleSendMessage = async (e: any = null) => {
    setLoad(true);
    setInput("");
    if (e) {
      e.preventDefault();
    }
    if (!isEmpty(replyMessage)) {
      if (!isEmpty(receiver)) {
        if (isEmpty(messages)) {
          await dispatch(createChat(receiver?.id));
        }
        if (uploadedImage) {
          await dispatch(
            createMessage({
              receiver_id: receiver?.id,
              image: uploadedImage,
              reply: replyMessage?.id,
            })
          ).then(() => {
            setUploadedImage("");
            getMessages();
            setReply(false);
          });
        } else if (gifUrl.length > 0) {
          await dispatch(
            createMessage({
              receiver_id: receiver?.id,
              gif: gifUrl,
              reply: replyMessage?.id,
            })
          ).then(() => {
            setGifUrl("");
            getMessages();
            setReply(false);
          });
        } else if (!isEmpty(input)) {
          await dispatch(
            createMessage({
              receiver_id: receiver?.id,
              content: input,
              reply: replyMessage?.id,
            })
          ).then(() => {
            setInput("");
            getMessages();
            setReply(false);
          });
        }
      }
      if (!isEmpty(room)) {
        if (uploadedImage) {
          await dispatch(
            createChatroomMessage(room?.roomId, {
              image: uploadedImage,
              user_id: authUser?.id,
              reply: replyMessage?.id,
            })
          ).then(() => {
            setUploadedImage("");
            fetchRoomMessages();
            setReply(false);
          });
        } else if (gifUrl.length > 0) {
          await dispatch(
            createChatroomMessage(room?.roomId, {
              gif: gifUrl,
              user_id: authUser?.id,
              reply: replyMessage?.id,
            })
          ).then(() => {
            setGifUrl("");
            fetchRoomMessages();
            setReply(false);
          });
        } else if (!isEmpty(input)) {
          await dispatch(
            createChatroomMessage(room?.roomId, {
              content: input,
              user_id: authUser?.id,
              reply: replyMessage?.id,
            })
          ).then(() => {
            setInput("");
            fetchRoomMessages();
            setReply(false);
          });
        }
      }
      setReplyMessage();
      setRepliedUser();
    } else {
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
    }
  };

  const [data, setData] = useState<any>([]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);

    // Split the text into lines
    const lines = textArea.value.split("\n");

    // Set the number of rows based on the number of lines
    textArea.rows = Math.min(maxRows, lines.length);

    event.target.style.height = "auto";
    // event.target.style.height = `${textArea.scrollHeight}px`;
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode == 13 && event.shiftKey) {
      return;
    }
    if (event.key === "Enter") {
      // 👇 Get input value
      handleSendMessage(event);
    }
  };

  const handleSearch = async (e: any) => {
    dispatch(
      searchTagParticipants(room?.roomId, {
        search: e,
      })
    ).then((res: any) => setData(res));
  };

  const createGroupCall = async () => {
    let result = await chatApi.createGroupCall({
      room_id: room?.roomId,
      call_type: "video",
    });
    localStorage.setItem("call", JSON.stringify(result?.call));

    configureAbly({
      authUrl: `${config.url.API_URL}/call/token/generate/${result?.call?.id}`,
      authHeaders: {
        Authorization: "Bearer " + getCookie("token"),
      },
    });
    let constraints = {
      video: true,
      audio: true,
      screen: false,
    };
    var link =`${getLocationOrigin()}/dashboard/video?${encodeQuery(result?.call?.room_id, "call")}`;

    await dispatch(
      createChatroomMessage(room?.roomId, {
        content: link,
        user_id: authUser?.id,
      })
    ).then(() => {
      setInput("");
      fetchRoomMessages();
    });
      console.log("send");
      await navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        router
          .replace(
            `/dashboard/video?${encodeQuery(result?.call?.room_id, "call")}`
          )
          .then(() => router.reload());
      });
   
  };
  return (
    <>
      {reply && (
        <div className="relative flex items-center h-auto w-full dark:bg-darkgray bg-gray-50 p-1 z-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start justify-start rounded-[3px] bg-gray-200 dark:bg-lightgray w-[90%] space-y-1 p-2 border-l-2 border-orange-500">
              <p className="text-sm">
                @{isEmpty(repliedUser) ? authUser?.name : repliedUser}
              </p>
              <p className="text-sm w-fit max-w-full break-words whitespace-pre-line">
                {renderCommentText(replyMessage?.content)}
              </p>
              {/* <div className="flex items-center justify-start mt-2">
                <img
                  src="/images/bg.jpg"
                  className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md"
                />
              </div> */}
              <div className="flex items-center justify-start mt-2">
                {replyMessage?.imgName != null && (
                  <img
                    src={`${config.url.PUBLIC_URL}/${replyMessage?.imgName}`}
                    className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md"
                  />
                )}
                {replyMessage?.gif != null && (
                  <img
                    src={replyMessage?.gif}
                    className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-center w-[10%]">
              <div
                onClick={() => {
                  setReply(false), setReplyMessage(), setRepliedUser();
                }}
                className="p-1 rounded-full hover:bg-gray-200  dark:hover:bg-lightgray cursor-pointer"
              >
                <XMarkIcon className="w-7 h-7" />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between sticky bottom-0 h-auto w-full dark:bg-darkgray bg-gray-50">
        <div className="flex space-x-1 p-1 w-full">
          <form
            onKeyDown={(e) => handleKeyDown(e)}
            className="w-[65%] md:w-[75%] lg:w-[80%]"
          >
            {isEmpty(room) && (
              <textarea
                className="flex items-center justify-center resize-none w-full p-[10px] text-gray-700 dark:text-white bg-gray-200 dark:bg-[#343434] rounded-md outline-none"
                value={input}
                onChange={handleChange}
                placeholder="Send a message"
                rows={1}
                id="myTextArea"
              />
            )}
            {!isEmpty(room) && (
              <>
                <div className="hidden dark:flex dark:w-full">
                  <MentionsInput
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    classNames={darkMode}
                    placeholder="Send a message"
                  >
                    <Mention
                      className={`${darkMode.mentions__mention}`}
                      trigger="@"
                      data={data}
                      markup="@@@______id____^^______display____@@@^^^"
                    />
                    <Mention
                      className={`${darkMode.mentions__mention}`}
                      trigger="@"
                      data={(e) => {
                        handleSearch(e);
                      }}
                      markup="@@@______id____^^______display____@@@^^^"
                    />
                  </MentionsInput>
                </div>
                <div className="dark:hidden w-full">
                  <MentionsInput
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    classNames={lightMode}
                    placeholder="Send a message"
                  >
                    <Mention
                      className={`${lightMode.mentions__mention}`}
                      trigger="@"
                      data={data}
                      markup="@@@______id____^^______display____@@@^^^"
                    />
                    <Mention
                      trigger="@"
                      data={(e) => {
                        handleSearch(e);
                      }}
                      markup="@@@______id____^^______display____@@@^^^"
                    />
                  </MentionsInput>
                </div>
              </>
            )}
          </form>
          <div className="flex flex-1 relative items-end justify-center space-x-2 text-[#181c44] dark:text-white pb-2">
            {showGifs && (
              <div className="absolute right-0 bottom-10 z-20 p-1 bg-white dark:bg-darkgray border border-gray-200 dark:border-lightgray rounded-lg">
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
              <div className="absolute right-0 bottom-10 z-20">
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
            <PaperAirplaneIcon
              onClick={() => handleSendMessage()}
              className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
            />

            <PhoneIcon
              onClick={() => createGroupCall()}
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
      </div>
    </>
  );
}

export default Footer;
