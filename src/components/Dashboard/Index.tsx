import React, { useState, useEffect, useCallback } from "react";
import BuildQuadarnt from "../BuildQuadrant";

import {
	get_schema_data,
	get_data_by_column_name,
	get_all_columns_name,
} from "../../Utils/Backend";
import { useNavigate } from "react-router-dom";
import { setActiveTab, setIsEdit } from "../../redux/reducers/SchemaSlice";

import Header from "./Header";
import TabHeader from "./TabHeader";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { NotificationMainComponent } from "../Notifications/NotificationMainComponent";

import {
	setDataSchema,
	setDatas,
	setFieldColorMap,
} from "../../redux/reducers/DataTableSlice";
import Storm from "../Storm";

export default function Dashboard() {
	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const [showNotification, setShowNotification] = useState(false);
	const [showStorm, setShowStorm] = useState(false);
	const [fieldsData, setFieldsData] = useState<TYPE_FIELD[]>();
	const [isInitialDataFetched, setIsInitialDataFetched] = useState(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const datas = useAppSelector((state) => state.datatable.datas);
	const dataSchema = useAppSelector((state) => state.datatable.dataSchema);

	useEffect(() => {
		if (!organizationId) {
			navigate("/organization-lists");
		}
	}, [navigate, organizationId]);

	useEffect(() => {
		get_schema_data(organizationId).then((data) => {
			if (data) {
				setFieldsData(data.schemaData);
			} else {
				dispatch(setActiveTab(0));
				dispatch(setIsEdit(true));
				// navigate("/edit-organization-schema");
			}
		});
		get_all_columns_name(organizationId).then((data) => {
			dispatch(setDataSchema(data));
		});
	}, [organizationId, dispatch, navigate]);

	const getDataByFeildName = useCallback(() => {
		if (dataSchema && !isInitialDataFetched) {
			get_data_by_column_name(organizationId, "all").then((data) => {
				dispatch(setDatas(data));
				setIsInitialDataFetched(true);
			});
		}
	}, [dataSchema, dispatch, organizationId, isInitialDataFetched]);

	useEffect(() => {
		if (fieldsData && fieldsData.length > 0) {
			let promises = fieldsData.map((schema: any) => {
				return get_data_by_column_name(organizationId, schema.name);
			});

			Promise.all(promises)
				.then((results) => {
					let tempFeildNameColorMap: any = {};
					fieldsData.map((schema: any) => {
						return (tempFeildNameColorMap[schema.name] = schema.color);
					});

					dispatch(setFieldColorMap(tempFeildNameColorMap));
				})
				.catch((error) => {
					console.log("Error fetching data:", error);
				});
		}
	}, [dispatch, fieldsData, organizationId]);

	useEffect(() => {
		getDataByFeildName();
	}, [getDataByFeildName]);

	return (
		<div className="bg-background_color h-[100vh] flex flex-col font-dm_sans">
			<Header
				showNotification={showNotification}
				setShowNotification={setShowNotification}
			/>
			{showNotification ? (
				<NotificationMainComponent
					showNotification={showNotification}
					setShowNotification={setShowNotification}
				/>
			) : (
				<React.Fragment>
					{fieldsData && (
						<TabHeader
							fieldsData={fieldsData}
							showStorm={showStorm}
							setShowStorm={setShowStorm}
						/>
					)}
					{showStorm ? (
						<div>
							<div
								className="relative bg-Secondary_background_color text-white ont-fira_code text-[0.9rem] 
								flex items-center p-[0_2rem] h-[50px] font-bold"
							>
								<span className="text-white/50">STORM / </span>&nbsp;Visualize
								linkage
							</div>
							<Storm organizationId={organizationId} />
						</div>
					) : (
						dataSchema && datas && <BuildQuadarnt />
					)}
				</React.Fragment>
			)}
		</div>
	);
}
