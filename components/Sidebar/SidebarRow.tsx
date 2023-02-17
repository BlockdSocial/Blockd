import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: string
    active: string
}

function SidebarRow({Icon, title, active}: Props) {
  return (
    <div 
      className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 ${active} rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}>
        <Icon className='h-6 w-6' />
        <p className={` md:inline-flex text-base lg:text-xl cursor-pointer hidden`}>{title}</p>
    </div>
  )
}

export default SidebarRow