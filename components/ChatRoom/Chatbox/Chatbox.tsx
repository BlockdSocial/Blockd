import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Chat from './Chat'
import Footer from './Footer'

function Chatbox() {

    return (
        <div className='flex flex-col col-span-10 relative md:col-span-9 lg:col-span-7 xl:col-span-7 border-r dark:border-lightgray'>
            <Navbar />
            <Chat />
            <Footer />           
        </div>
    )
}

export default Chatbox