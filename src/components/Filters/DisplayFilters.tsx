import React, { useState, useEffect } from "react";

type DisplayFiltersProps = {
  type: string;
  data: string[];
  activeFilters: { [key: string]: string[] };
  setActiveFilters: React.Dispatch<
    React.SetStateAction<{ [key: string]: string[] }>
  >;
};

const DisplayFilters = ({
  type,
  data,
  setActiveFilters,
  activeFilters,
}: DisplayFiltersProps) => {
  const [filterData, setFilterData] = useState([
    {
      name: "P0",
      active: false,
    },
    {
      name: "P1",
      active: false,
    },
    {
      name: "P2",
      active: false,
    },
    {
      name: "P3",
      active: false,
    },
  ]);

  const [activeFilterData, setActiveFilterData] = useState<{
    [key: string]: string[];
  }>({});

  const modifyFilterActiveState = (index: number) => {
    const newArray = [...filterData];
    const activeFilterList = { ...activeFilterData };
    if (newArray[index].active === true) {
      newArray[index].active = false;
    } else if (newArray[index].active === false) {
      newArray[index].active = true;
      let filters: any;
      activeFilterList[type]
        ? (filters = [...activeFilterList[type]])
        : (filters = []);
      filters.push(newArray[index].name);
      activeFilterList[type] = filters;
    }

    setFilterData(newArray);
    setActiveFilterData(activeFilterList);
  };

  useEffect(() => {
    setActiveFilters({ ...activeFilters, ...activeFilterData });
  }, [activeFilterData, activeFilters, setActiveFilters]);

  return (
    <div>
      <div className="absolute top-[110%] left-0 bg-primary_background_color w-48 rounded-xl p-1 border border-white/20 text-highlight_font_color">
        <div className="flex flex-wrap gap-1 p-2 border-b border-white/10">
          {filterData
            .filter((column) => column.active === true)
            .map((column, index) => (
              <button
                key={index}
                className="inline-block font-fira_code rounded-md border border-dark_gray text-highlight_font_color text-xs py-1 px-2">
                {column.name}
              </button>
            ))}
        </div>
        <div className="flex items-center p-2 border-b border-white/10">
          <input
            className="bg-background_color text-xs flex-1 outline-none text-highlight_font_color placeholder:text-white/20"
            placeholder="Search"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 mt-1 p-1">
          {filterData.map((data, index) => {
            if (data.active === true) {
              return (
                <div
                  key={index}
                  onClick={() => modifyFilterActiveState(index)}
                  className="px-2 py-1 text-xs font-semibold bg-Secondary_background_color rounded-lg cursor-pointer border border-white/10">
                  {data.name}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  onClick={() => modifyFilterActiveState(index)}
                  className="px-2 py-1 text-xs font-semibold hover:bg-Secondary_background_color rounded-lg cursor-pointer border border-transparent hover:border-white/10">
                  {data.name}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default DisplayFilters;
