# PokéDecks Frontend

Este é o repositório do frontend para a aplicação PokéDecks, um e-commerce de cards de Pokémon.

O projeto foi construído com **React** e **Vite**.

## 🚀 Como Começar (Frontend)

Siga estes passos para rodar o projeto localmente na sua máquina.

### 1. Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou mais recente)
* `npm` ou `yarn`

### 2. Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/mclarafreireteles/front-pokedecks.git
    cd front-pokedecks
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

### 3. Configuração do Ambiente

O frontend precisa saber onde a API do backend está localizada.

1.  Crie um arquivo chamado `.env.local` na raiz do projeto.
2.  Adicione a seguinte variável de ambiente a ele:

    ```env
    VITE_API_BASE_URL=https://pokedecks-backend-with-spring.onrender.com/api
    ```

### 4. Rodando o Projeto

Após a instalação, inicie o servidor de desenvolvimento:

```bash
npm run dev
```
O projeto estará disponível no seu navegador em http://localhost:5173

## 🔌 API do Backend
O backend é uma aplicação Java Spring Boot separada que fornece todos os dados e lógica de autenticação.

URL Base da API: https://pokedecks-backend-with-spring.onrender.com

Documentação (Swagger): A API está 100% documentada usando Swagger. Você pode ver, testar e entender todos os endpoints disponíveis publicamente no link abaixo:

https://pokedecks-backend-with-spring.onrender.com/swagger-ui.html