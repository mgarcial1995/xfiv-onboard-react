import React, { useState } from "react";
import Thanks from "../assets/thanks.svg"
import Button from "../components/ButtonComponent"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ThankyouData() {
    const navigate = useNavigate();
    let goDash = () => {
        navigate("/");
    }
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-y-12">
            <div className="text-center">
                <p className="font-semibold text-4xl">¡Gracias por confiar en nosotros!</p>
                <p className="text-gray-500 text-xl font-light">Hemos recibido tus datos, en unas horas nos estaremos comunicando contigo.</p>
            </div>
            <img className="w-36 h-auto" src={Thanks} />
            <Button  text="Regresar" buttonVal={true} onClickEvent={()=>goDash()} />
            
        </div>
    );
}

export default ThankyouData;