import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function enviarDados(data) {
    try {
      
      const response = await fetch("http://localhost:1000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
        ,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const resultado = await response.json();
      console.log("Resposta da API:", resultado);
      return resultado;
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      throw error;
    }
  }


  const navigate = useNavigate();
  const paraLogin = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen w-screen bg-slate-500">
      <div className="h-screen flex items-center justify-center">
        <div className="bg-gray-600 w-80 h-[420px] py-6 px-4 rounded flex flex-col items-center justify-center shadow-lg">
          <form
            onSubmit={handleSubmit((data) => {
              enviarDados(data);
            })}
            className="flex flex-col space-y-4 w-full"
          >
            <input
              type="text"
              maxLength={15}
              {...register("username", {
                required: "O campo é obrigatório",
                minLength: {
                  value: 2,
                  message: "O tamanho mínimo de caracteres é 2",
                },
              })}
              id="username"
              placeholder="Insira seu nome de usuário"
              className="w-full text-white bg-transparent ring-1 ring-gray-400 focus:ring-2 focus:ring-blue-400 outline-none rounded-full px-4 py-2 placeholder-white"
            />
            <p className="text-pink-400">{errors.username?.message}</p>

            <input
              type="email"
              {...register("email", {
                required: "O campo é obrigatório",
                message: "O email digitado não é válido",
              })}
              id="email"
              placeholder="Insira seu email"
              className="w-full text-white bg-transparent border border-gray-400 focus:border-blue-400 invalid:border-pink-500 invalid:text-pink-500 focus:invalid:border-pink-500 outline-none rounded-full px-4 py-2 placeholder-white"
            />
            <p className="text-pink-400">{errors.email?.message}</p>

            <input
              type="password"
              {...register("password", {
                required: "O campo é obrigátorio",
                minLength: {
                  value: 8,
                  message: "O tamanho minimo de caracteres é 8",
                },
              })}
              id="password"
              placeholder="Insira sua senha"
              className="w-full text-white bg-transparent ring-1 ring-gray-400 focus:ring-2 focus:ring-blue-400 outline-none rounded-full px-4 py-2 placeholder-white"
            />
            <p className="text-pink-400">{errors.password?.message}</p>

            <button
              type="submit"
              className="cursor-pointer self-center px-4 py-2 w-32 bg-gray-200 text-black shadow-lg 
              rounded-[40px] transition-all duration-100 ease-in-out hover:rounded-[12px] hover:bg-gray-300"
            >
              Cadastrar
            </button>
          </form>
          <a
            onClick={paraLogin}
            className="mt-4 self-center w-max whitespace-nowrap text-sky-400 relative hover:text-blue-100 cursor-pointer transition-colors duration-300
              after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-blue-100 after:transition-all after:duration-300 after:w-0 hover:after:w-full"
          >
            Já possui cadastro? Faça login!
          </a>
        </div>
      </div>
    </div>
  );
}
