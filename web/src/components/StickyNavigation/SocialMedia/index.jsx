import { FacebookLogo, InstagramLogo, Phone, WhatsappLogo } from "phosphor-react";

export function SocialMedia() {
    return (
        <section className="fixed top-1/3 bg-pink-700 rounded-r-lg grid gap-2 p-1 max-[500px]:hidden">
            <FacebookLogo size={40} weight='regular' color='white' />
            <InstagramLogo size={40} weight='regular' color='white' />
            <WhatsappLogo size={40} weight='regular' color='white' />
            <Phone size={40} weight='regular' color='white'/>
        </section>
    )
}