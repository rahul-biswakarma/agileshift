import React from 'react'
import { useAppSelector } from '../../redux/hooks';
import { update_data_to_database } from '../../Utils/Backend';

type Type_SidebarState = {
    field: string;
    color: string;
    data:any;
    schema:any;
    index: number;
}

type Type_DetailsProps = {
    state:Type_SidebarState,
    setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>,
    formData:any,
    setFormData: React.Dispatch<React.SetStateAction<any>>
}


const Actions = (props:Type_DetailsProps) => {
    let organizationId = useAppSelector((state)=>state.auth.organisationId);
    organizationId = "zB2drPSZDjsAec5hG7wA"

    const saveData = async () =>{
        let formDataFromProps = {...props.formData, field:props.state.field} 
        await update_data_to_database(organizationId, formDataFromProps);
    }

    return (
        <div className="p-2 flex justify-between">
            <button className="bg-white text-black py-1 px-2 rounded-md">Linked</button>
            <button className="bg-white text-black py-1 px-2 rounded-md" onClick={()=>saveData()}>Save {props.state.field}</button>
        </div>
    )
}

export { Actions }