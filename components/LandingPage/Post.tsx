import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  XMarkIcon,
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
  sharePost,
  fetchPost,
} from "../../stores/post/PostActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { isEmpty, merge } from "lodash";
import { config } from "../../constants";
import toast, { Toaster } from "react-hot-toast";
import {
  followUser,
  searchFilteredUsers,
  searchTagUsers,
} from "../../stores/user/UserActions";
import { useCopyToClipboard } from "usehooks-ts";
import {
  encodeQuery,
  getDiffTime,
  renderCommentText,
  renderUnauthComment,
} from "../../utils";
import { MentionsInput, Mention } from "react-mentions";
import Linkify from "react-linkify";
import { renderComment } from "../../utils";
// @ts-ignore
import renderHTML from "react-render-html";
import lightMode from "../../styles/lightMode.module.scss";

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
  score: number;
  level: number;
  frameName: string;
}

interface Image {
  name: string;
}
interface Video {
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
  otherUser: User;
  postVideo: Video;
  postImage: Image;
  profilePic: any;
  bannerPic: any;
  sharedPostId: number;
  suggestion: number;
}

interface Info {
  likes: number;
  comments: number;
  dislikes: number;
  shares: number;
}

interface Props {
  mainPost: Post;
  refetch: () => void;
  search: boolean;
}

