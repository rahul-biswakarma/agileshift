import {useState} from 'react';

const CustomizeComponent = () => {
    const [showColumns, setShowColumns] = useState<boolean>(false);
  
    return (
    <div>
        <div onClick={()=>setShowColumns(!showColumns)} className="relative flex hover:bg-[#49494D] rounded-md px-4 py-2">
            <button className="rounded-md h-7 text-[#808080] text-sm font-bold">
                Customize
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
        {
            showColumns && (
                <div className='absolute top-0 bg-slate-500 w-30 h-30'>

                </div>
            )
        }

    </div>
  )
}

export default CustomizeComponent