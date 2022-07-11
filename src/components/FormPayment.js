import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Cards from "../assets/cards.png"
function FormPayment({paymentData, changePaymentData, listCountries}) {
    let changeCC = (e) => {
        let val = e.target.value
        let v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        let matches = v.match(/\d{4,16}/g);
        let match = matches && matches[0] || ''
        let parts = []
        for (let i=0; i < match.length; i+=4) {
            parts.push(match.substring(i, i+4))
        }
        if (parts.length) {
            e.target.value = parts.join(' ')
        } else {
            e.target.value = val
        }
        changePaymentData(e)
    }
    let changeDateCC = (event) => {
        var inputChar = String.fromCharCode(event.keyCode);
        var code = event.keyCode;
        var allowedKeys = [8];
        if (allowedKeys.indexOf(code) !== -1) {
          return;
        }
      
        event.target.value = event.target.value.replace(
          /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
        ).replace(
          /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
        ).replace(
          /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
        ).replace(
          /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
        ).replace(
          /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
        ).replace(
          /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
        ).replace(
          /\/\//g, '/' // Prevent entering more than 1 `/`
        );
        changePaymentData(event)
    }
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
                            <TextField value={paymentData.email} onChange={(e)=>changePaymentData(e)} name="email" className="w-full" placeholder="Email" variant="outlined" />
                            {/* <TextField value={paymentData.cardNumber} onChange={(e)=>changePaymentData(e)} name="cardNumber" type="tel" className="w-full" placeholder="0000 0000 0000 0000" variant="outlined" /> */}
                            <input onChange={(e)=>changeCC(e)} type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" autoComplete="cc-number" maxLength="19" name="cardNumber" 
                            placeholder="0000 0000 0000 0000" className="h-14 border-gray-400 border rounded-md p-2 outline-blue-500" />
                            <div className="w-full flex flex-row gap-x-6">
                                <input onChange={(e)=>changeDateCC(e)} type="text" maxLength='5' inputmode="numeric"  name="cardNumber" 
                                placeholder="MM/YY" className="h-14 border-gray-400 border rounded-md p-2 outline-blue-500" />
                                <TextField value={paymentData.cardCVC} onChange={(e)=>changePaymentData(e)} name="cardCVC" className="w-1/2" placeholder="CVC" variant="outlined" />
                            </div>
                            <TextField value={paymentData.cardName} onChange={(e)=>changePaymentData(e)} name="cardName" className="w-full" placeholder="Nombre y apellido" variant="outlined" />
                            <select onChange={(e)=>changePaymentData(e)} name="country" className="h-14 border-gray-400 border rounded-md p-2">
                                {paymentData.country === "" ? <option className="font-gray-200">Seleccionar país...</option> :""}
                                {listCountries.map((country,i) => (
                                    <option value={country.country_short_name} key={i}>{country.country_name}</option>
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