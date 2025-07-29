import { Bell, BellDot, Home, Mountain, User, UserMinus } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import useUserDecode from "./useUserDecode";
import Postar from "./Postar";
import { useEffect, useState } from "react";
import axios from "axios";


function Navbar() {
  const [notificacoes, setNotificacoes] = useState(false)
  const userToken = useUserDecode();
  const token = localStorage.getItem('token')

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          "https://tritter-backend-server.onrender.com/api/withoutread/getnotifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        
        const notificacoes = response.data;
        const possuiNaoLidas = notificacoes.some((n) => n.read === false)
        setNotificacoes(possuiNaoLidas)
      } catch (error) {
        console.log(error)
        setNotificacoes(false)
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);


  // Função para levar o usuario para o perfil dele ao clicar em perfil e verificar se ele ja nao está na rota do proprio perfil
  const navigate = useNavigate();
  const location = useLocation()
  const pathName = location.pathname
  const paraPerfil = () => {
    if (!userToken) {
      navigate('/login');
    } else if (pathName === `/user/${userToken}`) {
      navigate(0);
    } else {
      navigate(`/user/${userToken}`);
    }
  }

  // Função para ir para rota Homepage
  const paraHomepage = () => {
    if (!userToken) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }

  const paraNotifications = () => {
    if (!userToken) {
      navigate("/login");
    } else {
      navigate("/notifications");
    }
  };

  const paraExplorer = () => {
    if (!userToken) {
      navigate('/login')
    } else {
      navigate('/explorer')
    }
  }

  

  // Função para deslogar (remover token do localStorage)
  function deslogar(){
    localStorage.clear()
    navigate('/login')
  }
  
  

  return (
    <header className="h-screen border-r-1 border-slate-400 pt-6 relative" alt="Div principal">
      <div className="py-3 px-4 pl-5" alt="Pagina inicial">
        <button
          onClick={paraHomepage}
          className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center"
        >
          <Home style={{ marginRight: "8px" }} /> Página inicial
        </button>
      </div>

      {notificacoes ? (
        <div className="py-3 px-4 pl-5" alt="Notificações">
          <button
            onClick={paraNotifications}
            className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center"
          >
            <BellDot style={{ marginRight: "8px" }} /> Notificações
          </button>
        </div>
      ) : (
        <div className="py-3 px-4 pl-5" alt="Notificações">
          <button
            onClick={paraNotifications}
            className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center"
          >
            <Bell style={{ marginRight: "8px" }} /> Notificações
          </button>
        </div>
      )}

      <div className="py-3 px-4 pl-5" alt="Explorar">
        <button onClick={paraExplorer} className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center">
          <Mountain style={{ marginRight: "8px" }} /> Explorar
        </button>
      </div>

      <Postar />

      <div className="py-3 px-4 pl-5" alt="Perfil">
        <button
          onClick={paraPerfil}
          className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center"
        >
          <User style={{ marginRight: "8px" }} /> Perfil
        </button>
      </div>

      <div className="absolute bottom-0 pb-10 px-4 pl-5" alt="Deslogar">
        <button
          onClick={deslogar}
          className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center"
        >
          <UserMinus style={{ marginRight: "8px" }} /> Sair
        </button>
      </div>
    </header>
  );
}

export default Navbar;
