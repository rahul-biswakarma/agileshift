import React, { useEffect, useRef } from 'react';

type Type_SidebarState = {
    field: string;
    color: string;
    data:any;
    schema?:any;
}

type Type_DetailsProps = {
    state:Type_SidebarState,
    setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>,
    formData:TYPE_SCHEMA[],
    setFormData: React.Dispatch<React.SetStateAction<TYPE_SCHEMA[]>>
}

const Details = (props:Type_DetailsProps) => {
    let titleFieldRef = useRef<string>("title")

    useEffect(()=>{
        // get_title(organizationId, props.state.field)
        // .then((result:string)=>{
        //     titleFieldRef.current = result
        // })
        const schemaFromProps = props.state.schema;
        Object.keys(schemaFromProps).forEach((key:any)=>{
            if(schemaFromProps[key]==="title"){
                return titleFieldRef.current = key
            }
        })

    },[props.state.schema])

    const handleTitle = () =>{
        console.log("Changed title");
        
    }

    return (
        <div className="p-2">
            {/* Title */}
            {titleFieldRef.current.length>0?
                <input type="text" placeholder={titleFieldRef.current} defaultValue={props.state.data[titleFieldRef.current]?props.state.data[titleFieldRef.current]:""} className="w-full bg-transparent text-white p-1 focus:outline-none focus:border-b focus:border-b-white" onChange={()=>handleTitle()}/>:""
            }
        </div>
    )
}

export { Details }