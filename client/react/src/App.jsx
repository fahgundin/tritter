import "./index.css";
import Navbar from "./components/Navbar.jsx";
import {useEffect} from "react";
import axios from "axios"
import Cadastro from "./pages/Cadastro.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";


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
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
