import { Tooltip } from '@mui/material'
import { Markup } from 'interweave'
import React from 'react'

interface TYPE_MessageComponentProps {
    message:TYPE_MESSAGE
}

const MessageComponent = ({message}:TYPE_MessageComponentProps) => {
    
    return (
        <div className="flex justify-start items-center relative p-1 px-2 font-dm_sans w-full">
            {/* avatar */}
            <Tooltip
					title={message.name}
					placement="bottom"
            >
                <img
                    className="w-8 rounded-full h-8 self-end"
                    alt={message.name}
                    src={message.senderImg}
                /> 
            </Tooltip>

            {/* message */}
            <span className="w-0 h-0 border-b-[20px] border-b-black/60 border-l-[15px] border-l-transparent self-end">
            </span>
            <div className="flex flex-col flex-1 p-2 mt-[-4px] bg-black/60 rounded-t-lg rounded-br-lg">
                <p className="text-chat_module_text_1 text-sm flex-wrap h-auto ">
                    <Markup
                        content={message.message}
                        className="text-sm h-auto break-all font-extralight "
                    />
                </p>
                {/* time */}
                <div className="flex items-end justify-between pt-2">
                    <h2 className="font-bold text-[11px] text-white/60">{message.name}</h2>
                    <div className="text-[9px] text-white/50">
                        {new Date(message.timeStamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export { MessageComponent }