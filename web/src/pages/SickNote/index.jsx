import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Page, Text, Document, StyleSheet, PDFDownloadLink, Svg, Path } from '@react-pdf/renderer';
import { ThreeDots } from "react-loader-spinner";
import { DoctorFloatingMenu } from "../../components/DoctorFloatingMenu";
import { Header } from "../../components/Header";

/*
Para fazer um atestado, é necessário incluir os seguintes elementos: 
* título (“atestado” em letra maiúscula), 
* nome e identificação do emissor, 
* nome e identificação do solicitante, 
* texto claro sobre o que está sendo atestado e assinatura do atestante. Por serem documentos juridicamente relevantes, estão presentes em diversos âmbitos.
*/

function LogoCompany() {
    return (
        <Svg width="90" height="30" viewBox="0 0 187 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M78.08 45V16.8H83.2V40.64H96.72V45H78.08ZM107.95 45.4C103.15 45.4 100.75 42.7067 100.75 37.32V25.44H105.75V37.4C105.75 38.7867 106.03 39.8133 106.59 40.48C107.15 41.1467 108.044 41.48 109.27 41.48C110.604 41.48 111.697 41.0267 112.55 40.12C113.404 39.1867 113.83 37.96 113.83 36.44V25.44H118.83V45H113.95V42.08C112.644 44.2933 110.644 45.4 107.95 45.4ZM134.194 45.4C129.021 45.4 126.434 42.84 126.434 37.72V29.2H122.674V25.44H126.434V19.6H131.434V25.44H137.354V29.2H131.434V37.44C131.434 38.72 131.714 39.68 132.274 40.32C132.834 40.96 133.741 41.28 134.994 41.28C135.368 41.28 135.754 41.24 136.154 41.16C136.554 41.0533 136.968 40.9467 137.394 40.84L138.154 44.52C137.674 44.7867 137.061 45 136.314 45.16C135.594 45.32 134.888 45.4 134.194 45.4ZM151.231 45.4C149.017 45.4 147.111 44.9867 145.511 44.16C143.911 43.3333 142.671 42.16 141.791 40.64C140.937 39.12 140.511 37.32 140.511 35.24C140.511 33.2133 140.924 31.44 141.751 29.92C142.604 28.4 143.764 27.2133 145.231 26.36C146.724 25.48 148.417 25.04 150.311 25.04C153.084 25.04 155.271 25.92 156.871 27.68C158.497 29.44 159.311 31.84 159.311 34.88V36.36H145.311C145.684 39.8533 147.684 41.6 151.311 41.6C152.404 41.6 153.497 41.44 154.591 41.12C155.684 40.7733 156.684 40.24 157.591 39.52L158.991 42.88C158.057 43.6533 156.884 44.2667 155.471 44.72C154.057 45.1733 152.644 45.4 151.231 45.4ZM150.511 28.44C149.044 28.44 147.857 28.8933 146.951 29.8C146.044 30.7067 145.497 31.9333 145.311 33.48H155.151C155.044 31.8533 154.591 30.6133 153.791 29.76C153.017 28.88 151.924 28.44 150.511 28.44ZM170.91 45.4C169.497 45.4 168.23 45.1333 167.11 44.6C166.017 44.04 165.15 43.2933 164.51 42.36C163.897 41.4267 163.59 40.3733 163.59 39.2C163.59 37.76 163.964 36.6267 164.71 35.8C165.457 34.9467 166.67 34.3333 168.35 33.96C170.03 33.5867 172.284 33.4 175.11 33.4H176.51V32.56C176.51 31.2267 176.217 30.2667 175.63 29.68C175.044 29.0933 174.057 28.8 172.67 28.8C171.577 28.8 170.457 28.9733 169.31 29.32C168.164 29.64 167.004 30.1467 165.83 30.84L164.39 27.44C165.084 26.96 165.897 26.5467 166.83 26.2C167.79 25.8267 168.79 25.5467 169.83 25.36C170.897 25.1467 171.897 25.04 172.83 25.04C175.684 25.04 177.804 25.7067 179.19 27.04C180.577 28.3467 181.27 30.3867 181.27 33.16V45H176.59V41.88C176.137 42.9733 175.417 43.84 174.43 44.48C173.444 45.0933 172.27 45.4 170.91 45.4ZM171.95 41.96C173.257 41.96 174.337 41.5067 175.19 40.6C176.07 39.6933 176.51 38.5467 176.51 37.16V36.28H175.15C172.644 36.28 170.897 36.48 169.91 36.88C168.95 37.2533 168.47 37.9467 168.47 38.96C168.47 39.84 168.777 40.56 169.39 41.12C170.004 41.68 170.857 41.96 171.95 41.96Z" fill="#be185d" />
            <Path d="M53.3288 37.5533C49.4635 38.6372 45.3794 38.6727 41.4958 37.6562C37.6122 36.6397 34.0692 34.6078 31.2305 31.7692C28.3919 28.9306 26.36 25.3876 25.3435 21.504C24.327 17.6204 24.3625 13.5362 25.4464 9.6709C21.6356 10.7316 18.1691 12.7722 15.3924 15.5895C12.6156 18.4068 10.6254 21.9025 9.62011 25.7283C8.61477 29.5542 8.62935 33.5766 9.66239 37.3951C10.6954 41.2135 12.7109 44.6946 15.508 47.4917C18.3051 50.2889 21.7862 52.3043 25.6047 53.3373C29.4231 54.3704 33.4456 54.385 37.2714 53.3796C41.0972 52.3743 44.5929 50.3841 47.4102 47.6074C50.2275 44.8306 52.2681 41.3642 53.3288 37.5533Z" fill="#be185d" />
        </Svg>
    )
}

