import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const navigate = useNavigate();
      const paraSignUp = () => {
        navigate('/signup');
      }
    
    return (
      <div className="h-screen w-screen bg-slate-500">
        <div className="h-screen flex items-center justify-center">
          <div className="bg-gray-600 w-80 h-[384px] py-6 rounded flex flex-col items-center justify-center shadow-lg">
            <form
              className="flex flex-col space-y-4 w-full px-6"
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
              <input
                type="text"
                maxLength={15}
                {...register("username", {
                  required: "O campo é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O tamanho mínimo de caractéres é 2",
                  },
                })}
                id="username"
                placeholder="Insira seu nome de usuário"
                className="w-full text-white bg-transparent ring-1 ring-gray-400 focus:ring-2 focus:ring-blue-400 outline-none rounded-full px-4 py-2 placeholder-white"
              />
              <p className="text-pink-400">{errors.username?.message}</p>

              <input
                type="password"
                {...register("password", {
                  required: "O campo é obrigátorio",
                  minLength: {
                    value: 8,
                    message: "O tamanho minimo de caractéres é 8",
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
                Entrar
              </button>
            </form>

            <a
              onClick={paraSignUp}
              className="mt-4 text-sky-400 relative hover:text-blue-100 cursor-pointer transition-colors duration-300
             after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-blue-100 after:transition-all after:duration-300 hover:after:w-full"
            >
              Não possui cadastro? Faça agora!
            </a>
          </div>
        </div>
      </div>
    );
}

  

