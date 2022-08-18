import React, { useState } from "react";
import Thanks from "../assets/thanks.svg"
import Button from "../components/ButtonComponent"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png"
import check from "../assets/check.svg"
import Logobg from "../assets/Logobg.png"
import arrow from "../assets/arrow.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { faRigth } from '@fortawesome/free-regular-svg-icons'

function Tips() {
    const navigate = useNavigate();
    let goForm = () => {
        navigate("/register");
    }
    return (
        <div className="">
            <div className="w-full h-auto relative">
                <img className="absolute z-30 top-8 left-8 w-12 h-12" src={Logo} />

                <div className="w-full px-8 pt-10 md:pt-0 lg:pl-24">
                    <div className="w-full h-full md:h-screen py-4 lg:py-16">
                        <div className="w-full mt-10 mb-16">
                            <h1 className="text-5xl font-semibold">Consejos antes de continuar</h1>
                            <p className="text-2xl font-extralight text-gray-500 mt-2">Antes de iniciar recomendamos que cumplas estos requisitos.</p>
                        </div>
                        <div className="mb-10">
                            <h1 className="w-full md:w-2/3 text-3xl font-semibold mb-4">Tener una cuenta comercial de Facebook verificada.</h1>
                            <div className="flex items-center ml-4">
                                <p className="text-2xl font-regular text-gray-500 mt-2">1. Antes de iniciar recomendamos que cumplas estos requisitos.</p>
                                <a href="https://business.facebook.com/" target="_blank"><FontAwesomeIcon className="text-primary mt-2 text-xl ml-4" icon={faCircleArrowRight}/></a>
                            </div>
                            <div className="flex items-center ml-4">
                                <p className="text-2xl font-regular text-gray-500 mt-2">2. Verificar la cuenta comercial de Facevook.</p>
                                <a href="https://business.facebook.com/settings/" target="_blank"><FontAwesomeIcon className="text-primary mt-2 text-xl ml-4" icon={faCircleArrowRight}/></a>
                            </div>
                            <div className="flex items-center ml-4">
                                <p className="text-2xl font-regular text-gray-500 mt-2">3. Informarse sobre las restricciones.</p>
                                <a href="https://www.facebook.com/business/help/" target="_blank"><FontAwesomeIcon className="text-primary mt-2 text-xl ml-4" icon={faCircleArrowRight}/></a>
                            </div>
                        </div>
                        <div>
                            <h1 className="w-full md:w-2/3 text-3xl font-semibold mb-4">El número de teléfono que registrara en Xfiv, no se podra usar para una cuenta de WhatsApp</h1>
                            <div className="flex items-center ml-4">
                                <p className="text-2xl font-regular text-gray-500 mt-2">1. Realice una copia de seguridad de su historial de WhatsApp.</p>
                                <a href="https://faq.whatsapp.com/196737011380816/?cms_id=196737011380816&published_only=true" target="_blank"><FontAwesomeIcon className="text-primary mt-2 text-xl ml-4" icon={faCircleArrowRight}/></a>
                            </div>
                            <div className="flex items-center ml-4">
                                <p className="text-2xl font-regular text-gray-500 mt-2">2. Eliminar su cuenta de WhatsApp.</p>
                                <a href="https://faq.whatsapp.com/605464643328528/?cms_id=605464643328528&published_only=true" target="_blank"><FontAwesomeIcon className="text-primary mt-2 text-xl ml-4" icon={faCircleArrowRight}/></a>
                            </div>
                        </div>
                        <div className="flex mt-10">
                            <Button onClickEvent={()=>goForm()} buttonVal={true} text={"Cumplo con los requisitos"} />
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="hidden lg:block z-10 w-80 absolute bottom-24 right-64">
                        <img className="z-10 w-full h-auto" src={Logobg} />
                    </div>
                    <div className="z-0 hidden lg:block absolute bottom-16 shadow-gray-500 shadow-2xl right-16 bg-primary w-80 h-auto text-white p-4 rounded-xl">
                        <div className="flex flex-row justify-between">
                            <p className="uppercase">sobre xfiv</p>
                            <div> <img src={check} /> </div>
                        </div>
                        <p className="text-blue-300 text-start pt-2">Puedes configurar tu bot de auto respuestas para que se encarguen de gestiones frecuentes y comunes por si solos sin depender de personal de asistencia.</p>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}

export default Tips;