function SickNoteDocument({ patientName, entryTime, exitTime, numberOfDaysOff, isICDIncluded }) {
    let uuid = self.crypto.randomUUID();
    return (
        <Document>
            <Page style={styles.body}>
                <LogoCompany style={styles.header} />
                <Text style={styles.title}>Atestado</Text>

                <Text style={styles.text} render={() => (
                    `Atesto para devidos fins que a Sr.(a) ${patientName} esteve sob tratamento ginecológico neste consultório no período das ${entryTime} até às ${exitTime} do dia ${new Date().toLocaleDateString()} necessitando a mesma de ${numberOfDaysOff == 1 ? `${numberOfDaysOff} dia` : `${numberOfDaysOff} dias`} de repouso.`
                )}>
                </Text>
                <Text style={styles.text}>
                    {
                        isICDIncluded == true ? <Text>CID: .....................................</Text> : null
                    }
                </Text>
                <Text style={styles.preSignature} />
                <Text style={styles.signature}>
                    <Text style={styles.signatureLabel}>Assinatura do(a) médico(a)</Text>
                </Text>
                <Text style={styles.signature}>
                    <Text style={styles.signatureLabel}>Carimbo</Text>
                </Text>


                <Text style={styles.footer} render={() => (
                    `Documento gerado em ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`
                )} fixed />
                <Text style={styles.documentId} render={() => (
                    `ID do documento: ${uuid}`
                )} fixed />


            </Page>
        </Document>

    )
}

