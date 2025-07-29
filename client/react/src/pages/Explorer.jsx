import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Explorer() {
  const [searchItem, setSearchItem] = useState("");
  const [data, setData] = useState({ users: [], posts: [] });
  const [error, setError] = useState(null);
  const [enterPressed, setEnterPressed] = useState(false);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setSearchItem(e.target.value);
    setEnterPressed(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEnterPressed(true);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (searchItem.trim() === "") {
        setData({ users: [], posts: [] });
        return;
      }

      try {
        const res = await axios.get(
          `https://tritter.onrender.com/search/${encodeURIComponent(searchItem)}`
        );

        setData({
          users: res.data.users,
          posts: enterPressed ? res.data.posts : [],
        });
      } catch (err) {
        setError(err);
      }
    };

    const delay = setTimeout(fetchResults, 300);

    return () => clearTimeout(delay);
  }, [searchItem, enterPressed]);

  if (error) return <p className="text-red-500">Erro: {error.message}</p>;
  console.log(data)

  return (
    <div className="h-screen w-screen bg-slate-500 flex">
      <Navbar />
      <div className="flex-1 flex flex-col items-center mt-10 relative">
        <div className="w-[500px]">
          <input
            type="text"
            placeholder="Buscar"
            value={searchItem}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
            className="p-4 bg-slate-400 h-[70px] w-[500px] rounded-full text-2xl text-white placeholder-white/60 outline-none"
          />

          {data.users.length > 0 && (
            <div className="absolute top-[80px] w-[500px] bg-slate-600 rounded-xl shadow-lg z-10">
              {data.users.map((user) => (
                <div
                  key={user.userID}
                  onClick={() => navigate(`/user/${user.username}`)}
                  className="p-4 border-b border-slate-500 text-white hover:bg-slate-700 hover:rounded-2xl cursor-pointer flex items-center gap-3"
                >
                  <img
                    src={user.user_icon}
                    alt="Imagem do usuario"
                    className="object-cover h-[30px] w-[30px] rounded-full"
                  />
                  <p className="font-semibold">{user.username}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {enterPressed && data.posts.length > 0 && (
          <div className="mt-[150px] w-[500px] text-white">
            <h2 className="text-xl font-semibold mb-2">Posts</h2>
            {data.posts.map((post) => (
              <div
                key={post.postID}
                className="p-4 border border-white/40 rounded-xl mb-2 cursor-pointer hover:bg-slate-400/30"
                onClick={() => navigate(`/post/${post.postID}`)}
              >
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explorer;
