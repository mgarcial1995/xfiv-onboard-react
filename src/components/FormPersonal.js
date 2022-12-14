import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';

import whatsapp from '../assets/whatsapp.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots, faUser } from '@fortawesome/free-regular-svg-icons'


function FormPersonal({setUserRegister, setPriceSum, userRegister, changeUserData, listChannels, passValidate, emailValidate, userValidate}) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [priceAgent, setPricePerAgent] = useState(0)
    const [totalPricesChannels, setTotalPricesChannels] = useState(0)
    const [plans, setPlans] = useState([
        {name:"Plan emprendedor", activate:true},
        {name:"Personalizar", activate:false},
    ])
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
        setUserRegister({...userRegister, channels:channelsel.label})
        setTotalPricesChannels(channelsel.price)
    }


    return (
        <div className="w-full flex flex-col justify-start">
            <div className="w-full mb-16">
                <h1 className="text-5xl font-semibold">Informaci??n principal</h1>
                <p className="text-2xl font-extralight text-gray-500 mt-2">Complete los siguientes datos para que podamos ayudarte a<br/> ofrecer una nueva experiencia de comunicaci??n en tu negocio.</p>
            </div>
            <div  className="w-full h-auto flex flex-col md:flex-row justify-start">
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-semibold mb-4">Informaci??n de cuenta</h1>
                    <div className="w-full md:w-4/5 flex flex-col gap-y-4">
                        <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-6">
                            <TextField value={userRegister.firstname} onChange={(e)=>changeUserData(e)} name="firstname" className="w-full md:w-1/2"  label="Nombres" variant="outlined" />
                            <TextField value={userRegister.lastname} onChange={(e)=>changeUserData(e)} name="lastname" className="w-full md:w-1/2"  label="Apellidos" variant="outlined" />
                        </div>
                        {/* <TextField value={userRegister.fullName} onChange={(e)=>changeUserData(e)} name="fullName" className="w-full"  label="Nombre completo" variant="outlined" /> */}
                        <div className="w-full flex flex-col md:flex-row gap-x-6">
                            <div className="w-full mb-4 md:m-0 md:w-2/5 relative">
                                <TextField value={userRegister.userName} onChange={(e)=>changeUserData(e)} name="userName" className="w-full"  label="Nombre de usuario" variant="outlined" />
                                { userValidate ? 
                                <div className="absolute w-full md:w-80  bg-white py-2 px-4 z-10 h-auto rounded-lg
                                border-primary border mt-2 shadow-sm shadow-primary ">
                                    <p>El nombre de usuario debe contener:</p>
                                    <ul>
                                        <li>M??nimo 5 caracteres</li>
                                        <li>M??nimo 1 letra may??scula</li>
                                        <li>M??nimo 1 letra min??scula</li>
                                    </ul>
                                </div>
                                :""}
                            </div>
                            <TextField value={userRegister.businessName} onChange={(e)=>changeUserData(e)} name="businessName" className="w-full md:w-3/5"  label="Nombre de empresa" variant="outlined" />
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-6">
                            <TextField value={userRegister.codeCountry} onChange={(e)=>changeUserData(e)} name="codeCountry" className="w-full md:w-2/5"  label="C??digo de pa??s" variant="outlined" />
                            <TextField value={userRegister.phone} onChange={(e)=>changeUserData(e)} name="phone" className="w-full md:w-3/5"  label="N??mero telef??nico" variant="outlined" />
                        </div>
                        <div>
                            <TextField value={userRegister.email} onChange={(e)=>changeUserData(e)} name="email" className="w-full" type="email" 
                            label="Correo eletr??nico" variant="outlined" />
                            {emailValidate?<div className="">
                                <p>El correo electr??nico no es v??lido.</p>
                            </div>:""}
                         </div>
                        <div className="w-full relative"> 
                            <TextField  type="password" value={userRegister.password} onChange={(e)=>changeUserData(e)} name="password" className="w-full"  label="Contrase??a" variant="outlined" />
                            {passValidate ? <div className="absolute w-full md:w-80 bg-white py-2 px-4 z-10 h-auto rounded-lg
                                border-primary border mt-2 shadow-sm shadow-primary ">
                                <p>La contrase??a debe tener:</p>
                                <ul>
                                    <li>M??nimo 8 caracteres</li>
                                    <li>M??nimo 1 letra may??scula</li>
                                    <li>M??nimo 1 letra min??scula</li>
                                    <li>M??nimo 1 caractere especial</li>
                                </ul>
                            </div>:""}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <h1 className="text-3xl font-semibold mb-2">Plan WhatsaApp</h1>
                    <div className="w-full flex text-xl text-primary gap-x-8 font-normal mb-4">
                    {/* {plans.map((plan,i)=>{
                        return <div key={i}> 
                            <p className={`cursor-pointer py-2 px-4 pl-0 ${plan.activate ? "text-primary font-semibold" : "text-gray-400"}`}>{plan.name}</p>
                            <hr className={`${plan.activate ? "border-primary" : "border-gray-400"}`} />
                        </div>
                    })
                    } */}
                    </div>
                    <div className="w-full md:w-4/5 h-auto p-4 pl-0 pt-0">
                        <div className="flex flex-col gap-y-4">
                            <div className="flex text-xl items-center gap-x-2"><img className="w-4" src={whatsapp} /> <p>1 canal de WhatsApp</p></div>
                            <div className="flex text-xl items-center gap-x-2"><FontAwesomeIcon className="" icon={faCommentDots} /> <p>1000 conversaciones gratuitas</p></div>
                            <div className="flex text-xl items-center gap-x-2" ><FontAwesomeIcon className="" icon={faMobileScreen} /> <p>1 linea activada</p></div>
                            <div className="flex text-xl items-center gap-x-2"><FontAwesomeIcon className="" icon={faUser} /> <p>3 agentes</p></div>
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl font-extralight text-gray-500 mt-2">Todo por $50.00</p>
                    </div>
                    {/* <div className="w-full md:w-4/5 flex flex-col gap-y-4">
                        <Select onChange={(e)=>setTypeChannel(e.target.value)} value={typeChannel} 
                        displayEmpty
                        renderValue={(selected) => {
                            if (selected === "") {
                                return <em>Seleccionar medios</em>;
                            }
                            return selected;
                        }} 
                        >
                            <MenuItem disabled value="">
                                <em>Seleccionar medios</em>
                            </MenuItem>
                            {typeChat.map((channel,i) => {
                                return <MenuItem key={i} value={channel.value} disabled={i!==0}>{channel.label}</MenuItem>
                            })}
                        </Select>
                        {typeChannel!== "" ? <Select onChange={(e)=>changeChannelsSelect(e)}
                        value={userRegister.channels}
                        displayEmpty
                        renderValue={(selected) => {
                            if (selected === "") {
                                return <em>Seleccionar canal</em>;
                            }
                            return selected;
                        }} >
                            <MenuItem disabled value="">
                                <em>Seleccionar canal</em>
                            </MenuItem>
                            {listChannels.map((channel,i) => {
                                return <MenuItem key={i} value={i}>{channel.label}</MenuItem>
                            })}
                        </Select>:""}
                        <TextField value={userRegister.agents} type="number" onChange={(e)=>changeAgent(e)} name="agents" className="w-full" label="N??mero de agentes" variant="outlined" />
                        <p className="text-2xl font-extralight text-gray-500">C/1 Asistente virtual  = +{pricePerAgent}$</p>
                        <p className="text-2xl font-extralight text-gray-500">Costo Total {totalPrice}</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
  
export default FormPersonal;