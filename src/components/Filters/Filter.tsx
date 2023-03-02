import { useEffect, useState } from "react";
import DisplayFilters from "./DisplayFilters";
import VistaPopup from "./VistaPopup";

type TYPE_FilterOption = {
	filterOptionName: string;
	active: boolean;
};

type TYPE_Filters = {
	columnName: string;
	active: boolean;
	data: TYPE_FilterOption[];
};

type TYPE_ActiveFiltersDropdown = {
	[key: string]: boolean;
};

type TYPE_FilterProps = {
	filters: TYPE_Filters[],
	modifyData: (filterSchema: TYPE_Filters[]) => void
}

const Filter = ({filters, modifyData}: TYPE_FilterProps) => {
	const [filterSchema, setFilterSchema] = useState<TYPE_Filters[]>(filters);
	const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
	const [activeFiltersDropdown, setActiveFiltersDropdown] =
		useState<TYPE_ActiveFiltersDropdown>({});

	useEffect(() => {
		setFilterSchema(filters);
	}, [filters])

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
		filterOptionIndex: number
	) => {
		const newFilterSchema = [...filterSchema];
		const filterObj = newFilterSchema.find((x) => x.columnName === filterName)!;

		if (filterObj?.data[filterOptionIndex].active === true) {
			filterObj.data[filterOptionIndex].active = false;
		} else {
			filterObj.data[filterOptionIndex].active = true;
		}
        setFilterSchema(newFilterSchema);
		modifyData(newFilterSchema);
    }

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
        const resetFilterSchema = [...filterSchema];
        resetFilterSchema.forEach((filterObj) => {
            filterObj.data.forEach((filterOptionObj) => {
                filterOptionObj.active = false;
            });
        });
        setFilterSchema(resetFilterSchema);
		modifyData(resetFilterSchema);
    }

	return (
		<div className="w-screen h-auto bg-[#161616] text-[#808080]">
			<div className="flex justify-between mb-4 mx-9 pt-4">
				<div className="flex flex-wrap gap-3">
					<div className="flex text-sm">
						<button className="mr-4">
							<span className="material-symbols-outlined">
								alternate_email
							</span>
						</button>
						<button className="mr-4">
							<span className="material-symbols-outlined">
								schedule
							</span>
						</button>
						<div className="h-4 bg-[#808080] self-center mr-4">
							<hr className="border-default w-px h-full"></hr>
						</div>
					</div>

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
												type={filter.columnName}
												setActiveFilters={modifyActiveFilterState}
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
							<span className="material-symbols-outlined">
								add
							</span>
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
						<button onClick={() => resetFilters()} className="rounded-md h-7
						text-[#808080] text-sm font-bold ">
							Clear
						</button>
						<VistaPopup />
				</div>
			</div>
		</div>
	);
};

export default Filter;
