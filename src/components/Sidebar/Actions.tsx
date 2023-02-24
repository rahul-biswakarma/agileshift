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

const Actions = (props:Type_DetailsProps) => {

    const saveData = () =>{
        console.log(props.formData);
    }

    return (
        <div className="p-2 flex justify-between">
            <button className="bg-white text-black py-1 px-2 rounded-md">Linked</button>
            <button className="bg-white text-black py-1 px-2 rounded-md" onClick={()=>saveData()}>Save {props.state.field}</button>
        </div>
    )
}

export { Actions }