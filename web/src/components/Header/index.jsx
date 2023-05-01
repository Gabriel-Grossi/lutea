import { SignOut } from "phosphor-react";
import { Link } from "react-router-dom";
import { Logo } from "../Logo";

export function Header() {
    return (
        <section className="flex justify-between items-center">
            <Logo />
            <Link 
                to={'/Login'}
                className="flex bg-pink-700 w-max h-max px-4 py-2 rounded text-white gap-2 items-center font-semibold"
                >
                <SignOut weight="bold"/>
                Fazer Logoff
            </Link>
        </section>
    )
}