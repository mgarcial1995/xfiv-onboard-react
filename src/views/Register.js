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
        agents: 0
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
    const [step, setStep] = useState(1)
    const [userRegister, setUserRegister] = useState(userData)
    const [listChannels, setListChannels] = useState([])
    const [paymentData, setPaymentData] = useState(payment)
    const [advert, setAdvert] = useState("aaaa")
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
            userRegister.channels!==""&& 
            userRegister.agents!==0 &&
            !passValidate && 
            !emailValidate && 
            !userValidate)
        {
            setButtonVal(true)
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
        
        let configChannels = {
            method: "get",
            url: "http://52.25.41.89:5056/api/channels",
            headers: {
                Authorization: "Basic dXNlcjE6cGFzczE=",
                "Content-Type": "application/json"
            }
        }
        axios(configChannels)
        .then(async (response) => {
            let resChannels = response.data

            let channels = await Promise.all(resChannels.map(async el => {
                let obj = {}
                let configChannel = {
                    method: "get",
                    url: "http://52.25.41.89:5056/api/channels_plan/"+el.channel,
                    headers: {
                        Authorization: "Basic dXNlcjE6cGFzczE=",
                        "Content-Type": "application/json"
                    }
                }
                await axios(configChannel)
                .then((async result => {
                    let infoChannel = await result.data[0]
                    obj = {
                        value: el.channel,
                        label: el.channel,
                        price: infoChannel ? infoChannel.price : 0
                    }
                }))
                return obj
            }))
            setListChannels(channels)
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
                return <Plans listChannels={listChannels} setPriceSum={setPriceSum} setUserRegister={setUserRegister} 
                userRegister={userRegister} changeUserData={changeUserData}  />
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
        setTextButton(`Pagar $${totalPrice}`) 
        // if(newstep === 2){
        //     sendData()
        // }
    }

    let sendData = () => {
        let newUserData = {
            "provedor": userRegister.channels[0].label,
            "key": userRegister.codeCountry,
            "phone": userRegister.phone,
            "empresa": {
              "name": userRegister.businessName,
              "location": "en_US",
              "email": userRegister.email,
              "agents": Number(userRegister.agents),
              "limits": 5,
              "user_admin": userRegister.userName,
              "password": userRegister.password,
              "roles": "adminstrator"
            },
            "users": []
        }
        let newdata = {
            "provedor": "360dialog",
            "keys": [
                {
                "key": "JzBjlBVhZk3cNzqD9PbZrRwsAK",
                "channel": userRegister.channels[0].label,
                "phone": "663988446978209"
                }
            ],
            "phone": "421958931993117",
            "empresa": {
                "name": "string",
                "location": "en_US",
                "email": "user@example.com",
                "agents": 0,
                "limits": 0,
                "user_admin": "string",
                "password": "stringst",
                "roles": "administrator"
            },
        }
        console.log(newUserData)
        let config = {
            method: "post",
            url: `http://52.25.41.89:5056/api/accounts`,
            headers: {
                Authorization: "Basic dXNlcjE6cGFzczE=",
            }
        };
        axios(config)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    let validate = (name, value) => {
        let validatePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
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
                                    <Button onClickEvent={()=>nextStep()} buttonVal={buttonVal} text={textButton} />
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