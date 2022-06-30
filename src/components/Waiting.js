import React, { useState, useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from "react-router-dom";
function Waiting() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    setTimeout(() => {
      navigate("/thankyou");
    }, 3000);
    return () => {
      clearInterval(timer);
    };
    
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="h-auto text-center">
        <p className="text-4xl pb-2">Estamos preparando todo, por favor espere ...</p>
        <p className="text-gray-500 pb-8">La información que ingresaste nos ayudó a personalizar tu espacio de trabajo perfecto</p>
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </div>
  );
}

export default Waiting;
