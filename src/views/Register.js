import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png"
import Logobg from "../assets/Logobg.png"
import arrow from "../assets/arrow.png"
import enter from "../assets/enter.png"
import FormPersonal from "../components/FormPersonal"
import FormPayment from "../components/FormPayment"
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
        // channels: null,
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
    const [step, setStep] = useState(0)
    const [userRegister, setUserRegister] = useState(userData)
    const [listChannels, setListChannels] = useState([])
    const [paymentData, setPaymentData] = useState(payment)
    const [advert, setAdvert] = useState("aaaa")
    const [countries, setCountries] = useState([])
    const [totalPrice, setPriceSum] = useState(0)
    const [buttonVal, setButtonVal] = useState(false)
    const [listStep, setListStep] = useState([
        {text: "Información", active: true},
        {text: "Pago", active: false},
        {text: "Envío de datos", active: false},
        {text: "Finalizar", active: false}
    ])
    useEffect(() => {
        let config = {
            method: "get",
            url: `https://www.universal-tutorial.com/api/countries/`,
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiIxOTk1QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6Ik53WHZQdG03ZEFDejdERGx3QkVENW1ILVZOZ1VUYmhxWlYzTzJ5TWR2d1lVYUg0TWlweExCQVJTYTNpcWJoZTdsYncifSwiZXhwIjoxNjU3MTU1MTk0fQ.Xer0NbE7Y-_AIvOm4vUxckl9YXm4e80KlOz5rtzcr5I",
            }
        };
        axios(config)
        .then((response) => {
            setCountries(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
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
                return <FormPersonal validate={validate} listChannels={listChannels} setPriceSum={setPriceSum} setUserRegister={setUserRegister} userRegister={userRegister} changeUserData={changeUserData} />
                break;
            case 1:
                return <FormPayment listCountries={countries} paymentData={paymentData} changePaymentData={changePaymentData} />
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
        validate(e, e.target.value)
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
        if(newstep === 2){
            sendData()
        }
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
        let validateUserAdmin = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,20}$/
        let validateEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        let query
        // switch (name) {
        //     case "password":
                
        //         break;
        //     case "user":
                
        //         break;
        //     case "email":
                
        //     break;
        //     default:
        //         break;
        // }
        // if(!value.match(validatePass)){
        //     setAdvert("ya")
        //     console.log("Valdidar contraseña")
        // }else{
        //     setAdvert("validado")
        //     console.log("Listo")
            
        // }
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
                            <form className="w-auto h-full md:h-screen py-4 lg:py-16">
                                {switchStepper(step)}
                                <p>{advert}</p>
                                {step !== 2 ? <div className="w-full lg:w-2/4 flex flex-row justify-center md:justify-start mt-4 gap-6 items-center text-gray-500">
                                    <Button onClickEvent={()=>nextStep()} buttonVal={buttonVal} text={textButton} />
                                    <p className="font-normal">o</p>
                                    <p className="font-semibold">pulse enter </p>
                                    <img src={enter} />
                                </div> : ""}
                            </form>
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