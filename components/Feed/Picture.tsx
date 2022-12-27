import Image from 'next/image'
import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

interface Props {
    path: string,
    level: number,
    pictureCSS: string,
    levelCSS:string
}

function Picture({path, level, pictureCSS, levelCSS}: Props) {
  return (
    <div className='-z-5'>
        <span className={`text-black dark:text-white text-xs ${levelCSS} relative right-1 h-6 w-6 rounded-full bg-white dark:bg-lightgray flex justify-center items-center border-2 border-[#181c44] dark:border-white`}><span>{level}</span></span>
        <Image
            src={path}
            alt="PFP"
            className={`-mt-2 ${pictureCSS} rounded-full object-cover border-[#181c44] dark:border-white border-2`}
            width={60}
            height={60}
        />
    </div>
  )
}

export default Picture