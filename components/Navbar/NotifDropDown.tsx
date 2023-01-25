import React from 'react'

function NotifDropDown() {
    return (
        <div className="absolute w-100 max-h-[80vh] right-24 top-16 mt-2 dark:border dark:border-lightgray bg-white dark:bg-darkgray rounded-md shadow-lg scrollbar-hide overflow-scroll">
            <div className="">
                {Array.from({ length: 10 }, (_, i) =>
                    <a key={i} href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-lightgray dark:border-lightgray -mx-2">
                        <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />
                        <p className="text-gray-600 dark:text-white text-sm mx-2">
                            <span className="font-bold">Sara Salah</span> replied on the <span className="font-bold text-blue-500">Upload Image</span> artical . 2m
                        </p>
                    </a>
                )}
                <a href="/dashboard/notifications" className="flex items-center justify-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-lightgray dark:border-lightgray -mx-2">
                    <p className="text-gray-600 dark:text-white text-sm mx-2 text-center">
                        <span className="font-bold">View notifications</span>
                    </p>
                </a>
            </div>
        </div>
    )
}

export default NotifDropDown