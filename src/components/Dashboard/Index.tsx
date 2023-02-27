import React, { useState, useEffect, useCallback } from "react";
import BuildQuadarnt from "../BuildQuadrant";

import {
  get_schema_data,
  get_data_by_column_name,
  get_all_columns_name,
  get_user_suggestions,
} from "../../Utils/Backend";

import Header from "./Header";
import TabHeader from "./TabHeader";
import { useAppSelector } from "../../redux/hooks";

export default function Dashboard() {
	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const [dataSchema, setDataSchema] = useState<TYPE_FIELD[]>();
	const [data, setData] = useState();

	useEffect(() => {
		get_schema_data(organizationId).then((data) => {
			if (data) setDataSchema(data.schemaData);
		});
	}, [organizationId]);

	const getDataByFeildName = useCallback(() => {
		if (dataSchema)
			get_data_by_column_name(organizationId, "all").then((data) => {
				setData(data);
			});
	}, [dataSchema, organizationId]);

	useEffect(() => {
		getDataByFeildName();
	}, [getDataByFeildName]);

	return (
		<div className="bg-background_color h-[100vh] font-dm_sans">
			<Header />
			{dataSchema && <TabHeader fieldsData={dataSchema} />}
			{dataSchema && data && (
				<BuildQuadarnt
					fieldData={dataSchema[0]}
					datas={data}
				/>
			)}
		</div>
	);
}
