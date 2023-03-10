import React from 'react'

type SpecialInputPropTypes = {
    value:string;
    onChange:Function;
    placeholder:string;
    label:string;
    readOnly?:boolean;
    testId: string
}
const SpecialInput = ({value,onChange,placeholder,label,readOnly, testId}:SpecialInputPropTypes) => {
  return (
        <div className="flex rounded-lg border-[2px] border-white/5 items-center font-dm_sans overflow-hidden max-h-[45px]">
						<label className="text-white/30 bg-background_color h-[50px] flex items-center rounded-md font-dm_sans text-[16px] px-4 rounded-r-none">
							{label}
						</label>
						<input
                readOnly={readOnly}
              type="text"
              value={value}
              onChange={(e) => {onChange(e)}}
              data-testid={testId}
              placeholder={placeholder}
              className="flex-1 font-fira_code text-[1rem] rounded-r-lg px-4 bg-Secondary_background_color h-10 outline-none placeholder:text-white/30 text-white/70"
            />

		</div>
  )
}

export default SpecialInput
