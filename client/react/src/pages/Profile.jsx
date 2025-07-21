import { ArrowLeftCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

function Profile(){
  const navigate = useNavigate()
  function voltar () {
    navigate(-1)
  }
    
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dap3hktkf"
    },
  }); 

  const myImage = cld.image("arthurteste_icon");


    return (
      <div className="h-screen w-screen flex bg-slate-500">
        <Navbar />
        <div className="flex flex-col justify-between min-h-screen flex-1">
          <div
            className="border-b border-slate-400 h-[40px] w-full flex items-center px-4"
            alt="Barra para o botão de voltar"
          >
            <button
              onClick={voltar}
              className="text-white flex items-center text-[18px] hover:underline focus:outline-none"
              style={{ cursor: 'pointer' }}
            >
              <ArrowLeftCircle
                style={{ marginLeft: "4px", marginRight: "4px" }}
                size={20}
              />
              Voltar
            </button>
          </div>
          <div className="flex-1" alt="Div do conteudo do perfil">
            <div className="rounded-full h-[150px] w-[150px] border-black" alt="Foto de perfil do usuário">
              <AdvancedImage className="rounded-full object-cover border border-black" cldImg={myImage} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;