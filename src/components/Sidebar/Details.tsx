import React from 'react';

type Type_SidebarState = {
    field: string;
    color: string;
    data:any;
    index: number;
}

type Type_DetailsProps = {
    state:Type_SidebarState,
    setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>,
    formData:TYPE_SCHEMA[],
    setFormData: React.Dispatch<React.SetStateAction<TYPE_SCHEMA[]>>
}

const Details = (props:Type_DetailsProps) => {

    const handleTitle = () =>{
        console.log("Changed title");
        
    }

    return (
        <div className="p-2">
            {/* Title */}
            <input type="text" placeholder="Title" value="test" className="w-full bg-transparent text-white p-1 focus:outline-none focus:border-b focus:border-b-white" onChange={()=>handleTitle()}/>
        </div>
    )
}

export { Details }