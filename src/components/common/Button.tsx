import React from "react";

type Props = {
  onClick: () => void | Promise<void> | void;
  className?: string;
  label?: string;
  icon?: string;
  dissabled?: boolean;
};

export default function CustomButton(props: Props) {

  return (
    <button
    type="button"
      onClick={props.dissabled?()=>{}:props.onClick}
      className={
        props.className
          ? props.className
          : `w-full h-10 bg-primary_font_color rounded-md text-white active:opacity-50  ${props.dissabled?"opacity-50 cursor-not-allowed":""} `
      }
    >
      {props.icon && (
        <span className="material-symbols-outlined">{props.icon}</span>
      )}
      {props.label}
    </button>
  );
}
