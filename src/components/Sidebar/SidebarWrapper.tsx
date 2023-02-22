import React from 'react'
import { SidebarCreate } from './SidebarCreate'
import { SidebarViewDetails } from './SidebarViewDetails'

const SidebarWrapper = () => {
    return (
        <div className='h-screen w-screen flex flex-row-reverse bg-background_color z-20 font-dm_sans text-white'>
            <SidebarViewDetails />
            <SidebarCreate />
        </div>
    )
}

export { SidebarWrapper }