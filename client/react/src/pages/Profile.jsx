import { ArrowLeftCircle, Ellipsis} from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserDecode from "../components/useUserDecode";
import LoadingProfile from "../components/LoadingProfile";

function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postMenuAberto, setPostMenuAberto] = useState(null)  
  const [posts, setPosts] = useState(null)
  const navigate = useNavigate();
  const param = useParams()
  const { username } = useParams();
  const token = localStorage.getItem('token')
  const userToken = useUserDecode();

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dap3hktkf",
    },
  });


  const voltar = () => navigate(-1);

  //PEGAR AS INFORMAÇÕES QUE O USUARIO POSSUI
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/user/${username}`
        );
        setData(response.data);
        setLoading(false)
        setPosts(response.data.post)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  //DELETAR O POST SELECIONADO PELO USUARIO E ATUALIZAR O STATE DOS POSTS PARA ELE SUMIR
  function deletarPost(postID){
    axios.delete(`http://localhost:1000/api/delete/post/${postID}`, {
      headers: {
        'Authorization': token
      }
    })
    .then(() => {
      setPosts(posts.filter((post) => post.postID !== postID));
    })
    .catch(error => {
      console.log(error)
    })
  }

  //SEGUIR OU PARAR DE SEGUIR UM USUARIO
  function follow() {
    axios
      .put(`http://localhost:1000/api/follow/${username}`, 
        {},
        {
        headers: {
          'Authorization': token
        },
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (loading) {
    return <LoadingProfile voltar={voltar}/>
  }

  if (error) {
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
            <h1 className="text-white text-2xl text-center mt-4">Erro no servidor ou usuario {username} não existe!</h1>
          </div>
        </div>
      </div>
    );
  }

  //ATRIBUINDO OS DADOS REQUISITADOS PELA API 
  const seguidores = data.user.followers.length
  const seguindo = data.user.follows.length
  let followButton = false
  if (userToken !== param.username){
    followButton = true
  }
  const profilePicLink = data.user.user_icon;
  const user = data.user;
  const myImage = cld.image(`${username}_icon`);

  return (
    <div className="h-screen w-screen flex bg-slate-500 scroll-smooth">
      <Navbar />
      <div className="flex flex-col justify-between min-h-screen flex-1 transparent-scrollbar">
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
              className="rounded-full object-cover border-3 border-black h-[200px] w-[200px]"
              cldImg={myImage}
            />
          </div>
          <h1 className="text-white text-2xl text-center mt-4 pb-2">
            {user.username}
          </h1>
          <h2 className="text-white p-2">
            Seguidores: {seguidores} Seguindo: {seguindo}
          </h2>
          {followButton && (
            <button
              onClick={follow}
              className="cursor-pointer self-center px-4 py-2 w-32 bg-gray-200 text-black shadow-lg 
              rounded-[40px] transition-all duration-100 ease-in-out hover:rounded-[12px] hover:bg-gray-300 m-4"
            >
              Seguir
            </button>
          )}
          {posts
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((post) => {
              const date = new Date(post.created_at);
              const dataFormatada = isNaN(date)
                ? "Data inválida"
                : `${date.toLocaleDateString(
                    "pt-BR"
                  )} ${date.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`;

              return (
                <div
                  key={post.postID}
                  className="flex-1 flex items-center justify-center pb-2"
                >
                  <div
                    onClick={() => navigate(`/post/${post.postID}`)}
                    className="flex flex-col items-start border-2 border-slate-400 rounded-3xl p-4 hover:bg-slate-400/20 relative w-[700px] h-fit cursor-pointer"
                  >
                    <div className="absolute top-4 right-4">
                      <button
                        className="p-3 z-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPostMenuAberto(post.postID);
                        }}
                      >
                        <Ellipsis className="text-white hover:bg-gray-400/30 rounded-[10px]" />
                      </button>
                      {postMenuAberto === post.postID && (
                        <div className="absolute top-0 right-0 mt-2 mr-2 py-3 w-50 bg-white rounded-md shadow-xl z-10">
                          <a
                            onClick={(e) => {
                              e.stopPropagation();
                              deletarPost(post.postID);
                            }}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Deletar post
                          </a>
                          <a
                            onClick={(e) => {
                              e.stopPropagation();
                              setPostMenuAberto(null);
                            }}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Fechar
                          </a>
                        </div>
                      )}
                    </div>
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
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Profile;