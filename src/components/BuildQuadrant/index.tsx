import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import DataTable from "../DataTable";
import BuildQuadarntHeader from "./BuildQuadarntHeader";
import { setDatas } from "../../redux/reducers/DataTableSlice";
import Filter from "../Filters/Filter";
import { useCallback, useEffect, useState } from "react";
import { get_data_by_column_name, get_filter_schema, get_userIds_in_organizations, get_user_by_id } from "../../Utils/Backend";
import { setVistaName } from "../../redux/reducers/VistaSlice";

type Type_BuildQuadarntProps = {};

type TYPE_FilterOption = {
	filterOptionName: string;
	active: boolean;
	userId: string;
};

type TYPE_Filters = {
	columnName: string;
	active: boolean;
	data: TYPE_FilterOption[];
	type: string;
};

const BuildQuadarnt = (props: Type_BuildQuadarntProps) => {
	const dispatch = useAppDispatch();
	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const tabName = useAppSelector((state) => state.datatable.tabName);
	const [filterSchema, setFilterSchema] = useState<TYPE_Filters[]>([]);

	const removeDuplicates = (filters: TYPE_Filters[]) => {
		let uniqueValues = new Map();
		let result = [];
		for (let obj of filters) {
			let value = obj.columnName;
			if (!uniqueValues.get(value)) {
				uniqueValues.set(value, obj);
			} else {
				let newObj = obj;
				newObj.data = [...obj.data, ...uniqueValues.get(value).data];
				let uniqueOptionsName = new Set();
				let uniqueOptions: TYPE_FilterOption[] = [];
				newObj.data.forEach((objData) => {
					if (!uniqueOptionsName.has(objData.filterOptionName)) {
						uniqueOptionsName.add(objData.filterOptionName);
						uniqueOptions.push(objData);
					}
				});
				newObj.data = uniqueOptions;
				uniqueValues.set(value, newObj);
			}
		}
		result = Array.from(uniqueValues, ([name, value]) => value);
		return result;
	};

	const addUsersToSchema =  useCallback( async (filters: TYPE_Filters[]) => {
		const users = await get_userIds_in_organizations(organizationId);
		const filter = [...filters];
		const listUser:any = [];
		const makeOptionList = async(users:string[],listUser:any)=>{
			for(let user of users){
				const userObj:any = await get_user_by_id(user);
				listUser.push({
					filterOptionName: userObj.name,
					active: false,
					userId: user
				})
			}
			filter.forEach((filterObj) => {
				if(filterObj.type === "user"){
					filterObj.data = JSON.parse(JSON.stringify(listUser));
				}
			})
		}
		makeOptionList(users, listUser);
		return filter;
	}, [organizationId]);

	const getFilterSchema = useCallback(async () => {
		const filters = await get_filter_schema(organizationId);
		if (tabName !== "All") {
			setFilterSchema(filters!.data[tabName]);
		} else {
			let filter: TYPE_Filters[] = [];
			for (const tabName in filters!.data) {
				for (let index = 0; index < filters!.data[tabName].length; index++) {
					filter.push(filters!.data[tabName][index]);
				}
			}
			filter = removeDuplicates(filter);
			filter = await addUsersToSchema(filter);
			setFilterSchema(filter);
		}
	}, [tabName, organizationId, addUsersToSchema]);

	useEffect(() => {
		getFilterSchema();
		dispatch(setVistaName(""));
	}, [dispatch, getFilterSchema]);

	const modifyData = useCallback(async (filterSchema: TYPE_Filters[]) => {
		let rowData;
		if(tabName === "All"){
			rowData = await get_data_by_column_name(organizationId, "all");
		}else {
			rowData = await get_data_by_column_name(organizationId, tabName);
		}
		
		let newData = [...rowData];
		const filters = [...filterSchema];
		const filterObject: any = {};

		let nameTypeMap:any = {};
		filters.forEach((filterObj) => {
			filterSchema.forEach((filterO) => {
				nameTypeMap[filterO.columnName] = filterO.type;
			})
		})

		filters.forEach((filterData) => {

			let filterValues: any = [];
			if(filterData.type === "user") {
				filterData.data.forEach((filterOptionData) => {
					if (filterOptionData.active)
						filterValues.push(filterOptionData.userId);
				});
			}else{
				filterData.data.forEach((filterOptionData) => {
					if (filterOptionData.active)
						filterValues.push(filterOptionData.filterOptionName);
				});
			}
			
			if (filterValues.length > 0)
				filterObject[filterData.columnName] = filterValues;
		});

		if (Object.keys(filterObject).length > 0) {
			let dataList: any = [];

			newData.forEach((propsData) => {
				let dataFromFilter: any;
				Object.keys(propsData).forEach((key) => {
					if(!dataFromFilter){
						if(nameTypeMap[key] === "user"){
							if (filterObject[key] && filterObject[key].length > 0) {
								if (propsData[key].length > 0) {
									if (filterObject[key].includes(propsData[key])) {
										dataFromFilter = propsData;
									}
								}
							}
						}
						if (nameTypeMap[key] === "tag") {
							if (filterObject[key] && filterObject[key].length > 0) {
								if (propsData[key].length > 0) {
									propsData[key].forEach((data: any) => {
										if (filterObject[key].includes(data.tagName)) {
											dataFromFilter = propsData;
										}
									});
								}
							}
						} else {
							if (filterObject[key] && filterObject[key].length > 0) {
								if (filterObject[key].includes(propsData[key])) {
									dataFromFilter = propsData;
								}
							}
						}
					}
				});
				if (dataFromFilter) dataList.push(propsData);
			});
			dispatch(setDatas(dataList));
		} else {
			dispatch(setDatas(newData));
		}
	},[dispatch, tabName, organizationId]); 

	return (
		<div>
			<BuildQuadarntHeader />
			<Filter
				filters={filterSchema}
				modifyData={modifyData}
			/>
			<main className="p-[1rem]">
				<DataTable />
			</main>
		</div>
	);
};

export default BuildQuadarnt;
