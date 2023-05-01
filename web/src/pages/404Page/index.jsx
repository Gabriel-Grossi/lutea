import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";

export function NotFoundPage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

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
                    <title>Página não encontrada | Lutea</title>
                </Helmet>
                <main className="h-screen w-full flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-6xl font-bold text-pink-700">404</h1>
                    <span>Página não encontrada</span>
                </main>
            </>

        )
    }

}