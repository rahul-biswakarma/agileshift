import React from 'react';
import close_icon from "../../assets/icons/close_icon.svg"

const Header = () => {

    const handleClose = () => {
        console.log("Close");
    }

    return (
        <header className="flex justify-between p-2">
            {/* Ticket/Issue Id */}
            <span className="border-2 border-yellow bg-yellow/20 px-1 rounded-md text-yellow text-sm flex items-center">
                TKT-9
            </span>
            <button 
                className='rounded-full p-1 hover:bg-primary_font_color'
                onClick={()=>handleClose()}
            >
                <img
					src={close_icon}
					alt="close Icon"
					className="w-4 h-4 text-white"
				/>
            </button>
        </header>
    ) 
}

export { Header }