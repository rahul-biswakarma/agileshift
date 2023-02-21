import React from 'react'

export const OrganizationCard = () => {
  return (
    <div className='w-full flex justify-between items-center p-2 text-highlight_font_color border border-background_color hover:border-dark_gray rounded-lg'>
        <div className='flex gap-2'>
            <img src="https://app.devrev.ai/static/profile-circle-black.png" className='w-14 rounded-full' alt="" />
            <div>
                <h3 className='text-lg'>N-P-R</h3>
                <p className='text-md text-dark_gray'>https://app.devrev.ai/npr</p>
            </div>
        </div>
        <button className="w-16 h-10 bg-dark_gray text-center text-lg rounded-lg">
            {/* Plus Icon */}
            Enter
        </button>
    </div>
  )
}