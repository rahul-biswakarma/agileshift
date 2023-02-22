import React from 'react';

type Type_SidebarState = {
    field:string,
    data?:TYPE_SCHEMA,
    color:string
}

type Type_DetailsProps = {
    state:Type_SidebarState,
    setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>
}

const Details = (props:Type_DetailsProps) => {
    return (
        <div className="p-2">
            {/* Title */}
            <input type="text" />
        </div>
    )
}

export { Details }