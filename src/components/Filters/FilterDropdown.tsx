// import { useState } from 'react';

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
//   'sai',
//   'rahul',
//   'nikhil',
//   'sathyam',
//   'pranav',
//   'sethu',
//   'avnish',
// ];

// function NameButtonList(): JSX.Element {
//   const [filter, setFilter] = useState<string>('');
//   const [isContainerVisible, setIsContainerVisible] = useState<boolean>(false);
//   const filteredNames = names.filter((name: string) =>
//     name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const handleButtonClick = () => {
//     setIsContainerVisible(!isContainerVisible);
//   };

//   return (
//     <div>
//       <button
//         className="font-fira_code rounded-md border border-[#808080] text-[#808080] text-sm px-[10px] py-[2px] "
//         onClick={handleButtonClick}
//       >
//         owner
//       </button>
//       {isContainerVisible && (
//         <div className="absolute left-0 bg-primary_background_color w-48 rounded-xl p-1 border border-white/20 text-highlight_font_color">
//             <div className='flex items-center p-2 border-b border-white/10'>
//                 <input
//                     className="bg-background_color text-xs flex-1 outline-none text-highlight_font_color placeholder:text-white/20"
//                     type="text"
//                     placeholder="Search"
//                     value={filter}
//                     onChange={handleFilterChange}
//                 />
//             </div>
//             <div className="flex flex-col gap-1 mt-1 p-1 max-h-60 overflow-y-auto">
//                 {filteredNames.map((name: string) => (
//                     <button
//                     key={name}
//                     className="w-full text-left px-2 py-1 text-xs font-semibold cursor-pointer hover:bg-Secondary_background_color rounded-lg "
//                     >
//                     {name}
//                     </button>
//                 ))}
//             </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NameButtonList;


// import { useState } from 'react';

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
//   'sai',
//   'rahul',
//   'nikhil',
//   'sathyam',
//   'pranav',
//   'sethu',
//   'avnish',
// ];

// function NameButtonList(): JSX.Element {
//   const [filter, setFilter] = useState<string>('');
//   const [isContainerVisible, setIsContainerVisible] = useState<boolean>(false);
//   const [selectedNames, setSelectedNames] = useState<string[]>([]);

//   const filteredNames = names.filter((name: string) =>
//     name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const handleButtonClick = () => {
//     setIsContainerVisible(!isContainerVisible);
//   };

//   const handleNameClick = (name: string) => {
//     setSelectedNames([...selectedNames, name]);
//   };

//   return (
//     <div>
//       <button
//         className="font-fira_code rounded-md border border-[#808080] text-[#808080] text-sm px-[10px] py-[2px] "
//         onClick={handleButtonClick}
//       >
//         owner
//       </button>
//       {isContainerVisible && (
//         <div className="absolute left-0 bg-primary_background_color w-48 rounded-xl p-1 border border-white/20 text-highlight_font_color">
//             <div className="flex flex-wrap gap-1 p-2 border-b border-white/10">
//             {selectedNames.map((name: string) => (
//               <button
//                 key={name}
//                 className="inline-block rounded-md border border-dark_gray text-highlight_font_color text-xs py-1 px-2"
//               >
//                 {name}
//               </button>
//             ))}
//             </div>
//             <div className='flex items-center p-2 border-b border-white/10'>
//                 <input
//                     className="bg-background_color text-xs flex-1 outline-none text-highlight_font_color placeholder:text-white/20"
//                     type="text"
//                     placeholder="Search"
//                     value={filter}
//                     onChange={handleFilterChange}
//                 />
//             </div>
//             <div className="flex flex-col gap-1 mt-1 p-1 max-h-60 overflow-y-auto">
//                 {filteredNames.map((name: string) => (
//                     <button
//                     key={name}
//                     className="w-full text-left px-2 py-1 text-xs font-semibold cursor-pointer hover:bg-Secondary_background_color rounded-lg "
//                     onClick={() => handleNameClick(name)}
//                     >
//                     {name}
//                     </button>
//                 ))}
//             </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NameButtonList;


import { useState } from 'react';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
  'sai',
  'rahul',
  'nikhil',
  'sathyam',
  'pranav',
  'sethu',
  'avnish',
];

function NameButtonList(): JSX.Element {
  const [filter, setFilter] = useState<string>('');
  const [isContainerVisible, setIsContainerVisible] = useState<boolean>(false);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const filteredNames = names.filter((name: string) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleButtonClick = () => {
    setIsContainerVisible(!isContainerVisible);
  };

  const handleNameClick = (name: string) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((n) => n !== name));
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const isNameSelected = (name: string) => selectedNames.includes(name);

  return (
    <div>
      <button
        className="font-fira_code rounded-md border border-[#808080] text-[#808080] text-sm px-[10px] py-[2px] "
        onClick={handleButtonClick}
      >
        owner
      </button>
      {isContainerVisible && (
        <div className="absolute left-0 bg-primary_background_color w-48 rounded-xl p-1 border border-white/20 text-highlight_font_color">
            <div className="flex flex-wrap gap-1 p-2 border-b border-white/10">
                {selectedNames.map((name: string) => (
                <button
                    key={name}
                    className=" rounded-lg bg-Secondary_background_color  text-highlight_font_color text-xs py-1 px-2"
                >
                    {name}
                </button>
                ))}
            </div>
            <div className='flex items-center p-2 border-b border-white/10'>
                <input
                    className="bg-background_color text-xs flex-1 outline-none text-highlight_font_color placeholder:text-white/20"
                    type="text"
                    placeholder="Search"
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="flex flex-col gap-1 mt-1 p-1 max-h-60 overflow-y-auto">
                {filteredNames.map((name: string) => (
                    <button
                    key={name}
                    className={`w-full text-left px-2 py-1 text-xs font-semibold cursor-pointer hover:bg-Secondary_background_color rounded-lg ${
                      isNameSelected(name) ? 'bg-Secondary_background_color text-white' : ''
                    }`}
                    onClick={() => handleNameClick(name)}
                    >
                    {name}
                    </button>
                ))}
            </div>
        </div>
      )}
      
    </div>
  );
}

export default NameButtonList;

