import React, { useState } from "react";
import Logo from "../assets/Logo.png"
import Logobg from "../assets/Logobg.png"
import arrow from "../assets/arrow.png"
import enter from "../assets/enter.png"
import FormPersonal from "../components/FormPersonal"
import FormPayment from "../components/FormPayment"
import Waiting from "../components/Waiting"
import Button from "../components/ButtonComponent"
import StepBar from "../components/StepBar"
function Register() {
    let userData = {
        fullName: "",
        userName: "",
        businessName: "",
        codeCountry: "",
        phone: "",
        email: "",
        password: "",
        channels: "",
        agents: ""
    }
    let payment = {
        email: "",
        cardNumber: "",
        cardDate: "",
        cardCVC: "",
        cardName: "",
        country: ""
    }
    const [textButton, setTextButton] = useState("Siguiente")
    const [step, setStep] = useState(0)
    const [userRegister, setUserRegister] = useState(userData)
    const [paymentData, setPaymentData] = useState(payment)
    const [listStep, setListStep] = useState([
        {text: "Información", active: true},
        {text: "Pago", active: false},
        {text: "Envío de datos", active: false},
        {text: "Finalizar", active: false}
    ])
    let price = "32.00"
    let switchStepper = (val) =>{
        switch (val) {
            case 0:
                return <FormPersonal userRegister={userRegister} changeUserData={changeUserData} />
                break;
            case 1:
                return <FormPayment paymentData={paymentData} changePaymentData={changePaymentData} />
                break;
            case 2:
                return <Waiting />
                break;
            default: return ""
                break;
        }
    }
    let changeUserData = (e) =>{
        let newData = Object.assign({},userRegister)
        newData[e.target.name] = e.target.value
        setUserRegister(newData)
    }
    let changePaymentData = (e) =>{
        let newData = Object.assign({},paymentData)
        newData[e.target.name] = e.target.value
        setPaymentData(newData)
    }
    let nextStep =()=>{
        let newlistArr = [...listStep]
        let newstep = step+1
        setStep(newstep)
        newlistArr[newstep].active = true
        setListStep(newlistArr)
        setTextButton(`Pagar $${price}`)
        
    }
    return (
            <div className="flex flex-row w-full h-auto">
                <div className="w-full h-auto relative">
                    <img className="absolute top-8 left-8 w-12 h-12" src={Logo} />
                    <div className="w-full md:w-10/12 bg-white h-full md:h-screen flex flex-col md:flex-row items-center md:items-stretch">
                        <div className="w-full md:w-1/12 md:h-auto bg-white hidden lg:flex flex-row md:flex-col">
                            <div className="h-full flex flex-col justify-center items-center">
                                <img className="w-18 md:mb-48" src={arrow} />
                            </div>
                        </div>
                        <div className="w-full md:w-11/12 h-full px-8 mt-20 lg:m-0">
                            <div className="w-auto h-full md:h-screen py-4 lg:py-16">
                                <div className="pb-4 h-auto">
                                {switchStepper(step)}
                                </div>
                                {step !== 2 ? <div className="w-full lg:w-2/4 flex flex-row justify-center md:justify-start gap-6 items-center text-gray-500">
                                    <Button onClickEvent={()=>nextStep()} text={textButton} />
                                    <p className="font-normal">o</p>
                                    <p className="font-semibold">pulse enter </p>
                                    <img src={enter} />
                                </div> : ""}
                            </div>
                        </div>
                    </div>
                    <div className="w-80 absolute bottom-24 right-64">
                        <img className="w-full h-auto" src={Logobg} />
                    </div>
                    <div className="absolute bottom-16 shadow-gray-500 shadow-2xl right-16 bg-primary w-80 h-auto text-white p-4 rounded-xl">
                        <div className="flex flex-row justify-between">
                            <p className="uppercase">sobre xfiv</p>
                            <div>X</div>
                        </div>
                        <p className="text-blue-300 text-start pt-2">Puedes configurar tu bot de auto respuestas para que se encarguen de gestiones frecuentes y comunes por si solos sin depender de personal de asistencia.</p>
                    </div>
                </div>
                <div className="hidden md:block w-96 h-auto lg:h-screen">
                    <StepBar listStep={listStep} />
                </div>
            </div>
            

    );
}
  
export default Register;