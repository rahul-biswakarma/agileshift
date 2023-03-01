import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import DataTable from "../DataTable";
import BuildQuadarntHeader from "./BuildQuadarntHeader";
import {
	setDatas,
	setDataSchema,
	setFieldColor,
} from "../../redux/reducers/DataTableSlice";
import Filter from "../Filters/Filter";
import { useEffect, useState } from "react";
import { get_filter_schema } from "../../Utils/Backend";

type Type_BuildQuadarntProps = {
	fieldData: TYPE_FIELD;
	datas: any;
};

type TYPE_FilterOption = {
	filterOptionName: string;
	active: boolean;
};

type TYPE_Filters = {
	columnName: string;
	active: boolean;
	data: TYPE_FilterOption[];
};

const BuildQuadarnt = (props: Type_BuildQuadarntProps) => {
	const dispatch = useAppDispatch();
	dispatch(setFieldColor(props.fieldData.color));
	dispatch(setDatas(props.datas));
	dispatch(setDataSchema(props.fieldData.list));

	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const tabName = useAppSelector((state) => state.datatable.tabName);
	const [filterSchema, setFilterSchema] = useState<TYPE_Filters[]>([]);

	const removeDuplicates = (filters: TYPE_Filters[]) => {
		let uniqueValues = new Set();
		let result = [];
		for (let obj of filters) {
			let value = obj.columnName;
			if (!uniqueValues.has(value)) {
				uniqueValues.add(value);
				result.push(obj);
			}
		}
		return result;
	}

	useEffect(()=>{
		const getFilterSchema = async () => {
			const filters = await get_filter_schema(organizationId);
			if(tabName !== "All"){
				setFilterSchema(filters!.data[tabName]);
				console.log(filters!.data[tabName]);
			}else{
				let filter:TYPE_Filters[] = [];
				for(const tabName in filters!.data){	
					for (let index = 0; index < filters!.data[tabName].length; index++){
						filter.push(filters!.data[tabName][index]);
					}
				}
				filter = removeDuplicates(filter);
				setFilterSchema(filter);
			}
		}
		getFilterSchema();
	},[organizationId, tabName]);

	return (
		<div>
			<BuildQuadarntHeader />
			<Filter filters={filterSchema} setNewFilterSchema={setFilterSchema} />
			<main className="p-[1rem]">
				<DataTable />
			</main>
		</div>
	);
};

export default BuildQuadarnt;
