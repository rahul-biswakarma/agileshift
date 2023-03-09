import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import TagComponent from "../DataTable/tagComponent";
import { db } from "../../firebaseConfig";
import Select from "react-select";

type Type_TagSelectProps = {
	dataType: string;
	columnName: string;
	setFormData: React.Dispatch<any>;
	fieldData: any;
	selectedTab?: string;
	defaultValue?: any;
};

const TagSelect = (props: Type_TagSelectProps) => {
	const [dataSnapshot, setDataSnapshot] = React.useState<any>([]);
	const [datas, setDatas] = React.useState<any>([]);
	const [selected, setSelected] = React.useState<any>([]);
	const [isDropdownVisible, setIsDropdownVisible] =
		React.useState<boolean>(false);
	const organisationId = useAppSelector((state) => state.auth.organisationId);

	// Fetching Dropdown Options usign SnapShot
	useEffect(() => {
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
	}, [organisationId, props.columnName, props.fieldData.field]);

	// Updating Dropdown Options
	useEffect(() => {
		dataSnapshot.map((item: TYPE_TAG[]) => {
			console.log(props.defaultValue.includes(item));
		});
		setDatas(
			dataSnapshot.filter(
				(item: any) => props.defaultValue.tagName !== item.tagName
			)
		);
	}, [dataSnapshot, props.defaultValue]);

	// Updating Selected Tag
	useEffect(() => {
		if (props.defaultValue) {
			setSelected(props.defaultValue);
		}
	}, [props.defaultValue]);

	function toggleDropdownOption() {
		setIsDropdownVisible(!isDropdownVisible);
	}

	const dispatch = useAppDispatch();

	const handleAddTags = () => {};

	return (
		<div className="rounded-lg my-[0.3rem] bg-background_color text-sm">
			<div
				onClick={() => toggleDropdownOption()}
				className="flex"
			>
				<span
					className="capitalize w-[7em] p-3 text-center rounded-l font-dm_sans text-primary_font_color font-bold truncate flex items-center justify-center"
					title={props.columnName}
				>
					{props.columnName}
				</span>
				<div className="grow flex items-center bg-Secondary_background_color px-4 rounded-r font-dm_sans border-2 border-background_color">
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
										onClick={() => {
											let currTag = tag;
											setSelected([
												...selected.filter(
													(item: TYPE_TAG) => currTag !== item
												),
											]);
											if (currTag !== null) setDatas([...datas, currTag]);
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
								onClick={() => {
									console.log("data", [...selected, data]);
									setSelected([...selected, data]);
									console.log("selected", selected);
									props.setFormData({
										...props.fieldData,
										[props.columnName]: selected,
									});
									let tempDatas = datas;
									tempDatas.splice(index, 1);
									setDatas(tempDatas);
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
						onClick={handleAddTags}
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
