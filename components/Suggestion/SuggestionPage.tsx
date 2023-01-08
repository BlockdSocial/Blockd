import React from 'react'
import SuggestionBox from './SuggestionBox'

function SuggestionPage() {
  return (
    <div className='max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x'>
        <SuggestionBox />
    </div>
  )
}

export default SuggestionPage