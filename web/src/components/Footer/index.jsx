import { navLinks } from "../../pages/HomePage";
import { Logo } from "../Logo";

export function Footer() {
    return (
        <footer className="w-full bg-pink-200 py-4 px-32 max-[500px]:py-0 max-[500px]:px-8">
            <section className="flex justify-between max-[500px]:grid max-[500px]:gap-4">
                <div className="flex flex-col text-left text-pink-800">
                    <div>
                        <Logo />
                    </div>
                    <p className="pt-5">Rua Borges de Figueiredo, 510 - Mooca, São Paulo(SP)</p>
                </div>
                <ul className="grid">
                    {
                        navLinks.map((item, acc) => (
                            <li
                                key={acc}
                                className="text-pink-700"
                            >
                                {item.title}
                            </li>
                        ))
                    }
                </ul>
            </section>
        </footer>
    )
}