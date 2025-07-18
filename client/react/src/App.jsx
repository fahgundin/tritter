import "./index.css";
import {useEffect} from "react";
import axios from "axios"

// Imports que envolvem as rotas
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Cadastro from "./pages/Cadastro.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import RotaPrivada from "./components/RotaPrivada.jsx";
import Profile from "./components/Profile.jsx"


function App() {


  const fetchAPI = async ()=>{
    const response = await axios.get("http://localhost:1000/")
    console.log(response.data.fruits)
  }
  useEffect(() =>{
    fetchAPI();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RotaPrivada>
              <Homepage />
            </RotaPrivada>
          }
        />
        <Route path="/signup" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App