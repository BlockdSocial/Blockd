import React from 'react'

function MsgDropDown() {
    return (
        <div className="absolute h-40 w-100 right-32 top-16 mt-2 bg-white rounded-md shadow-lg scrollbar-hide overflow-scroll  z-20">
            <div className="py-2 relative">
                <a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />
                    <p className="text-gray-600 text-sm mx-2">
                        <span className="font-bold">Sara Salah</span> Sent you a private message, Say Hi back. 2m
                    </p>
                </a>
                <a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                    <p className="text-gray-600 text-sm mx-2">
                        <span className="font-bold">Slick Net</span> Sent you a video . 45m
                    </p>
                </a>
                <a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />
                    <p className="text-gray-600 text-sm mx-2">
                        <span className="font-bold">Jane Doe</span> Sent you a private message, Say Hi back. 1h
                    </p>
                </a>
                <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2">
                    <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80" alt="avatar" />
                    <p className="text-gray-600 text-sm mx-2">
                        <span className="font-bold">Abigail Bennett</span> Sent you a picture. 3h
                    </p>
                </a>
                <a href="/messages" className="absolute w-full bg-darkblue hover:bg-darkblue/80 dark:bg-gray-700 dark:hover:bg-gray-800 text-white dark:text-white text-center font-bold py-2">See all messages</a>
            </div>
        </div>
    )
}

export default MsgDropDown