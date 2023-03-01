import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSideBar } from '../../redux/reducers/SideBarSlice';
import { get_schema_data_field, main_search_function } from '../../Utils/Backend';
import { useDebounceCallback } from '../../Utils/useDebounce';
import { IdComponent } from '../DataTable/idComponent';

type Type_SuggestionsState = {
	field: string;
	data: any;
	color: string;
	schema?: any;
	titleData?: string;
};

type TYPE_SchemaItem = {
	columnName:string,
	columnType:string,
}

const SearchComponent = () => {
	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const dispatch = useAppDispatch();

	const [searchedDataList,setSearchedDataList] = useState<Type_SuggestionsState[]>([]);

	const [searchTerm, setSearchTerm] = useState<string>("");

	const getDataListFromSearchTerm =async (term:string) =>{
		console.log(term, "term");
		let modifiedDataList:Type_SuggestionsState[] = [];
		if(term.length>0){
			const dataListFromBackend = await main_search_function(organizationId, term)
			console.log(dataListFromBackend, "dataListFromBackend");
			
			modifiedDataList = await Promise.all(await modifyDataList(dataListFromBackend));
		}
		setSearchedDataList(modifiedDataList);
		console.log(modifiedDataList, "modifiedDataList");
	}

	const modifyDataList = (dataListFromBackend:TYPE_SCHEMA[]) =>{
		if(dataListFromBackend.length >0){
			const modifiedDataList = dataListFromBackend.map(async (data)=>{
				const field = data.field;
				const schemaFromDatabase:any = await get_schema_data_field(organizationId, field);
				console.log(schemaFromDatabase, "schema");
				const titleData = getTitleData(schemaFromDatabase.list, data);  
				let modifiedData={
					field:field,
					data:data,
					color:schemaFromDatabase.color,
					schema:schemaFromDatabase.list,
					titleData:titleData,
				}
				console.log(modifiedData, "modifiedData");
				
				return modifiedData;
			})
			return modifiedDataList;
		}
		return [];
	}

	const getTitleData = (schema:TYPE_SchemaItem[], data:any) =>{
		let titleData = "";

		schema.forEach((schemaItem:TYPE_SchemaItem)=>{
			if(schemaItem.columnType === "title"){
				titleData = data[schemaItem.columnName];
			}
		})
		console.log(titleData, "titleData");
		
		return titleData;
	}

	const debouncedCallback = useDebounceCallback(getDataListFromSearchTerm, 500);

	const handleSuggestionsSelect = (suggestion:Type_SuggestionsState) =>{
		console.log(suggestion, "suggestion");
		const sidebarData = {
            field:suggestion.field,
            color:suggestion.color,
            data:suggestion.data,
            schema:suggestion.schema
        }
        dispatch(setSideBar(sidebarData));
	}

	const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		debouncedCallback(e.target.value);
	}

	const handleClear = () =>{
		setSearchTerm("");
		setSearchedDataList([]);
	}

	return (
		<div className="relative flex flex-col w-full max-w-[800px]">
			<div className="w-full rounded-md flex gap-[10px] bg-Secondary_background_color p-[2px]">
				<div className="flex rounded-md bg-background_color items-center px-4">
					<span className="material-symbols-outlined text-white/30">
						search
					</span>
				</div>
				<input
					name="search-input"
					type="text"
					placeholder="Search items, fields, users and etc"
					onChange= {(e)=>handleSearchTermChange(e)}
					value={searchTerm}
					className="w-full flex-1 font-fira_code font-lg rounded-r-lg px-4 bg-Secondary_background_color h-9 outline-none text-white placeholder:text-white/20"
				/>
				{searchTerm.length > 0 &&
					<button className="flex rounded-md text-white/30 hover:text-red-400 items-center px-1" onClick={()=>handleClear()}>
						<span className="material-symbols-outlined text-md">
							close
						</span>
					</button>
				}
			</div>
			{ searchTerm.length > 0 && 
				<div className="w-full z-30 absolute h-auto max-h-[350px] overflow-y-auto top-[110%] rounded-md p-[2px] bg-Secondary_background_color text-primary_font_color border border-white/10">
					{searchedDataList.length > 0? searchedDataList.map((data,index)=>{
						return <div key={`search-data-${index}`} className="w-full p-2 rounded-md hover:bg-sidebar_bg hover:text-highlight_font_color flex items-center cursor-pointer border-primary_font_color hover:border-white" onClick={()=>handleSuggestionsSelect(data)}>
							<IdComponent itemId={data.data.id} color={data.color} />
							<span className="ml-2 grow text-left">{data.titleData}</span>
							<button
								onClick={() => {
									console.log(data, "data");
								}}
								className="p-[0.10rem_0.60rem] flex items-center bg-Secondary_background_color border border-inherit text-center text-lg rounded-lg"
							>
								<span className="material-symbols-outlined text-base">arrow_forward</span>
							</button>
						</div>
					}):
					<div className="w-full p-2 rounded-md text-center text-white/30">No results found</div>
					}
				</div>
			}
		</div>
	)
}

export {SearchComponent}