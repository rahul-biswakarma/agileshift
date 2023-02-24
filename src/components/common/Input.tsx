import React from "react";

type type_props = {
  type: string;
  defaultValue: string | Array<string>;
  setFunction: any;
  label: string;
};
export default function Input(props: type_props) {
  return (
    <div>
      <div className="flex mt-[0.3rem] bg-Secondary_background_color">
        <span className="w-[3rem] h-[2.5rem] flex justify-center items-center   rounded-l font-dm_sans">
          {props.label}
        </span>
        <input
          data-testid="email-input"
          // ref={emailInputRef}
          className="w-full h-[2.5rem] bg-Secondary_background_color focus:outline-none   rounded-r px-4 code-font font-dm_sans"
          type="email"
          placeholder={props.label}
          // readOnly={state.onOtp}
          required
        />
      </div>
    </div>
  );
}
