import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import UserComponent from "../DataTable/userComponent";
import { db } from "../../firebaseConfig";

type Type_UserSelectProps = {
	dataType: string;
	columnName: string;
	setFormData: React.Dispatch<any>;
	fieldData: any;
	selectedTab?: string;
	defaultValue?: any;
};

const UserSelect = (props: Type_UserSelectProps) => {
	const [dataSnapshot, setDataSnapshot] = React.useState<any>([]);
	const [datas, setDatas] = React.useState<any>([]);
	const [selected, setSelected] = React.useState<any>([]);
	const [isDropdownVisible, setIsDropdownVisible] =
		React.useState<boolean>(false);
	const organisationId = useAppSelector((state) => state.auth.organisationId);

	function toggleDropdownOption() {
		setIsDropdownVisible(!isDropdownVisible);
	}

	useEffect(() => {
		if (props.defaultValue) setSelected(props.defaultValue);
	}, [props.defaultValue, props.dataType]);

	useEffect(() => {
		const get_users_options = async (organisationId: string) => {
			onSnapshot(doc(db, "organizations", organisationId), (doc) => {
				let organizationsDetails: any = doc.data();
				if (organizationsDetails && organizationsDetails["users"]) {
					let usersList: string[] = [];
					organizationsDetails["users"].forEach((userId: string) => {
						usersList.push(userId);
					});
					setDataSnapshot(usersList);
				}
			});
		};
		get_users_options(organisationId);
	}, [organisationId]);

	useEffect(() => {
		setDatas(dataSnapshot.filter((userId: string) => userId !== selected));
	}, [
		dataSnapshot,
		organisationId,
		props.columnName,
		props.dataType,
		props.fieldData.field,
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
					className="capitalize w-[7em] p-3 text-center rounded-l font-dm_sans text-primary_font_color font-bold truncate flex items-center justify-center"
					title={props.columnName}
				>
					{props.columnName}
				</span>
				<div className="grow flex items-center bg-Secondary_background_color px-4 rounded-r font-dm_sans border-2 border-background_color">
					{selected && selected.length > 0 && (
						<div
							key={`multi-selected-user`}
							className="relative flex bg-black/40 gap-[5px] rounded-full p-[3px] items-center"
						>
							<UserComponent
								value={selected}
								showName={true}
							/>
							<button
								type="button"
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
					)}
				</div>
			</div>
			<div
				className={`flex-col ${isDropdownVisible ? "flex" : "hidden"} p-[5px]`}
			>
				{datas &&
					datas.length > 0 &&
					datas.map((userId: string, index: number) => {
						return (
							userId !== null && (
								<button
									type="button"
									key={`${index}-multi-select-user`}
									onClick={() => {
										let currSelectedUser = selected;
										setSelected(datas[index]);
										props.setFormData({
											...props.fieldData,
											[props.columnName]: datas[index],
										});
										let tempDatas = datas;
										tempDatas = tempDatas.filter(
											(userId: string) => userId !== currSelectedUser
										);
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
					})}
			</div>
		</div>
	);
};
export default UserSelect;
