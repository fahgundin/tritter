import { useForm } from "react-hook-form";

export default function Cadastro() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    });


    
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-gray-600 w-80 h-96 rounded flex items-center justify-center shadow-lg">
          <form
            action="/signup"
            method="post"
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
                  message: "O tamanho minimo de caractéres é 8",
                },
                passwordMessage: "O tamanho mínimo de caractéres é 2",
              })}
              id="password"
              placeholder="Insira sua senha"
              className="w-full text-white bg-transparent ring-1 ring-gray-400 focus:ring-2 focus:ring-blue-400 outline-none rounded-full px-4 py-2 placeholder-white"
            />
            <p className="text-pink-400">{errors.password?.message}</p>
            <button
              type="submit"
              className="px-4 py-2 w-30 bg-gray-200 rounded-full text-black shadow-lg"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    );
}

  

