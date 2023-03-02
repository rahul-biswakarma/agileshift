import React, { useState } from 'react'
import Input from '../common/Input';

const VistaPopup = () => {
  const [popUpCollapse, setPopUpCollapse] = useState(false);
  const [fieldData, setFieldData] = useState<any>({});

  console.log(fieldData);
  return (
    <div className='relative'>
      <button onClick={() => setPopUpCollapse(!popUpCollapse)} className="flex gap-1 items-center p-3 hover:bg-white/20 rounded-md">
        <span className="material-symbols-outlined text-md">
        bookmark_add
        </span>
        Save as
      </button>
      {
        popUpCollapse && (
          <div className='absolute flex flex-col gap-2 w-80 h-auto top-[105%] right-0 z-10 p-2 bg-Secondary_background_color border border-white/20 rounded-md'>
            <Input fieldData={fieldData} setFunction={setFieldData} label="Vista Name" defaultValue={fieldData[""]} />
          
            <button className='self-end p-3 border border-white/20 rounded-md bg-background_color'>
              Submit
            </button>
          </div>
        )
      }
  </div>
  )
}

export default VistaPopup;