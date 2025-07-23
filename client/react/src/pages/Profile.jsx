import { ArrowLeftCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dap3hktkf",
    },
  });

  const voltar = () => navigate(-1);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/user/${username}`
        );
        setData(response.data);
        setLoading(false)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (loading) {
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
          <div className="flex-1 flex flex-col items-center pt-8">
            <h1 className="text-white text-2xl text-center mt-4">{username}</h1>
            <h2 className="text-white">Carregando perfil...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">Erro ao carregar: {error.message}</div>
    );
  }

  
  let dataFormatada = "";
  if (data && data.post && data.post.length > 0) {
    const isoDateString = data.post[0].created_at;
    const timeStamp = Date.parse(isoDateString);
    const date = new Date(timeStamp);
    dataFormatada = date.toLocaleDateString("pt-BR");
  }
  const user = data.user;
  const posts = data.post;
  const profilePicLink = data.user.user_icon;
  const myImage = cld.image(`${username}_icon`);


  return (
    <div className="h-screen w-screen flex bg-slate-500 scroll-smooth">
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

        <div className="flex-1 flex flex-col items-center pt-8 overflow-y-auto">
          <div className="relative h-[200px] w-[200px] pt-1">
            <AdvancedImage
              className="rounded-full object-cover border-2 border-black h-[200px] w-[200px]"
              cldImg={myImage}
            />
          </div>
          <h1 className="text-white text-2xl text-center mt-4 pb-2">
            {user.username}
          </h1>
          {posts.map((post) => (
            
            <div key={post.postID} className="flex-1 flex items-center justify-center pb-2 cursor-pointer" onClick={() => {
              navigate(`/post/${post.postID}`);
            }}>
              <div className="flex flex-col items-start h-[fit] w-[700px] border-2 border-slate-400 rounded-3xl p-4">
                <div className="flex items-center mb-4">
                  <img
                    src={profilePicLink}
                    alt="Profile picture"
                    className="h-12 w-12 rounded-full object-cover border-2"
                  />
                  <h1 className="text-white pl-[10px] h-fit w-fit">
                    {username}
                  </h1>
                </div>
                <div className="w-full mb-4">
                  <h2 className="mt-2 text-white w-full">{post.content}</h2>
                </div>
                <div>
                  <h3 className="text-white">{dataFormatada}</h3>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Profile;