import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
  GifIcon,
  PaperAirplaneIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { isEmpty } from "lodash";
import { config } from "../../constants";
import {
  deleteComment,
  dislikeComment,
  dislikeReply,
  editComment,
  fetchCommentInfo,
  fetchIsDislikedComment,
  fetchIsLikedComment,
  fetchReplyInfo,
  likeComment,
  likeReply,
  replyComment,
} from "../../stores/comment/CommentActions";
import Picker from "@emoji-mart/react";
import ReactGiphySearchbox from "react-giphy-searchbox";
import { encodeQuery } from "../../utils";
import { toast } from "react-hot-toast";

interface Pic {
  name: string;
}

interface Comment {
  content: string;
  createdAt: string;
  userId: number;
  id: string;
  otherUser: User;
  gif: string;
  imgName: string;
}

interface Info {
  likes: number;
  dislikes: number;
  replies: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  profilePicId: number;
  bannerPicId: number;
  profilePic: Pic;
  frameName: string;
  level: number;
}

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  hasImg: boolean;
  userId: number;
  gif: string;
  user: User;
}

interface Props {
  comment: Comment;
  post: Post;
  type: string;
  refetchComments: () => void;
}

function CommentSection({ comment, post, type, refetchComments }: Props) {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { error } = useAppSelector((state) => state.commentReducer);
  const [info, setInfo] = useState<Info>();

  const [input, setInput] = useState<string>("");
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [editPopUp, setEditPopUp] = useState<boolean>(false);
  const [textArea, setTextArea] = useState<string>("");

  //************************** Image Handeling **************************//
  //************************** Image Handeling **************************//
  //************************** Image Handeling **************************//

  const inputPicture = useRef<HTMLInputElement | null>(null);
  let [image, setImage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [uploadedVideo, setUploadedVideo] = useState<string>("");
  const [imageEdit, setImageEdit] = useState<string>("");
  const [uploadedEdit, setUploadedEdit] = useState<string>("");

  // useEffect(() => {
  //   if (!isEmpty(error)) {
  //     toast.error(error);
  //   }
  // }, [error]);

  const onUploadPictureClick = () => {
    // `current` points to the mounted file input element
    if (inputPicture.current) {
      inputPicture.current.click();
    }
  };

  const handleUploadPicture = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setUploadedImage(e.target.files[0]);
  };

  const closePicture = () => {
    image = "";
    setImage(image);
    setUploadedImage("");
    setUploadedVideo("");
  };

  const handleUploadProfile = (e: any) => {
    setImageEdit(URL.createObjectURL(e.target.files[0]));
    setUploadedEdit(e.target.files[0]);
  };

  //************************** GIF Handeling **************************//
  //************************** GIF Handeling **************************//
  //************************** GIF Handeling **************************//

  const [showGifs, setShowGifs] = useState<boolean>(false);
  const [showEditGifs, setShowEditGifs] = useState<boolean>(false);

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
  const [gifEditBoxIsOpen, setGifEditBoxIsOpen] = useState<boolean>(false);
  //Set a color for the frame

  let [gifUrl, setGifUrl] = useState<string>("");
  const addGif = (gify: any) => {
    if (gifBoxIsOpen === false) {
      setGifBoxIsOpen(!gifBoxIsOpen);
    }
    console.log(gify);
    let gifUrl = gify.images.downsized.url;
    setGifUrl(gifUrl);
    setUploadedVideo(gify.images.downsized);
  };

  const closeGif = () => {
    gifUrl = "";
    setGifUrl(gifUrl);
    setGifBoxIsOpen(!gifBoxIsOpen);
  };

  let [editGifUrl, setEditGifUrl] = useState<string>("");
  const editGif = (gify: any) => {
    if (gifBoxIsOpen === false) {
      setGifEditBoxIsOpen(!gifEditBoxIsOpen);
    }
    let gifUrl = gify.images.downsized.url;
    setEditGifUrl(gifUrl);
    setUploadedVideo(gify.images.downsized);
  };

  //************************** Emojie Handeling **************************//
  //************************** Emojie Handeling **************************//
  //************************** Emojie Handeling **************************//

  const emoji = useRef<any>(null);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);

  useEffect(() => {
    // only add the event listener when the emoji is opened
    if (!showEmojis) return;
    function handleClick(event: any) {
      if (emoji.current && !emoji.current.contains(event.target)) {
        setShowEmojis(false);
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

  const [isLiked, setIsLiked] = useState<boolean>();
  const [isDisliked, setIsDisliked] = useState<boolean>();

  useEffect(() => {
    if (!isEmpty(comment)) {
      fetchInfo();
      fetchLiked();
      fetchDisliked();
    }
  }, [comment]);

  const fetchInfo = async () => {
    if ("comment" === type) {
      await dispatch(fetchCommentInfo(comment?.id)).then((result: any) => {
        setInfo(result);
      });
    } else {
      await dispatch(fetchReplyInfo(comment?.id)).then((result: any) => {
        setInfo(result);
      });
    }
  };

  const handleLikeComment = async () => {
    if ("comment" === type) {
      dispatch(
        likeComment({
          comment_id: comment?.id,
          user_id: authUser?.id,
        })
      ).then(() => {
        fetchLiked();
        fetchDisliked();
        fetchInfo();
      });
    } else {
      dispatch(
        likeReply({
          reply_id: comment?.id,
          user_id: authUser?.id,
        })
      ).then(() => {
        fetchLiked();
        fetchDisliked();
        fetchInfo();
      });
    }
  };

  const handleDislikeComment = async () => {
    if ("comment" === type) {
      dispatch(
        dislikeComment({
          comment_id: comment?.id,
          user_id: authUser?.id,
        })
      ).then(() => {
        fetchLiked();
        fetchDisliked();
        fetchInfo();
      });
    } else {
      dispatch(
        dislikeReply({
          reply_id: comment?.id,
          user_id: authUser?.id,
        })
      ).then(() => {
        fetchLiked();
        fetchDisliked();
        fetchInfo();
      });
    }
  };

  const handleComment = () => {
    setCommentBoxVisible(!commentBoxVisible);
  };

  const fetchLiked = async () => {
    if ("comment" === type) {
      await dispatch(fetchIsLikedComment(comment?.id)).then((result: any) => {
        setIsLiked(result);
      });
    }
  };

  const fetchDisliked = async () => {
    if ("comment" === type) {
      await dispatch(fetchIsDislikedComment(comment?.id)).then(
        (result: any) => {
          setIsDisliked(result);
        }
      );
    }
  };

  const handleAddReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (image.length > 0) {
      await dispatch(
        replyComment({
          user_id: authUser?.id,
          content: input,
          comment_id: comment?.id,
          post_id: post?.id,
          image: uploadedImage,
        })
      ).then(() => {
        setInput("");
        closePicture();
        fetchInfo();
      });
    } else if (gifUrl.length > 0) {
      await dispatch(
        replyComment({
          user_id: authUser?.id,
          content: input,
          comment_id: comment?.id,
          post_id: post?.id,
          gif: gifUrl,
        })
      ).then(() => {
        setInput("");
        closeGif();
        fetchInfo();
      });
    } else {
      await dispatch(
        replyComment({
          user_id: authUser?.id,
          content: input,
          comment_id: comment?.id,
          post_id: post?.id,
        })
      ).then(() => {
        setInput("");
        fetchInfo();
      });
    }
  };

  const inputFileContent = useRef<HTMLInputElement | null>(null);

  const onContentClick = () => {
    // `current` points to the mounted file input element
    if (inputFileContent.current) {
      inputFileContent.current.click();
    }
  };

  const handleDeleteComment = async () => {
    await dispatch(deleteComment(comment?.id)).then(() => {
      refetchComments();
    });
  }

  const handleEditComment = async () => {
    if (uploadedEdit) {
      await dispatch(
        editComment(comment?.id, {
          content: textArea,
          image: uploadedEdit,
        })
      ).then(() => {
        refetchComments();
        setEditPopUp(!editPopUp);
        setUploadedEdit("");
        setImageEdit("");
      });
    } else if (editGifUrl) {
      await dispatch(
        editComment(comment?.id, {
          content: textArea,
          gif: editGifUrl,
        })
      ).then(() => {
        refetchComments();
        setEditPopUp(!editPopUp);
        setEditGifUrl("");
      });
    } else {
      await dispatch(
        editComment(comment?.id, {
          content: textArea,
        })
      ).then(() => {
        refetchComments();
        setEditPopUp(!editPopUp);
      });
    }
  }

  return (
    <div className="relative border-b dark:border-lightgray flex flex-col hover:bg-gray-100 dark:hover:bg-lightgray p-4">
      <Link
        href={{
          pathname: "/dashboard/post/comment",
          query: { commentId: comment?.id, postId: post?.id },
        }}
        as={`/dashboard/post/comment?${encodeQuery(
          comment?.id,
          "comment"
        )}&${encodeQuery(post?.id, "post")}`}
        className="flex flex-col space-y-1 w-full"
      >
        <div className="flex justify-between w-full">
          <div className="flex space-x-[4px]">
            <Link
              href={{
                pathname: "/dashboard/profile",
                query: { user_id: comment?.otherUser?.id },
              }}
              as={`/dashboard/profile?${encodeQuery(
                comment?.otherUser?.id,
                "profile"
              )}`}
              className="flex flex-col group"
            >
              <div className={`relative rounded-md`}>
                <Image
                  src={
                    !isEmpty(comment?.otherUser?.frameName)
                      ? `/${comment?.otherUser?.frameName}`
                      : "/images/frames/frame4.jpg"
                  }
                  alt="pfp"
                  className="relative w-16 h-16 border-white"
                  width={2000}
                  height={2000}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto w-[55px] h-[55px] bg-white dark:bg-darkgray">
                  <Image
                    src={
                      !isEmpty(comment?.otherUser?.profilePic)
                        ? `${config.url.PUBLIC_URL}/${comment?.otherUser?.profilePic?.name}`
                        : "/images/pfp/pfp1.jpg"
                    }
                    alt="pfp"
                    className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto w-[50px] h-[50px] z-0 rounded-sm"
                    width={2000}
                    height={2000}
                  />
                </div>
                <div className={`absolute -bottom-2 -left-3 flex rounded-lg`}>
                  <div className="relative">
                    <Image
                      src={
                        !isEmpty(comment?.otherUser?.frameName)
                          ? `/${comment?.otherUser?.frameName}`
                          : "/images/frames/frame4.jpg"
                      }
                      alt="pfp"
                      className="relative w-7 h-7"
                      width={2000}
                      height={2000}
                    />
                    <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto z-[1] w-[24px] h-[24px] flex items-center justify-center text-black dark:text-white font-semibold text-sm bg-white dark:bg-darkgray">
                      {comment?.otherUser?.level}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex flex-col items-start space-y-1">
              <p className="mr-1 text-xs md:text-base font-semibold">
                @{comment?.otherUser?.name}
              </p>
              <TimeAgo
                date={comment?.createdAt}
                className="text-xs md:text-sm text-gray-500"
              />
            </div>
          </div>
          {
            comment?.otherUser?.id === authUser?.id &&
            <div className="flex space-x-2">
              <div
                onClick={async (e) => {
                  setEditPopUp(!editPopUp);
                  e.preventDefault();
                }}
                className="flex items-center justify-center bg-gray-100 dark:bg-lightgray h-fit rounded-md p-1"
              >
                <PencilSquareIcon className="w-5 h-5 cursor-pointer" />
              </div>
              <div
                onClick={async (e) => {
                  setDeletePopUp(!deletePopUp);
                  e.preventDefault();
                }}
                className="flex items-center justify-center bg-gray-100 dark:bg-lightgray h-fit rounded-md p-1"
              >
                <TrashIcon className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          }
        </div>
        <div className="w-full">
          <div className="flex flex-col items-start justify-start py-2">
            <p className="text-sm md:text-base">{comment?.content}</p>
            {comment?.imgName != null ? (
              <img
                src={`${config.url.PUBLIC_URL}/${comment?.imgName}`}
                alt="Post"
                className="m-5 ml-0 mb-1 rounded-lg max-w-full object-contain shadow-sm"
              />
            ) : null}
            {comment?.gif != null ? (
              <img
                src={comment?.gif}
                alt="gif"
                className="m-5 ml-0 mb-1 rounded-lg max-w-full object-contain shadow-sm"
              />
            ) : null}
          </div>
        </div>
      </Link>
      <div
        className={`flex justify-between mt-2 ${commentBoxVisible ? "hidden" : "flex"
          }`}
      >
        <div className="flex">
          <div className="flex cursor-pointer items-center md:space-x-1 text-gray-400 hover:text-black dark:hover:text-white">
            <p
              className={`text-xs ${isLiked ? "text-green-600" : "group-hover:text-green-600"
                }`}
            >
              {info?.likes != null || undefined ? info?.likes : 0}
            </p>
            <ArrowUpIcon
              className={`h-4 w-4 cursor-pointer ${isLiked ? "text-green-600" : "group-hover:text-green-600"
                } transition-transform ease-out duration-150 hover:scale-150`}
              onClick={() => handleLikeComment()}
            />
          </div>
          <div className="flex cursor-pointer items-center md:space-x-1 text-gray-400 hover:text-black dark:hover:text-white">
            <ArrowDownIcon
              className={`h-4 w-4 cursor-pointer ${isDisliked ? "text-red-600" : "group-hover:text-red-600"
                } transition-transform ease-out duration-150 hover:scale-150`}
              onClick={() => handleDislikeComment()}
            />
            <p
              className={`text-xs ${isDisliked ? "text-red-600" : "group-hover:text-red-600"
                }`}
            >
              {info?.dislikes != null || undefined ? info?.dislikes : 0}
            </p>
          </div>
          {"comment" === type && (
            <div className="flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white">
              <ChatBubbleBottomCenterTextIcon
                onClick={() => handleComment()}
                className="h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150"
              />
              <p className="text-xs">
                {info?.replies != null || undefined ? info?.replies : 0}
              </p>
            </div>
          )}
          {/* <div className="flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white">
            <ShareIcon className="h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150" />
            <p className="text-xs">1</p>
          </div> */}
        </div>
      </div>
      {commentBoxVisible && (
        <form
          onSubmit={handleAddReply}
          className="flex items-start justify-center w-full"
        >
          <div className="flex flex-col items-end justify-center w-full">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-lg bg-gray-200 dark:bg-lightgray dark:group-hover:bg-darkgray p-2 outline-none w-full"
              type="text"
              placeholder="Write a comment..."
            />
            <div className="flex items-center justify-between w-full py-3">
              <div className="flex">
                <div className="flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black dark:hover:text-white">
                  <p
                    className={`text-xs ${isLiked ? "text-green-600" : "group-hover:text-green-600"
                      }`}
                  >
                    {info?.likes != null || undefined ? info?.likes : 0}
                  </p>
                  <ArrowUpIcon
                    className={`h-4 w-4 cursor-pointer ${isLiked ? "text-green-600" : "group-hover:text-green-600"
                      } transition-transform ease-out duration-150 hover:scale-150`}
                    onClick={() => handleLikeComment()}
                  />
                </div>
                <div className="flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black dark:hover:text-white">
                  <ArrowDownIcon
                    className={`h-4 w-4 cursor-pointer ${isDisliked ? "text-red-600" : "group-hover:text-red-600"
                      } transition-transform ease-out duration-150 hover:scale-150`}
                    onClick={() => handleDislikeComment()}
                  />
                  <p
                    className={`text-xs ${isDisliked ? "text-red-600" : "group-hover:text-red-600"
                      }`}
                  >
                    {info?.dislikes != null || undefined ? info?.dislikes : 0}
                  </p>
                </div>
                {"comment" === type && (
                  <div className="flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white">
                    <ChatBubbleBottomCenterTextIcon
                      onClick={() => handleComment()}
                      className="h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150"
                    />
                    <p className="text-xs">
                      {info?.replies != null || undefined ? info?.replies : 0}
                    </p>
                  </div>
                )}
                <div className="flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white">
                  <ShareIcon className="h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150" />
                  <p className="text-xs">1</p>
                </div>
              </div>
              <div className="flex items-end justify-end relative space-x-1 md:space-x-2 text-[#181c44] dark:text-white">
                {!gifUrl && (
                  <PhotoIcon
                    onClick={() => onUploadPictureClick()}
                    className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                  />
                )}
                <input
                  type="file"
                  id="file"
                  ref={inputPicture}
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadPicture}
                />
                <FaceSmileIcon
                  ref={emoji}
                  onClick={() => setShowEmojis(!showEmojis)}
                  className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                />
                {showEmojis && (
                  <div className="absolute right-0 bottom-6 z-40">
                    <Picker
                      onEmojiSelect={addEmoji}
                      theme="dark"
                      set="apple"
                      icons="outline"
                      previewPosition="none"
                      size="1em"
                      perLine="6"
                      maxFrequentRows="2"
                      searchPosition="none"
                    />
                  </div>
                )}
                <div ref={gif}>
                  {!image && (
                    <GifIcon
                      onClick={() => setShowGifs((b) => !b)}
                      className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                    />
                  )}
                  {showGifs && (
                    <div className="absolute right-0 bottom-6 z-[1] p-2 bg-white dark:bg-darkgray border border-gray-200 dark:border-lightgray rounded-lg">
                      <ReactGiphySearchbox
                        apiKey="MfOuTXFXq8lOxXbxjHqJwGP1eimMQgUS" // Required: get your on https://developers.giphy.com
                        onSelect={(item: any) => addGif(item)}
                        mansonryConfig={[
                          { columns: 2, imageWidth: 140, gutter: 10 },
                          {
                            mq: "700px",
                            columns: 3,
                            imageWidth: 200,
                            gutter: 10,
                          },
                          {
                            mq: "1000px",
                            columns: 4,
                            imageWidth: 220,
                            gutter: 10,
                          },
                        ]}
                        wrapperClassName="p-4"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {image && (
              <div className="relative w-full mt-2">
                <img
                  className="max-w-full max-h-[300px] h-auto object-contain rounded-md"
                  src={image}
                  alt=""
                />
                <div
                  onClick={() => closePicture()}
                  className="flex items-center justify-center absolute top-2 left-2 w-7 h-7 rounded-full p-1 cursor-pointer bg-white dark:bg-lightgray hover:bg-gray-200 dark:hover:bg-darkgray"
                >
                  <XMarkIcon className="w-5 h-5" />
                </div>
                <hr className="mt-4 mb-4"></hr>
              </div>
            )}
            {gifBoxIsOpen && (
              <div className="relative w-full">
                <img
                  src={gifUrl}
                  className="rounded-lg max-w-full h-auto"
                  width="200px"
                  height="200px"
                />
                <div
                  onClick={() => closeGif()}
                  className="flex items-center justify-center absolute top-2 left-2 w-7 h-7 rounded-full p-1 cursor-pointer bg-white dark:bg-lightgray hover:bg-gray-200 dark:hover:bg-darkgray"
                >
                  <XMarkIcon className="w-5 h-5" />
                </div>
                <hr className="mt-4 mb-4"></hr>
              </div>
            )}
          </div>
          <button
            disabled={!input && !image && !gifUrl}
            type="submit"
            className="text-blockd font-semibold disabled:text-gray-200 dark:disabled:text-gray-700 p-2 rounded-full disabled:hover:bg-transparent hover:bg-orange-500 hover:text-white"
          >
            <span className="hidden md:inline">Comment</span>
            <span className="flex md:hidden">
              <PaperAirplaneIcon className="w-5 h-5" />
            </span>
          </button>
        </form>
      )}
      <div
        className={`fixed top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-md bg-white/60 z-50 overflow-scroll scrollbar-hide ${deletePopUp ? "" : "hidden"
          }`}
      >
        <div className="relative w-full rounded-lg shadow-lg max-w-md h-auto bg-gray-50 m-6">
          <div className="relative bg-gray-50 rounded-t-lg">
            <button
              type="button"
              onClick={() => setDeletePopUp(!deletePopUp)}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4">
              <h3 className="text-xl font-medium text-gray-900">
                Delete Comment
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-start p-4 border-y text-black">
            Are you sure you want to delete this comment ?
          </div>
          <div className="flex items-center justify-end space-x-3 p-4">
            <p 
            className="p-2 cursor-pointer rounded-2xl bg-blockd hover:bg-orange-600 text-white"
            onClick={() => handleDeleteComment()}
            >
              Delete
            </p>

            <p
              onClick={() => setDeletePopUp(!deletePopUp)}
              className="p-2 cursor-pointer rounded-2xl bg-gray-400 hover:bg-gray-500 text-white"
            >
              Cancel
            </p>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 p-4 flex items-center justify-center min-h-screen w-full h-full scrollbar-hide overflow-scroll backdrop-blur-md bg-white/60 z-50 ${
          editPopUp ? "" : "hidden"
        }`}
      >
        <div className="relative w-full rounded-lg shadow-lg max-w-md scrollbar-hide overflow-scroll h-fit max-h-full bg-gray-50">
          <div className="sticky top-0 left-0 z-[1] flex items-center justify-between p-4 border-b backdrop-blur-md bg-white/30">
            <div className="">
              <h3 className="text-xl font-medium text-gray-900">Edit Post</h3>
            </div>
            <button
              type="button"
              onClick={() => setEditPopUp(!editPopUp)}
              className="bg-white rounded-full text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="flex flex-col items-start justify-start p-4 border-y space-y-4 w-full">
            <div className="flex items-start justify-start space-y-2 w-full">
              <div className="relative flex items-center justify-center w-full group">
                {editGifUrl ? (
                  <img
                    src={editGifUrl}
                    alt="gif"
                    className="max-w-full h-auto group-hover:opacity-50 rounded-lg"
                    width="720"
                    height="350"
                    onClick={() => setShowEditGifs((b) => !b)}
                  />
                ) : !isEmpty(comment?.gif) ? (
                  <img
                    src={comment?.gif}
                    alt="gif"
                    className="max-w-full h-auto group-hover:opacity-50 rounded-lg"
                    width="720"
                    height="350"
                    onClick={() => setShowEditGifs((b) => !b)}
                  />
                ) : imageEdit ? (
                  <img
                    src={imageEdit}
                    alt="Content"
                    className="max-w-full h-auto group-hover:opacity-50 rounded-lg"
                    width="720"
                    height="350"
                    onClick={() => onContentClick()}
                  />
                ) : !isEmpty(comment?.imgName) ? (
                  <img
                    src={`${config.url.PUBLIC_URL}/${comment?.imgName}`}
                    alt="Content"
                    className="max-w-full h-auto group-hover:opacity-50 rounded-lg"
                    width="720"
                    height="350"
                    onClick={() => onContentClick()}
                  />
                ) : (
                  <img
                    src="/images/blockdbg.jpg"
                    alt="Content"
                    className="max-w-full h-auto group-hover:opacity-50 rounded-lg"
                    width="720"
                    height="350"
                    onClick={() => onContentClick()}
                  />
                )}
                <input
                  type="file"
                  id="file"
                  ref={inputFileContent}
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadProfile}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start space-y-2 w-full relative">
              {showEditGifs && (
                <div className="absolute right-0 bottom-6 z-[1] p-2 bg-white dark:bg-darkgray border border-gray-200 dark:border-lightgray rounded-lg">
                  <ReactGiphySearchbox
                    apiKey="MfOuTXFXq8lOxXbxjHqJwGP1eimMQgUS" // Required: get your on https://developers.giphy.com
                    onSelect={(item: any) => {
                      editGif(item), setShowEditGifs(false);
                    }}
                    masonryConfig={[
                      { columns: 2, imageWidth: 110, gutter: 5 },
                      {
                        mq: "700px",
                        columns: 3,
                        imageWidth: 110,
                        gutter: 5,
                      },
                    ]}
                    wrapperClassName="p-4"
                  />
                </div>
              )}
              <p className="font-semibold text-black">Description</p>
              <textarea
                id="message"
                maxLength={255}
                value={textArea}
                onChange={(e: any) => setTextArea(e.target.value)}
                data-rows="4"
                className="h-24 p-2 bg-gray-200 text-black outline-none rounded-lg w-full"
                placeholder="Current Post description"
              ></textarea>
            </div>
          </div>
          <div className="sticky bottom-0 flex items-center justify-end space-x-3 p-2 bg-white">
            <p
              className="p-2 px-4 cursor-pointer rounded-2xl bg-blockd hover:bg-orange-600 text-white"
              onClick={() => handleEditComment()}
            >
              Save
            </p>
            <p
              onClick={() => setEditPopUp(!editPopUp)}
              className="p-2 cursor-pointer rounded-2xl bg-gray-400 hover:bg-gray-500 text-white"
            >
              Cancel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
