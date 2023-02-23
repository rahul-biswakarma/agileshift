import { useEffect, useState } from "react";


interface Type_FilterProps {
    schema: Array<TYPE_SCHEMA>;
}


const Filter = (props:Type_FilterProps) => { 
    const {schema} = props; 

    const [modifiedSchema, setModifiedSchema] = useState<TYPE_SCHEMA[]>([]);
    const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
    const handleColumnClick = (columnType: string) => {
        console.log(`Clicked column with type ${columnType}`);
    };

    useEffect(()=>{
        const updateSchema = (schema: TYPE_SCHEMA[]) => {
            const newSchema:TYPE_SCHEMA[] = [];
            schema.map(data => {
                const newData:TYPE_SCHEMA = {
                    ...data,
                    "active": "0"
                }
                newSchema.push(newData);
                return "";
            })
            newSchema[0].active = "1";
            newSchema[1].active = "1";
            setModifiedSchema(newSchema);
        }
        updateSchema(schema);
    },[schema])
    

    // console.log(modifiedschema);

    // const activeColumns = modifiedschema.filter((column) => column.active );

  return (
    <div className="w-screen h-screen bg-[#161616]">
        <div className="flex justify-between mb-4 mx-9 pt-4">
            <div className='flex flex-wrap gap-4 '>
                <div className="flex">
                    <button className='mr-4'>                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" className=" w-6 h-6 icon icon-tabler icon-tabler-at" viewBox="0 0 24 24">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <circle cx="12" cy="12" r="4"/>  
                                <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-5.5 8.28"/>
                            </svg>
                    </button>
                    <button className='mr-4'>                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" className=" w-6 h-6 icon icon-tabler icon-tabler-antenna-bars-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <path d="M6 18v-3m4 3v-6m4 6V9m4 9V6"/>
                            </svg>
                    </button>
                    <button className='mr-4'>                           
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" className=" w-6 h-6 icon icon-tabler icon-tabler-clock" viewBox="0 0 24 24">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <circle cx="12" cy="12" r="9"/>
                                <path d="M12 7v5l3 3"/>
                            </svg>
                    </button>
                    <div className='h-4 bg-[#808080] self-center mr-4'>
                            <hr className='border-default w-px h-full'></hr>
                    </div>
                </div>
                
                {modifiedSchema.filter((column) => column.active === "1").map((column, index) => (
                    <button
                        key={index}
                        className="font-fira_code rounded-md border border-[#808080] text-[#808080] text-sm px-[10px] py-[2px] "
                        onClick={() => handleColumnClick(column.columnType)}
                    >
                    {column.columnTitle}
                    </button>
                ))}
                

                {/* Plus Button */}
                <div className='relative flex items-center justify-center ml-4 gap-4'>
                    <button onClick={() => setShowAllFilters(!showAllFilters)} className='flex items-center justify-center rounded-md w-7 h-7 border border-1 border-[#808080] text-[#808080] text-sm mr-4 '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#808080" stroke-linecap="round" strokeLinejoin="round" stroke-width="1.5" className=" w-4 h-4 text-center" viewBox="0 0 24 24">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <path d="M12 5v14m-7-7h14"/>
                        </svg>
                    </button>
                    {
                        showAllFilters && (
                            <div className="absolute top-[110%] left-0 bg-slate-500 h-96 w-96">
                                {
                                    modifiedSchema.map((data, index) => {
                                        if(data.active === "1"){
                                            return (
                                                <></>
                                            )
                                        }else{
                                            return (
                                                <></>
                                            )
                                        }
                                    })
                                }
                            </div>
                        )
                    }
                </div>
               

                <div className='flex items-center gap-4'>
                    <button className='text-[#808080] text-sm '>Clear</button>
                </div>  

            </div>
            <div className='flex items-center font-dm_sans'>
                <div className='flex hover:bg-[#49494D] rounded-md px-4 py-2'>
                    <button className='rounded-md h-7 text-[#808080] text-sm font-bold '>
                        Sort
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" className="w-4 h-4icon icon-tabler icon-tabler-chevron-down" viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <path d="m6 9 6 6 6-6"/>
                    </svg>                    
                </div>
                <div className='flex hover:bg-[#49494D] rounded-md px-4 py-2'>
                    <button className='rounded-md h-7 text-[#808080] text-sm font-bold'>
                        Group
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" className="w-4 h-4icon icon-tabler icon-tabler-chevron-down" viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <path d="m6 9 6 6 6-6"/>
                    </svg>                    
                </div>
                <div className='flex  hover:bg-[#49494D] rounded-md px-4 py-2'>
                    <button className='rounded-md h-7 text-[#808080] text-sm font-bold'>
                        Customize
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" className="w-4 h-4icon icon-tabler icon-tabler-chevron-down" viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <path d="m6 9 6 6 6-6"/>
                    </svg>                    
                </div>
            </div>
        </div>

    </div>
    
  );
};

export default Filter;




