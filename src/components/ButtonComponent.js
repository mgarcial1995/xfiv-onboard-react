import React, { useState } from "react";
import Right from "../assets/Right.png"
function ButtonComponent({text, onClickEvent, buttonVal}) {
  return (
    <>
    {
      buttonVal ? 
      <div onClick={()=>onClickEvent()} className='bg-primary hover:bg-primaryHover cursor-pointer font-semibold text-center text-white inline
      rounded-full shadow-md shadow-slate-400 py-4 px-8 flex flex-row items-center gap-2'>
        {text} <img src={Right}/>
      </div> 
    : 
    <div className='bg-blueShadow cursor-pointer font-semibold text-blue-200 text-white inline
      rounded-full shadow-md shadow-slate-400 py-4 px-8 flex flex-row items-center gap-2'>
        {text} <img src={Right}/>
      </div> 
    }
    </>
  );
}

export default ButtonComponent;
