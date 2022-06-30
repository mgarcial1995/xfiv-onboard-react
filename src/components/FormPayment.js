import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from "@mui/material/OutlinedInput";
import Cards from "../assets/cards.png"
function FormPayment({paymentData, changePaymentData}) {
    const names = [
        "Perú",
        "Argentina",
        "Colombia",
        "Ecuador",
        "Paraguay",
        "Chile",
        "Brazil",
        "Mexico",
        "Bolivia",
        "Uruguay"
      ];
    return (
        <div className="w-full flex flex-col justify-start">
            <div className="w-full mb-16">
                <h1 className="text-5xl font-semibold">Información de pago</h1>
                <p className="text-2xl font-extralight text-gray-500 mt-2">Complete los siguientes datos para que podamos ayudarte a<br/> ofrecer una nueva experiencia de comunicación en tu negocio.</p>
            </div>
            <div className="w-full h-auto flex flex-row justify-start">
                <div className="w-auto">
                    <h1 className="text-3xl font-semibold mb-4">Información de pago</h1>
                    <div className="flex flex-col-reverse lg:flex-row justify-between">
                        <div className="w-full lg:w-4/12 flex flex-col gap-y-4">
                            <TextField value={paymentData.email} onChange={(e)=>changePaymentData(e)} name="email" className="w-full" id="outlined-basic" placeholder="Email" variant="outlined" />
                            <TextField value={paymentData.cardNumber} onChange={(e)=>changePaymentData(e)} name="cardNumber" className="w-full" id="outlined-basic" placeholder="0000 0000 0000 0000" variant="outlined" />
                            <div className="w-full flex flex-row gap-x-6">
                                <TextField value={paymentData.cardDate} onChange={(e)=>changePaymentData(e)} name="cardDate" className="w-1/2" id="outlined-basic" placeholder="MM/YY" variant="outlined" />
                                <TextField value={paymentData.cardCVC} onChange={(e)=>changePaymentData(e)} name="cardCVC" className="w-1/2" id="outlined-basic" placeholder="CVC" variant="outlined" />
                            </div>
                            <TextField value={paymentData.cardName} onChange={(e)=>changePaymentData(e)} name="cardName" className="w-full" id="outlined-basic" placeholder="Nombre y apellido" variant="outlined" />
                            <select onChange={(e)=>changePaymentData(e)} name="country" className="h-14 border-gray-400 outline-gray-400 border rounded-md">
                                {names.map((name,i) => (
                                    <option key={i}>{name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center w-full md:w-5/12">
                            <img className="w-2/4 md:w-auto" src={Cards} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default FormPayment;