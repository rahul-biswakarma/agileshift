import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNotificationList } from "../../redux/reducers/NotificationSlice";
import { mark_notification_seen } from "../../Utils/Backend";
import { HeaderNotificationComponent } from "./HeaderNotificationComponent";
import { NotificationComponent } from "./NotificationComponent";

interface TYPE_NotificationProps {
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationMainComponent = (props: TYPE_NotificationProps) => {
  const notificationList = useAppSelector((state) => state.notification.notificationList);
  const userId = useAppSelector((state) => state.auth.userId);
  const organizationId = useAppSelector((state) => state.auth.organisationId);
  const dispatch = useAppDispatch();
  
  const handleClearAllNotification = async () => {
      const notificationListSeen = 
          notificationList.map((notification: TYPE_NOTIFICATION) => {
              if (notification.isSeen === false) {
                  return {
                      ...notification,
                      isSeen: true,
                  };
              }
              return notification;
          })

      dispatch(setNotificationList(notificationListSeen));
      await mark_notification_seen(organizationId, userId, notificationListSeen);
  };

  return (
    <div className="grow flex flex-col">

      <HeaderNotificationComponent 
        setShowNotification={props.setShowNotification} 
        handleClearAllNotification = {handleClearAllNotification}
      />

      <div className="text-highlight_font_color font-dm_sans grow flex flex-col h-[400px] overflow-y-auto">
        {notificationList.length > 0 ? (
          notificationList.map(
            (notification: TYPE_NOTIFICATION, index) => {
              return (
                <NotificationComponent
                  key={index}
                  notification={notification}
                />
              );
            }
          )
        ) : (
          <div className="text-center text-primary_font_color p-2">
            No Notifications
          </div>
        )}
      </div>
    </div>
  );
};

export { NotificationMainComponent };
