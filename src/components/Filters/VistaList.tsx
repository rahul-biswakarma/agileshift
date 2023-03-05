import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setTabName } from '../../redux/reducers/DataTableSlice';
import { setVistaSchema, setVistaName } from '../../redux/reducers/VistaSlice';
import { get_user_by_id, get_vista_from_id } from '../../Utils/Backend';

type TYPE_FilterOption = {
	filterOptionName: string;
	active: boolean;
};

type TYPE_Filters = {
	columnName: string;
	active: boolean;
	data: TYPE_FilterOption[];
};

const VistaList = () => {
    const [vistaListCollapse, setVistaListCollapse] = useState<boolean>(false);
    const [vistaList, setVistaList] = useState<any>([]);
    const vistaName = useAppSelector((state) => state.vista.vistaName);

    const organizationId = useAppSelector((state) => state.auth.organisationId);
    const userId = useAppSelector((state) => state.auth.userId);
    const tabName = useAppSelector((state) => state.datatable.tabName);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        const getInfo = async() => {
            const user:any = await get_user_by_id(userId);
            let vistaIdList = [];
            if(user.vistas[organizationId]){
                vistaIdList = user.vistas[organizationId];
            }
            let visList = [];
            for(let i=0;i<vistaIdList.length;i++){
                const visObj =  await get_vista_from_id(vistaIdList[i]);
                visList.push(visObj);
            }

            setVistaList(visList);
        }
        getInfo();
    },[organizationId, userId, tabName]);

    const handleClick = (filterSchema: TYPE_Filters[], type:string, vistaName:string) => {
        setVistaListCollapse(false);
        dispatch(setVistaName(vistaName));
        dispatch(setTabName(type));
        dispatch(setVistaSchema(filterSchema));
    }

  return (
    <div className='relative text-white'>
        <div onClick={() => setVistaListCollapse(!vistaListCollapse)} className='flex gap-1 items-center px-3 py-2 text-white/30 hover:bg-white/5 rounded-sm cursor-pointer'>
            <span className="material-symbols-outlined">
                keyboard_arrow_down
            </span>
            {vistaName ? vistaName : "My List"}
        </div>
        {
            vistaListCollapse && (
                <div className='absolute flex flex-col w-60 top-[105%] right-0 border border-white/20 z-10 rounded-md p-3 bg-background_color'>
                    {
                        vistaList.length > 0 ? vistaList.map((data:any, _id:number) => (
                            <button key={_id} onClick={() => handleClick(data.vistaSchema, data.field, data.name)} className='p-3 hover:bg-Secondary_background_color'>{data.name}</button>
                        )) : (
                            <div>
                                No Data
                            </div>
                        )
                    }
                </div>
            )
        }
    </div>

  )
}

export default VistaList