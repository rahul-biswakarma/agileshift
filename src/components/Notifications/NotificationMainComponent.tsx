import { Tooltip } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNotificationList } from "../../redux/reducers/NotificationSlice";
import { setSideBar } from "../../redux/reducers/SideBarSlice";
import {
  mark_notification_seen,
  update_notification,
} from "../../Utils/Backend";
import { getNoOfDays } from "../../Utils/HelperFunctions";
import { DisplayIdComponent } from "../DataTable/displayIdComponentContainer";
import { DateComponent } from "./DateComponent";

interface TYPE_NotificationData {
  dataId: string;
  dateOfCreation: Date;
  notificationId: string;
  notificationData: string;
  isSeen: boolean;
}

interface TYPE_ModifiedNotificationData extends TYPE_NotificationData {
  field: string;
  color: string;
  data: any;
  schema: any;
}

interface TYPE_NotificationProps {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationMainComponent = (props: TYPE_NotificationProps) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const organizationId = useAppSelector((state) => state.auth.organisationId);
  const notificationList = useAppSelector((state) => state.notification.notificationList);

  const dispatch = useAppDispatch();

  const handleViewSidebar = async (
    notification: TYPE_ModifiedNotificationData
  ) => {
    dispatch(
      setSideBar({
        fieldId: notification.data.id,
        sidebarType: "editMode",
        createModeCalledByField: "",
        linkedData: [],
        id: notification.data.id,
        displayId: notification.data.displayId,
      })
    );
    handleNotificationSeen(notification)
  };

  const handleNotificationSeen = async (
    notification: TYPE_ModifiedNotificationData
  ) => {
    if(!notification.isSeen){
      let notificationObj = {
        ...notification,
        isSeen: true,
      }
      console.log(notification, "**old");
      console.log(notificationObj, "**new");
      
      await update_notification(organizationId, userId, notificationObj);
    }
  };

  const handleClearAllNotification = async () => {
    const notificationListSeen = await Promise.all(
      notificationList.map(async (notification: TYPE_ModifiedNotificationData) => {
        if (notification.isSeen === false) {
          return {
            ...notification,
            isSeen: true,
          };
        }
        return notification;
      })
    );

    dispatch(setNotificationList(notificationListSeen));
    await mark_notification_seen(organizationId, userId, notificationListSeen);
  };

  return (
    <div className="grow flex flex-col">
      <div className="relative bg-Secondary_background_color flex justify-between p-[1rem_2rem]">
        <div className="font-fira_code text-[0.9rem] font-[600] text-white">
          Notifications
        </div>
        <div className="flex gap-3">
          <Tooltip title="Clear All" placement="top">
          <button
            className="font-dm_sans text-[1rem] flex gap-[0.2rem] text-white/30 cursor-pointer rounded-sm hover:text-white"
            onClick={() => handleClearAllNotification()}
          >
            <span className="material-symbols-outlined text-inherit">
              done_all
            </span>
          </button>
          </Tooltip>
          <Tooltip title="Close" placement="top">
          <button
            className="font-dm_sans text-[1rem] text-white/30 cursor-pointer rounded-sm hover:text-white"
            onClick={() => props.setShowNotification(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          </Tooltip>  
        </div>
      </div>
      <div className="text-highlight_font_color font-dm_sans grow flex flex-col h-[400px] overflow-y-auto">
        {notificationList.length > 0 ? (
          notificationList.map(
            (notification: TYPE_ModifiedNotificationData, index) => {
              return (
                <div
                  key={"Notification - " + index}
                  className="flex hover:bg-Secondary_background_color"
                >
                  <button
                    type="button"
                    key={index}
                    className={`w-full flex justify-between items-center border-b border-white/10 hover:bg-Secondary_background_color py-4 px-10 
                              ${
                                !notification.isSeen
                                  ? "bg-notification_unRead font-bold"
                                  : ""
                              }`}
                    onClick={() => {
                      if (
                        notification.dataId !== undefined &&
                        notification.dataId.length > 0
                      ) {
                        handleViewSidebar(notification);
                      }else{
                        handleNotificationSeen(notification)
                      }
                    }}
                  >
                    <div className="content grow flex gap-5">
                      {notification.dataId !== undefined &&
                        notification.dataId.length > 0 && (
                          <DisplayIdComponent
                            displayId={notification.data.displayId}
                            color={notification.color}
                            field={notification.field}
                          />
                        )}
                      <span className="text-left font-dm_sans">
                        {notification.notificationData}
                      </span>
                    </div>
                    <DateComponent
                      daysAgo={getNoOfDays(notification.dateOfCreation)}
                    />
                  </button>
                </div>
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
