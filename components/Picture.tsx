import Image from 'next/image'
import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

interface Props {
    path: string,
    level: number,
    pwidth: string,
    pheight: string,
    ltop:string
}

function Picture({path, level, pwidth, pheight, ltop}: Props) {
  return (
    <div>
        <span className={`text-black dark:text-white relative text-xs ${ltop} right-1 h-6 w-6 rounded-full bg-white dark:bg-lightgray flex justify-center items-center items border-2 border-[#181c44] dark:border-gray-500`}><span>{level}</span></span>
        <Image
            src={path}
            alt="PFP"
            className={`-mt-2 ${pwidth} ${pheight} rounded-full object-cover border-[#181c44] dark:border-gray-500 border-2`}
            width={60}
            height={60}
        />
    </div>
  )
}

export default Picture