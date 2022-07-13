import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import Button from "./ButtonComponent"
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';


function Plans({setUserRegister, setPriceSum, userRegister, changeUserData, listChannels}) {
    const [listPlans, setListPlans] = useState([
        {
            name: "Gratuito", 
            points:["Opcion 1", "Opcion media", "Opcion avanzada"],
            selected: false, 
            price: 0
        },
        {
            name: "Emprendedor", 
            points:["1 canal de WhatsApp", "1 linea activada", "3 agentes","900 conversaciones gratuitas "],
            selected: true, 
            price: 50
        },
        {
            name: "Personalizado",
            selected: false, 
            price: 0
        },
    ])

    const [totalPrice, setTotalPrice] = useState(0)
    const [typeChannel, setTypeChannel] = useState("")
    const [priceAgent, setPricePerAgent] = useState(0)
    const [totalPricesChannels, setTotalPricesChannels] = useState(0)
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
    let selectPlan = (i) => {
        let plans = [...listPlans]
        plans.map((el,index)=>{
            if(index === i){
                el.selected = true
            }else{
                el.selected = false
            }
            return el
        })
        console.log(plans)
        setListPlans(plans)
    }
    let transformCurrency = (price) => {
        let newPrice = price.toFixed(2)
        if(price === 0){
            newPrice = "00.00"
        }
        return newPrice
    }
    useEffect(() => {
        setTotalPrice(priceAgent+totalPricesChannels)
        setPriceSum(priceAgent+totalPricesChannels)
    }, [userRegister,totalPricesChannels]);
    return (
        <div className="w-full h-auto flex flex-col justify-start mb-12">
            <div className="w-full mb-16">
                <h1 className="text-5xl font-semibold">Selección de plan</h1>
                <p className="text-2xl font-extralight text-gray-500 mt-2">Escoja el plan de tu agrado y empecemos a emprender.</p>
            </div>
            <div className="w-full h-auto flex flex-col md:flex-row justify-around items-stretch">
                {listPlans.map((plan, index) =>{
                    return <div key={index} className={`${plan.name==="Emprendedor" ? ' w-80 p-8 -my-8': 'w-72 p-8'} ${plan.selected ? 'border-primary border-4' : ''} h-auto justify-between rounded-lg bg-white shadow-2xl  `}>
                        {plan.name === "Personalizado" ? 
                        <div className="h-full w-full">
                            <div>
                                <h2 className="text-center text-3xl font-semibold">{plan.name}</h2>
                                <div className="mt-6 flex flex-col gap-y-6">
                                    <Select 
                                    onChange={(e)=>setTypeChannel(e.target.value)} 
                                    value={typeChannel}
                                    displayEmpty
                                    renderValue={(selected) => {
                                        if (selected === "") { return <em>Seleccionar medios</em>; }
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

                                    {/* {typeChannel!== "" ?  */}
                                    <Select 
                                    // onChange={(e)=>changeChannelsSelect(e)}
                                    value={userRegister.channels}
                                    displayEmpty
                                    renderValue={(selected) => {
                                        if (selected === "") { return <em>Seleccionar canal</em>; }
                                        return selected;
                                    }} >
                                        <MenuItem disabled value="">
                                            <em>Seleccionar canal</em>
                                        </MenuItem>
                                        {/* {listChannels.map((channel,i) => {
                                            return <MenuItem key={i} value={i}>{channel.label}</MenuItem>
                                        })} */}
                                    </Select>
                                    {/* :""} */}
                                    <TextField 
                                    value={userRegister.agents}
                                    min='0'
                                    type="number" 
                                    onChange={(e)=>changeAgent(e)} 
                                    name="agents" className="w-full" label="Número de agentes" variant="outlined" />
        
                                </div>
                            </div>
                            <div className="w-full mt-10 flex flex-col justify-center items-center">
                                <h2 className="text-center text-3xl font-semibold mb-6">${totalPrice}</h2>
                                <Button onClickEvent={(e)=>selectPlan(index)} buttonVal={true} text="Seleccionar" />
                            </div>
                        </div> 
                        :
                        <div className="w-full h-full flex flex-col justify-between items-strech gap-y-10">
                            <div className="w-full h-auto">
                                <h2 className="text-center text-3xl font-semibold">{plan.name}</h2>
                                <div className="mt-4">
                                    {plan.points.map((point, i)=>{
                                        return <div key={i} className="flex gap-x-4 items-start my-1"><FontAwesomeIcon className={`pt-1 ${plan.selected ?"text-primary": "text-black"}`} icon={faCircleCheck} /> <p>{point}</p></div>
                                    })}
                                </div>
                            </div>
                            <div className="w-full h-auto mt-10 flex flex-col justify-center items-center">
                                <h2 className="text-center text-3xl font-semibold mb-6">${transformCurrency(plan.price)}</h2>
                                <Button onClickEvent={(e)=>selectPlan(index)} buttonVal={true} text="Seleccionar" />
                            </div>
                        </div>
                        }
                    </div>
                })}
            </div>
        </div>
    );
}
  
export default Plans;