import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/Header";
import { SecretaryFloatingMenu } from "../../components/SecretaryFloatingMenu";
import { api } from "../../lib/axios";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const brazilianStates = [
    {
        value: "#",
        label: "#"
    },
    {
        value: "AC",
        label: "AC"
    },
    {
        value: "AL",
        label: "AL"
    },
    {
        value: "AM",
        label: "AM"
    },
    {
        value: "AP",
        label: "AP"
    },
    {
        value: "BA",
        label: "BA"
    },
    {
        value: "CE",
        label: "CE"
    },
    {
        value: "DF",
        label: "DF"
    },
    {
        value: "ES",
        label: "ES"
    },
    {
        value: "GO",
        label: "GO"
    },
    {
        value: "MA",
        label: "MA"
    },
    {
        value: "MG",
        label: "MG"
    },
    {
        value: "MS",
        label: "MS"
    },
    {
        value: "MT",
        label: "MT"
    },
    {
        value: "PA",
        label: "PA"
    },
    {
        value: "PB",
        label: "PB"
    },
    {
        value: "PE",
        label: "PE"
    },
    {
        value: "PI",
        label: "PI"
    },
    {
        value: "PR",
        label: "PR"
    },
    {
        value: "RJ",
        label: "RJ"
    },
    {
        value: "RN",
        label: "RN"
    },
    {
        value: "RO",
        label: "RO"
    },
    {
        value: "RS",
        label: "RS"
    },
    {
        value: "RR",
        label: "RR"
    },
    {
        value: "SC",
        label: "SC"
    },
    {
        value: "SE",
        label: "SE"
    },
    {
        value: "SP",
        label: "SP"
    },
    {
        value: "TO",
        label: "TO"
    }
]

const availableMedicalInsurance = [
    {
        value: 'Amil',
        label: 'Amil'
    },
    {
        value: 'Bradesco Saúde',
        label: 'Bradesco Saúde'
    },
    {
        value: 'NotreDame Intermédica',
        label: 'NotreDame Intermédica'
    },
    {
        value: 'Sul América',
        label: 'Sul América'
    },
    {
        value: 'Trasmontano',
        label: 'Trasmontano'
    }
]