export default function PostTest({ mainPost, refetch, search = false }: Props) {
  let [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { tagUsers } = useAppSelector((state) => state.userReducer);
  const { error } = useAppSelector((state) => state.postReducer);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [textArea, setTextArea] = useState<string>("");
  const [imageEdit, setImageEdit] = useState<string>("");
  const [uploadedEdit, setUploadedEdit] = useState<string>("");
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [sharePopUp, setSharePopUp] = useState<boolean>(false);
  const [editPopUp, setEditPopUp] = useState<boolean>(false);
  const [info, setInfo] = useState<Info>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isDisliked, setIsDisliked] = useState<boolean>();
  const [value, copy] = useCopyToClipboard();
  const [sharedPost, setSharedPost] = useState<any>();
  const [sharedText, setSharedText] = useState<string>("");

  const dropdown = useRef<any>(null);

  useEffect(() => {
    fetchInfo();
    fetchLiked();
    // setImageEdit(mainPost?.postImage ? mainPost?.postImage?.name : "");
    setTextArea(mainPost?.content || "");
    setSharedPost(null);
    fetchDisliked();
    if (mainPost?.sharedPostId) {
      fetchPostById();
    }
  }, [mainPost]);

  const fetchPostById = async () => {
    await dispatch(fetchPost(mainPost?.sharedPostId)).then((result: any) => {
      setSharedPost(result);
    });
  };

  const fetchInfo = async () => {
    await dispatch(fetchPostInfo(mainPost?.id)).then((result: any) => {
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

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image.length > 0) {
      await dispatch(
        addComment({
          user_id: authUser?.id,
          public: 1,
          image: uploadedImage,
          content: input,
          post_id: mainPost?.id,
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
          post_id: mainPost?.id,
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
          post_id: mainPost?.id,
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
        post_id: mainPost?.id,
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
        post_id: mainPost?.id,
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
  const [data, setData] = useState<any>([]);
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
    setUploadedEdit(e.target.files[0]);
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

  const gifEdit = useRef<any>(null);

  useEffect(() => {
    // only add the event listener when the gif is opened
    if (!showEditGifs) return;
    function handleClick(event: any) {
      if (showEditGifs === true) {
        if (gifEdit.current && !gifEdit.current.contains(event.target)) {
          setShowEditGifs(false);
        }
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showEditGifs]);

  const [gifBoxIsOpen, setGifBoxIsOpen] = useState<boolean>(false);
  const [gifEditBoxIsOpen, setGifEditBoxIsOpen] = useState<boolean>(false);
  //Set a color for the frame

  let [gifUrl, setGifUrl] = useState<string>("");
  const addGif = (gify: any) => {
    if (gifBoxIsOpen === false) {
      setGifBoxIsOpen(!gifBoxIsOpen);
    }
    let gifUrl = gify.images.downsized.url;
    setGifUrl(gifUrl);
    setUploadedVideo(gify.images.downsized);
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

  //************************** Share Handeling **************************//
  //************************** Share Handeling **************************//
  //************************** Share Handeling **************************//

  const [shareBoxVisible, setShareBoxVisible] = useState<boolean>(false);

  const share = useRef<any>(null);

  useEffect(() => {
    // only add the event listener when the shareis opened
    if (!shareBoxVisible) return;
    function handleClick(event: any) {
      if (shareBoxVisible === true) {
        if (share.current && !share.current.contains(event.target)) {
          setShareBoxVisible(false);
        }
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [shareBoxVisible]);

  //************************** Backend Handeling **************************//
  //************************** Backend Handeling **************************//
  //************************** Backend Handeling **************************//

  const handleEditPost = async () => {
    if (uploadedEdit) {
      await dispatch(
        editPost(mainPost?.id, {
          content: textArea,
          image: uploadedEdit,
        })
      ).then(() => {
        refetch();
        setEditPopUp(!editPopUp);
        setUploadedEdit("");
        setImageEdit("");
      });
    } else if (editGifUrl) {
      await dispatch(
        editPost(mainPost?.id, {
          content: textArea,
          gif: editGifUrl,
        })
      ).then(() => {
        refetch();
        setEditPopUp(!editPopUp);
        setEditGifUrl("");
      });
    } else {
      await dispatch(
        editPost(mainPost?.id, {
          content: textArea,
        })
      ).then(() => {
        refetch();
        setEditPopUp(!editPopUp);
      });
    }
  };

  const closeGif = () => {
    gifUrl = "";
    setGifUrl(gifUrl);
    setGifBoxIsOpen(!gifBoxIsOpen);
  };
  const addView = async () => {
    await dispatch(addPostView(mainPost?.id));
  };

  const handleDeletePost = async () => {
    //@ts-ignore
    await dispatch(deletePost(mainPost?.id)).then(async (res: any) => {
      if (res?.errors) {
        await new Promise((f) => setTimeout(f, 1000));
        toast.error(res?.errors);
        return;
      } else {
        setDeletePopUp(false);
        refetch();
      }
    });
  };

  const fetchLiked = async () => {
    await dispatch(fetchIsLiked(mainPost?.id)).then((result: any) => {
      setIsLiked(result);
    });
  };

  const fetchDisliked = async () => {
    await dispatch(fetchIsDisliked(mainPost?.id)).then((result: any) => {
      setIsDisliked(result);
    });
  };

  const handleFollowUser = async () => {
    await dispatch(
      followUser({
        user_id: mainPost?.otherUser?.id,
      })
    ).then(() => {
      toast.success("User Followed!", {
        duration: 4000,
      });
    });
  };

  const handleSharePost = async () => {
    if (!isEmpty(sharedText)) {
      await dispatch(
        sharePost({
          content: sharedText,
          post_id: mainPost?.id,
          public: 1,
        })
      ).then(() => {
        setSharePopUp(!sharePopUp);
        refetch();
      });
    } else {
      await dispatch(
        sharePost({
          post_id: mainPost?.id,
          public: 1,
        })
      ).then(() => {
        setSharePopUp(!sharePopUp);
        refetch();
      });
    }
  };

  const componentDecorator = (href: string, text: string, key: number) => {
    return (
      <a
        onClick={async (e) => {
          e.stopPropagation();
        }}
        href={href}
        key={key}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-blue-400"
      >
        {text}
      </a>
    );
  };

  const handleSearch = async (e: any) => {
    dispatch(
      searchTagUsers({
        search: e,
      })
    ).then((res: any) => setData(res));
  };

  return (
    <div className="relative w-full border dark:border-lightgray hover:bg-gray-100 dark:hover:bg-[#1F2022] rounded-lg p-1 py-2 mb-2">
      <div className="w-full flex">
        <div className="flex flex-col px-4 w-full">
          <Link
            href={{
              pathname: "/auth/signup",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2">
                <div className="flex">
                  <Link
                    href={{
                      pathname: "/auth/signup",
                    }}
                    className="relative flex flex-col w-fit h-fit group"
                  >
                    <div className={`relative rounded-md`}>
                      <Image
                        src={
                          !isEmpty(mainPost?.otherUser?.frameName)
                            ? `/${mainPost?.otherUser?.frameName}`
                            : "/images/frames/frame4.jpg"
                        }
                        alt="pfp"
                        className="relative w-16 h-16"
                        width={2000}
                        height={2000}
                      />
                      <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto w-[55px] h-[55px] z-0 shadow-sm bg-white dark:bg-lightgray p-2">
                        <Image
                          src={
                            !isEmpty(mainPost?.otherUser?.profilePic)
                              ? `${config.url.PUBLIC_URL}/${mainPost?.otherUser?.profilePic?.name}`
                              : "/images/pfp/pfp1.jpg"
                          }
                          alt="pfp"
                          className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto w-[50px] h-[50px] object-cover z-0 rounded-sm"
                          width={2000}
                          height={2000}
                        />
                      </div>

                      <div
                        className={`absolute -bottom-3 -left-3 flex rounded-lg`}
                      >
                        <div className="relative">
                          <Image
                            src={
                              !isEmpty(mainPost?.otherUser?.frameName)
                                ? `/${mainPost?.otherUser?.frameName}`
                                : "/images/frames/frame4.jpg"
                            }
                            alt="pfp"
                            className="relative w-7 h-7"
                            width={2000}
                            height={2000}
                          />
                          <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto z-[1] w-[24px] h-[24px] flex items-center justify-center text-black dark:text-white font-semibold text-xs bg-white dark:bg-[#1F2022]">
                            {mainPost?.otherUser?.level}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flex flex-col items-start justify-center space-y-1">
                  <div className="flex items-center space-x-1">
                    <Link
                      href={{
                        pathname: "/auth/signup",
                      }}
                    >
                      <p className="mr-1 font-semibold text-xs md:text-sm">
                        @{mainPost?.otherUser?.name}
                      </p>
                    </Link>
                  </div>
                  {/* <div>
                  <p className="text-xs md:text-sm text-gray-500">0 followers</p>
                </div> */}
                  <div>
                    <p className="text-xs text-gray-500">
                      {moment(mainPost?.createdAt).fromNow()}
                    </p>
                  </div>
                  {mainPost?.profilePic == 1 && (
                    <div>
                      <p className="text-xs text-gray-500">
                        Changed their profile picture.
                      </p>
                    </div>
                  )}
                  {mainPost?.bannerPic == 1 && (
                    <div>
                      <p className="text-xs text-gray-500">
                        Changed their banner picture.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center space-y-2 w-full mt-6">
              <Link
                href={{
                  pathname: "/auth/signup",
                }}
              >
                <div className="w-full flex flex-col items-start justify-start">
                  {mainPost?.content != null && (
                    <p className="text-sm whitespace-normal break-words w-fit max-w-full">
                      <Linkify componentDecorator={componentDecorator}>
                        {renderHTML(renderUnauthComment(mainPost?.content))}
                      </Linkify>
                    </p>
                  )}
                  {mainPost?.postImage != null ? (
                    <img
                      src={`${config.url.PUBLIC_URL}/${mainPost?.postImage?.name}`}
                      alt="Post"
                      className="mt-2 mb-1 rounded-lg max-w-full object-contain max-h-[400px] shadow-sm"
                    />
                  ) : null}
                   {mainPost?.postVideo != null ? (
                      <video
                        src={`${config.url.PUBLIC_URL}/${mainPost?.postVideo?.name}`}
                        controls
                         autoPlay 
                        className="mt-2 mb-1 rounded-lg max-w-full object-contain max-h-[400px] shadow-sm"
                      />
                    ) : null}
                  {mainPost?.gif != null ? (
                    <img
                      src={mainPost?.gif}
                      alt="gif"
                      className="m-5 ml-0 mb-1 rounded-lg max-w-full object-contain max-h-[400px] shadow-sm"
                    />
                  ) : null}
                </div>
              </Link>
            </div>
            {!isEmpty(sharedPost) && (
              <div className="relative w-full border dark:border-lightgray hover:bg-gray-100 dark:hover:bg-[#1F2022] rounded-lg p-2 px-5 mb-2 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-2">
                    <div className="flex">
                      <Link
                        href={{
                          pathname: "/auth/signup",
                        }}
                        className="relative flex flex-col w-fit h-fit group"
                      >
                       
                        <div className={`relative rounded-md`}>
                          <Image
                            src={
                              !isEmpty(sharedPost?.otherUser?.frameName)
                                ? `/${sharedPost?.otherUser?.frameName}`
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
                                !isEmpty(sharedPost?.otherUser?.profilePic)
                                  ? `${config.url.PUBLIC_URL}/${sharedPost?.otherUser?.profilePic?.name}`
                                  : "/images/pfp/pfp1.jpg"
                              }
                              alt="pfp"
                              className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto w-[50px] h-[50px] object-cover z-0 rounded-sm"
                              width={2000}
                              height={2000}
                            />
                          </div>
                          <div
                            className={`absolute -bottom-3 -left-3 flex rounded-lg`}
                          >
                            <div className="relative">
                              <Image
                                src={
                                  !isEmpty(sharedPost?.otherUser?.frameName)
                                    ? `/${sharedPost?.otherUser?.frameName}`
                                    : "/images/frames/frame4.jpg"
                                }
                                alt="pfp"
                                className="relative w-7 h-7"
                                width={2000}
                                height={2000}
                              />
                              <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto w-[24px] h-[24px] z-[1] flex items-center justify-center text-black dark:text-white font-semibold text-sm bg-white dark:bg-darkgray">
                                {sharedPost?.otherUser?.level}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="flex flex-col items-start justify-center space-y-1">
                      <div className="flex items-center space-x-1">
                        <Link
                          href={{
                            pathname: "/auth/signup",
                          }}
                        >
                          <p className="mr-1 font-semibold text-xs md:text-base">
                            @{sharedPost?.otherUser?.name}
                          </p>
                        </Link>
                      </div>
                      {/* <div>
                  <p className="text-xs md:text-sm text-gray-500">0 followers</p>
                </div> */}
                      <div>
                        <p className="text-xs text-gray-500">
                          {moment(sharedPost?.createdAt).fromNow()}
                        </p>
                      </div>
                      {sharedPost?.profilePic == 1 && (
                        <div>
                          <p className="text-xs text-gray-500">
                            Changed their profile picture.
                          </p>
                        </div>
                      )}
                      {sharedPost?.bannerPic == 1 && (
                        <div>
                          <p className="text-xs text-gray-500">
                            Changed their banner picture.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center space-y-2 w-full">
                  <Link
                    href={{
                      pathname: "/auth/signup",
                    }}
                    className="w-full flex flex-col items-start justify-start mt-6"
                  >
                    {sharedPost?.content != null && (
                      <p className="text-sm whitespace-normal break-words w-fit max-w-full">
                        <Linkify componentDecorator={componentDecorator}>
                          {renderHTML(renderUnauthComment(sharedPost?.content))}
                        </Linkify>
                      </p>
                    )}
                    {sharedPost?.postImage != null ? (
                      <img
                        src={`${config.url.PUBLIC_URL}/${sharedPost?.postImage?.name}`}
                        alt="Post"
                        className="mt-2 mb-1 rounded-lg max-w-full object-contain max-h-[400px] shadow-sm"
                      />
                    ) : null}
                    {sharedPost?.postVideo != null ? (
                      <video
                        src={`${config.url.PUBLIC_URL}/${sharedPost?.postVideo?.name}`}
                        controls
                        autoPlay
                     muted
                        className="mt-2 mb-1 rounded-lg max-w-full object-contain max-h-[400px] shadow-sm"
                      />
                    ) : null}
                    {sharedPost?.gif != null ? (
                      <img
                        src={sharedPost?.gif}
                        alt="gif"
                        className="m-5 ml-0 mb-1 rounded-lg max-w-full object-contain max-h-[400px] shadow-sm"
                      />
                    ) : null}
                  </Link>
                </div>
              </div>
            )}
          </Link>

          <div className="flex items-center justify-start mt-4 mb-2 p-3 border border-gray-50 bg-gray-50 dark:bg-lightgray dark:border-lightgray rounded-md">
            <div className="flex items-center justify-between w-full space-x-2">
              <Link
                className="flex cursor-pointer items-center space-x-2 text-gray-400 hover:text-green-600 group"
                href="/auth/signup"
              >
                <div
                  className={`p-1 border rounded-md dark:border-gray-400 group-hover:border-green-600`}
                >
                  <ArrowUpIcon className={`h-4 w-4 cursor-pointer`} />
                </div>
                <p className={`text-xs group-hover:text-green-600`}>
                  {info?.likes != null || undefined ? info?.likes : 0}
                </p>
              </Link>
              <Link
                className="flex cursor-pointer items-center space-x-2 text-gray-400 hover:text-red-600 group"
                href="/auth/signup"
              >
                <div
                  className={`p-1 border rounded-md dark:border-gray-400 group-hover:border-red-600`}
                >
                  <ArrowDownIcon
                    className={`h-4 w-4 cursor-pointer group-hover:text-red-600 `}
                  />
                </div>
                <p className={`text-xs group-hover:text-red-600`}>
                  {info?.dislikes != null || undefined ? info?.dislikes : 0}
                </p>
              </Link>
              <Link
                href="/auth/signup"
                className="flex cursor-pointer items-center space-x-2 text-gray-400 hover:text-black dark:hover:text-white group"
              >
                <div className="p-1 border rounded-md group-hover:border-black dark:border-gray-400 dark:group-hover:border-white">
                  <ChatBubbleBottomCenterTextIcon className="h-4 w-4 cursor-pointer" />
                </div>
                <p className="text-xs">
                  {info?.comments != null || undefined ? info?.comments : 0}
                </p>
              </Link>
              {isEmpty(sharedPost) && null == mainPost?.suggestion && (
                <Link
                  href="/auth/signup"
                  className="relative flex cursor-pointer items-center space-x-2 text-gray-400 hover:text-black dark:hover:text-white group"
                >
                  <div className="p-1 border rounded-md group-hover:border-black dark:border-gray-400 dark:group-hover:border-white">
                    <ShareIcon ref={share} className="h-4 w-4 cursor-pointer" />
                  </div>
                  <p className="text-xs">
                    {info?.shares != null || undefined ? info?.shares : 0}
                  </p>
                  {shareBoxVisible && (
                    <div className="absolute bottom-8 right-0 z-10 w-28 mt-1 bg-white dark:bg-lightgray rounded-md shadow-lg">
                      <div
                        onClick={() =>
                          copy(
                            `${config.url.DASHBOARD_URL}/post?postId=${mainPost?.id}`
                          )
                        }
                        className="block p-4 text-sm dark:hover:bg-darkgray/50 rounded-t-md bg-transparent hover:bg-gray-100"
                      >
                        Copy Link
                      </div>
                      <div className="block p-4 text-sm dark:hover:bg-darkgray/50 rounded-b-md bg-transparent hover:bg-gray-100">
                        Share post
                      </div>
                    </div>
                  )}
                </Link>
              )}
            </div>
          </div>

          {image && (
            <div className="relative w-full mt-2">
              <img
                className="max-w-full max-h-[300px] h-auto object-contain rounded-md"
                src={image}
                alt=""
              />
              <div className="flex items-center justify-center absolute top-2 left-2 w-7 h-7 rounded-full p-1 cursor-pointer bg-white dark:bg-lightgray hover:bg-gray-200 dark:hover:bg-darkgray">
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
              <div className="flex items-center justify-center absolute top-2 left-2 w-7 h-7 rounded-full p-1 cursor-pointer bg-white dark:bg-lightgray hover:bg-gray-200 dark:hover:bg-darkgray">
                <XMarkIcon className="w-5 h-5" />
              </div>
              <hr className="mt-4 mb-4"></hr>
            </div>
          )}
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-md bg-white/60 z-50 overflow-scroll scrollbar-hide ${
          deletePopUp ? "" : "hidden"
        }`}
      >
        <Link
          href={{
            pathname: "/auth/signup",
          }}
        >
          <div className="relative w-full rounded-lg shadow-lg max-w-md h-auto bg-gray-50 m-6">
            <div className="relative bg-gray-50 rounded-t-lg">
              <button
                type="button"
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
                  Delete Post
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-start p-4 border-y text-black">
              Are you sure you want to delete this post ?
            </div>
            <div className="flex items-center justify-end space-x-3 p-4">
              <p className="p-2 cursor-pointer rounded-2xl bg-blockd hover:bg-orange-600 text-white">
                Delete
              </p>

              <p className="p-2 cursor-pointer rounded-2xl bg-gray-400 hover:bg-gray-500 text-white">
                Cancel
              </p>
            </div>
          </div>
        </Link>
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
          =
          <Link
            href={{
              pathname: "/auth/signup",
            }}
          >
            <div className="sticky bottom-0 flex items-center justify-end space-x-3 p-2 bg-white">
              <p className="p-2 px-4 cursor-pointer rounded-2xl bg-blockd hover:bg-orange-600 text-white">
                Save
              </p>
              <p className="p-2 cursor-pointer rounded-2xl bg-gray-400 hover:bg-gray-500 text-white">
                Cancel
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 p-4 flex items-center justify-center min-h-screen w-full h-full backdrop-blur-md bg-white/60 z-50 overflow-scroll scrollbar-hide ${
          sharePopUp ? "" : "hidden"
        }`}
      >
        <div className="w-full rounded-lg shadow-lg max-w-md scrollbar-hide overflow-scroll h-auto max-h-[90vh] bg-gray-50">
          <div className="sticky top-0 left-0 z-[1] flex items-center justify-between p-4 border-b backdrop-blur-md bg-white/30">
            <div className="">
              <h3 className="text-xl font-medium text-gray-900">Share Post</h3>
            </div>
            <Link
              href={{
                pathname: "/auth/signup",
              }}
            >
              <button
                type="button"
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
            </Link>
          </div>
          <div className="flex flex-col items-start justify-start p-4 border-y space-y-2 w-full">
            <div className="flex flex-col items-start justify-start space-y-2 w-full">
              <p className="font-semibold text-black">Add a caption</p>
              <div className="w-full mt-1 mb-3">
                <MentionsInput
                  value={sharedText}
                  onChange={(e) => setSharedText(e.target.value)}
                  classNames={lightMode}
                  placeholder="Add a caption"
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
            </div>
            <div className="flex items-start justify-start border-t w-full py-2 space-x-3">
              <div
                className={`relative flex flex-col p-1 ${mainPost?.otherUser?.frameName} rounded-lg`}
              >
                <img
                  src={
                    !isEmpty(mainPost?.otherUser?.profilePic)
                      ? `${config.url.PUBLIC_URL}/${mainPost?.otherUser?.profilePic?.name}`
                      : "/images/pfp/pfp1.jpg"
                  }
                  alt="pfp"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-md shadow-sm object-cover"
                />
                <div
                  className={`absolute -bottom-3 -left-2 flex p-1 w-7 h-7 ${
                    !isEmpty(mainPost?.otherUser?.frameName)
                      ? mainPost?.otherUser?.frameName
                      : "bg-blue-300"
                  } rounded-lg`}
                >
                  <div className="flex items-center justify-center text-black font-semibold rounded-md w-full h-full text-xs bg-white ">
                    {mainPost?.otherUser?.level}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start h-full pt-1">
                <p className="text-sm text-black">
                  @{mainPost?.otherUser?.name}
                </p>
                <p className="text-xs text-black">
                  {moment(mainPost?.createdAt).fromNow()}
                </p>
              </div>
            </div>
            {mainPost?.postImage != null ? (
              <img
                src={`${config.url.PUBLIC_URL}/${mainPost?.postImage?.name}`}
                alt="Content"
                className="max-w-full object-contain max-h-[400px] group-hover:opacity-50 rounded-lg"
              />
            ) : null}
            {mainPost?.postVideo != null ? (
                      <video
                        src={`${config.url.PUBLIC_URL}/${mainPost?.postVideo?.name}`}
                        controls
                        autoPlay
                     
                       muted
                        className="mt-2 mb-1 rounded-lg max-w-full object-contain max-h-[400px] shadow-sm"
                      />
                    ) : null}
            {mainPost?.gif != null ? (
              <img
                src={mainPost?.gif}
                alt="gif"
                className="max-w-full object-contain max-h-[400px] group-hover:opacity-50 rounded-lg"
              />
            ) : null}
            {!isEmpty(mainPost?.content) && (
              <p className="text-sm text-black whitespace-normal break-words w-fit max-w-full">
                {renderHTML(renderComment(mainPost?.content))}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end space-x-3 p-2">
            <p className="p-2 px-4 cursor-pointer rounded-2xl bg-blockd hover:bg-orange-600 text-white">
              Share
            </p>
            <p className="p-2 cursor-pointer rounded-2xl bg-gray-400 hover:bg-gray-500 text-white">
              Cancel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
