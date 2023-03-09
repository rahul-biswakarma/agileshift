import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSideBar } from '../../redux/reducers/SideBarSlice';
import { update_notification } from '../../Utils/Backend';
import { DisplayIdComponent } from '../DataTable/displayIdComponentContainer';
import { DateComponent } from './DateNotificationComponent';

type TYPE_NotificationComponentProps = {
    notification: TYPE_NOTIFICATION;
}

const NotificationComponent = (props:TYPE_NotificationComponentProps) => {
    const userId = useAppSelector((state) => state.auth.userId);
    const organizationId = useAppSelector((state) => state.auth.organisationId);
    const dispatch = useAppDispatch();
    
    const handleViewSidebar = async (
        notification: TYPE_NOTIFICATION
    ) => {
        if(notification.data){
            dispatch(
                setSideBar({
                    fieldId: notification.data.dataId,
                    sidebarType: "editMode",
                    createModeCalledByField: "",
                    linkedData: [],
                    id: notification.data.dataId,
                    displayId: notification.data.displayId,
                })
            );
        }
        handleNotificationSeen(notification)
    };

    const handleNotificationSeen = async (
        notification: TYPE_NOTIFICATION
    ) => {
        if(!notification.isSeen){
            let notificationObj = {
                ...notification,
                isSeen: true,
            }
            await update_notification(organizationId, userId, notificationObj);
        }
    };

    const handleClick = () => {
        if (
            props.notification.data !== undefined &&
            props.notification.data.dataId !== undefined &&
            props.notification.data.dataId.length > 0
        ) {
            handleViewSidebar(props.notification);
        }else{
            handleNotificationSeen(props.notification)
        }
    }

    return (
        <div
            className="flex hover:bg-Secondary_background_color"
        >
            <button
                type="button"
                className={`w-full flex justify-between items-center border-b border-white/10 hover:bg-Secondary_background_color 
                    py-3 px-[2%] text-sm font-fira_code
                    ${
                        !props.notification.isSeen
                        ? "bg-notification_unRead text-white/80"
                        : "text-white/50"
                }`}
                onClick={() => handleClick()}
            >
                <div className="content grow flex items-center justify-start gap-5">
                    {props.notification.data!== undefined && 
                        props.notification.data.dataId !== undefined &&
                        props.notification.data.dataId.length > 0 && (
                            <div className="w-[5%] min-w-fit">
                                <DisplayIdComponent
                                    displayId={props.notification.data.displayId}
                                    color={props.notification.data.color}
                                    field={props.notification.data.field}
                                />
                            </div>
                    )}
                    <span className="text-left font-dm_sans w-[95%]">
                        {props.notification.notificationData}
                    </span>
                </div>
                <DateComponent
                    notificationDate = {props.notification.dateOfCreation}
                />
            </button>
        </div>
    )
}

export { NotificationComponent }