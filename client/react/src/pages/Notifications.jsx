import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import LoadingNotifications from "../components/LoadingNotifications";

function Notifications() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAndMarkNotifications = async () => {
      try {
        // 1. Buscar notificações não lidas
        const unreadResponse = await axios.get(
          "https://tritter.onrender.com/api/withoutread/getnotifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const unreadNotifications = unreadResponse.data;

        // 2. Marcar como lidas (mesmo que não envie dados no body)
        await axios.get(
          "https://tritter.onrender.com/api/getnotifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 3. Atualizar estado com as notificações recebidas
        setData(unreadNotifications);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAndMarkNotifications();
  }, [token]);

  if (loading) {
    return <LoadingNotifications />;
  }

  if (error) return <div>Erro ao carregar notificações.</div>;

  console.log(data);

  return (
    <div className="h-screen w-screen flex bg-slate-500">
      <Navbar />
      <div className="p-6">
        {data && data.length > 0 ? (
          data
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((notification) => {
              const date = new Date(notification.created_at);
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
                  key={notification.notificationID}
                  className="mb-4 h-fit w-[600px] border-2 border-slate-400 rounded-2xl p-4 text-white"
                >
                  <p>{notification.content}</p>
                  <p className="text-sm text-slate-300 mt-2">{dataFormatada}</p>
                </div>
              );
            })
        ) : (
          <div className="text-white">Nenhuma notificação não lida.</div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
