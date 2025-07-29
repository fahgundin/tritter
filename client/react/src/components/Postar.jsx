import { useState, useRef, useEffect } from "react";
import { PenLine, X } from "lucide-react";
import { useForm } from "react-hook-form";

function Postar(){
    const [exibirDivPostar, setExibirDivPostar] = useState(false)
    const modalRef = useRef(null);
    const [eixibirPostEnviado, setExibirPostEnviado] = useState(false)
    let toggleDiv = () => {
        setExibirDivPostar(!exibirDivPostar);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            post: "",
        }
    })

    const token = localStorage.getItem("token");

    async function enviarContent(data) {
      try {
        const response = await fetch("https://tritter.onrender.com/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const resultado = await response.json();
        setExibirDivPostar(false);
        setExibirPostEnviado(true);
        
        return resultado;
      } catch (error) {
        console.error("Ocorreu um erro:", error);
        throw error;
      }
    }


    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setExibirDivPostar(false);
        }
      }

      if (exibirDivPostar) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [exibirDivPostar]);

    useEffect(() => {
      if (eixibirPostEnviado) {
        const timer = setTimeout(() => {
          setExibirPostEnviado(false);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }, [eixibirPostEnviado]);

    return (
      <div>
        <div className="py-3 px-4 pl-5" alt="Postar">
          <button
            onClick={toggleDiv}
            className="text-white text-left pl-4 w-[160px] h-10 hover:bg-slate-400 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-200 rounded-full flex items-center"
          >
            <PenLine style={{ marginRight: "8px" }} /> Postar
          </button>
        </div>
        {exibirDivPostar && (
          <div
            className="fixed top-0 left-0 w-screen h-screen flex justify-center pt-4 bg-black/30 z-50"
            onClick={() => setExibirDivPostar(false)}
          >
            <div
              ref={modalRef}
              className="bg-slate-500 h-fit w-[700px] p-8 rounded relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={toggleDiv}>
                <X className="text-white hover:text-black hover:bg-gray-300/30 rounded-full" />
              </button>
              <div className="">
                <form onSubmit={handleSubmit((data) => {
                        enviarContent(data)
                    })}
                >
                  <textarea
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    maxLength={255}
                    {...register("content", {
                      required: "Esse campo é obrigatório",
                      minLength: {
                        value: 1,
                        message: "Esse campo é obrigatório",
                      },
                    })}
                    id="content"
                    placeholder="O que está acontecendo?"
                    className="w-full h-fit placeholder-white/70 text-white resize-none overflow-hidden border border-gray-500 rounded-md 
                  focus:outline-none focus:ring-0 focus:border-transparent focus:bg-slate-400/30 text-[20px] hover:bg-slate-400/30"
                  ></textarea>
                  <p className="text-pink-400">{errors.content?.message}</p>
                  <button
                    type="submit"
                    className="cursor-pointer self-center px-4 py-2 w-32 bg-gray-200 text-black shadow-lg 
                    rounded-[40px] transition-all duration-100 ease-in-out hover:rounded-[12px] hover:bg-gray-300"
                  >
                    Postar
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {eixibirPostEnviado && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-white rounded-2xl px-6 py-2 shadow-lg">
              <h1 className="text-black">Post enviado com sucesso!</h1>
            </div>
          </div>
        )}
      </div>
    );   
}

export default Postar;