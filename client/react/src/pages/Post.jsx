import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingProfile from "../components/LoadingProfile";
import { ArrowLeftCircle } from "lucide-react";

function Post() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()
  const voltar = () => navigate(-1);
  const paraPerfil = () => navigate(`/user/${userName}`)

  useEffect(() => {
    let timeoutId;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        timeoutId = setTimeout(() => {
          setError(new Error("Tempo limite excedido ao buscar o post."));
          setLoading(false);
        }, 10000);

        const response = await axios.get(`http://localhost:1000/post/${id}`);
        clearTimeout(timeoutId);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        clearTimeout(timeoutId);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
    return () => clearTimeout(timeoutId);
  }, [id]);
  

  if (loading) {
    return <LoadingProfile voltar={voltar} />
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex bg-slate-500">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex h-[500px] w-[500px]  justify-center ">
            <h1 className="text-white flex items-center text-2xl">{error.message}</h1>
          </div>
        </div>
      </div>
    );
  }

  const isoDateString = data.post.created_at;
  const timeStamp = Date.parse(isoDateString);
  const date = new Date(timeStamp)
  const dataFormatada = date.toLocaleDateString('pt-BR')
  const horaFormatada = date.toLocaleTimeString('pt-BR')
  const dadosPost =  data.post.content
  const profilePicLink = data.user.user_icon;
  const userName = data.user.username;
  

return (
  <div className="h-screen w-screen flex bg-slate-500">
    <div className="h-full border-r border-slate-400">
      <Navbar />
    </div>

    <div className="flex flex-col w-full">
      <div className="h-[40px] border-b border-slate-400 px-4 flex items-center">
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

      <div className="flex-1 flex items-center justify-center overflow-y-auto">
        <div className="flex flex-col items-start h-fit w-[700px] border-2 border-slate-400 rounded-3xl p-4 mt-4">
          <div className="flex items-center mb-4">
            <img
              src={profilePicLink}
              alt="Profile picture"
              className="h-12 w-12 rounded-full object-cover border-2"
            />
            <h1
              className="text-white pl-[10px] h-fit w-fit cursor-pointer hover:text-[20px] hover:text-sky-400 transition-all"
              onClick={paraPerfil}
            >
              {userName}
            </h1>
          </div>
          <div className="w-full mb-4">
            <h2 className="mt-2 text-white w-full">{dadosPost}</h2>
          </div>
          <div>
            <h3 className="text-white">
              {dataFormatada} às {horaFormatada}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};


export default Post;