export function AddPatient() {
    const [patientName, setPatientName] = useState('')
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState()
    const [phone, setPhone] = useState('')
    const [partialAddress, setPartialAddress] = useState('')
    const [complement, setComplement] = useState('')
    const [number, setNumber] = useState(0);
    const [neighborhood, setNeighborhood] = useState('')
    const [brazilianState, setBrazilianState] = useState()
    const [city, setCity] = useState('')
    const [medicalInsurance, setMedicalInsurance] = useState()

    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [cep, setCep] = useState();

    const inputRG = useRef();
    const inputCPF = useRef();
    const inputCEP = useRef();

    const address = `${partialAddress},${number} - ${complement} - ${neighborhood}, ${city}, ${brazilianState}`

    const handleMaskCPFChange = () => {
        const cpfValue = inputCPF.current.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);

        inputCPF.current.value = !cpfValue[2] ? cpfValue[1] :
            `${cpfValue[1]}.${cpfValue[2]}${`${cpfValue[3] ? `.${cpfValue[3]}` : ''}`}${`${cpfValue[4] ? `-${cpfValue[4]}` : ''}`}`;

        const numbers = inputCPF.current.value.replace(/(\D)/g, '');
        setCpf(numbers);
    };
    const handleMaskRGChange = () => {
        const rgValue = inputRG.current.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,1})/);

        inputRG.current.value = !rgValue[2] ? rgValue[1] :
            `${rgValue[1]}.${rgValue[2]}${`${rgValue[3] ? `.${rgValue[3]}` : ''}`}${`${rgValue[4] ? `-${rgValue[4]}` : ''}`}`;

        const numbers = inputRG.current.value.replace(/(\D)/g, '');
        setRg(numbers);
    };
    const handleMaskCEPChange = () => {
        const cepValue = inputCEP.current.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);

        inputCEP.current.value = !cepValue[2] ? cepValue[1] :
            `${cepValue[1]}-${cepValue[2]}`;

        const numbers = inputCEP.current.value.replace(/(\D)/g, '');
        setCep(numbers);
    };


    async function addPatient(event) {
        event.preventDefault()
        if (patientName == '') {
            return 'Algo deu errado';
        }
        try {
            await api.post('/patient', {
                patientName,
                email,
                birthday,
                phone,
                address,
                cep,
                cpf,
                rg,
                medicalInsurance

            }).then((response) => {
                console.log(response)
                setPatientName('')
                setBirthday(new Date())
                setEmail('')
                setPhone('')
                setPartialAddress('')
                setComplement('')
                setNumber(0)
                setNeighborhood('')
                setBrazilianState('Selecione o tipo de consulta')
                setCpf()
                setRg()
                setCep()
                setMedicalInsurance('Selecione o tipo de convênio')
                toast.success('Paciente cadastrada com sucesso');
            })
        }
        catch (e) {
            toast.error('Erro ao agendar');
            toast.error(`${e}`);
        }

    }


    useEffect(() => {
        handleMaskCPFChange();
        handleMaskRGChange();
        handleMaskCEPChange();
    }, [cpf, rg, cep]);

    return (
        <>
            <Helmet>
                <title>Adicionar Paciente | Lutea</title>
            </Helmet>
            <main className="px-16 py-6">
                <Header />
                <div className="2xl:py-32 xl:py-16 lg:py-8 gap-2 grid">
                    <h1 className="font-bold text-pink-700 text-4xl">Adicionar Paciente</h1>
                    <span className="text-gray-500">Preencha os campos a seguir para cadastrar uma paciente.</span>
                </div>
                <form onSubmit={addPatient}>
                    <div className="grid grid-cols-22 gap-5">
                        <div className="grid">
                            <label htmlFor="nome">Nome do Paciente</label>
                            <input
                                type="text"
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                name="patientName"
                                id="patientName"
                                placeholder="Insira o nome do paciente"
                                autoFocus
                                value={patientName}
                                onChange={event => setPatientName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="grid">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                name="email"
                                id="email"
                                placeholder="Insira o nome do paciente"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                required />
                        </div>
                        <div className="grid">
                            <label htmlFor="birthday">Data de Nascimento</label>
                            <input
                                type="date"
                                className="outline outline-1 outline-pink-200 px-4 py-2 text-gray-500 rounded-sm"
                                name="birthday"
                                id="birthday"
                                value={birthday}
                                onChange={(event) => setBirthday(event.target.value)}
                                required />
                        </div>
                        <div className="grid">
                            <label htmlFor="phone">Telefone</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                placeholder="Insira o seu nº de telefone"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                required />
                        </div>
                        <div className="grid">
                            <label htmlFor="address">Logradouro</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                placeholder="Insira o logradouro"
                                value={partialAddress}
                                onChange={(event) => setPartialAddress(event.target.value)}
                                required />
                        </div>
                        <div className="grid">
                            <label htmlFor="complement">Complemento</label>
                            <input
                                type="text"
                                name="complement"
                                id="complement"
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                placeholder="Insira o complemento"
                                value={complement}
                                onChange={(event) => setComplement(event.target.value)}
                                required />
                        </div>
                        <div className="grid">
                            <label htmlFor="number">Número</label>
                            <input
                                type="number"
                                name="number"
                                id="number"
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                placeholder="Insira o número"
                                value={number}
                                onChange={(event) => setNumber(event.target.value)}
                                required />
                        </div>
                        <div className="grid">
                            <label htmlFor="cep">CEP</label>
                            <input
                                type="text"
                                name="cep"
                                id="cep"
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                placeholder="Insira o CEP"
                                ref={inputCEP}
                                maxLength={9}
                                required />
                        </div>
                        <div className="grid">
                            <label htmlFor="neighborhood">Bairro</label>
                            <input
                                type="text"
                                name="neighborhood"
                                id="neighborhood"
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                placeholder="Insira o bairro"
                                value={neighborhood}
                                onChange={(event) => setNeighborhood(event.target.value)}
                                required />
                        </div>
                        <div className="grid">
                            <label htmlFor="uf">UF</label>
                            <Select
                                isClearable={false}
                                className="focus:ring-1 focus:ring-pink-700 text-sm"
                                classNamePrefix="select"
                                defaultValue='Selecione o tipo de consulta'
                                name="uf"
                                id="uf"
                                options={brazilianStates}
                                onChange={(state) => setBrazilianState(state.value)}
                                required
                            ></Select>
                        </div>
                        <div className="grid">
                            <label htmlFor="cidade">Cidade</label>
                            <input
                                type="text"
                                name="cidade"
                                id="cidade"
                                maxLength={40}
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                placeholder="Insira a cidade"
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                                required />
                        </div>
                        <div className="grid">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                type="text"
                                name="cpf"
                                id="cpf"
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                placeholder="Insira o CPF"
                                required
                                ref={inputCPF}
                                value={cpf}
                                onChange={handleMaskCPFChange}
                            />
                        </div>
                        <div className="grid">
                            <label htmlFor="rg">RG</label>
                            <input
                                type="text"
                                name="rg"
                                id="rg"
                                className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm text-sm"
                                placeholder="Insira o seu RG"
                                ref={inputRG}
                                value={rg}
                                onChange={
                                    (e) => {
                                        handleMaskRGChange
                                        setRg(e.target.value)
                                    }}
                                required
                            />
                        </div>
                        <div className="grid">
                            <label htmlFor="medicalInsurance">Convênio Médico</label>
                            <Select
                                isClearable={false}
                                className="focus:ring-1 focus:ring-pink-700 text-sm"
                                classNamePrefix="select"
                                defaultValue='Selecione o tipo de consulta'
                                name="medicalInsurance"
                                id="medicalInsurance"
                                options={availableMedicalInsurance}
                                onChange={(state) => setMedicalInsurance(state.value)}
                                required
                            ></Select>
                        </div>
                    </div>
                    <div className="flex gap-4 py-8">

                        <button
                            type="submit"
                            id="scheduleMedAppointment"
                            onClick={() => console.log(new Date())}
                            className="bg-pink-700 px-4 py-2 font-medium text-white rounded w-max"
                        >
                            Cadastrar Paciente
                        </button>
                        <button
                            type="reset"
                            className="outline outline-1 outline-pink-700 px-4 py-2 font-medium text-pink-700 rounded w-max"
                        >
                            Limpar
                        </button>
                    </div>
                </form>
            </main>
            <SecretaryFloatingMenu />
            <ToastContainer />
        </>
    )
}