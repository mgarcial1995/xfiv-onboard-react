import React, { useState } from "react";
import Right from "../assets/Right.png"
function StepBar({listStep}) {
    return (
        <div className="w-full h-full bg-primary flex flex-col justify-between">
            <div>
                <div className="w-full flex justify-center">
                    <div className="text-primary text-4xl font-semibold bg-white inline m-0 px-12 pb-4 rounded-bl-full rounded-br-full shadow-xl shadow-blue-600">Business</div>
                </div>
                <div className="p-8">
                    <p className="font-semibold text-white text-xl">Creemos tu cuenta Xfiv</p>
                    <div>
                        <div className="flex items-center h-auto ml-4 mt-4">
                            <div className="flex flex-col items-center justify-evenly mt-2">
                                {listStep.map((el,i)=>{
                                    return <div key={i} className="flex flex-col m-0 items-center">
                                        <div className={` ${i===0?'w-3 h-3':'w-2 h-2'} rounded-full ${el.active ? 'bg-white': 'bg-blueShadow'}`}></div>
                                        {i===4 ?"" :<div style={{"backgroundColor":"#6198DE"}} className="w-0.5 h-10"></div>}
                                    </div>

                                })
                                }
                            </div>
                            <div className="flex flex-col justify-between mt-2">
                                {listStep.map((el,i)=>{
                                        return <div key={i} className="text-white font-semibold ml-4 my-3">{el.text}</div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full text-white my-8 px-6">
                <div className="flex justify-center my-8">
                    <div className="bg-primary flex flex-row items-center gap-2 border-blue-400 border-2 px-6 py-2 rounded-full font-semibold cursor-pointer">Volver a XFIV <img src={Right}/></div>
                </div>
                <div className="text-sm">Necesitas ayuda? <a className="" href="#">Contacta con un asesor</a></div>
            </div>
        </div>
    );
}
  
export default StepBar;