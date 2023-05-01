import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { api } from "../../lib/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { api } from "../../lib/axios";

export function LoginPage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function authenticateUser(event) {
        event.preventDefault()
        try {
            await api.post("/user", { email, password })
                .then(res => {
                    if (res.data == "sec") {
                        navigate('/menu/secretary')
                    }
                    else if (res.data == "doc") {
                        navigate('/menu/doctor')
                    }
                    else if (res.data == "mgmt") {
                        navigate('/ManagementDashboard')
                    }
                })
        }
        catch (e) {
            toast.error('Credenciais Inválidas')
            //navigate('/404')
        }
    }
    useEffect(() => {
        setIsLoaded(true)
        setError(error)
    })
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div className="flex flex-col justify-center h-screen items-center">
                <ThreeDots
                    height="160"
                    width="160"
                    radius="9"
                    color="#be185d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
                <h2 className="font-semibold text-lg text-pink-700">Carregando...</h2>
            </div>
        )
    } else {
        return (
            <>
                <Helmet>
                    <title>Login | Lutea</title>
                </Helmet>
                <main className="w-screen flex ">
                    <div className="max-md:w-full w-1/4 grid p-8  h-screen bg-white">
                        <Logo />
                        <form action="POST" className="flex flex-col gap-6">
                            <span className="py-4">Preencha os campos abaixo para acessar o Lutea</span>
                            <div className="grid" >

                                <label
                                    className="font-medium pb-2 after:content-['*'] after:pl-1 after:text-pink-700"
                                    htmlFor="userEmail">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Ex: exemplo@dominio.com"
                                    className="outline outline-1 text-sm outline-pink-200 px-4 py-2 text-gray-500 rounded-sm w-full placeholder:text-sm focus-within:invalid:border-b-2 focus-within:invalid:border-b-red-600 focus-within:valid:border-b-2 focus-within:valid:border-b-green-500"
                                    pattern="^[a-z0-9.]+@[a-z0-9]+\.[a-z]+"
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="grid" >

                                <label
                                    className="font-medium pb-2 after:content-['*'] after:pl-1 after:text-pink-700"
                                    htmlFor="userAuth">Senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Informe sua senha"
                                    className="outline outline-1 text-sm outline-pink-200 px-4 py-2 text-gray-500 rounded-sm w-full placeholder:text-sm "
                                    onChange={(event) => setPassword(event.target.value)}
                                    pattern="^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$"
                                    autoComplete='off'
                                    required
                                />

                            </div>
                            <input
                                type="submit"
                                onClick={authenticateUser}
                                className="bg-pink-700 px-4 py-2 font-medium text-white rounded w-max cursor-pointer focus:ring-pink-500 focus:outline-1 focus:outline-pink-500"
                                value={'Fazer Login'}
                            />
                        </form>
                    </div>
                    <div className="max-md:hidden lg: p-8 w-3/4 h-screen bg-pink-600 justify-center flex">
                        <section className="grid items-center justify-center h-full w-2/4 ">
                            {
                                /*
                                                            <div className="bg-pink-900 p-8 gap-4 grid text-white rounded drop-shadow-2xl">
                                                                <h1 className="font-bold text-3xl">v 1.0</h1>
                                                                <p className="pt-6">No dia XXX será lançada a primeira estável versão do Lutea. Confira a seguir as funcionalidades que serão contempladas:</p>
                                                                <ul className="pl-4 list-disc text-sm">
                                                                    <li>Controle de agendamentos</li>
                                                                    <li>Controle de pacientes</li>
                                                                    <li>1 Dashboard de gestão</li>
                                                                    <li>Emissão de documentos</li>
                                                                </ul>
                                                            </div>
                                                            */
                            }
                        </section>
                    </div>
                </main>
                <ToastContainer />

            </>
        )
    }
}