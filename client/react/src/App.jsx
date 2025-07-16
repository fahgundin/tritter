import "./index.css";
import Navbar from "./components/Navbar.jsx";
import{useEffect} from "react";
import axios from "axios"

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
      
      <Navbar />
    </div>
  );
}

export default App;
