import React from "react";

type Type_SidebarState = {
  field: string;
  data: any;
  color: string;
  schema?:any;
};

type Type_HeaderIdComponentProps = {
  state: Type_SidebarState;
  setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>;
};

const HeaderIdComponent = (props: Type_HeaderIdComponentProps) => {
  return Object.keys(props.state.data).length>0 ? (
    <span
      style={{
        borderColor: props.state.color,
        color: props.state.color,
        backgroundColor: props.state.color + 20,
      }}
      className={`border-2 px-1 rounded-md text-sm flex items-center`}
    >
      {props.state.data.id}
    </span>
  ) : (
    <span
      style={{
        borderColor: props.state.color,
        color: props.state.color,
        backgroundColor: props.state.color + 20,
      }}
      className={`border-2 px-1 rounded-md text-sm flex items-center`}
    >
      New {props.state.field}
    </span>
  );
};

export { HeaderIdComponent };
