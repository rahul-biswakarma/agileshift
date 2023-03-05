import React from "react";

type Props = {
  onClick: () => void | Promise<void> | void;
  className?: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
};

export default function CustomButton(props: Props) {

  return (
    <button
    type="button"
      onClick={props.disabled?()=>{}:props.onClick}
      className={
        props.className
          ? props.className
          : `w-full h-10 bg-primary_font_color rounded-md text-sm text-white active:opacity-50  ${props.disabled?"opacity-50 cursor-not-allowed text-primary_font_color":""} `
      }
    >
      {props.icon && (
        <span className="material-symbols-outlined text-base">{props.icon}</span>
      )}
      {props.label}
    </button>
  );
}
