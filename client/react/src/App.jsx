import "./index.css";
import {useEffect} from "react";
import axios from "axios"
import Cadastro from "./components/Cadastro.jsx";

function App() {

  const fetchAPI = async ()=>{
    const response = await axios.get("http://localhost:1000/")
    console.log(response.data.fruits)
  }
  useEffect(() =>{
    fetchAPI();
  }, [])

  return (
    <div className="h-screen w-screen flex bg-slate-500">
      <div>
        <Navbar />
      </div>
      <div className="h-screen w-screen">
        <Cadastro />
      </div>
    </div>
  );
}

export default App;
