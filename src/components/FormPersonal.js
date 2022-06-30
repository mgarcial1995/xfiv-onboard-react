import React, { useState } from "react";
import TextField from '@mui/material/TextField';
function FormPersonal({userRegister, changeUserData}) {
    const providers = [
        {name:"360dialog"},
        {name:"facebook-messenger"},
        {name:"whatsapp_cloud"},
        {name:"telegram"},
        {name:"ultramsg"},
        {name:"web"},
    ]
    return (
        <div className="w-full flex flex-col justify-start">
            <div className="w-full mb-16">
                <h1 className="text-5xl font-semibold">Información principal</h1>
                <p className="text-2xl font-extralight text-gray-500 mt-2">Complete los siguientes datos para que podamos ayudarte a<br/> ofrecer una nueva experiencia de comunicación en tu negocio.</p>
            </div>
            <div className="w-full h-auto flex flex-col md:flex-row justify-start">
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-semibold mb-4">Información de cuenta</h1>
                    <div className="w-full md:w-4/5 flex flex-col gap-y-4">
                        <TextField value={userRegister.fullName} onChange={(e)=>changeUserData(e)} name="fullName" className="w-full" id="outlined-basic" label="Nombre completo" variant="outlined" />
                        <div className="w-full flex flex-row gap-x-6">
                            <TextField value={userRegister.userName} onChange={(e)=>changeUserData(e)} name="userName" className="w-2/5" id="outlined-basic" label="Nombre de usuario" variant="outlined" />
                            <TextField value={userRegister.businessName} onChange={(e)=>changeUserData(e)} name="businessName" className="w-3/5" id="outlined-basic" label="Nombre de empresa" variant="outlined" />
                        </div>
                        <div className="w-full flex flex-row gap-x-6">
                            <TextField value={userRegister.codeCountry} onChange={(e)=>changeUserData(e)} name="codeCountry" className="w-2/5" id="outlined-basic" label="Código de país" variant="outlined" />
                            <TextField value={userRegister.phone} onChange={(e)=>changeUserData(e)} name="phone" className="w-3/5" id="outlined-basic" label="Número telefónico" variant="outlined" />
                        </div>
                        <TextField value={userRegister.email} onChange={(e)=>changeUserData(e)} name="email" className="w-full" id="outlined-basic" label="Correo eletrónico" variant="outlined" />
                        <TextField type="password" value={userRegister.password} onChange={(e)=>changeUserData(e)} name="password" className="w-full" id="outlined-basic" label="Contraseña" variant="outlined" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <h1 className="text-3xl font-semibold mb-4">Selección de canales</h1>
                    <div className="w-full md:w-4/5 flex flex-col gap-y-4">
                        <select onChange={(e)=>changeUserData(e)} name="channels" className="h-14 border-gray-400 outline-gray-400 border rounded-md">
                            {userRegister.channels === "" ? <option>Seleccionar proveedor</option>:""}
                            {providers.map((prov,i) => (
                                <option key={i}>{prov.name}</option>
                            ))}
                        </select>
                        {/* <TextField value={userRegister.channels} onChange={(e)=>changeUserData(e)} name="channels" className="w-full" id="outlined-basic" label="# de Canales habilitados" variant="outlined" /> */}
                        <TextField value={userRegister.agents} onChange={(e)=>changeUserData(e)} name="agents" className="w-full" id="outlined-basic" label="Número de agentes" variant="outlined" />
                        <p className="text-2xl font-extralight text-gray-500">C/1 Asistente virtual  = +30$</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default FormPersonal;