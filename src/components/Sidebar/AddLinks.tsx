import Select from "react-select";
import { useCallback, useEffect, useRef, useState } from "react";
import { ShowItem } from "./ShowItem";
import {
	add_links_to_fields,
	get_data_by_column_name,
	get_schema_data,
	get_schema_data_field,
} from "../../Utils/Backend";

import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	formatDataToTypeField,
	formatSchemaDataToTypeField,
} from "../../Utils/HelperFunctions";
import CustomButton from "../common/Button";
import { DisplayIdComponent } from "../DataTable/displayIdComponentContainer";
import { setFetchedLinks, setSideBar } from "../../redux/reducers/SideBarSlice";
const customStyles = {
	control: (provided: any) => ({
		...provided,
		backgroundColor: "#1F1F1F", // Set the background color here
		border: "1px solid rgba(255, 255, 255, 0.30)",
		borderRadius: "0.375rem",
		boxShadow: "0 0 0 0px rgba(255, 255, 255, 0.30)",

		"&:hover": {
			borderColor: "rgba(255, 255, 255, 0.30)",
		},
	}),
	option: (provided: any, state: any) => ({
		...provided,
		backgroundColor: state.isSelected ? "#3B82F6" : "#1F1F1F", // Set the option background color here
		color: state.isSelected ? "#FFFFFF" : "#CCCCCC", // Set the option text color here
		cursor: "pointer", // Set the cursor
	}),
	multiValue: (provided: any) => ({
		...provided,
		backgroundColor: "#3B82F6", // Set the background color of the selected option here
	}),
	multiValueLabel: (provided: any) => ({
		...provided,
		color: "#FFFFFF", // Set the text color of the selected option here
	}),
	menuList: (provided: any) => ({
		...provided,
		padding: 0, // remove padding
		marginTop: 0, // remove margin top
		marginBottom: 0, // remove margin bottom
		backgroundColor: "#161616",
		border: "1px solid rgba(255, 255, 255, 0.30)",
		borderRadius: "0.25rem",
	}),
	input: (provided: any) => ({
		...provided,
		color: "#FFFFFF", // Set the input text color here
	}),
};
type LinkPropTypes = {
	sidebar: Type_SIDEBARSTATE;
	handleClose: Function;
	handleSideBarColaps: Function;
	tabBarColaps: boolean;
};

