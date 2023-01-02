import React from 'react'

function NotifDropDown() {
    return (
        <div className="absolute w-100 h-48 right-20 top-16 mt-2 dark:border dark:border-lightgray bg-white dark:bg-darkgray rounded-md shadow-lg scrollbar-hide overflow-scroll">
            <div className="">
                <a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-lightgray dark:border-lightgray -mx-2">
                    <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />
                    <p className="text-gray-600 dark:text-white text-sm mx-2">
                        <span className="font-bold">Sara Salah</span> replied on the <span className="font-bold text-blue-500">Upload Image</span> artical . 2m
                    </p>
                </a>
                <a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-lightgray dark:border-lightgray -mx-2">
                    <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                    <p className="text-gray-600 dark:text-white text-sm mx-2">
                        <span className="font-bold">Slick Net</span> start following you . 45m
                    </p>
                </a>
                <a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-lightgray dark:border-lightgray -mx-2">
                    <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />
                    <p className="text-gray-600 dark:text-white text-sm mx-2">
                        <span className="font-bold">Jane Doe</span> Like Your reply on <span className="font-bold text-blue-500">Test with TDD</span> artical . 1h
                    </p>
                </a>
                <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-lightgray dark:border-lightgray -mx-2">
                    <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80" alt="avatar" />
                    <p className="text-gray-600 dark:text-white text-sm mx-2">
                        <span className="font-bold">Abigail Bennett</span> start following you . 3h
                    </p>
                </a>
            </div>
            <a href="/notifications" className="absolute w-full bg-darkblue hover:bg-darkblue/80 dark:bg-darkgray dark:hover:bg-lightgray dark:border-t dark:border-t-lightgray text-white dark:text-white text-center font-bold p-2">See all notifications</a>
        </div>
    )
}

export default NotifDropDown