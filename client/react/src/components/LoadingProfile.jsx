import Navbar from "./Navbar"
import { ArrowLeftCircle, User } from "lucide-react";

function LoadingProfile({voltar}){
    return (
      <div className="h-screen w-screen flex bg-slate-500">
        <Navbar />
        <div className="flex flex-col justify-between min-h-screen flex-1">
          <div className="border-b border-slate-400 h-[40px] w-full flex items-center px-4">
            <button
              onClick={voltar}
              className="text-white flex items-center text-[18px] hover:underline focus:outline-none"
            >
              <ArrowLeftCircle
                style={{ marginLeft: "4px", marginRight: "4px" }}
                size={20}
              />
              Voltar
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center animate-pulse">
            <div className="flex flex-col items-start h-[fit] w-[700px] border-2 border-slate-400 rounded-3xl p-4">
              <div className="flex items-center mb-4">
                {/* <img
                  src={User}
                  alt="Profile picture"
                  className="h-12 w-12 rounded-full object-cover border-2 pr-2"
                /> */}
                <User className="h-12 w12 rounded-full object-cover border-2 pr-2" size={48}/>
                <div className="bg-gray-400 pl-[15px] h-[20px] w-[100px] rounded-2xl" alt="Username pulse"></div>
              </div>
              <div className="bg-gray-400 h-[15px] w-[400px] rounded-2xl" alt="PostContent">
              </div>
              <div>
                <h3 className="text-white">
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoadingProfile;