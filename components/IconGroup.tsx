import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    name: string
    notif: string
}

function IconGroup({ Icon, name, notif }: Props) {
    return (
        <div className='flex max-w-fit items-center space-x-2 p-2 rounded-ful transition-all duration-100 group'>
            <div className="">
                <strong className="relative inline-flex items-center px-2.5 py-1.5">
                    <span className="text-white absolute text-xs top-0 right-0 md:-top-1 md:-right-0 h-6 w-6 rounded-full group-hover:bg-orange-600 bg-blockd flex justify-center items-center items border-2 border-gray-900 dark:border-lightgray"><span>{notif}</span></span>
                    <Icon className='h-6 w-6 inline text-white dark:text-white' />
                    <p className='inline md:hidden text-white dark:text-white font-semibold group-hover:text-gray-300 py-1 px-2'>{name}</p>
                </strong>
            </div>
        </div>
    )
}

export default IconGroup