import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { HeaderNotificationComponent } from "./HeaderNotificationComponent";
import { NotificationComponent } from "./NotificationComponent";

interface TYPE_NotificationProps {
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationMainComponent = (props: TYPE_NotificationProps) => {
  const notificationList = useAppSelector((state) => state.notification.notificationList);

  return (
    <div className="grow flex flex-col">

      <HeaderNotificationComponent 
        setShowNotification={props.setShowNotification} 
        notificationList={notificationList} 
      />

      <div className="text-highlight_font_color font-dm_sans grow flex flex-col h-[400px] overflow-y-auto">
        {notificationList.length > 0 ? (
          notificationList.map(
            (notification: TYPE_NOTIFICATION, index) => {
              return (
                <NotificationComponent
                  key={index}
                  index={index}
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
