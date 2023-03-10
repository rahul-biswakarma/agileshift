import { doc, onSnapshot } from "firebase/firestore";
import React, { useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import TagComponent from "../DataTable/tagComponent";
import { db } from "../../firebaseConfig";
import { setSideBar } from "../../redux/reducers/SideBarSlice";

type Type_TagSelectProps = {
	dataType: string;
	columnName: string;
	setFormData: React.Dispatch<any>;
	fieldData: any;
	selectedTab?: string;
	defaultValue?: any;
};

const TagSelect = (props: Type_TagSelectProps) => {
	// console.log("TagSelect", props)
	
	const [dataSnapshot, setDataSnapshot] = React.useState<any>([]);
	const organisationId = useAppSelector((state) => state.auth.organisationId);
	const [selected, setSelected] = React.useState<any>([]);
	const [datas, setDatas] = React.useState<any>([]);
	const [isDropdownVisible, setIsDropdownVisible] =
		React.useState<boolean>(false);

	const filterSelectedInitial = useCallback(async (selectedDatas:any) => {
		let filteredTagList = [];
		if(selectedDatas.length > 0){
			const selectedString = selectedDatas.map((item: any) => {
				const temp = {
					color: item.color,
					tagName: item.tagName
				}
				return JSON.stringify(temp)
			})
			filteredTagList = dataSnapshot.filter((item: any) => {
				const temp = {
					color: item.color,
					tagName: item.tagName
				}
				let itemString = JSON.stringify(temp)
				return !selectedString.includes(itemString)
			})
		}else{
			filteredTagList = dataSnapshot
		}
		setDatas(filteredTagList);
	}, [dataSnapshot])
	
	// Updating Selected Tag
	useEffect(() => {
		
		if (props.defaultValue) {
			setSelected(JSON.parse(JSON.stringify(props.defaultValue)));
		}
		const get_dropdown_options = async (
			organisationId: string,
			columnName: string
		) => {
			onSnapshot(doc(db, "filterSchema", organisationId), (doc) => {
				let filterSchemaDetails: any = doc.data();
				if (
					filterSchemaDetails &&
					filterSchemaDetails["data"] &&
					filterSchemaDetails["data"][props.fieldData.field]
				) {
					let tagList: TYPE_TAG[] = [];
					filterSchemaDetails["data"][props.fieldData.field].forEach(
						(item: any) => {
							if (item.columnName === columnName) {
								item &&
									item.data &&
									item.data.forEach((tag: any) => {
										let tagObj = {
											color: tag.color,
											tagName: tag.filterOptionName,
										};
										tagList.push(tagObj);
									});
							}
						}
					);
					
					setDataSnapshot(tagList);
				}
			});
		};
		get_dropdown_options(organisationId, props.columnName);
	}, [props.defaultValue, organisationId, props.columnName, props.fieldData.field]);

	const filterSelected = (selectedData:any, dataList:any) => {
		
		let filteredTagList = [];
		if(selectedData.length > 0){
			const selectedString = selectedData.map((item: any) => {
				const temp = {
					color: item.color,
					tagName: item.tagName
				}
				return JSON.stringify(temp)
			})
			filteredTagList = dataList.filter((item: any) => {
				const temp = {
					color: item.color,
					tagName: item.tagName
				}
				let itemString = JSON.stringify(temp)
				return !selectedString.includes(itemString)
			})
		}else{
			filteredTagList = dataList
		}
		props.setFormData({
			...props.fieldData,
			[props.columnName]: selectedData,
		});
		setSelected(selectedData)
		setDatas(filteredTagList);
	}

	// Updating Dropdown Options
	useEffect(() => {
		// dataSnapshot.map((item: TYPE_TAG[]) => {
		// 	console.log(props.defaultValue.includes(item));
		// });
		filterSelectedInitial(props.defaultValue)
	}, [dataSnapshot, props.defaultValue,filterSelectedInitial]);


	function toggleDropdownOption() {
		setIsDropdownVisible(!isDropdownVisible);
	}

	const dispatch = useAppDispatch();

	const handleAddTags = () => {
		dispatch(
			setSideBar({
				type: "addOption",
				columnName: props.columnName,
				columnType: props.dataType,
				fieldName: props.fieldData.field,
			})
		)
	};

	return (
		<div className="rounded-lg my-[0.3rem] bg-background_color text-sm">
			<div
				onClick={() => toggleDropdownOption()}
				className="flex"
			>
				<span
					className="capitalize w-[7em] min-w-[7em] p-3 text-center rounded-l font-dm_sans text-primary_font_color font-bold truncate flex items-center justify-center"
					title={props.columnName}
				>
					{props.columnName}
				</span>
				<div className="grow max-w-[calc(100%-7em)] overflow-auto flex items-center bg-Secondary_background_color px-4 rounded-r font-dm_sans border-2 border-background_color">
					{selected && selected.length > 0 ? (
						selected.map((tag: TYPE_TAG, index: number) => {
							return (
								<div
									key={`${index}-multi-selected-tag`}
									className="relative flex bg-black/40 gap-[5px] rounded-full p-[3px] items-center"
								>
									<TagComponent value={[tag]} />
									<button
										type="button"
										onClick={async () => {
											console.log("tag", tag, selected);
											
											let currTag = selected.filter((item:any)=>{
												return JSON.stringify(item) !== JSON.stringify(tag)
											})
											console.log("currTag", currTag);
											let temp = dataSnapshot;
											temp.push(tag)
											console.log("dataSnapshot", dataSnapshot);
											
											await filterSelected(currTag, temp)
										}}
										className="hover:text-red-400 text-base transition-all flex items-center"
									>
										<span className="material-symbols-outlined">close</span>
									</button>
								</div>
							);
						})
					) : (
						<></>
					)}
				</div>
			</div>

			<div
				className={`flex-col ${isDropdownVisible ? "flex" : "hidden"} p-[5px]`}
			>
				{datas &&
					datas.map((data: TYPE_TAG, index: number) => {
						return (
							<button
								type="button"
								key={`${index}-multi-select-tag`}
								onClick={async () => {
									console.log("data", [...selected, data]);
									let currTag = selected;
									currTag.push(data)
									setSelected(currTag);
									console.log("selected", selected);
									await filterSelected(currTag, dataSnapshot)
								}}
								className="cursor-pointer hover:bg-Secondary_background_color px-3 py-1"
							>
								<TagComponent
									key={`${index}-tag-multiselect`}
									value={[data]}
								/>
							</button>
						);
					})}

				{props.dataType === "tag" && (
					<button
						type="button"
						className="w-full p-[0.5rem_0] flex items-center justify-center text-white/40 border-[1px] border-white/20 rounded-md hover:text-amber-400 hover:border-amber-400"
						onClick={()=>handleAddTags()}
					>
						<span className="material-symbols-outlined">add</span>
						<p>Add Tags</p>
					</button>
				)}
			</div>
		</div>
	);
};
export default TagSelect;

