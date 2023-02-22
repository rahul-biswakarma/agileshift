import React from 'react'
import { Sidebar } from './Sidebar'

const SidebarWrapper = () => {
    return (
        <div className='h-screen w-screen flex flex-row-reverse bg-background_color z-20 font-dm_sans text-white'>
            <Sidebar field="ticket" color="#FFAAFF"/>
        </div>
    )
}

export { SidebarWrapper };
