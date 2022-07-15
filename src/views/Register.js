import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png"
import Logobg from "../assets/Logobg.png"
import arrow from "../assets/arrow.png"
import check from "../assets/check.svg"
import enter from "../assets/enter.png"
import FormPersonal from "../components/FormPersonal"
import FormPayment from "../components/FormPayment"
import Plans from "../components/Plans"
import Waiting from "../components/Waiting"
import Button from "../components/ButtonComponent"
import StepBar from "../components/StepBar"
import axios from "axios"
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
        agents: 0,
        teams: []
    }
    let payment = {
        email: "",
        cardNumber: "",
        cardDate: "",
        cardCVC: "",
        cardName: "",
        country: ""
    }
    let businessKeys = {
        numberBusiness: "",
        codeKey: "",
    }
    const [businessData, setBusinessData] = useState(businessKeys)
    const [textButton, setTextButton] = useState("Siguiente")
    const [step, setStep] = useState(0)
    const [userRegister, setUserRegister] = useState(userData)
    const [listChannels, setListChannels] = useState([])
    const [paymentData, setPaymentData] = useState(payment)
    const [countries, setCountries] = useState([])
    const [totalPrice, setPriceSum] = useState(0)
    const [buttonVal, setButtonVal] = useState(false)
    const [passValidate, setPassValidate] = useState(false)
    const [emailValidate, setEmailValidate] = useState(false)
    const [userValidate, setUserValidate] = useState(false)
    const [listStep, setListStep] = useState([
        {text: "Información", active: true},
        {text: "Planes", active: false},
        {text: "Pago", active: false},
        {text: "Envío de datos", active: false},
        {text: "Finalizar", active: false}
    ])
    useEffect(() => {
        if(userRegister.userName!==""&& 
            userRegister.email!==""&& 
            userRegister.password!=="" &&
            userRegister.fullName!==""&& 
            userRegister.businessName!==""&& 
            userRegister.codeCountry!=="" && 
            userRegister.phone!==""&&
            !passValidate && 
            !emailValidate && 
            !userValidate)
        {
            setButtonVal(true)
        }else{
            setButtonVal(false)
        }
    },[passValidate,emailValidate,userValidate,userRegister])
    useEffect(() => {
        let configcountries = {
            method: "get",
            url: `https://www.universal-tutorial.com/api/getaccesstoken`,
            headers: {
                "api-token": "NwXvPtm7dACz7DDlwBED5mH-VNgUTbhqZV3O2yMdvwYUaH4MipxLBARSa3iqbhe7lbw",
                "user-email": "1995@gmail.com"
            }
        };
        axios(configcountries)
        .then((response) => {
            let config = {
                method: "get",
                url: `https://www.universal-tutorial.com/api/countries/`,
                headers: {
                    Authorization: "Bearer "+response.data.auth_token,
                }
            };
            axios(config)
            .then((response) => {
                setCountries(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        })

        .catch((error) => {
            console.log(error);
        });
    }, []);
    let switchStepper = (val) =>{
        switch (val) {
            case 0:
                return <FormPersonal listChannels={listChannels} setPriceSum={setPriceSum} setUserRegister={setUserRegister} 
                userRegister={userRegister} changeUserData={changeUserData} 
                passValidate={passValidate} emailValidate={emailValidate} userValidate={userValidate}
                />
                break;
            case 1:
                return <Plans setButtonVal={setButtonVal} setTextButton={setTextButton} setStep={setStep} listChannels={listChannels} setPriceSum={setPriceSum} setUserRegister={setUserRegister} 
                userRegister={userRegister} changeUserData={changeUserData} businessData={businessData} setBusinessData={setBusinessData} />
                break;
            case 2:
                return <FormPayment listCountries={countries} paymentData={paymentData} changePaymentData={changePaymentData} />
                break;
            case 3:
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
        validate(e.target.name, e.target.value)
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
        setButtonVal(false)
        if(newstep === 2){
            sendData()
            setTextButton(`Pagar $50`)
        }
    }

    let sendData =async () => {
        let datos = {
            "keys": {
                "key": "N5Dajf5fMCLuQwA0iFNiJbCxAK",
                "channel": "whatsapp",
                "color_label":"#075E54",
                "proveedor": "360dialog",
                "phone": userRegister.phone
            },
            "business": {
                "fullName": userRegister.fullName,
                "useName": userRegister.userName,
                "codeCountry": userRegister.codeCountry,
                "businessName": userRegister.businessName,
                "location": "en_US",
                "agents": 3,
                "inboxes": 1000,
                "email": userRegister.email,
                "password": userRegister.password,
                "roles": "administrator",
                "nameBot":""
            },
            "teams": userRegister.teams
        }
        
        // const { data } = await axios.post(`http://52.25.41.89:5056/api/accounts`, datos, {
        //     headers:{
        //     'Authorization': 'Basic dXNlcjE6cGFzczE='
        //     }
        // })
    }

    let validate = (name, value) => {
        let validatePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,30}$/
        let validateUserAdmin = /^(?=\w*[A-Z])(?=\w*[a-z])\S{5,20}$/
        let validateEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        switch (name) {
            case "password":
                if(value !== "" && !value.match(validatePass)){
                    setPassValidate(true)
                }else{
                    setPassValidate(false)
                }
                break;
            case "userName":
                if(value !== "" && !value.match(validateUserAdmin)){
                    setUserValidate(true)
                }else{
                    setUserValidate(false)
                }
                break;
            case "email":
                if(value !== "" && !value.match(validateEmail)){
                    setEmailValidate(true)
                }else{
                    setEmailValidate(false)
                }
            break;
            default:
                break;
        }
        
    }
    return (
            <div className="flex flex-row w-full h-auto">
                <div className="w-full h-auto relative">
                    <img className="absolute z-30 top-8 left-8 w-12 h-12" src={Logo} />
                    <div className="relative z-10 w-full h-full md:h-screen flex flex-col md:flex-row items-center md:items-stretch">
                        <div className="w-full md:w-1/12 md:h-auto bg-white hidden lg:flex flex-row md:flex-col">
                            <div className="h-full flex flex-col justify-center items-center">
                                <img className="w-18 md:mb-48" src={arrow} />
                            </div>
                        </div>
                        <div className="w-full h-full px-8 mt-20 lg:m-0">
                            <div className="w-full h-full md:h-screen py-4 lg:py-16">
                                {switchStepper(step)}
                                {step !== 3 ? <div className="w-full lg:w-2/4 flex flex-row justify-center md:justify-start mt-4 gap-6 items-center text-gray-500">
                                    <Button onClickEvent={()=>nextStep()} buttonVal={true} text={textButton} />
                                    <p className="font-normal">o</p>
                                    {step === 0?<p className="font-semibold">pulse enter </p> : 
                                    <p className="font-semibold ">Omitir este paso </p>
                                    }
                                    <img src={enter} />
                                </div> : ""}
                            </div>
                        </div>
                    </div>
                    {step!==1 ? <div>
                        <div className="hidden md:block w-80 absolute bottom-24 right-64">
                            <img className="z-0 w-full h-auto" src={Logobg} />
                        </div>
                        <div className="z-0 hidden md:block absolute bottom-16 shadow-gray-500 shadow-2xl right-16 bg-primary w-80 h-auto text-white p-4 rounded-xl">
                            <div className="flex flex-row justify-between">
                                <p className="uppercase">sobre xfiv</p>
                                <div> <img src={check} /> </div>
                            </div>
                            <p className="text-blue-300 text-start pt-2">Puedes configurar tu bot de auto respuestas para que se encarguen de gestiones frecuentes y comunes por si solos sin depender de personal de asistencia.</p>
                        </div>
                    </div>:""}
                </div>
                <div className="hidden md:block w-96 h-auto lg:h-screen">
                    <StepBar listStep={listStep} />
                </div>
            </div>
            

    );
}
  
export default Register;