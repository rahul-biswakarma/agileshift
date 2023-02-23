import React from 'react';

type Type_SidebarState = {
    field: string;
    data?: TYPE_SCHEMA;
    color: string;
    tabColaps: boolean;
    setColapsTabBar: React.Dispatch<React.SetStateAction<number>>;
    index: number;
}

type Type_DetailsProps = {
    state:Type_SidebarState,
    setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>,
    formData:TYPE_SCHEMA[],
    setFormData: React.Dispatch<React.SetStateAction<TYPE_SCHEMA[]>>
}

const Details = (props:Type_DetailsProps) => {
    return (
        <div className="p-2">
            {/* Title */}
            <input type="text" value="test" className="w-full bg-transparent text-white p-1 focus:outline-none focus:border-b focus:border-b-white"/>
        </div>
    )
}

export { Details }