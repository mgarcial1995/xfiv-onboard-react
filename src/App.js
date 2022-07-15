import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./views/Home"
import Register from "./views/Register"
import Thankyou from "./views/Thankyou"
import ThankyouData from "./views/ThankyouData"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/senddata" element={<ThankyouData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
