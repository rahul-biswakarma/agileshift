import React, { useState, useEffect, useCallback } from "react";
import BuildQuadarnt from "../BuildQuadrant";


import { get_schema_data, get_data_by_column_name } from "../../Utils/Backend";
import { useNavigate } from "react-router-dom";
import { setActiveTab, setIsEdit } from "../../redux/reducers/SchemaSlice";


import Header from "./Header";
import TabHeader from "./TabHeader";
import { useAppSelector , useAppDispatch} from "../../redux/hooks";
import { NotificationMainComponent } from "../Notifications/NotificationMainComponent";

export default function Dashboard() {
	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const [dataSchema, setDataSchema] = useState<TYPE_FIELD[]>();
	const [data, setData] = useState();
	const [showNotification, setShowNotification] = useState(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

  useEffect(() => {
    get_schema_data(organizationId).then((data) => {
		console.log("data:", data);
      if (data) {setDataSchema(data.schemaData);
		
	  	}else{
		dispatch(setActiveTab(0));
		dispatch(setIsEdit(true));
		navigate("/edit-organization-schema");
		}
    });
  }, [organizationId]);

  const getDataByFeildName = useCallback(() => {
    if (dataSchema)
     { get_data_by_column_name(organizationId, "all").then((data) => {
        setData(data);
      });
	 
	}
	  
	
  }, [dataSchema, organizationId]);

  useEffect(() => {
    getDataByFeildName();
  }, [getDataByFeildName]);

	return (
		<div className="bg-background_color h-[100vh] flex flex-col font-dm_sans">
			<Header showNotification={showNotification} setShowNotification={setShowNotification}/>
			{showNotification?
				<NotificationMainComponent showNotification={showNotification} setShowNotification={setShowNotification} />
				:
				<React.Fragment>
					{dataSchema && <TabHeader fieldsData={dataSchema} />}
					{dataSchema && data && (
						<BuildQuadarnt fieldData={dataSchema[0]} datas={data} />
					)}
				</React.Fragment>
			}
		</div>
	);
}
