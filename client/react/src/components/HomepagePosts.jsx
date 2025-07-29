import { useState, useEffect } from "react";
import axios from "axios";
import LoadingHome from "./LoadingHome";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

function HomepagePost() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/getfollowingposts",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchHomeData();
  }, [token]);

  if (loading) return <LoadingHome />;
  if (error) return <div>Erro ao carregar posts.</div>;
  if (!Array.isArray(data) || data.length === 0)
    return <div>Nenhum post encontrado.</div>;

  return (
    <div className="p-6">
      {data
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((post) => {
          const date = new Date(post.created_at);
          const dataFormatada = isNaN(date)
            ? "Data inválida"
            : `${date.toLocaleDateString("pt-BR")} ${date.toLocaleTimeString(
                "pt-BR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}`;

          return (
            <div
              key={post.postID}
              className="flex-1 flex items-center justify-center overflow-y-auto pb-2"
            >
              <div
                onClick={() => navigate(`/post/${post.postID}`)}
                className="flex flex-col items-start border-2 border-slate-400 rounded-2xl p-4 hover:bg-slate-400/20 relative w-[700px] h-fit cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={post.users?.user_icon || User}
                    alt="Profile picture"
                    className="h-12 w-12 rounded-full object-cover border-2"
                  />
                  <h1 className="text-white pl-[10px] h-fit w-fit">
                    {post.users.username}
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
  );
}

export default HomepagePost;
