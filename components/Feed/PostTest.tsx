import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import TimeAgo from 'react-timeago'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  FaceSmileIcon,
  PhotoIcon,
  EllipsisHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Picker from '@emoji-mart/react'
import moment from 'moment'
import { addComment } from '../../stores/comment/CommentActions'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}

interface Props {
  post: Post;
}

function PostTest({ post }: Props) {

  let [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dispatch = useAppDispatch()
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [textArea, setTextArea] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [showEmojis, setShowEmojis] = useState<boolean>(false)
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false)
  const [editPopUp, setEditPopUp] = useState<boolean>(false)

  const dropdown = useRef<any>(null);

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

  const emoji = useRef<any>(null);

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

  const imageInputRef = useRef<HTMLInputElement>(null)

  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await dispatch(addComment({
      user_id: authUser?.id,
      content: input,
      post_id: post?.id
    })).then(() => {
      setInput('');
    });
  }

  const addImageToPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageUrlBoxIsOpen(false);
  }

  const addEmoji = (e: any) => {
    const sym = e.unified.split("-")
    const codesArray: any[] = []
    sym.forEach((el: any) => codesArray.push("0x" + el))
    const emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  return (
    <div className='relative flex space-x-3 border dark:border-lightgray hover:bg-gray-100 dark:hover:bg-lightgray rounded-lg p-1 py-2 mb-2'>
      <div className='w-full flex'>
        <div className='flex flex-col px-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-start space-x-2'>
              <div className='flex'>
                <Link href="/dashboard/profile" className='relative flex flex-col w-fit h-fit group'>
                  <div className='relative flex flex-col p-1 animate-colorChange rounded-lg'>
                    <Image
                      src="/images/pfp/pfp2.jpg"
                      alt='pfp'
                      className='min-w-16 min-h-16 rounded-md shadow-sm'
                      width={60}
                      height={60} />
                    <div className='absolute -bottom-3 -left-2 flex p-1 w-7 h-7 animate-colorChange rounded-lg'>
                      <div className='flex items-center justify-center text-black font-semibold rounded-md w-full h-full text-xs bg-white '>
                        15
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='flex flex-col items-start justify-center space-y-1'>
                <div className='flex items-center space-x-1'>
                  <p className='mr-1 font-semibold text-l'>@Egoist</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>14K followers</p>
                </div>
                <div>
                  <p className='text-xs text-gray-500'>{moment(post?.createdAt).fromNow()}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center space-x-2'>
              <div ref={dropdown} className='flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-darkgray'>
                <EllipsisHorizontalIcon onClick={() => setIsDropdownVisible(b => !b)} className='w-7 h-7 cursor-pointer' />
                <div className='relative z-0 flex ite'>
                  <ul className={`absolute top-5 right-0 w-32 cursor-pointer bg-white dark:bg-lightgray rounded-lg shadow-xl ${isDropdownVisible ? '' : 'hidden'}`}>
                    <div onClick={() => setEditPopUp(!editPopUp)} className="flex items-center justify-start p-3 hover:bg-gray-200  hover:rounded-t-md dark:hover:bg-darkgray/50">Edit Post</div>
                    <div className="flex items-center justify-start p-3 hover:bg-gray-200 dark:hover:bg-darkgray/50">Report Post</div>
                    <div className="flex items-center justify-start p-3 hover:bg-gray-200 hover:rounded-b-md dark:hover:bg-darkgray/50">Follow Post</div>
                  </ul>
                </div>
              </div>
              <div className='flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-darkgray'>
                <XMarkIcon onClick={() => setDeletePopUp(!deletePopUp)} className='w-7 h-7 cursor-pointer' />
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start justify-center space-y-2 w-full'>
            <p className='pt-8 font-semibold'>{post?.content}</p>
            <Link href="/dashboard/post">
              <img
                src="/images/Post1.jpg"
                alt='Post'
                className='m-5 ml-0 mb-1 rounded-lg w-full max-h-80 shadow-sm'
                width={2000}
                height={2000} />
            </Link>
          </div>
          <div className='flex items-center justify-start mt-4 mb-2'>
            <div className='flex'>
              <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-green-600 group'>
                <p className='text-xs group-hover:text-green-600'>{post?.likes}</p>
                <ArrowUpIcon className='h-5 w-5 cursor-pointer hover:text-green-600 transition-transform ease-out duration-150 hover:scale-150' />
              </div>
              <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-red-600 group'>
                <ArrowDownIcon className='h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                <p className='text-xs group-hover:text-red-600'>10K</p>
              </div>
              <div onClick={() => setCommentBoxVisible(!commentBoxVisible)} className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white'>
                <ChatBubbleBottomCenterTextIcon className='h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                <p className='text-xs'>{post?.comments}</p>
              </div>
              <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white'>
                <ShareIcon className='h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                <p className='text-xs'>10</p>
              </div>
            </div>
          </div>
          {commentBoxVisible && (
            <form onSubmit={handleAddComment} className='mt-3 flex space-x-3'>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='flex-1 rounded-lg bg-gray-200 dark:bg-darkgray p-2 outline-none'
                type="text"
                placeholder='Write a comment...'
              />
              <button
                disabled={!input}
                type="submit"
                className='text-blockd font-semibold disabled:text-gray-200 dark:disabled:text-lightgray'>Post
              </button>
            </form>
          )}
          {commentBoxVisible && (
            <div className='flex items-center justify-end'>
              <div className='flex items-center justify-end relative space-x-2 pr-10 text-[#181c44] dark:text-white flex-1 mt-2'>
                <PhotoIcon
                  onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                  className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'
                />
                <FaceSmileIcon
                  ref={emoji}
                  onClick={() => setShowEmojis(!showEmojis)}
                  className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                {showEmojis && (
                  <div className='absolute right-0 top-7 z-0'>
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
              </div>
            </div>
          )}
          {imageUrlBoxIsOpen && (
            <form className='rounded-lg mt-3 flex bg-blockd/80 py-2 px-4'>
              <input
                ref={imageInputRef}
                className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white'
                type="text"
                placeholder='Enter Image URL...'
              />
              <button
                type='submit'
                onClick={addImageToPost}
                className='font-bold text-white'
              >
                Add Image
              </button>
            </form>
          )}
          {image && (
            <img className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg' src={image} alt='' />
          )}
        </div>
      </div>
      <div className={`absolute -top-20 flex items-start justify-center z-50 w-full p-4 h-modal h-full ${deletePopUp ? '' : 'hidden'}`}>
        <div className="relative w-full h-full rounded-lg shadow-lg max-w-md md:h-auto bg-gray-50 dark:bg-lightgray dark:border dark:border-darkgray ">
          <div className="relative bg-gray-50 rounded-t-lg dark:bg-lightgray">
            <button type="button" onClick={() => setDeletePopUp(!deletePopUp)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkgray dark:hover:text-white">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Delete Post</h3>
            </div>
          </div>
          <div className='flex items-center justify-start p-4 border-y dark:border-darkgray'>
            Are you sure you want to delete this post ?
          </div>
          <div className='flex items-center justify-end space-x-3 p-4'>
            <p className='p-2 cursor-pointer rounded-2xl bg-blockd hover:bg-orange-600 text-white'>Delete</p>
            <p onClick={() => setDeletePopUp(!deletePopUp)} className='p-2 cursor-pointer rounded-2xl bg-gray-400 hover:bg-gray-500 text-white dark:bg-darkgray hover:dark:bg-gray-800'>Cancel</p>
          </div>
        </div>
      </div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-modal p-4 ${editPopUp ? '' : 'hidden'}`}>
        <div className="relative w-full h-full rounded-lg shadow-lg max-w-md md:h-auto bg-gray-50 dark:bg-lightgray dark:border dark:border-darkgray ">
          <div className="relative bg-gray-50 rounded-t-lg dark:bg-lightgray">
            <button type="button" onClick={() => setEditPopUp(!editPopUp)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkgray dark:hover:text-white">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Post</h3>
            </div>
          </div>
          <div className='flex flex-col items-start justify-start p-4 border-y dark:border-darkgray space-y-4 w-full'>
            <div className='flex flex-col items-start justify-start space-y-2 w-full'>
              <p className='font-semibold'>Title</p>
              <input className='p-2 bg-gray-200 dark:bg-darkgray outline-none rounded-lg w-full' placeholder='Current Title' />
            </div>
            <div className='flex flex-col items-start justify-start space-y-2 w-full'>
              <p className='font-semibold'>Description</p>
              <textarea
                id="message"
                maxLength={255}
                value={textArea}
                onChange={(e: any) => setTextArea(e.target.value)}
                data-rows="4"
                className="h-24 p-2 bg-gray-200 dark:bg-darkgray text-black dark:text-white outline-none rounded-lg w-full"
                placeholder="Current Post description"
              ></textarea>
            </div>
          </div>
          <div className='flex items-center justify-end space-x-3 p-2'>
            <p className='p-2 px-4 cursor-pointer rounded-2xl bg-blockd hover:bg-orange-600 text-white'>Edit</p>
            <p onClick={() => setEditPopUp(!editPopUp)} className='p-2 cursor-pointer rounded-2xl bg-gray-400 hover:bg-gray-500 dark:bg-darkgray hover:dark:bg-gray-800 text-white'>Cancel</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostTest