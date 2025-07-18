import { Bell, Home, Mountain, PenLine, User } from "lucide-react"
import { useNavigate } from "react-router-dom"


function Navbar() {
  const navigate = useNavigate();
  const paraSignup = () => {
    navigate("/signup");
  };

  return (
    <header className="h-screen border-r-1 border-slate-400 pt-6">
      <div className="py-3 px-4 pl-5" alt="Pagina inicial">
        <button className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center">
          <Home style={{ marginRight: "8px" }} /> Página inicial
        </button>
      </div>

      <div className="py-3 px-4 pl-5" alt="Notificações">
        <button className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center">
          <Bell style={{ marginRight: "8px" }} /> Notificações
        </button>
      </div>

      <div className="py-3 px-4 pl-5" alt="Explorar">
        <button className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center">
          <Mountain style={{ marginRight: '8px' }} /> Explorar
        </button>
      </div>

      <div className="py-3 px-4 pl-5" alt="Postar">
        <button className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center">
          <PenLine style={{ marginRight: '8px' }} /> Postar
        </button>
      </div>

      <div className="py-3 px-4 pl-5" alt="Perfil">
        <button onClick={paraSignup} className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center">
          <User style={{ marginRight: '8px' }} /> Perfil
        </button>
      </div>
    </header>
  );
}

export default Navbar;
