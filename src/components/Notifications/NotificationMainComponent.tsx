import { doc, onSnapshot } from 'firebase/firestore';
import React from 'react'
import { db } from '../../firebaseConfig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSideBar } from '../../redux/reducers/SideBarSlice';
import { get_data_byID, get_schema_data_field, update_notification } from '../../Utils/Backend';
import { getNoOfDays } from '../../Utils/HelperFunctions';
import { DateComponent } from './DateComponent';

interface TYPE_NotificationData{
    dataId:string,
    dateOfCreation:Date,
    notificationId:string,
    notificationData:string,
    isSeen:boolean
}

interface TYPE_ModifiedNotificationData extends TYPE_NotificationData{
    field:string,
    color:string,
    data:any,
    schema:any
}

const NotificationMainComponent = () => {
    const userId = useAppSelector((state) => state.auth.userId);
    const organizationId = useAppSelector((state) => state.auth.organisationId);

    const dispatch = useAppDispatch();
    
    const [notificationList, setNotificationList] = React.useState<any[]>([]);
    const [isNotificationFetched, setIsNotificationFetched] = React.useState(false);

    const fetchNotificationList = async () => {
		onSnapshot(doc(db, "organizations", organizationId),async(doc) => {
            if(doc.data()){
                const notificationListFromBackend = doc.data()!.notifications[userId];
                const updatedNotificationList = notificationListFromBackend.filter((notification:TYPE_NotificationData)=>notification.isSeen === false);
                console.log(updatedNotificationList, "updatedNotificationList");
                const notificationListWithData:TYPE_ModifiedNotificationData[] =await Promise.all(updatedNotificationList.map(async (notification:TYPE_NotificationData)=>{
                    console.log(notification, "notification");
                    const dataFromDatabase = await get_data_byID(organizationId, notification.dataId);
                    console.log(dataFromDatabase, "data");
                    const field = dataFromDatabase.field;
                    const schemaFromDatabase:any = await get_schema_data_field(organizationId, field);
                    console.log(schemaFromDatabase, "schema");  
                    let data={
                        ...notification,
                        field:field,
                        color:schemaFromDatabase.color,
                        data:dataFromDatabase,
                        schema:schemaFromDatabase.list
                    }
                    return data;
                }))
                console.log(notificationListWithData, "**");
                
                setNotificationList(notificationListWithData);
            }
		});
	};

    if(isNotificationFetched === false){
        fetchNotificationList();
        setIsNotificationFetched(true);
    }

    const handleViewSidebar = async (notification:TYPE_ModifiedNotificationData) =>{
        // const dataFromDatabase = await get_data_byID(organizationId, notification.dataId);
        // const field = dataFromDatabase.field;
        // const schemaFromDatabase:any = await get_schema_data_field(organizationId, field);
        const sidebarData = {
            field:notification.field,
            color:notification.color,
            data:notification.data,
            schema:notification.schema
        }
        dispatch(setSideBar(sidebarData));
        notification.isSeen = true;
        await update_notification(organizationId, userId, notification);
    }

    // fetchNotificationList()

    return (
        <div className="text-highlight_font_color grow flex flex-col overflow-y-auto">
            {notificationList.length>0? 
                notificationList
                .filter((notification:TYPE_ModifiedNotificationData)=>notification.isSeen === false)
                .map((notification:TYPE_ModifiedNotificationData, index) => {
                // if(notification.isSeen === false){
                    return (
                        <button type="button" key={index} className="w-full flex justify-between items-center hover:bg-Secondary_background_color py-4 px-10" onClick={()=>handleViewSidebar(notification)}>
                            <div className="grow flex flex-col justify-start">
                                <span
                                    style={{
                                        borderColor: notification.color,
                                        color: notification.color,
                                        backgroundColor: notification.color + 20,
                                    }}
                                    className={`border-2 px-1 rounded-md text-sm flex items-center w-fit`}
                                    >
                                    {notification.field}-{notification.dataId}
                                </span>
                                <span className="text-left">{notification.notificationData}</span>
                            </div>
                            <DateComponent daysAgo = {getNoOfDays(notification.dateOfCreation)} />
                        </button>
                    )
                // }
            }):<div className="text-center text-primary_font_color p-2">No Notifications</div>
            }
        </div>
    )
}

export { NotificationMainComponent }