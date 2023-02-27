import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  FaceSmileIcon,
  PhotoIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
  CameraIcon,
  GifIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Picker from "@emoji-mart/react";
import moment from "moment";
import { addComment } from "../../stores/comment/CommentActions";
import {
  fetchPostInfo,
  likePost,
  dislikePost,
  addPostView,
  deletePost,
  fetchIsLiked,
  fetchIsDisliked,
  editPost,
} from "../../stores/post/PostActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { isEmpty } from "lodash";
import { config } from "../../constants";
import ReactGiphySearchbox from "react-giphy-searchbox";
import toast, { Toaster } from "react-hot-toast";

interface Pic {
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profilePicId: number;
  bannerPicId: number;
  profilePic: Pic;
}

interface Image {
  name: string;
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
  images: Image[];
}

interface Info {
  likes: number;
  comments: number;
  dislikes: number;
  shares: number;
}

interface Props {
  post: Post;
  refetch: () => void;
}

export default function PostTest({ post, refetch }: Props) {
  let [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [textArea, setTextArea] = useState<string>("");
  const [imageEdit, setImageEdit] = useState<string>("");
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [editPopUp, setEditPopUp] = useState<boolean>(false);
  const [info, setInfo] = useState<Info>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isDisliked, setIsDisliked] = useState<boolean>();

  const dropdown = useRef<any>(null);

  useEffect(() => {
    fetchInfo();
    fetchLiked();
    setImageEdit(post?.images ? post?.images[0]?.name : "");
    setTextArea(post?.content || "");

    fetchDisliked();
  }, [post]);

  const fetchInfo = async () => {
    await dispatch(fetchPostInfo(post?.id)).then((result: any) => {
      setInfo(result);
    });
  };

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!isDropdownVisible) return;
    function handleClick(event: any) {
      if (isDropdownVisible === true) {
        if (dropdown.current && !dropdown.current.contains(event.target)) {
          setIsDropdownVisible(false);
        }
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [isDropdownVisible]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image.length > 0) {
      await dispatch(
        addComment({
          user_id: authUser?.id,
          public: 1,
          image: uploadedImage,
          content: input,
          post_id: post?.id,
        })
      ).then(() => {
        fetchInfo();
        closePicture();
        setInput("");
      });
    } else if (gifUrl.length > 0) {
      await dispatch(
        addComment({
          user_id: authUser?.id,
          public: 1,
          content: input,
          post_id: post?.id,
          gif: gifUrl,
        })
      ).then(() => {
        fetchInfo();
        setInput("");
        closeGif();
      });
    } else {
      await dispatch(
        addComment({
          user_id: authUser?.id,
          content: input,
          post_id: post?.id,
        })
      ).then(() => {
        fetchInfo();
        setInput("");
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

  const handleLikePost = async () => {
    dispatch(
      likePost({
        post_id: post?.id,
        user_id: authUser?.id,
      })
    ).then(() => {
      fetchInfo();
      fetchLiked();
      fetchDisliked();
    });
  };

  const handleDislikePost = async () => {
    dispatch(
      dislikePost({
        post_id: post?.id,
        user_id: authUser?.id,
      })
    ).then(() => {
      fetchInfo();
      fetchLiked();
      fetchDisliked();
    });
  };

  //************************** Image Handeling **************************//
  //************************** Image Handeling **************************//
  //************************** Image Handeling **************************//

  const inputPicture = useRef<HTMLInputElement | null>(null);
  let [image, setImage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [uploadedVideo, setUploadedVideo] = useState<string>("");

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

  const handleUploadProfile = (e: any) => {
    setImageEdit(URL.createObjectURL(e.target.files[0]));
  };

  const closePicture = () => {
    image = "";
    setImage(image);
    setUploadedImage("");
    setUploadedVideo("");
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

  const handleEditPost = async () => {
    await dispatch(
      editPost(post?.id, {
        content: textArea,
      })
    ).then(() => {
      refetch();
      setEditPopUp(!editPopUp);
    });
  };

  const closeGif = () => {
    gifUrl = "";
    setGifUrl(gifUrl);
    setGifBoxIsOpen(!gifBoxIsOpen);
  };
  const addView = async () => {
    await dispatch(addPostView(post?.id));
  };

  const handleDeletePost = async () => {
    //@ts-ignore
    await dispatch(deletePost(post?.id)).then((async (res: any) => {
      if (res?.errors) {
        console.log('res: ', res);
        await new Promise((f) => setTimeout(f, 1000));
        toast.error(res?.errors);
        return;
      } else {
        setDeletePopUp(false);
        refetch();
      }
    }));
  };

  const fetchLiked = async () => {
    await dispatch(fetchIsLiked(post?.id)).then((result: any) => {
      setIsLiked(result);
    });
  };

  const fetchDisliked = async () => {
    await dispatch(fetchIsDisliked(post?.id)).then((result: any) => {
      setIsDisliked(result);
    });
  };

  return (
    <div className="relative w-full border dark:border-lightgray hover:bg-gray-100 dark:hover:bg-lightgray rounded-lg p-1 py-2 mb-2">
      {/* <>
        {" "}
        <Toaster />
      </> */}
      <div className="w-full flex">
        <div className="flex flex-col px-4 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-2">
              <div className="flex">
                <Link
                  href={{
                    pathname: "/dashboard/profile",
                    query: { user_id: post?.user?.id },
                  }}
                  className="relative flex flex-col w-fit h-fit group"
                >
                  <div className="relative flex flex-col p-1 animate-colorChange rounded-lg">
                    <img
                      src={
                        !isEmpty(post?.user?.profilePic)
                          ? `${config.url.PUBLIC_URL}/${post?.user?.profilePic?.name}`
                          : "/images/pfp/pfp1.jpg"
                      }
                      alt="pfp"
                      className="w-12 md:w-16 md:h-16 rounded-md shadow-sm"
                    />
                    <div className="absolute -bottom-3 -left-2 flex p-1 w-7 h-7 animate-colorChange rounded-lg">
                      <div className="flex items-center justify-center text-black font-semibold rounded-md w-full h-full text-xs bg-white ">
                        0
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col items-start justify-center space-y-1">
                <div className="flex items-center space-x-1">
                  <Link
                    href={{
                      pathname: "/dashboard/profile",
                      query: { user_id: post?.user?.id },
                    }}
                  >
                    <p className="mr-1 font-semibold text-xs md:text-base">
                      @{post?.user?.name}
                    </p>
                  </Link>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">0 followers</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    {moment(post?.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start h-full justify-center space-x-2">
              <div
                ref={dropdown}
                className="flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-darkgray"
              >
                <EllipsisHorizontalIcon
                  onClick={() => setIsDropdownVisible((b) => !b)}
                  className="w-6 h-6 md:w-7 md:h-7 cursor-pointer"
                />
                <div className="relative z-0 flex ite">
                  <ul
                    className={`absolute top-5 right-0 w-32 cursor-pointer bg-white dark:bg-lightgray rounded-lg shadow-xl ${isDropdownVisible ? "" : "hidden"
                      }`}
                  >
                    {post?.userId === authUser?.id && (
                      <div
                        onClick={() => setEditPopUp(!editPopUp)}
                        className="flex items-center justify-start p-3 hover:bg-gray-200  hover:rounded-t-md dark:hover:bg-darkgray/50"
                      >
                        Edit Post
                      </div>
                    )}
                    {post?.userId !== authUser?.id && (
                      <>
                        <div className="flex items-center justify-start p-3 hover:bg-gray-200 dark:hover:bg-darkgray/50">
                          Report Post
                        </div>
                        <div className="flex items-center justify-start p-3 hover:bg-gray-200 hover:rounded-b-md dark:hover:bg-darkgray/50">
                          Follow Post
                        </div>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              {post?.userId === authUser?.id && (
                <div className="flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-darkgray">
                  <XMarkIcon
                    onClick={() => setDeletePopUp(!deletePopUp)}
                    className="w-5 h-5 md:w-7 md:h-7 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center space-y-2 w-full">
            <Link
              href={{
                pathname: "/dashboard/post/",
                query: { postId: post?.id },
              }}
              onClick={() => addView()}
              className="w-full flex flex-col items-start justify-start"
            >
              <p className="pt-8 text-sm lg:text-base">{post?.content}</p>
              {post?.images != null ? (
                <img
                  src={`${config.url.PUBLIC_URL}/${post?.images[0]?.name}`}
                  alt="Post"
                  className="m-5 ml-0 mb-1 rounded-lg max-w-full object-contain shadow-sm"
                />
              ) : null}
              {post?.gif != null ? (
                <img
                  src={post?.gif}
                  alt="gif"
                  className="m-5 ml-0 mb-1 rounded-lg max-w-full object-contain shadow-sm"
                />
              ) : null}
            </Link>
          </div>
          <div
            className={`flex items-center justify-start mt-4 mb-2 ${commentBoxVisible ? "hidden" : ""
              }`}
          >
            <div className="flex">
              <div className="flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-green-600 group">
                <p
                  className={`text-xs ${isLiked ? "text-green-600" : "group-hover:text-green-600"
                    }`}
                >
                  {info?.likes != null || undefined ? info?.likes : 0}
                </p>
                <ArrowUpIcon
                  className={`h-5 w-5 cursor-pointer ${isLiked ? "text-green-600" : "group-hover:text-green-600"
                    } transition-transform ease-out duration-150 hover:scale-150`}
                  onClick={() => handleLikePost()}
                />
              </div>
              <div className="flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-red-600 group">
                <ArrowDownIcon
                  className={`h-5 w-5 cursor-pointer ${isDisliked ? "text-red-600" : "group-hover:text-red-600"
                    } transition-transform ease-out duration-150 hover:scale-150`}
                  onClick={() => handleDislikePost()}
                />
                <p
                  className={`text-xs ${isDisliked ? "text-red-600" : "group-hover:text-red-600"
                    }`}
                >
                  {info?.dislikes != null || undefined ? info?.dislikes : 0}
                </p>
              </div>
              <div
                onClick={() => setCommentBoxVisible(!commentBoxVisible)}
                className="flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white"
              >
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150" />
                <p className="text-xs">
                  {info?.comments != null || undefined ? info?.comments : 0}
                </p>
              </div>
              <div className="flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white">
                <ShareIcon className="h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150" />
                <p className="text-xs">
                  {info?.shares != null || undefined ? info?.shares : 0}
                </p>
              </div>
            </div>
          </div>
          {commentBoxVisible && (
            <form onSubmit={handleAddComment} className="mt-3 flex space-x-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-lg bg-gray-200 dark:bg-darkgray p-2 outline-none"
                type="text"
                placeholder="Write a comment..."
              />
              <button
                disabled={!input && !image && !gifUrl}
                type="submit"
                className="text-blockd font-semibold disabled:text-gray-200 dark:disabled:text-gray-700 p-1 rounded-full disabled:hover:bg-transparent hover:bg-orange-500 hover:text-white"
              >
                <span className="hidden md:inline">Comment</span>
                <span className="flex md:hidden">
                  <PaperAirplaneIcon className="w-5 h-5" />
                </span>
              </button>
            </form>
          )}
          {commentBoxVisible && (
            <div className="flex items-center justify-between py-3">
              <div className="flex">
                <div className="flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-green-600 group">
                  <p
                    className={`text-xs ${info?.likes
                      ? "text-green-600"
                      : "group-hover:text-green-600"
                      } `}
                  >
                    {info?.likes != null || undefined ? info?.likes : 0}
                  </p>
                  <ArrowUpIcon
                    className={`h-5 w-5 cursor-pointer ${info?.likes
                      ? "text-green-600"
                      : "group-hover:text-green-600"
                      } transition-transform ease-out duration-150 hover:scale-150`}
                    onClick={() => handleLikePost()}
                  />
                </div>
                <div className="flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-red-600 group">
                  <ArrowDownIcon
                    className={`h-5 w-5 cursor-pointer ${info?.dislikes
                      ? "text-red-600"
                      : "group-hover:text-red-600"
                      } transition-transform ease-out duration-150 hover:scale-150`}
                    onClick={() => handleDislikePost()}
                  />
                  <p
                    className={`text-xs ${info?.dislikes
                      ? "text-red-600"
                      : "group-hover:text-red-600"
                      } `}
                  >
                    {info?.dislikes != null || undefined ? info?.dislikes : 0}
                  </p>
                </div>
                <div
                  onClick={() => setCommentBoxVisible(!commentBoxVisible)}
                  className="flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white"
                >
                  <ChatBubbleBottomCenterTextIcon className="h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150" />
                  <p className="text-xs">
                    {info?.comments != null || undefined ? info?.comments : 0}
                  </p>
                </div>
                {/* <div className="flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white">
                  <ShareIcon className="h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150" />
                  <p className="text-xs">
                    {info?.shares != null || undefined ? info?.shares : 0}
                  </p>
                </div> */}
              </div>
              <div className="flex items-center justify-end relative space-x-2 pr-12 md:pr-24 text-[#181c44] dark:text-white flex-1">
                <PhotoIcon
                  onClick={() => onUploadPictureClick()}
                  className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                />
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
                  <div className="absolute right-0 bottom-6 z-0">
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
          )}
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
      </div>
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
              <h3 className="text-xl font-medium text-gray-900">Delete Post</h3>
            </div>
          </div>
          <div className="flex items-center justify-start p-4 border-y text-black">
            Are you sure you want to delete this post ?
          </div>
          <div className="flex items-center justify-end space-x-3 p-4">
            <p
              onClick={() => handleDeletePost()}
              className="p-2 cursor-pointer rounded-2xl bg-blockd hover:bg-orange-600 text-white"
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
        className={`fixed top-0 left-0 p-4 flex items-stretch justify-center min-h-screen w-full h-full backdrop-blur-md bg-white/60 z-50 overflow-scroll scrollbar-hide ${editPopUp ? "" : "hidden"
          }`}
      >
        <div className="w-full rounded-lg shadow-lg max-w-md  scrollbar-hide overflow-scroll h-full bg-gray-50">
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
          </div>
          <div className="flex flex-col items-start justify-start p-4 border-y space-y-4 w-full">
            <div className="flex items-start justify-start space-y-2 w-full">
              <div className="relative flex items-center justify-center w-full group">
                {imageEdit ? (
                  <img
                    src={`${config.url.PUBLIC_URL}/${imageEdit}`}
                    alt="Content"
                    className="max-w-full h-auto group-hover:opacity-50 rounded-lg"
                    width="720"
                    height="350"
                  />
                ) : (
                  <img
                    src="/images/blockdbg.jpg"
                    alt="Content"
                    className="max-w-full h-auto group-hover:opacity-50 rounded-lg"
                    width="720"
                    height="350"
                  />
                )}
                {/* <div
                  onClick={() => onContentClick()}
                  className="group-hover:flex items-center justify-center absolute top-50 left-50 hidden cursor-pointer w-10 h-10 p-2 bg-white rounded-full"
                >
                  <CameraIcon className="w-8 h-8 text-black" />
                </div> */}
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
            {/* <div className="flex flex-col items-start justify-start space-y-2 w-full">
              <p className="font-semibold text-black">Title</p>
              <input
                className="p-2 bg-gray-200 outline-none rounded-lg w-full"
                placeholder="Current Title"
              />
            </div> */}
            <div className="flex flex-col items-start justify-start space-y-2 w-full">
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
          <div className="flex items-center justify-end space-x-3 p-2">
            <p
              className="p-2 px-4 cursor-pointer rounded-2xl bg-blockd hover:bg-orange-600 text-white"
              onClick={() => handleEditPost()}
            >
              Edit
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
