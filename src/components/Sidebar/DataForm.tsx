import React from 'react'

type Type_SidebarState = {
    field: string;
    color: string;
    data:any;
    schema?:any;
}

type Type_DetailsProps = {
    state:Type_SidebarState,
    setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>,
    formData:any,
    setFormData: React.Dispatch<React.SetStateAction<any>>
}

const DataForm = (props:Type_DetailsProps) => {

    return (
        <div className="h-[70%] border-y border-primary_font_color text-white p-2">
            {Object.keys(props.formData).map((field:any)=>(
                <div>{field}</div>
            ))}
        </div>
    )
}

export { DataForm }