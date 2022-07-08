import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';


function FormPersonal({setUserRegister, setPriceSum, userRegister, changeUserData, listChannels, validate}) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [priceAgent, setPricePerAgent] = useState(0)
    const [totalPricesChannels, setTotalPricesChannels] = useState(0)
    const [channels, setChannels] = useState([])
    const [typeChannel, setTypeChannel] = useState("")
    const pricePerAgent = 15
    const typeChat = [
        {label:"WhatsApp", value:"WhatsApp"},
        {label:"Telegram", value:"Telegram"},
        {label:"Messenger", value:"Messenger"}
    ]
    const providersMulti = [
        {label:"360dialog", value:"360dialog", price: 20},
        {label:"facebook-messenger", value:"facebook-messenger", price: 10},
        {label:"whatsapp_cloud", value:"whatsapp_cloud", price: 5},
        {label:"telegram", value:"telegram", price: 8},
        {label:"ultramsg", value:"ultramsg", price: 3},
        {label:"web", value:"web", price: 3},
    ]
    useEffect(() => {
        setTotalPrice(priceAgent+totalPricesChannels)
        setPriceSum(priceAgent+totalPricesChannels)
    }, [userRegister,totalPricesChannels]);
    let changeAgent = (e) => {
        changeUserData(e)
        let agents = e.target.value === "" || e.target.value === null ? 0 : e.target.value
        let newprice = Number(agents)*pricePerAgent
        setPricePerAgent(newprice)
    }
    let changeChannelsSelect = (e) => {
        let channelsel = listChannels[e.target.value]
        console.log(channelsel)
        setUserRegister({...userRegister, channels:channelsel.label})
        setTotalPricesChannels(channelsel.price)
    }


    return (
        <div className="w-full flex flex-col justify-start">
            <div className="w-full mb-16">
                <h1 className="text-5xl font-semibold">Información principal</h1>
                <p className="text-2xl font-extralight text-gray-500 mt-2">Complete los siguientes datos para que podamos ayudarte a<br/> ofrecer una nueva experiencia de comunicación en tu negocio.</p>
            </div>
            <div  className="w-full h-auto flex flex-col md:flex-row justify-start">
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-semibold mb-4">Información de cuenta</h1>
                    <div className="w-full md:w-4/5 flex flex-col gap-y-4">
                        <TextField value={userRegister.fullName} onChange={(e)=>changeUserData(e)} name="fullName" className="w-full"  label="Nombre completo" variant="outlined" />
                        <div className="w-full flex flex-row gap-x-6">
                            <div>
                                <TextField value={userRegister.userName} onChange={(e)=>changeUserData(e)} name="userName" className="w-2/5"  label="Nombre de usuario" variant="outlined" />
                                <div>
                                    <p>El nombre de usuario debe contener:</p>
                                    <lu>
                                        <li>Mínimo 5 caracteres</li>
                                        <li>Mínimo 1 letra mayúscula</li>
                                        <li>Mínimo 1 letra minúscula</li>
                                    </lu>
                                </div>
                            </div>
                            <TextField value={userRegister.businessName} onChange={(e)=>changeUserData(e)} name="businessName" className="w-3/5"  label="Nombre de empresa" variant="outlined" />
                        </div>
                        <div className="w-full flex flex-row gap-x-6">
                            <TextField value={userRegister.codeCountry} onChange={(e)=>changeUserData(e)} name="codeCountry" className="w-2/5"  label="Código de país" variant="outlined" />
                            <TextField value={userRegister.phone} onChange={(e)=>changeUserData(e)} name="phone" className="w-3/5"  label="Número telefónico" variant="outlined" />
                        </div>
                        <div>
                            <TextField value={userRegister.email} onChange={(e)=>changeUserData(e)} name="email" className="w-full" type="email" 
                            label="Correo eletrónico" variant="outlined" />
                            <div>
                                <p>El correo electrónico no es válido.</p>
                            </div>
                         </div>
                        <div> 
                            <TextField inputProps={{ inputMode: 'text', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$' }} type="password" 
                            value={userRegister.password} onChange={(e)=>changeUserData(e)} name="password" className="w-full"  label="Contraseña" variant="outlined" />
                            <div>
                                <p>La contraseña debe tener:</p>
                                <lu>
                                    <li>Mínimo 8 caracteres</li>
                                    <li>Mínimo 1 letra mayúscula</li>
                                    <li>Mínimo 1 letra minúscula</li>
                                    <li>Mínimo 1 caractere especial</li>
                                </lu>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <h1 className="text-3xl font-semibold mb-4">Selección de canales</h1>
                    <div className="w-full md:w-4/5 flex flex-col gap-y-4">
                        <Select onChange={(e)=>setTypeChannel(e.target.value)} >
                            {typeChat.map((channel,i) => {
                                return <MenuItem key={i} value={channel.value} disabled={i!==0}>{channel.label}</MenuItem>
                            })}
                        </Select>
                        <Select onChange={(e)=>changeChannelsSelect(e)} >
                            {listChannels.map((channel,i) => {
                                return <MenuItem key={i} value={i}>{channel.label}</MenuItem>
                            })}
                        </Select>
                        <TextField value={userRegister.agents} onChange={(e)=>changeAgent(e)} name="agents" className="w-full" label="Número de agentes" variant="outlined" />
                        <p className="text-2xl font-extralight text-gray-500">C/1 Asistente virtual  = +30$</p>
                        <p className="text-2xl font-extralight text-gray-500">Total {totalPrice}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default FormPersonal;