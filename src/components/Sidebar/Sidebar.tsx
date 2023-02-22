import React, { useState } from 'react'
import { Details } from './Details'
import { Header } from './Header'

type Type_SidebarState = {
    field:string,
    data?:TYPE_SCHEMA,
    color:string
}

const Sidebar = (props:Type_SidebarState) => {

    const [state, setState] = useState<Type_SidebarState>({
        field:props.field,
        data:props.data,
        color:props.color
    })

    return (
        <div className='w-1/3 h-screen rounded-tl-xl rounded-bl-xl bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color p-3'>
            {/* bg-gradient-to-b from-[#badde8] to-[#bdddcc] */}
            <Header state={state} setState={setState}/>
            <Details />
            Sidebar
        </div>
    )
}

export { Sidebar }