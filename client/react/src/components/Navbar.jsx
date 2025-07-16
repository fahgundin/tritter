function Navbar() {
  return (
    <header className="h-screen border-r-1 border-slate-400 pt-6">
      <div className="py-3 px-4 pl-5" alt="Pagina inicial">
        <button className="text-left pl-4 w-32 h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full">
          Página inicial
        </button>
      </div>

      <div className="py-3 px-4 pl-5" alt="Notificações">
        <button className="text-left pl-4 w-32 h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full">
          Notificações
        </button>
      </div>

      <div className="py-3 px-4 pl-5" alt="Explorar">
        <button className="text-left pl-4 w-32 h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full">
          Explorar
        </button>
      </div>

      <div className="py-3 px-4 pl-5" alt="Postar">
        <button className="text-left pl-4 w-32 h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full">
          Postar
        </button>
      </div>

      <div className="py-3 px-4 pl-5" alt="Perfil">
        <button className="text-left pl-4 w-32 h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full">
          Perfil
        </button>
      </div>
    </header>
  );
}

export default Navbar;
