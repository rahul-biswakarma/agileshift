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

import { setDataSchema, setDatas } from "../../redux/reducers/DataTableSlice";

export default function Dashboard() {
	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const [showNotification, setShowNotification] = useState(false);
	const [fieldsData, setFieldsData] = useState<TYPE_FIELD[]>();

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
				navigate("/edit-organization-schema");
			}
		});
		get_all_columns_name(organizationId).then((data) => {
			dispatch(setDataSchema(data));
		});
	}, [organizationId, dispatch, navigate]);

	const getDataByFeildName = useCallback(() => {
		if (dataSchema) {
			get_data_by_column_name(organizationId, "all").then((data) => {
				dispatch(setDatas(data));
			});
		}
	}, [dataSchema, dispatch, organizationId]);

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
					{fieldsData && <TabHeader fieldsData={fieldsData} />}
					{dataSchema && datas && <BuildQuadarnt />}
				</React.Fragment>
			)}
		</div>
	);
}
