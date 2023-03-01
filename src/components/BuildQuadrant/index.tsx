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

	console.log(props.datas);

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
				console.log(filter);
			}
		}
		getFilterSchema();
	},[organizationId, tabName]);


	const modifyData = (filterSchema: TYPE_Filters[]) => {
		let newData = [...props.datas];
		const filters = [...filterSchema];
		const filterObject:any = {}
		filters.forEach((filterData)=>{
			let filterValues:any = []
			filterData.data.forEach((filterOptionData)=>{
				if(filterOptionData.active)
					filterValues.push(filterOptionData.filterOptionName)
			})
			if(filterValues.length>0)
				filterObject[filterData.columnName] = filterValues
		})

		if(Object.keys(filterObject).length>0){
			let dataList:any = []
			newData.forEach((propsData) => {
				let dataFromFilter:any;
				Object.keys(propsData).forEach((key)=>{
					if(!dataFromFilter){
						if(key === "Tag"){
							if(filterObject[key] && filterObject[key].length>0){
								if(propsData[key].length > 0){
									propsData[key].forEach((data:any) => {
										console.log('====================================');
										console.log(filterObject[key], data.tagName);
										console.log('====================================');
										if(filterObject[key].includes(data.tagName)){
											dataFromFilter = propsData
										}
									})
								}
							}
						}else{
							if(filterObject[key] && filterObject[key].length>0){
								if(filterObject[key].includes(propsData[key])){
									dataFromFilter = propsData
								}
							}
						}
					}
				})
				if(dataFromFilter)
					dataList.push(propsData);
			})
			dispatch(setDatas(dataList));
		}else{
			dispatch(setDatas(newData));
		}
	}

	return (
		<div>
			<BuildQuadarntHeader />
			<Filter filters={filterSchema} modifyData={modifyData} />
			<main className="p-[1rem]">
				<DataTable />
			</main>
		</div>
	);
};

export default BuildQuadarnt;