export function SickNote() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [patientName, setPatientName] = useState('')
    const [entryTime, setEntryTime] = useState()
    const [exitTime, setExitTime] = useState()
    const [numberOfDaysOff, setNumberOfDaysOff] = useState()
    const [isICDIncluded, setIsICDIncluded] = useState(false);

    const toggleICD = () => isICDIncluded == false ? setIsICDIncluded(true) : setIsICDIncluded(false)

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
                    <title>Atestado Médico | Lutea</title>
                </Helmet>
                <main className="px-16 py-6">
                    <Header />
                    <div className="2xl:py-32 xl:py-16 lg:py-8 gap-2 grid">
                        <h1 className="font-bold text-pink-700 text-4xl">Atestado Médico</h1>
                        <span className="text-gray-500">Preencha os campos a seguir para gerar um atestado médico.</span>
                    </div>
                    <div className="grid">
                        <section className="py-12">
                            <section className="grid grid-cols-22 gap-8">
                                <div className="grid">
                                    <label
                                        className="font-medium pb-2"
                                        htmlFor="patientName">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        name="patientName"
                                        className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm"
                                        placeholder="Ex: Maria da Silva"
                                        value={patientName}
                                        onChange={event => setPatientName(event.target.value)}
                                    />
                                </div>
                                <div className="grid" >
                                    <label
                                        className="font-medium pb-2"
                                        htmlFor="entryTime">Hora de entrada</label>
                                    <input
                                        className="outline outline-1 outline-pink-200 px-4 py-2 text-gray-500 rounded-sm w-full"
                                        name="entryTime"
                                        placeholder="hh:mm"
                                        title="entryTime"
                                        type="time"
                                        value={entryTime}
                                        onChange={event => setEntryTime(event.target.value)}
                                    />
                                </div>
                                <div className="grid" >
                                    <label
                                        className="font-medium pb-2"
                                        htmlFor="exitTime">Hora de saída</label>
                                    <input
                                        className="outline outline-1 outline-pink-200 px-4 py-2 text-gray-500 rounded-sm w-full"
                                        name="exitTime"
                                        placeholder="hh:mm"
                                        title="exitTime"
                                        type="time"
                                        value={exitTime}
                                        onChange={event => setExitTime(event.target.value)}
                                    />
                                </div>
                                <div className="grid">
                                    <label
                                        className="font-medium pb-2"
                                        htmlFor="numberOfDaysOff">
                                        Dias de repouso(a)
                                    </label>
                                    <input
                                        className="outline outline-1 outline-pink-200 px-4 py-2 text-gray-500 rounded-sm w-full"
                                        placeholder="Ex: 1"
                                        type="number"
                                        name="numberOfDaysOff"
                                        id="numberOfDaysOff"
                                        value={numberOfDaysOff}
                                        onChange={event => setNumberOfDaysOff(event.target.value)}
                                    />
                                </div>

                            </section>
                            <div className="flex gap-4 w-max pt-5">
                                <input
                                    className="accent-pink-700 h-6 w-6 rounded-sm"
                                    placeholder="Ex: 1"
                                    type="checkbox"
                                    name="isICDIncluded"
                                    id="isICDIncluded"
                                    checked={isICDIncluded}
                                    onChange={toggleICD}
                                />
                                <label
                                    htmlFor="numberOfDaysOff">
                                    Incluir CID
                                </label>
                            </div>
                        </section>
                        <div className="flex gap-4 pt-4 pb-8">
                            <PDFDownloadLink document={
                                <SickNoteDocument
                                    patientName={patientName}
                                    entryTime={entryTime}
                                    exitTime={exitTime}
                                    numberOfDaysOff={numberOfDaysOff}
                                    isICDIncluded={isICDIncluded}
                                />}
                                fileName={`atestado-${patientName}_${new Date().toISOString()}.pdf`}>
                                <button
                                    type="button"
                                    className="bg-pink-700 px-4 py-2 font-medium text-white rounded w-max"
                                    onClick={SickNoteDocument}
                                >
                                    Gerar Atestado
                                </button>
                            </PDFDownloadLink>

                            <button type="reset" className="outline outline-1 outline-pink-700 px-4 py-2 font-medium text-pink-700 rounded w-max">Limpar</button>
                        </div>
                    </div>
                </main>
                <DoctorFloatingMenu />
            </>
        )
    }
}

// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontFamily: 'Helvetica'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 60,
        fontFamily: 'Helvetica-Bold'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        lineHeight: 2,
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    preSignature: {
        marginVertical: 50
    },
    signature: {
        marginHorizontal: 12,
        marginTop: 50,
        borderTop: 1,
        borderTopColor: '#000000',
        width: '50%',
        paddingVertical: 10,
    },
    signatureLabel: {
        fontSize: 10
    },
    documentId: {
        position: 'absolute',
        fontSize: 9,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    footer: {
        position: 'absolute',
        fontSize: 10,
        bottom: 45,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    }
});