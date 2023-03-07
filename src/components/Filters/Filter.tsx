import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { setVistaName, setVistaSchema } from "../../redux/reducers/VistaSlice";
import DisplayFilters from "./DisplayFilters";
import VistaPopup from "./VistaPopup";

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

type TYPE_ActiveFiltersDropdown = {
	[key: string]: boolean;
};

type TYPE_FilterProps = {
	filters: TYPE_Filters[];
	modifyData: (filterSchema: TYPE_Filters[]) => void;
};

const Filter = ({ filters, modifyData }: TYPE_FilterProps) => {
	const filterSchemaFromStore = useAppSelector(
		(state) => state.vista.filterSchema
	);
	const dispatch = useDispatch();
	const [filterSchema, setFilterSchema] = useState<TYPE_Filters[]>(filters);
	const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
	const [activeFiltersDropdown, setActiveFiltersDropdown] =
		useState<TYPE_ActiveFiltersDropdown>({});

	useEffect(() => {
		setFilterSchema(filters);
	}, [filters]);

	const handleColumnClick = (columnTitle: string) => {
		const newFilters = { ...activeFiltersDropdown };
		if (newFilters[columnTitle]) {
			newFilters[columnTitle] = !newFilters[columnTitle];
		} else {
			for (const key in newFilters) {
				if (newFilters.hasOwnProperty(key)) {
					newFilters[key] = false;
				}
			}
			newFilters[columnTitle] = true;
		}
		setActiveFiltersDropdown(newFilters);
	};

	const modifyActiveFilterState = (
		filterName: string,
		filterOptionIndex: number,
		filterS: any,
	) => {

		console.log(filterName,"filterName");
		console.log(filterOptionIndex,"filterindex");
		console.log(filterS,"filters");

		const filterSche = [...filterS];
		const filterObj = filterSche.find((x:any) => x.columnName === filterName)!;
		console.log(filterObj,"filterobj");

		if (filterObj?.data[filterOptionIndex].active === true) {
			filterObj.data[filterOptionIndex].active = false;
		} else {
			filterObj.data[filterOptionIndex].active = true;
		}
		console.log(filterObj,"filterObj after toggle");
		setFilterSchema(filterSche);
		modifyData(filterSche);
	};

	const modifyActiveState = (index: number) => {
		const newArray = [...filterSchema];
		if (newArray[index].active === true) {
			newArray[index].active = false;
		} else if (newArray[index].active === false) {
			newArray[index].active = true;
		}
		setFilterSchema(newArray);
		modifyData(newArray);
	};

	const resetFilters = () => {
		const resetFilterSchema: TYPE_Filters[] = [];
		filterSchema.forEach((filterObj) => {
			const filterObjs = { ...filterObj };
			const filterObjsData: TYPE_FilterOption[] = [];
			filterObj.data.forEach((filterOptionObj) => {
				let filterOptionObjs = { ...filterOptionObj };
				filterOptionObjs.active = false;
				filterObjsData.push(filterOptionObjs);
			});
			filterObjs.data = filterObjsData;
			resetFilterSchema.push(filterObjs);
		});
		setFilterSchema(resetFilterSchema);
		modifyData(resetFilterSchema);
		dispatch(setVistaName(""));
		dispatch(setVistaSchema(resetFilterSchema));
	};

	const updateVistaData = useCallback(() => {
		if (filterSchemaFromStore.length > 0) {
			const filter = [...JSON.parse(JSON.stringify(filterSchemaFromStore))];
			setTimeout(() => {
				setFilterSchema(filter);
				modifyData(filter);
			}, 500);
		}
	}, [filterSchemaFromStore, modifyData]);

	useEffect(() => {
		updateVistaData();
	}, [updateVistaData]);

	return (
		<div className="w-screen h-[60px] bg-[#161616] text-[#808080] flex border-b-[1px] border-white/10">
			<div className="flex w-screen justify-between mb-4 mx-4 pt-4 items-center">
				<div className="flex flex-wrap gap-3 mx-3">
					<div className="relative flex items-center gap-2">
						{filterSchema
							.filter((filter) => filter.active === true)
							.map((filter, index) => (
								<div key={index}>
									<div
										className="flex items-center gap-1 font-fira_code text-xs font-semibold cursor-pointer rounded-md border border-dark_gray px-2 py-1"
										onClick={() => handleColumnClick(filter.columnName)}
									>
										<h4 className="text-[10px]">{filter.columnName}</h4>
										<div className="flex gap-1">
											{filter.data
												.filter((filter) => filter.active === true)
												.map((filter, index) => (
													<button
														key={index}
														className="flex items-center justify-center font-fira_code rounded-md border border-dark_gray text-highlight_font_color text-center text-[6px] px-[5px] z-10"
													>
														{filter.filterOptionName}
													</button>
												))}
										</div>
									</div>
									{activeFiltersDropdown[filter.columnName] === true && (
										<div className="absolute top-[100%] bg-black z-10">
											<DisplayFilters
												filterData={filter.data}
												filterSchema={filterSchema}
												filterName={filter.columnName}
												modifyActiveFilterState={modifyActiveFilterState}
											/>
										</div>
									)}
								</div>
							))}
					</div>

					<div className="relative flex items-center justify-center gap-4">
						<button
							onClick={() => setShowAllFilters(!showAllFilters)}
							className="flex items-center justify-center rounded-md w-6 h-6 text-sm mr-4"
						>
							<span className="material-symbols-outlined">add</span>
						</button>
						{showAllFilters && (
							<div className="absolute top-[110%] left-0 bg-background_color w-48 rounded-xl p-1 border border-white/20 text-highlight_font_color z-10">
								<div className="flex flex-wrap gap-1 p-2 border-b border-white/10">
									{filterSchema
										.filter((filter) => filter.active === true)
										.map((filter, index) => (
											<button
												key={index}
												className="inline-block font-fira_code rounded-md border border-dark_gray text-highlight_font_color text-xs py-1 px-2"
											>
												{filter.columnName}
											</button>
										))}
								</div>
								<div className="flex flex-col gap-1 mt-1 p-1">
									{filterSchema.map((data, index) => {
										if (data.active === true) {
											return (
												<div
													key={index}
													onClick={() => modifyActiveState(index)}
													className="px-2 py-1 text-xs font-semibold bg-Secondary_background_color rounded-lg cursor-pointer border border-white/10"
												>
													{data.columnName}
												</div>
											);
										} else {
											return (
												<div
													key={index}
													onClick={() => modifyActiveState(index)}
													className="px-2 py-1 text-xs font-semibold hover:bg-Secondary_background_color rounded-lg cursor-pointer border border-transparent hover:border-white/10"
												>
													{data.columnName}
												</div>
											);
										}
									})}
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="flex items-center gap-4">
					<button
						onClick={() => resetFilters()}
						className="rounded-sm h-5 flex items-center text-[#808080] text-md font-[500]"
					>
						Clear
					</button>
					<div>
						<VistaPopup filterSchema={filterSchema} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Filter;
