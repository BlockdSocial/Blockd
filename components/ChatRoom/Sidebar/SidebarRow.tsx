import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    active: string
}

function SidebarRow({Icon, active}: Props) {
  return (
    <div 
      className={`flex mt-1 max-w-fit items-center space-x-2 px-4 py-3 ${active} rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}>
        <Icon className='h-6 w-6' />
    </div>
  )
}

export default SidebarRow