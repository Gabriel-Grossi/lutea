<br>

![Logo - e-Consulta](/web/public/logo-lutea.svg "Logo Lutea")

## Sobre

O <b>Lutea</b> consiste em uma aplicação web desenvolvida para a disciplina de Projeto Interdisciplinar (PI) durante o 7º semestre do curso de Ciência da Computação, no Centro Universitário FAM.

A aplicação tem o objetivo de auxiliar consultórios médicos, voltados a ginecologia, na gestão de processos internos como:

- Controle de agendamentos:

    - Agendar Consulta 
    - Cancelar Consulta
    - Listar Consultas:
        - Listar consultas canceladas
        - Listar consultas do dia
        - Listar consultas futuras
        - Listar consultas ocorridas
    - Reagendar Consulta
- Emissão de documentos:
    - Emitir Receituário
    - Emitir Atestado
- Controle de pacientes:
    - Adicionar Paciente
    - Listar Pacientes
        - Acessar página de paciente (com restrições conforme nível de acesso)
            - Criar prontuário médico para uma paciente específica


## Tecnologias

- <b>Front-End</b>
    - Axios
    - Radix Primitives(Radix UI)
    - React
    - react-helmet-async
    - React Spinners (also known as react-loader-spinner)
    - react-router-dom - v6
    - React-Select
    - React-Toastify
    - Recharts
    - TailwindCSS + PostCSS
    - Vite

- <b>Back-End</b>
    - CORS
    - Express
    - Mongoose
    - Node.js
    - Nodemon

## Passo a passo de instalação
    Aviso: Para esta orientação, será utilizado o Visual Studio Code


1. Abra o Visual Studio Code 
2. Pressione CTRL+Shift+P (Windows) ou CMD+Shift+P
3. Digite Clonar ou Clone(caso o seu VS Code esteja configurado em inglês)
4. Clique na seguinte opção :
    
        Git: Clone
5. Acesse o repositório do projeto que deseja clonar, clique em "Code", em seguida, copie a URL exibida para a caixa de texto no VS Code.
6. Pressione Enter e aguarde o término do processo.
7. Após o processo de clonagem do repositório, abra o terminal integrado do VS Code e digite o comando de instalação do gerenciador de pacotes de sua preferência:
    - Para Yarn:

            yarn
    - Para NPM:
    
            npm install
8. Após instalar as dependências do projeto, execute o seguinte comando:

        yarn dev