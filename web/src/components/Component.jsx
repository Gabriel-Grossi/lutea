import { useState, useEffect } from 'react'

export function Component() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [matches, setProducts] = useState([]);


    useEffect(() => {
        fetch("http://127.0.0.1:3030/product")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProducts(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (!isLoaded) {
        return "Deu ruim"
    }
    else {

        return (
            <div>
                {
                    matches.map(match => (
                        <p key={match._id}>
                            {match.title}
                        </p>
                    ))
                }

            </div>
        )
    }
}
