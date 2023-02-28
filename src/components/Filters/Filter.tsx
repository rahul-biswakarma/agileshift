import { useState } from "react";
// import { useAppSelector } from "../../redux/hooks";
import { renderFilterData } from "../../Utils/Filter";
import DisplayFilters from "./DisplayFilters";

type TYPE_FilterOption = {
	filterOptionName: string;
	active: boolean;
};

type TYPE_Filters = {
	filterName: string;
	active: boolean;
	filterOptions: TYPE_FilterOption[];
};

type TYPE_ActiveFiltersDropdown = {
	[key: string]: boolean;
};

const filters = [
	{
		filterName: "Priority",
		active: true,
		filterOptions: [
			{
				filterOptionName: "P0",
				active: false,
			},
			{
				filterOptionName: "P1",
				active: false,
			},
			{
				filterOptionName: "P2",
				active: false,
			},
			{
				filterOptionName: "P3",
				active: false,
			},
		],
	},
	{
		filterName: "Stage",
		active: true,
		filterOptions: [
			{
				filterOptionName: "Open",
				active: false,
			},
			{
				filterOptionName: "In Progress",
				active: false,
			},
			{
				filterOptionName: "Closed",
				active: false,
			},
		],
	},
	{
		filterName: "Severity",
		active: false,
		filterOptions: [
			{
				filterOptionName: "Blocker",
				active: false,
			},
			{
				filterOptionName: "High",
				active: false,
			},
			{
				filterOptionName: "Medium",
				active: false,
			},
			{
				filterOptionName: "Low",
				active: false,
			},
		],
	},
	{
		filterName: "Tags",
		active: false,
		filterOptions: [
			{
				filterOptionName: "Now",
				active: false,
			},
			{
				filterOptionName: "Next",
				active: false,
			},
			{
				filterOptionName: "Later",
				active: false,
			},
		],
	},
];

const Filter = () => {

	// const organizationId = useAppSelector((state) => state.auth.organisationId);
	// const filters = get_filter_schema(organizationId);

	const [filterSchema, setFilterSchema] = useState<TYPE_Filters[]>(filters);
	const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
	const [activeFiltersDropdown, setActiveFiltersDropdown] =
		useState<TYPE_ActiveFiltersDropdown>({});

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
		const filterObj = newFilterSchema.find((x) => x.filterName === filterName)!;

		if (filterObj?.filterOptions[filterOptionIndex].active === true) {
			filterObj.filterOptions[filterOptionIndex].active = false;
		} else {
			filterObj.filterOptions[filterOptionIndex].active = true;
		}

        setFilterSchema(newFilterSchema);
        renderFilterData(filterSchema);
    }

	const modifyActiveState = (index: number) => {
		const newArray = [...filterSchema];
		if (newArray[index].active === true) {
			newArray[index].active = false;
		} else if (newArray[index].active === false) {
			newArray[index].active = true;
		}
		setFilterSchema(newArray);
	};

    const resetFilters = () => {
        const resetFilterSchema = [...filterSchema];
        resetFilterSchema.forEach((filterObj) => {
            filterObj.filterOptions.forEach((filterOptionObj) => {
                filterOptionObj.active = false;
            });
        });
        setFilterSchema(resetFilterSchema);
    }

	return (
		<div className="w-screen h-auto bg-[#161616]">
			<div className="flex justify-between mb-4 mx-9 pt-4">
				<div className="flex flex-wrap gap-3">
					<div className="flex">
						<button className="mr-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								stroke="#808080"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								className=" w-6 h-6 icon icon-tabler icon-tabler-at"
								viewBox="0 0 24 24"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
								/>
								<circle
									cx="12"
									cy="12"
									r="4"
								/>
								<path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-5.5 8.28" />
							</svg>
						</button>
						<button className="mr-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								stroke="#808080"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								className=" w-6 h-6 icon icon-tabler icon-tabler-antenna-bars-5"
								viewBox="0 0 24 24"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
								/>
								<path d="M6 18v-3m4 3v-6m4 6V9m4 9V6" />
							</svg>
						</button>
						<button className="mr-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								stroke="#808080"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								className=" w-6 h-6 icon icon-tabler icon-tabler-clock"
								viewBox="0 0 24 24"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
								/>
								<circle
									cx="12"
									cy="12"
									r="9"
								/>
								<path d="M12 7v5l3 3" />
							</svg>
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
										className="flex items-center gap-1 font-fira_code text-xs cursor-pointer rounded-md border border-dark_gray text-dark_gray px-2 py-1"
										onClick={() => handleColumnClick(filter.filterName)}
									>
										<h4>{filter.filterName}</h4>
										<div className="flex gap-1">
											{filter.filterOptions
												.filter((filter) => filter.active === true)
												.map((filter, index) => (
													<button
														key={index}
														className="flex items-center justify-center font-fira_code rounded-md border border-dark_gray text-highlight_font_color text-center text-[6px] px-[5px]"
													>
														{filter.filterOptionName}
													</button>
												))}
										</div>
									</div>
									{activeFiltersDropdown[filter.filterName] === true && (
										<div className="absolute top-[100%] bg-black">
											<DisplayFilters
												filterData={filter.filterOptions}
												type={filter.filterName}
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
							className="flex items-center justify-center rounded-md w-6 h-6 border border-1 border-[#808080] text-[#808080] text-sm mr-4 "
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								stroke="#808080"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								className=" w-4 h-4 text-center"
								viewBox="0 0 24 24"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
								/>
								<path d="M12 5v14m-7-7h14" />
							</svg>
						</button>
						{showAllFilters && (
							<div className="absolute top-[110%] left-0 bg-background_color w-48 rounded-xl p-1 border border-white/20 text-highlight_font_color">
								<div className="flex flex-wrap gap-1 p-2 border-b border-white/10">
									{filterSchema
										.filter((filter) => filter.active === true)
										.map((filter, index) => (
											<button
												key={index}
												className="inline-block font-fira_code rounded-md border border-dark_gray text-highlight_font_color text-xs py-1 px-2"
											>
												{filter.filterName}
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
													{data.filterName}
												</div>
											);
										} else {
											return (
												<div
													key={index}
													onClick={() => modifyActiveState(index)}
													className="px-2 py-1 text-xs font-semibold hover:bg-Secondary_background_color rounded-lg cursor-pointer border border-transparent hover:border-white/10"
												>
													{data.filterName}
												</div>
											);
										}
									})}
								</div>
							</div>
						)}
					</div>

					<div className="flex items-center gap-4">
						<button onClick={() => resetFilters()} className="rounded-md h-7 text-[#808080] text-sm font-bold ">
							Clear
						</button>
					</div>
				</div>
				<div className="flex items-center font-dm_sans">
					<div className="flex hover:bg-[#49494D] rounded-md px-4 py-2">
						<button className="rounded-md h-7 text-[#808080] text-sm font-bold">
							Sort
						</button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							stroke="#808080"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							className="w-4 h-4icon icon-tabler icon-tabler-chevron-down"
							viewBox="0 0 24 24"
						>
							<path
								stroke="none"
								d="M0 0h24v24H0z"
							/>
							<path d="m6 9 6 6 6-6" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Filter;
