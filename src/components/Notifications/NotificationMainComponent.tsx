import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../../firebaseConfig";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSideBar } from "../../redux/reducers/SideBarSlice";
import {
  get_data_byID,
  get_schema_data_field,
  mark_notification_seen,
  update_notification,
} from "../../Utils/Backend";
import { getNoOfDays } from "../../Utils/HelperFunctions";
import { IdComponent } from "../DataTable/idComponent";
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

  const dispatch = useAppDispatch();

  const [notificationList, setNotificationList] = React.useState<any[]>([]);
  const [isNotificationFetched, setIsNotificationFetched] =
    React.useState(false);

  const fetchNotificationList = async () => {
    onSnapshot(doc(db, "organizations", organizationId), async (doc) => {
      if (doc.data()) {
        const notificationListFromBackend = doc.data()!.notifications[userId];
        const updatedNotificationList = notificationListFromBackend.sort(
          (a: TYPE_NotificationData, b: TYPE_NotificationData) => {
            if (a.isSeen && !b.isSeen) {
              return 1;
            }
            if (!a.isSeen && b.isSeen) {
              return -1;
            }
            return 0;
          }
        );
        const notificationListWithData: TYPE_ModifiedNotificationData[] =
          await Promise.all(
            updatedNotificationList.map(
              async (notification: TYPE_NotificationData) => {
                const dataFromDatabase = await get_data_byID(
                  organizationId,
                  notification.dataId
                );
                const field = dataFromDatabase.field;
                const schemaFromDatabase: any = await get_schema_data_field(
                  organizationId,
                  field
                );
                let data = {
                  ...notification,
                  field: field,
                  color: schemaFromDatabase.color,
                  data: dataFromDatabase,
                  schema: schemaFromDatabase.list,
                };
                return data;
              }
            )
          );

        setNotificationList(notificationListWithData);
      }
    });
  };

  if (isNotificationFetched === false) {
    fetchNotificationList();
    setIsNotificationFetched(true);
  }

  const handleViewSidebar = async (
    notification: TYPE_ModifiedNotificationData
  ) => {
    dispatch(
      setSideBar({
        sidebarType: "editMode",
        createModeCalledByField: "",
        fieldId: notification.data.id,
      })
    );
    notification.isSeen = true;
    await update_notification(organizationId, userId, notification);
  };

  const handleClearAllNotification = async () => {
    const notificationListSeen = await Promise.all(
      notificationList.map(async (notification: TYPE_NotificationData) => {
        if (notification.isSeen === false) {
          return {
            ...notification,
            isSeen: true,
          };
        }
        return notification;
      })
    );

    setNotificationList(notificationListSeen);
    await mark_notification_seen(organizationId, userId, notificationListSeen);
  };

  return (
    <div className="grow flex flex-col">
      <div className="relative bg-Secondary_background_color flex justify-between p-[1rem_2rem]">
        <div className="font-fira_code text-[0.9rem] font-[600] text-white">
          Notifications
        </div>
        <div className="flex gap-3">
          <button
            className="font-dm_sans text-[1rem] flex gap-[0.2rem] text-white/30 cursor-pointer rounded-sm hover:text-white"
            onClick={() => handleClearAllNotification()}
          >
            <span className="material-symbols-outlined text-inherit">
              done_all
            </span>
          </button>
          <button
            className="font-dm_sans text-[1rem] text-white/30 cursor-pointer rounded-sm hover:text-white"
            onClick={() => props.setShowNotification(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
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
                      }
                    }}
                  >
                    <div className="content grow flex gap-5">
                      {notification.dataId !== undefined &&
                        notification.dataId.length > 0 && (
                          <IdComponent
                            itemId={notification.dataId}
                            color={notification.color}
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
