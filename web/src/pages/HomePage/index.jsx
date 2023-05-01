import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom";
import { CaretDown, CaretUp, FacebookLogo, InstagramLogo, List, WhatsappLogo } from "phosphor-react";
import { RedirectTop } from "../../components/StickyNavigation/RedirectTop";
import { SocialMedia } from "../../components/StickyNavigation/SocialMedia";
import { Footer } from "../../components/Footer";
import { useState, forwardRef } from "react";
import clsx from "clsx";
import { Logo } from "../../components/Logo";
import * as Accordion from '@radix-ui/react-accordion'

export const navLinks = [
    {
        title: "Home",
        address: '/'
    },
    {
        title: "Planos",
        address: '/#plans'
    },
    {
        title: "Sobre nós",
        address: '/#aboutus'
    },
    {
        title: "Contato",
        address: '/#contact'
    },
]

const frequentAskedQuestions = [
    {
        title: "O que é Lutea?",
        answer: "O Lutea é uma aplicação desenvolvida para ajudar consultórios, especializados em ginecologia, na gestão de processos internos."
    },
    {
        title: "Como o Lutea pode ajudar meu consultório?",
        answer: "O Lutea contempla as principais funcionais para a gestão de seu consultório, tais como: controle de consultas/pacientes, emissão de documentos pertinentes ao atendimento. Além disso, o Lutea permite que gestores dos consultórios possam acompanhar o desempenho de seus colaboradores através de determinadas métricas."
    },
    {
        title: "Como funciona o pagamento?",
        answer: "Para ter acesso ao Lutea, é necessário realizar o processo de assinatura."
    },
    {
        title: "Quero cancelar. Como devo proceder?",
        answer: `Para cancelar sua assinatura, envie um e-mail para suporte@lutea.com.br para que possamos efetivar o cancelamento.`
    }
]

const planInfo = [
    {
        name: 'Básico',
        priceMonthly: 20.00,
        featureList: [
            {
                name: "Controle de Agendamentos"
            },
            {
                name: "Controle de Pacientes"
            },
            {
                name: "Emissão de documentos"
            },
            {
                name: "Relatórios administrativos"
            },
        ]
    },
    {
        name: 'Gold',
        priceMonthly: 30.00,
        featureList: [
            {
                name: "Controle de Agendamentos"
            },
            {
                name: "Controle de Pacientes"
            },
            {
                name: "Lembrete de agendamento"
            },
            {
                name: "Relatórios administrativos"
            },
            {
                name: "Futuras atualizações"
            }
        ]
    }
]


