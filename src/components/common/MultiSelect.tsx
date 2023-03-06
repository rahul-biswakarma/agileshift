import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { get_userIds_in_organizations } from "../../Utils/Backend";
import TagComponent from "../DataTable/tagComponent";
import UserComponent from "../DataTable/userComponent";

import { db } from "../../firebaseConfig";
import { setSideBar } from "../../redux/reducers/SideBarSlice";

type Type_MultiSelectProps = {
	dataType: string;
	columnName: string;
	setFormData: React.Dispatch<any>;
	fieldData: any;
	selectedTab?: string;
	defaultValue?: any;
};

const MultiSelect = (props: Type_MultiSelectProps) => {
	const [datas, setDatas] = React.useState<any>([]);
	const [selected, setSelected] = React.useState<any>([]);
	const [isDropdownVisible, setIsDropdownVisible] =
		React.useState<boolean>(false);

	const organisationId = useAppSelector((state) => state.auth.organisationId);

	function toggleDropdownOption() {
		setIsDropdownVisible(!isDropdownVisible);
	}
	const dispatch = useAppDispatch();
	const handleAddTags = () => {
		dispatch(
			setSideBar({
				sidebarType: "addOption",
				columnName: props.columnName,
				columnType: "tag",
				fieldName: props.fieldData.fieldName,
			})
		);
	};

	useEffect(() => {
		if (props.defaultValue && props.dataType === "tag") {
			setSelected(props.defaultValue);
		} else if (props.defaultValue && props.dataType === "user") {
			setSelected(props.defaultValue);
		}
	}, [props.defaultValue, props.dataType]);

	useEffect(() => {
		const get_dropdown_options = async (
			organisationId: string,
			columnName: string
		) => {
			onSnapshot(doc(db, "filterSchema", organisationId), (doc) => {
				let filterSchemaDetails: any = doc.data();
				if (filterSchemaDetails[props.selectedTab!] !== undefined) {
					let selectedColumn = filterSchemaDetails[props.selectedTab!].filter(
						(item: any) => item.columnName === columnName
					);
					setDatas(selectedColumn[0]["data"]);
				}
			});
		};

		if (props.dataType === "user") {
			get_userIds_in_organizations(organisationId).then((res) => {
				setDatas(res.filter((userId: string) => userId !== selected));
			});
		} else {
			get_dropdown_options(organisationId, props.columnName).then((res) => {});
		}
	}, [
		organisationId,
		props.columnName,
		props.dataType,
		props.selectedTab,
		selected,
	]);

	return (
		<div className="rounded-lg my-[0.3rem] bg-background_color text-sm">
			<div
				onClick={() => toggleDropdownOption()}
				className="flex"
			>
				<span
					className="capitalize w-[7em] p-3 text-center rounded-l font-dm_sans text-primary_font_color font-bold truncate"
					title={props.columnName}
				>
					{props.columnName}
				</span>
				<div className="grow flex items-center bg-Secondary_background_color px-4 rounded-r font-dm_sans border-2 border-background_color">
					{selected && selected.length > 0 && props.dataType === "user" ? (
						<div
							key={`multi-selected-user`}
							className="relative flex bg-black/40 gap-[5px] rounded-full p-[3px] items-center"
						>
							<UserComponent
								value={selected}
								showName={true}
							/>
							<button
								onClick={() => {
									let currUser = selected;
									setSelected(null);
									if (currUser !== null) setDatas([...datas, currUser]);
								}}
								className="hover:text-red-400 text-base transition-all flex items-center material-symbols-outlined"
							>
								close
							</button>
						</div>
					) : selected && selected.length > 0 && props.dataType === "tag" ? (
						selected.map((tag: TYPE_TAG, index: number) => {
							return (
								<div
									key={`${index}-multi-selected-tag`}
									className="relative flex bg-black/40 gap-[5px] rounded-full p-[3px] items-center"
								>
									<TagComponent value={[tag]} />
									<button
										onClick={() => {
											let currTag = selected[index];
											setSelected([
												...selected.filter(
													(item: string, currIndex: number) =>
														currIndex !== index
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
				{props.dataType === "user"
					? datas &&
					  datas.length > 0 &&
					  datas.map((userId: string, index: number) => {
							return (
								userId !== null && (
									<button
										key={`${index}-multi-select-user`}
										onClick={() => {
											let currSelectedUser = selected;
											setSelected(datas[index]);

											props.setFormData({
												...props.fieldData,
												[props.columnName]: datas[index],
											});

											let tempDatas = datas;
											tempDatas.splice(index, 1);
											setDatas([...tempDatas, currSelectedUser]);
										}}
										className="cursor-pointer hover:bg-Secondary_background_color px-3 py-1"
									>
										<UserComponent
											key={`${index}-user-multiselect`}
											value={userId}
											showName={true}
										/>
									</button>
								)
							);
					  })
					: datas &&
					  datas.map((data: TYPE_TAG, index: number) => {
							return (
								<button
									key={`${index}-multi-select-tag`}
									onClick={() => {
										setSelected([...selected, datas[index]]);
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

export default MultiSelect;
