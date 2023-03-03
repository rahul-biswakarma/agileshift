import React, { useState } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { add_vista } from '../../Utils/Backend';
import Input from '../common/Input';

type TYPE_FilterOption = {
	filterOptionName: string;
	active: boolean;
};

type TYPE_Filters = {
	columnName: string;
	active: boolean;
	data: TYPE_FilterOption[];
};

type TYPE_VistaPopupProps = {
  filterSchema: TYPE_Filters[]
}

const VistaPopup = ({filterSchema}: TYPE_VistaPopupProps) => {
  const [popUpCollapse, setPopUpCollapse] = useState(false);
  const [fieldData, setFieldData] = useState<any>({});

  console.log(fieldData);
  const organizationId = useAppSelector((state) => state.auth.organisationId);
  const userId = useAppSelector((state) => state.auth.userId);
  const tabName = useAppSelector((state) => state.datatable.tabName);

  const handleSave = () => {
    add_vista(organizationId, userId, filterSchema, tabName, fieldData["Vista Name"]);
    setPopUpCollapse(false);
  }

  return (
    <div className='relative'>
      <button onClick={() => setPopUpCollapse(!popUpCollapse)} className="flex gap-1 items-center p-3 hover:bg-white/20 rounded-md">
        Save as
        <span className="material-symbols-outlined text-md">
        bookmark_add
        </span>
      </button>
      {
        popUpCollapse && (
          <div className='absolute flex flex-col gap-2 w-80 h-auto top-[105%] right-0 z-10 p-2 bg-Secondary_background_color border border-white/20 rounded-md'>
            <Input fieldData={fieldData} setFunction={setFieldData} label="Vista Name" defaultValue={fieldData[""]} />
          
            <button onClick={() => handleSave()} className='self-end p-3 border border-white/20 rounded-md bg-background_color'>
              Submit
            </button>
          </div>
        )
      }
  </div>
  )
}

export default VistaPopup;