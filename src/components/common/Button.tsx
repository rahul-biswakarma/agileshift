import React from 'react'

type Props = {
    onClick: () => void| Promise<void>|void,
    className?: string,
    label?:string,
    icon?: string
}

export default function CustomButton(props: Props) {
  return (
    <button
          onClick={props.onClick}
          className={props.className?props.className:`w-full h-10 bg-primary_font_color rounded-md text-white active:opacity-50`}
        >
          {props.icon && <span className="material-symbols-outlined">{props.icon}</span>} 
          {props.label}
        </button>
  )
}
