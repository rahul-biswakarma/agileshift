import { Tooltip } from '@mui/material';
import React from 'react';

type TYPE_NotificationHeaderPropsType ={
    setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
    handleClearAllNotification: () => Promise<void>
}

const HeaderNotificationComponent = (props:TYPE_NotificationHeaderPropsType) => {

    return (
        <div className="relative bg-Secondary_background_color flex items-center justify-between p-[0.8rem_2rem]">
            <div className="font-fira_code text-base font-[600] text-white/50">
                Notifications
            </div>
            <div className="flex gap-3">
                <Tooltip
					title="Mark all as seen"
					placement="bottom"
				>
                    <button
                        className="font-dm_sans text-[1rem] flex gap-[0.2rem] text-white/30 cursor-pointer rounded-sm hover:text-white"
                        onClick={() => props.handleClearAllNotification()}
                    >
                        <span className="material-symbols-outlined text-inherit">
                            done_all
                        </span>
                    </button>
                </Tooltip>
                <button
                    className="font-dm_sans text-[1rem] text-white/30 cursor-pointer rounded-sm hover:text-white"
                    onClick={() => props.setShowNotification(false)}
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
        </div>
    )
}

export { HeaderNotificationComponent }