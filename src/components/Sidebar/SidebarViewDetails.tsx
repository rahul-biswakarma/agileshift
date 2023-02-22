import React from 'react'
import { Details } from './Details'
import { Header } from './Header'

const SidebarViewDetails = () => {
    return (
        <div className='w-1/3 h-screen rounded-tl-xl rounded-bl-xl bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color p-3'>
            {/* bg-gradient-to-b from-[#badde8] to-[#bdddcc] */}
            <Header />
            <Details />
            Sidebar View
        </div>
    )
}

export { SidebarViewDetails }