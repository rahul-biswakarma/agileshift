import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFilterSchema } from '../../redux/reducers/VistaSlice';
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

    const organizationId = useAppSelector((state) => state.auth.organisationId);
    const userId = useAppSelector((state) => state.auth.userId);
    const tabName = useAppSelector((state) => state.datatable.tabName);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        const getInfo = async() => {
            const user:any = await get_user_by_id(userId);
            console.log(user);
            let vistaIdList = [];
            if(user.vistas[organizationId]){
                vistaIdList = user.vistas[organizationId];
            }
            console.log(vistaIdList);
            let visList = [];
            for(let i=0;i<vistaIdList.length;i++){
                console.log(vistaIdList[i]);
                const visObj =  await get_vista_from_id(vistaIdList[i]);
                console.log(visObj);
                visList.push(visObj);
            }
            
            setVistaList(visList);
        }
        getInfo();
    },[organizationId, userId, tabName]);

    const handleClick = (filterSchema: TYPE_Filters[], type:string) => {
        dispatch(setFilterSchema(filterSchema));
    }

  return (
    <div className='relative text-white'>
        <div onClick={() => setVistaListCollapse(!vistaListCollapse)} className='flex gap-1 items-center p-3 hover:bg-white/20 rounded-md cursor-pointer'>
            My List
            <span className="material-symbols-outlined">
                keyboard_arrow_down
            </span>
        </div>
        {
            vistaListCollapse && (
                <div className='absolute flex flex-col w-60 top-[105%] right-0 border border-white/20 z-10 rounded-md p-3 bg-background_color'>
                    {
                        vistaList.length > 0 ? vistaList.map((data:any, _id:number) => (
                            <button key={_id} onClick={() => handleClick(data.vistaSchema, data.field)} className='p-3 hover:bg-Secondary_background_color'>{data.name}</button>
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