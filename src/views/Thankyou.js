import React, { useState } from "react";
import Thanks from "../assets/thanks.svg"
import Button from "../components/ButtonComponent"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Thankyou() {
    const navigate = useNavigate();
    let goDash = () => {
        navigate("/");
    }
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-y-12">
            <div className="text-center">
                <p className="font-semibold text-4xl">¡Felicidades!. Has terminado el proceso de registro</p>
                <p className="text-gray-500 text-xl font-light">¿No fue dificil verdad? ahora vamos a acceder y configurar tu bot</p>
            </div>
            <img className="w-36 h-auto" src={Thanks} />
            <Button  text="Ir a mi Dashboard" onClickEvent={()=>goDash()} />
            
        </div>
    );
}

export default Thankyou;