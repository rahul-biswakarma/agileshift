import React, { useState } from "react";

import {
  TextField,
} from "@mui/material";

type Type_AddOptionsProps = {
  
};
export default function AddOptions(props: Type_AddOptionsProps) {
  const name="Priority";
  const [list,setList]=useState(["P0","P1","P2","P3","P4","P5","P6","P7","P3","P4","P5","P6","P7"]);
  const changeList=(id:number,item:string)=>{
    let tempList=[...list];
    tempList[id]=item;
    setList(tempList);
  }
  const removeItem=(id:number)=>{
    let tempList=[...list];
    tempList=tempList.slice(0,id).concat(tempList.slice(id+1));
    setList(tempList);
  }
  const addItem=()=>{
    setList([...list,""]);
  }
  return (
    <div
      className="flex flex-col justify-start items-center w-1/3 h-screen bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color
    p-4
    ">
      <p
      className="w-full text-2xl flex items-center justify-center mb-4 text-white"
      >{name}</p>
      <div className="w-full max-h-[90%] flex flex-col items-center gap-6 overflow-auto">
      {list.map((item:string,id:number)=>(
        <div className="w-full flex items-center justify-center">
          <TextField
          sx={{
            m: 1,
            width: "70%",
            "& label": {
              color: "#fff",
              fontFamily: "DM Sans",
            },
            "& .MuiFormControl-root": {
              borderColor: "white",
            },
          }}
          size="small"
          id={`dropdown-${item}-input`}
          variant="outlined"
          value={item}
          onChange={(e) => changeList(id,e.target.value)}
          />
          <button
          onClick={(e) => removeItem(id)}
          className="material-symbols-outlined text-white ml-4"
                >
          delete
                </button>
        </div>
      ))}
      </div>
      <div className="w-full flex justify-around">
      <button
              className="flex w-32 justify-center items-center p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm text-highlight_font_color border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400 hover:text-purple-800 transition-all duration-200 ease-in-out
          mt-4"
              onClick={addItem}
              >
              Add {name}
            </button>
            <button
              className="flex w-32 justify-center items-center p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm text-highlight_font_color border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400 hover:text-purple-800 transition-all duration-200 ease-in-out
          mt-4"
              >
              Save {name}
            </button>
      </div>
    </div>
  );
}
