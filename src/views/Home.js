import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"
import Logobg from "../assets/Logobg.png"
import imagebg from "../assets/imagebg.png"
import Button from "../components/ButtonComponent"
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  let goToRegister = () => {

  }
  return (
    <div className='flex flex-row w-full'>
      <div className='md:w-1/2 w-full bg-white h-screen flex flex-col justify-center'>
          <div className='w-full h-auto flex flex-col justify-center items-center mb-24'>  
                <img className='my-6' src={Logo} />
                <div className='my-6 text-center'>
                    <p className='text-6xl font-semibold'>Bienvenido a Xfiv</p>
                    <p className='text-2xl text-gray-400'>Tu plataforma omnicanal inteligente</p>
                </div>
                <div className='my-6 text-center'>
                    <Link  to="/tips"><Button buttonVal={true} text="Empecemos" onClickEvent="" /></Link>
                </div>
          </div>
      </div>
      <div className='hidden md:block md:w-1/2 bg-slate-100 h-screen relative overflow-hidden'>
          <img className="w-96 absolute top-6 left-6" src={Logobg} />
          <img className="w-auto h-auto absolute bottom-0 left-1/4" src={imagebg} />
      </div>
    </div>
  );
}

export default Home;
