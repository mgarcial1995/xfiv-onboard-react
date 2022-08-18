import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import Button from "./ButtonComponent"
import { useNavigate } from "react-router-dom";

let plansComplete = [
    {
        name: "Plan WhatsApp", 
        points:["1 canal de WhatsApp", "1 linea activada", "3 agentes","1000 conversaciones gratuitas "],
        selected: false, 
        price: 50
    },
    {
        name: "Plan WhatsApp Ecommerce", 
        points:["WhatsApp Business", "Catalogos virtuales", "Agentes ilimitados","Conversaciones ilimitadas"],
        selected: false, 
        price: 0
    },
    {
        name: "Plan Empresarial",
        points:["WhatsApp Business", "Catalogos virtuales", "Agentes ilimitados","Conversaciones ilimitadas", "Canales ilimitados", "Y más"],
        selected: false, 
        price: 0
    },
]
function Plans({setUserRegister, userRegister, setButtonVal, businessData, setBusinessData,setStep, setTextButton}) {
    const [listPlans, setListPlans] = useState(plansComplete)
    const [activeAdd, setActiveAdd] = useState(false)
    const [messageTeam, setMessageTeam] = useState(false)
    const [activeCode, setActiveCode] = useState(false)
    const [showTeamSection, setShowTeamSection] = useState(false)

    const [planSelected, setPlanSelected] = useState({})

    const [teams, setTeams] = useState([])
    const [teamName, setTeamName] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if(teamName.trim().length > 4){
            setActiveAdd(true)
        }else{
            setActiveAdd(false)
        }
    },[teamName])
    let selectPlan = (i) => {
        let plans = [...listPlans]
        let newPlanSel = Object.assign({},planSelected)
        newPlanSel = plans[i]
        setPlanSelected(newPlanSel)
        console.log(newPlanSel)
        if(newPlanSel.name === "Plan WhatsApp"){
            // setTextButton(`Pagar $50`)
        }else{
            navigate("/senddata");
            // setTextButton(`Siguiente`)
        }
        if(i===0){
            plans = [plans[0]]
        }else{
            plans.map((el,index)=>{
                if(index === i){
                    el.selected = true
                }else{
                    el.selected = false
                }
                return el
            })
        }
        setListPlans(plans)
    }
    
    let addTeam = (active) => {
        let newTeams = [...teams]
        newTeams.push({name:teamName})
        if(active){
            setTeamName("")
            setTeams(newTeams)
            setUserRegister({...userRegister, teams: newTeams})
            setMessageTeam(false)
        }else{
            setMessageTeam(true)
        }
    }
    let deleteTeam = (index) => {
        let newTeams = [...teams]
        newTeams.splice(index,1)
        setTeams(newTeams)
        setUserRegister({...userRegister, teams: newTeams})
    }
    let transformCurrency = (price) => {
        let newPrice = price.toFixed(2)
        if(price === 0){
            newPrice = "00.00"
        }
        return newPrice
    }
    useEffect(() => {
        if(businessData.codeKey.length > 7){
            setShowTeamSection(true)
        }else{
            setShowTeamSection(false)
        }
    }, [businessData]);
    let sendCode = () => {
        if(businessData.numberBusiness !== ""){
            setActiveCode(true)
        }
    }
    return (
        <div className="w-full h-auto flex flex-col justify-start mb-12">
            <div className="w-full mb-16">
                <h1 className="text-5xl font-semibold">Selección de plan</h1>
                <p className="text-2xl font-extralight text-gray-500 mt-2">Escoja el plan de tu agrado y empecemos a emprender.</p>
            </div>
            <div className="w-full h-auto flex flex-col md:flex-row justify-around items-stretch">
                {listPlans.map((plan, index) =>{
                    return <div key={index} className={`w-80 p-8 ${plan.selected ? 'border-primary border-4' : ''} h-auto justify-between rounded-lg bg-white shadow-2xl  `}>
                        {
                        <div className="w-full h-full flex flex-col justify-between items-strech gap-y-10">
                            <div className="w-full h-auto">
                                <h2 className={`text-center text-3xl font-semibold ${plan.selected ? "text-primary":"text-black"}`}>{plan.name}</h2>
                                <div className="mt-4">
                                    {plan.points.map((point, i)=>{
                                        return <div key={i} className="flex gap-x-4 items-start my-1"><FontAwesomeIcon className={`pt-1 ${plan.selected ?"text-primary": "text-black"}`} icon={faCircleCheck} /> <p>{point}</p></div>
                                    })}
                                </div>
                            </div>
                            <div className="w-full h-auto mt-10 flex flex-col justify-center items-center">
                                <h2 className="text-center text-3xl font-semibold mb-6">{index === 0? "$"+transformCurrency(plan.price): ""}</h2>
                                <Button onClickEvent={(e)=>selectPlan(index)} buttonVal={true} text={index===0?"Seleccionar":"Solicitar presupuesto"} />
                            </div>
                        </div>
                        }
                    </div>
                })}
                {listPlans.length === 1 ? 
                <div className="w-7/12 border-l-2 border-primary h-auto p-8 -my-4 mr-10">
                    {!showTeamSection ?<div className="mb-6">
                        <h1 className="text-2xl font-semibold">Agregar número empresarial</h1>
                        <p className="text-lg font-extralight mt-2 text-gray-500 mb-4">Inserta el número de celular en donde te llegará un código de activación. 
                        <br/><span className="text-gray-700 font-semibold">El número no debe tener cuenta de WhatsApp.</span></p>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex items-center">
                                <TextField value={businessData.numberBusiness} onChange={(e)=>setBusinessData({...businessData,numberBusiness:e.target.value})} name="numberBusiness" className="w-full w-72" type="text" label="Número cecular" variant="outlined" />
                                <div className="py-2 px-6 min-w-10 bg-primary rounded-full text-white font-semibold ml-4 cursor-pointer"
                                onClick={()=>sendCode()}>Enviar</div>
                            </div>
                            {activeCode? <TextField value={businessData.codeKey} onChange={(e)=>setBusinessData({...businessData,codeKey:e.target.value})} name="codeKey" className="w-full w-72" type="text" label="Código" variant="outlined" />: ""}
                        </div>
                    </div>:""}
                    {showTeamSection ? 
                    <div>
                        <h1 className="text-2xl font-semibold">Equipos de trabajo</h1>
                        <p className="text-lg font-extralight mt-2 text-gray-500 mb-4">Escribe y agrega los equipos de trabajo con los que vas a trabajar.</p>
                        <div className="flex items-center gap-x-4">
                            <TextField value={teamName} onChange={(e)=>setTeamName(e.target.value)}
                            className="w-full w-72" type="text" label="Nombre de equipo" variant="outlined" />
                            <FontAwesomeIcon onClick={()=>addTeam(activeAdd)} className={`${activeAdd ?'text-primary':'text-gray-500' } text-4xl cursor-pointer`} icon={faCirclePlus} />
                        </div>
                        {messageTeam?<p className="text-sm text-red-700">*El nombre del equipo debe tener 5 caracteres como mínimo</p>:""}
                        <div className="mt-6 flex flex-wrap">
                            {teams.map((team,i)=>{
                                return <div key={i} className="flex m-2 items-center w-fit justify-between min-w-[14rem] border-gray-300 border px-4 py-2 rounded-lg shadow-md shadow-gray-300">
                                    <div className="flex gap-x-4">
                                        <FontAwesomeIcon className="text-gray-400 text-3xl " icon={faUsers} />
                                        <p className="text-lg">{team.name}</p>
                                    </div>
                                    <FontAwesomeIcon onClick={()=>deleteTeam(i)} className="text-gray-400 hover:text-primary text-2xl cursor-pointer ml-4" icon={faCircleXmark} />
                                </div>
                            })}
                            
                        </div>
                    </div>: ""}
                </div>
                :""}
            </div>
        </div>
    );
}
  
export default Plans;