export const AddLinks = (props: LinkPropTypes) => {
	const dispatch = useAppDispatch();
	const linkedCalledByID = props.sidebar.linkedCalledByID!;
	const organisationId = useAppSelector(
		(state: RootState) => state.auth.organisationId
	);

	const getIdArray = (fetchedLinks: TYPE_LINKED_DATA[]) => {
		let Ids: string[] = [];
		for (let link of fetchedLinks) {
			Ids.push(link.id);
		}
		return Ids;
	};

	const [fetchData, setFetchData] = useState(true);
	type optionsType = {
		value: string;
		label: string;
		id: string;
		displayId: string;
		fieldName: string;
		color: string;
		title: string;
	};

	const [options, setOptions] = useState<optionsType[]>([]);
	const [selectedOptions, setSelectedOptions] = useState<optionsType[]>([]);
	const fetchedLinks = useAppSelector((state) => state.sidebar.fetchedLinks);
	// stop create button from being clicked multiple times

	const handleSelectChange = (selected: any) => {
		setSelectedOptions(selected);
	};

	const getTitleFromSchemaData = useCallback(
		(schemaData: TYPE_FIELD[], name: string) => {
			let title = "";
			schemaData.forEach((data) => {
				if (data["name"] === name) {
					for (let column of data.list) {
						if (column.columnType === "title") {
							title = column.columnName;
						}
					}
				}
			});
			return title;
		},
		[]
	);

	const getColorFromSchemaData = (schemaData: TYPE_FIELD[], name: string) => {
		let color = "";
		schemaData.forEach((data) => {
			if (data["name"] === name) {
				color = data["color"];
			}
		});
		return color;
	};
	const formatOptions = useCallback(
		(allData: any, schemaData: any) => {
			let formattedData: optionsType[] = [];
			for (let data of allData) {
				let color = getColorFromSchemaData(
					formatSchemaDataToTypeField(schemaData!["schemaData"]),
					data["field"]
				);
				let title = getTitleFromSchemaData(
					formatSchemaDataToTypeField(schemaData!["schemaData"]),
					data["field"]
				);
				formattedData.push({
					value: data["id"],
					label: data[title],
					id: data["id"],
					color: color,
					title: data[title],
					displayId: data["displayId"],
					fieldName: data["field"],
				});
			}
			return formattedData;
		},
		[getTitleFromSchemaData]
	);

	useEffect(() => {
		const getAllData = async () => {
			let linkedData = fetchedLinks[linkedCalledByID];
			let field = formatDataToTypeField(
				await get_schema_data_field(organisationId, props.sidebar.fieldName!)
			);

			let allData = await get_data_by_column_name(organisationId, "all");

			let fetchedIds = getIdArray(linkedData);

			let selectedData = allData.filter((data: any) =>
				fetchedIds.includes(data.id)
			);

			allData = allData.filter((data: any) =>
				field.linkage.includes(data["field"])
			);

			const schemaData = await get_schema_data(organisationId);
			setOptions(formatOptions(allData, schemaData));
			setSelectedOptions(formatOptions(selectedData, schemaData));
		};
		if (fetchData) {
			getAllData();
			setFetchData(false);
		}
	}, [
		fetchData,
		organisationId,
		linkedCalledByID,
		props.sidebar.fieldName,
		formatOptions,
		fetchedLinks,
	]);

	const handleIdClick = (id: string) => {
		dispatch(
			setSideBar({
				type: "editMode",
				createModeCalledByField: "",
				fieldId: id,
				linkedData: [],
				id: id,
			})
		);
	};

	const selectRef: any = useRef(null);

	useEffect(() => {
		if (selectRef && selectRef.current !== null) {
			selectRef.current.focus();
		}
	}, []);

	const handleSubmit = () => {
		if (props.sidebar.modeOfCall === "editMode") {
			add_links_to_fields(organisationId, linkedCalledByID, selectedOptions);
		}
		let tempLinks = { ...fetchedLinks };
		tempLinks[linkedCalledByID] = selectedOptions;
		dispatch(setFetchedLinks(tempLinks));
		props.handleClose();
	};

	if (props.tabBarColaps) {
		return (
			<div
				onClick={() => props.handleSideBarColaps()}
				className=" [writing-mode:vertical-rl] border-r border-white/10 h-full w-[50px] flex justify-center items-center text-md  cursor-pointer bg-background_color py-4 font-fira_code"
			>
				{"Add Links"}
			</div>
		);
	} else {
		return (
			<div
				className="flex w-[400px] p-2 flex-col justify-between h-full pt-10 
    "
			>
				<Select
					ref={selectRef}
					className="text-sm"
					closeMenuOnSelect={false}
					hideSelectedOptions={false}
					controlShouldRenderValue={false}
					placeholder="Search for item"
					isMulti
					options={options}
					styles={customStyles}
					getOptionLabel={(option) => option.label}
					value={selectedOptions}
					isOptionSelected={(option) =>
						selectedOptions.some(
							(selectedOption: optionsType) =>
								selectedOption.value === option.value
						)
					}
					components={{ Option: ShowItem }}
					onChange={(value) => {
						handleSelectChange(value);
					}}
				/>
				<section className="grow overflow-y-auto flex flex-col justify-end">
					<div className="bg-black/60 flex flex-col gap-2 p-4 text-white max-h-[90%] rounded-md mt-4 mb-2">
						<p className="font-bold text-xl">Linked Items</p>
						<div className="max-h-1/5 overflow-auto flex flex-col justify-center items-center gap-2">
							{selectedOptions.length === 0 && (
								<p className="text-white/50">No items linked</p>
							)}
							{selectedOptions.length > 0 &&
								selectedOptions.map((item: optionsType, id: number) => (
									<button
										type="button"
										className="w-full text-white bg-background_color p-3 rounded-md flex items-center gap-2 text-sm"
										key={id}
										onClick={() => handleIdClick(item.value)}
									>
										<DisplayIdComponent
											field={item.fieldName}
											displayId={item.displayId}
											color={item.color}
										/>
										<p className="grow truncate text-left">{item.title}</p>
									</button>
								))}
						</div>
					</div>
				</section>

				<CustomButton
					// disabled={isButtonClicked}
					onClick={handleSubmit}
					label={"Save Links"}
					icon="add_link"
					className="flex justify-center items-center gap-2 p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm 
            text-highlight_font_color border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400 
            hover:text-purple-800 transition-all duration-200 ease-in-out"
				/>
			</div>
		);
	}
};
