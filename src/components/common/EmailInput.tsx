import React from "react";

type EmailInputPropTypes = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorState: boolean;
  onSubmit: () => void;
};

const EmailInput = ({
  value,
  onChange,
  errorState,
  onSubmit,
}: EmailInputPropTypes) => {
  return (
    <div className="p-[2px] relative min-w-[250px] flex justify-between items-center border-[1.5px] border-white/10 rounded-md bg-Secondary_background_color transition-all">
      <div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter email"
          className="px-[5px] rounded-md w-full outline-none bg-Secondary_background_color  text-highlight_font_color placeholder:text-white/20 "
        />
        {errorState && (
          <p className="absolute text-red-500 text-xs bg-background_color px-[2px] ml-[3px]">
            * Please enter a valid email
          </p>
        )}
      </div>
      <button
        onClick={onSubmit}
        className="material-symbols-outlined rounded-md border-[1.5px] border-white/10 rounded-md bg-background_color text-white/40 hover:text-purple-800 hover:bg-purple-400 hover:border:purple-400 text-[18px] p-[5px]">
        send
      </button>
    </div>
  );
};

export default EmailInput;