export function HomePage() {
    const [isFrequentAskedQuestionOpen, setIsFrequentAskedQuestionOpen] = useState(false)

    const toggleFrequentAskedQuestion = () => isFrequentAskedQuestionOpen == true ? setIsFrequentAskedQuestionOpen(false) : setIsFrequentAskedQuestionOpen(true)

    return (
        <>
            <Helmet>
                <title>Home Page | Lutea</title>
                <link rel="notImportant" href="https://www.chipotle.com" />
                <meta property="og:title" content="Home | Lutea" />
            </Helmet>

            <main className="overflow-hidden">
                <section className="py-4 px-20 flex justify-between items-center w-full gap-4">
                    <Logo />
                    <nav>
                        <ul className="flex gap-4" >
                            {
                                navLinks.map((item, acc) => (
                                    <li
                                        key={acc}
                                        className="border-b-2 border-transparent hover:border-pink-700 max-[500px]:hidden"
                                    >
                                        <a href={item.address}>
                                            {item.title}
                                        </a>
                                    </li>
                                ))
                            }
                            <li className="hidden max-[500px]:block max-[500px]:fixed max-[500px]:top-6 max-[500px]:right-4 max-[500px]:text-white max-[500px]:font-semibold max-[500px]:rounded-md max-[500px]:drop-shadow-sm bg-pink-700 px-2 py-2 max-[500px]:text-lg">
                                <Link to={'/'}>
                                    <List />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </section>
                <section className="py-10 flex px-28 items-center justify-evenly max-[500px]:pb-24 max-[500px]:px-6 max-[700px]:grid">
                    <div className="grid py-10 mr-10  max-[500px]:px-4 max-[500px]:mr-0 max-[500px]:py-4 ">
                        <h1 className="text-pink-700 font-bold text-3xl pb-3">Mulheres sempre em primeiro lugar</h1>
                        <span className="text-gray-400 max-[500px]:text-sm">Atenda suas pacientes com um app feito para a mulher</span>
                        <Link
                            to={"/"}
                            className="mt-8 py-3 px-6 font-semibold w-max border border-1 rounded border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white transition-colors"
                        >
                            Conheça o Lutea
                        </Link>
                    </div>
                    <div className="max-[500px]:scale-110 min-[800px]:scale-75 max-[500px]:pt-20">
                        <img
                            src="/pregnancy.svg"
                            alt="Mockup Demonstrativa - MacBook Pro 16" />
                    </div>
                </section>
                <section
                    className="py-16 grid px-28 items-center justify-between max-[500px]:flex-col max-[500px]:pb-16 max-[500px]:px-8 max-[500px]:justify-center max-[500px]:h-[220vh]">
                    <div>
                        <span className="text-gray-400 font-medium text-lg flex pt-16">Gestão de Qualidade</span>
                        <h2 className="text-pink-700 font-bold text-3xl py-4 w-3/4 max-[500px]:w-auto max-[500px]:pt-4  max-[500px]:">Otimize sua gestão com o Lutea</h2>
                        <span className="text-gray-400 font-regular text-base">O Lutea torna mais fácil seus controles.</span>
                    </div>
                    <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-x-3 pt-12">
                        <div className="px-4 pt-2 pb-2 border rounded-md shadow-md">
                            <h3 className="relative -top-10 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-pink-900">1</h3>
                            <h5 className="font-semibold text-base">Controle de Paciente</h5>
                            <p className="text-justify py-2 text-sm text-gray-500">O Lutea permite que um controle simples e otimizado de pacientes com acesso restrito a dados de suas pacientes.</p>
                        </div>
                        <div className="px-4 pt-2 pb-2 border rounded-md shadow-md">
                            <h3 className="relative -top-10 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-pink-900">2</h3>
                            <h5 className="font-semibold text-base">Controle de Consultas</h5>
                            <p className="text-justify py-2 text-sm text-gray-500">O Lutea possibilita uma visão de consultas em diferentes cenários, com isso a gestão torna-se mais prática.</p>
                        </div>
                        <div className="px-4 pt-2 pb-2 border rounded-md shadow-md">
                            <h3 className="relative -top-10 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-pink-900">3</h3>
                            <h5 className="font-semibold text-base">Emissão de documentos</h5>
                            <p className="text-justify py-2 text-sm text-gray-500">Papel nunca mais! Com o Lutea, os atestados e receituários médicos são gerados digitalmente.</p>
                        </div>
                    </div>
                </section>
                <section className="py-16 px-28 flex flex-col max-[500px]:py-0 max-[500px]:px-8" id="plans">
                    <div>
                        <span className="text-gray-400 font-medium text-lg">Conheça nossos planos</span>
                        <h2 className="text-pink-700 font-bold text-3xl pb-4 pt-2">Planos</h2>
                        <span className="text-gray-500 font-regular text-base">Confira, a seguir, os planos e veja qual atende melhor a necessidade de seu consultório</span>
                    </div>
                    <div className="w-full flex justify-between py-8 max-[500px]:py-4 max-[500px]:overflow-auto">
                        {
                            planInfo.map((plan, acc) => (
                                <section className="bg-gray-50 w-[48%] rounded p-8 max-[500px]:w-full max-[500px]:mr-6 max-[500px]:px-12 max-[500px]:py-4" key={acc}>
                                    <h3 className="font-semibold text-gray-600 text-xl text-center">{plan.name}</h3>
                                    <h2 className="font-bold text-2xl bg-pink-800 text-white text-center py-2 px-4 my-4 w-max m-auto rounded">
                                        {/*plan.priceMonthly.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })*/}
                                        Em breve
                                    </h2>
                                    <ul>
                                        {
                                            plan.featureList.map((feature, acc) =>
                                                <li className="border border-y-2 border-x-0 border-gray-200 py-4 last:border-b-0 text-gray-700 text-sm" key={acc}>
                                                    {feature.name}
                                                </li>
                                            )
                                        }
                                    </ul>
                                </section>
                            ))
                        }
                    </div>
                </section>
                <section className="py-16 px-28 flex flex-col max-[500px]:py-8 max-[500px]:px-8" id="aboutus">
                    <div>
                        <span className="text-gray-400 font-medium text-lg">Sobre Nós</span>
                        <h2 className="text-pink-700 font-bold text-3xl py-4">Nossa História</h2>
                        <span className="text-gray-500 font-regular text-base flex gap-1">Conheça um pouco mais da nossa história</span>
                    </div>
                    <div className="pt-6 flex">
                        <p className="text-justify">O Lutea é uma aplicação web que vem sendo desenvolvida desde 2023 por nossa equipe, com um <strong className="text-pink-700">próposito</strong>: entregar uma aplicação de qualidade à você para aprimorar continuamente a gestão dos processos de seu consultório.</p>
                    </div>
                </section>

                <section className="py-16 px-28 flex flex-col max-[500px]:py-8 max-[500px]:px-8">
                    <div>
                        <span className="text-gray-400 font-medium text-lg">Ajuda</span>
                        <h2 className="text-pink-700 font-bold text-3xl py-4">Perguntas Frequentes</h2>
                        <span className="text-gray-500 font-regular text-base">Confira, a seguir, os planos e veja qual atende melhor a necessidade de seu consultório</span>
                    </div>
                    <div className="py-6 grid gap-6">
                        {
                            frequentAskedQuestions.map((question, acc) => {
                                return (
                                    <AccordionDemo key={acc} title={question.title} answer={question.answer} />
                                )
                            }
                            )
                        }
                    </div>
                </section>
                <section className="py-16 px-28 flex flex-col max-[500px]:py-8 max-[500px]:px-8" id="contact">
                    <div>
                        <span className="text-gray-400 font-medium text-lg">Contato</span>
                        <h2 className="text-pink-700 font-bold text-3xl py-4">Fale Conosco</h2>
                        <span className="text-gray-500 font-regular text-base flex gap-1">Entre em contato conosco através de nossas redes sociais ou envie um e-mail para <address>suporte.lutea@lueta.com.br</address></span>
                    </div>
                    <ul className="py-6 flex gap-6">
                        <li className="flex rounded px-4 py-2 border text-pink-700 gap-2 hover:bg-pink-700 hover:text-white hover:border-pink-700 hover:font-medium transition-colors ">
                            <FacebookLogo size={24} />
                            Facebook
                        </li>
                        <li className="flex rounded px-4 py-2 border text-pink-700 gap-2 hover:bg-pink-700 hover:text-white hover:border-pink-700 hover:font-medium transition-colors ">
                            <InstagramLogo size={24} />
                            Instagram
                        </li>
                        <li className="flex rounded px-4 py-2 border text-pink-700 gap-2 hover:bg-pink-700 hover:text-white hover:border-pink-700 hover:font-medium transition-colors ">
                            <WhatsappLogo size={24} />
                            WhatsApp
                        </li>
                    </ul>
                </section>
                <Footer />
                <RedirectTop />
                <SocialMedia />
            </main>
        </>
    )
}

function AccordionDemo({ key, title, answer }) {
    return (
        <Accordion.Root className="rounded-md w-full shadow-sm gap-3 grid" type="single" defaultValue="item-1" collapsible>
            <Accordion.Item
                className="overflow-hidden mt-1 first:mt-0 rounded-t last:rounded-b focus-within:relative focus-within:z-[1] focus-within:shadow-sm"
                value={title}
                key={key}
            >
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
            </Accordion.Item>
        </Accordion.Root>
    )
}

const AccordionTrigger = forwardRef(({ children, className, ...props }, forwardedRef) => {
    return (
        <Accordion.Header className="flex">
            <Accordion.Trigger
                className={clsx('bg-pink-700 py-0 px-5 h-11 flex flex-1 items-center justify-between text-base leading-normal p-3 text-white font-medium shadow-sm', className)}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <CaretDown weight="bold" />
            </Accordion.Trigger>
        </Accordion.Header>
    )
})

const AccordionContent = forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={clsx('overflow-hidden text-base text-pink-700 text-justify', className)}
        {...props}
        ref={forwardedRef}
    >
        <div className="py-4 px-5">{children}</div>
    </Accordion.Content>
));