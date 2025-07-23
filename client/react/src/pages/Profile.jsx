import { ArrowLeftCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

function Profile(){
  const navigate = useNavigate()
  function voltar () {
    navigate(-1)
  }
  const { username } = useParams()
    
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dap3hktkf"
    },
  }); 

  const myImage = cld.image(`${username}_icon`);


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
              style={{ cursor: "pointer" }}
            >
              <ArrowLeftCircle
                style={{ marginLeft: "4px", marginRight: "4px" }}
                size={20}
              />
              Voltar
            </button>
          </div>
          <div
            className="flex-1 flex flex-col items-center pt-8"
            alt="Div do conteudo do perfil"
          >
            <div
              className="relative h-[200px] w-[200px] pt-1"
              alt="Foto de perfil do usuário"
            >
              <AdvancedImage
                className="rounded-full object-cover border-2 border-black h-[200px] w-[200px]"
                cldImg={myImage}
              />
            </div>
            <h1 className="text-white text-2xl text-center mt-4">
              {username}
            </h1>
          </div>
        </div>
      </div>
    );
};

export default Profile;