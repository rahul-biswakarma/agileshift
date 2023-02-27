import React from "react";

type Type_AddOptionsProps = {
  tabColaps: boolean;
  setColapsTabBar: React.Dispatch<React.SetStateAction<number>>;
  index: number;
};
export default function AddOptions(props: Type_AddOptionsProps) {
  return (
    <div>
      {props.tabColaps ? (
        <div
          className="[writing-mode:vertical-rl] h-full w-full flex justify-center items-center text-xl cursor-pointer hover:bg-background_color rounded-lg py-4"
          onClick={() => {
            props.setColapsTabBar(props.index);
          }}
        >
          Add Options
        </div>
      ) : (
        <div>data</div>
      )}
    </div>
  );
}
