import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";


function PageNotFound() {
  const navigate = useNavigate();
  const paraHome = () => navigate('/');

  return (
    <div className="bg-slate-500 h-screen w-screen flex flex-col justify-center items-center">
      <h1
        onClick={paraHome}
        className="text-white cursor-pointer flex items-center text-2xl gap-2"
      >
        Erro 404. Página não encontrada. <CircleX />
      </h1>
    </div>
  );
}

export default PageNotFound;