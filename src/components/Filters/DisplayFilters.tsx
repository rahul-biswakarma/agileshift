import { useState } from "react";

type TYPE_FilterOption = {
 filterOptionName: string;
 active: boolean;
};

type DisplayFiltersProps = {
 type: string;
 filterData: TYPE_FilterOption[];
 setActiveFilters: (filterName: string, filterOptionIndex: number) => void;
};

const DisplayFilters = ({
 filterData,
 type,
 setActiveFilters,
}: DisplayFiltersProps) => {
 const [modifiedFilterData, setModifiedFilterData] = useState(filterData);


  const searchFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterData = filterData.filter((filterData) => filterData.filterOptionName.includes(event.target.value));
    setModifiedFilterData(newFilterData);
  }

  
 return (
  <div>
   <div className="absolute top-[110%] left-0 bg-background_color w-48 rounded-xl p-1 border border-white/20 text-highlight_font_color">
    <div className="flex flex-wrap gap-1 p-2 border-b border-white/10">
     {modifiedFilterData
      .filter((column) => column.active === true)
      .map((column, index) => (
       <button
        key={index}
        className="inline-block font-fira_code rounded-md border border-dark_gray text-highlight_font_color text-xs py-1 px-2"
       >
        {column.filterOptionName}
       </button>
      ))}
    </div>
    <div className="flex items-center p-2 border-b border-white/10">
     <input
      className="bg-background_color text-xs flex-1 outline-none text-highlight_font_color placeholder:text-white/20"
      placeholder="Search"
      type="text"
      onChange={(event) => searchFilters(event)}
     />
    </div>
    <div className="flex flex-col gap-1 mt-1 p-1">
     {modifiedFilterData.map((data, index) => {
      if (data.active === true) {
       return (
        <div
         key={index}
         onClick={() => setActiveFilters(type, index)}
         className="px-2 py-1 text-xs font-semibold bg-Secondary_background_color rounded-lg cursor-pointer border border-white/10"
        >
         {data.filterOptionName}
        </div>
       );
      } else {
       return (
        <div
         key={index}
         onClick={() => setActiveFilters(type, index)}
         className="px-2 py-1 text-xs font-semibold hover:bg-Secondary_background_color rounded-lg cursor-pointer border border-transparent hover:border-white/10"
        >
         {data.filterOptionName}
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
