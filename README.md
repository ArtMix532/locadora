![GitHub repo size](https://img.shields.io/github/repo-size/SrGuzz/locadora)
![GitHub language count](https://img.shields.io/github/languages/count/SrGuzz/locadora)
![GitHub forks](https://img.shields.io/github/forks/SrGuzz/locadora)

# 🚗 AutoLux Rental - Sistema de Locadora de Veículos

Este é um projeto full-stack de um sistema de gerenciamento para uma locadora de veículos, desenvolvido como parte de um estudo aprofundado em tecnologias de front-end e back-end. A plataforma atende a dois tipos de usuários: **Clientes**, que podem solicitar e acompanhar aluguéis, e **Agentes**, que gerenciam as operações.

## 📸 Preview

<img src="artefatos/GifProjetoLocadora.gif" alt="Preview do projeto AutoLux Rental">


## 🚀 Tecnologias Utilizadas

O projeto foi construído com uma stack moderna, separando as responsabilidades entre o cliente (front-end) e o servidor (back-end).

### **Front-end:**

- **React** com **Vite**: Para uma interface de usuário rápida e reativa.
- **TypeScript**: Para garantir a tipagem e a robustez do código.
- **Tailwind CSS** & **Shadcn UI**: Para a construção de um layout moderno, responsivo e acessível.
- **React Router Dom**: Para o gerenciamento de rotas da aplicação.

<a href="https://react.dev/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/></a>
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/></a>
<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"><img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/></a>
<a href="https://vitejs.dev/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" alt="vite" width="40" height="40"/></a>

### **Back-end:**

- **Java** & **Spring Boot**: Para a construção de uma API REST robusta e segura.
- **Spring Security**: Para autenticação e autorização baseadas em JWT (JSON Web Tokens).
- **JPA / Hibernate**: Para o mapeamento objeto-relacional e persistência de dados.
- **MySQL**: Como banco de dados relacional para armazenar todas as informações.

<a href="https://spring.io/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original-wordmark.svg" alt="spring" width="40" height="40"/></a>
<a href="https://www.java.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original-wordmark.svg" alt="java" width="40" height="40"/></a>
<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/></a>
<a href="https://jwt.io/" target="_blank" rel="noreferrer"><img src="https://img.icons8.com/color/48/000000/json-web-token.png" alt="jwt" width="40" height="40"/></a>

## 🖥️ Funcionalidades

A plataforma oferece funcionalidades distintas para cada tipo de usuário:

### **Para Clientes:**

- **Dashboard Pessoal**: Visualização rápida de estatísticas como pedidos ativos, contratos vigentes e histórico total.
- **Criação de Pedidos**: Um fluxo guiado de 4 passos para solicitar um novo aluguel de veículo.
- **Histórico de Pedidos**: Uma tela dedicada para listar, visualizar e filtrar todos os pedidos de aluguel já realizados.
- **Cancelamento de Pedidos**: Possibilidade de cancelar um pedido que ainda esteja com o status "RESERVADA".
- **Cadastro e Autenticação**: Sistema seguro de criação de conta e login.

### **Para Agentes:**

- **Dashboard Administrativo**: Visão geral de todas as locações, com foco em pedidos pendentes de análise.
- **Gerenciamento de Locações**: Tela para visualizar **todas** as locações de **todos** os clientes.
- **Aprovação e Rejeição**: Ferramentas para alterar o status de um pedido de "RESERVADA" para "ATIVA" (aprovado) ou "CANCELADA" (rejeitado).
- **Filtros Avançados**: Capacidade de filtrar locações por status, cliente ou veículo.

## 📂 Estrutura e Fluxo do Projeto

1.  **Autenticação** → Usuário se cadastra ou faz login, recebendo um token JWT.
2.  **Dashboard** → O usuário é direcionado para um dashboard personalizado de acordo com seu nível de acesso (Cliente ou Agente).
3.  **Criação de Pedido (Cliente)** → O cliente passa por um formulário de múltiplos passos para escolher o veículo, período e fornecer dados pessoais/profissionais.
4.  **Listagem de Pedidos (Cliente)** → O cliente pode ver o status de todos os seus pedidos.
5.  **Gerenciamento (Agente)** → O agente visualiza todos os pedidos, podendo filtrá-los e tomar ações como aprovar ou rejeitar.

## 🌐 Deploy

O projeto pode ser acessado online através do seguinte link:

[Acessar a Aplicação](https://SEU-LINK-AQUI.com/)


## 👥 Desenvolvedor

- Davi Benjamim Guimarães
- Albert Luis Pereira de Jesus
- Jonas Rafael Martins

## 📬 Contato

Caso queira entrar em contato:

- ✉️ Email: `davibenjamimguimaraes@gmail.com`
- 🔗 LinkedIn: [Davi Benjamim Guimarães](https://www.linkedin.com/in/davi-benjamim-guimar%C3%A3es-b82741288/)
- 🐙 GitHub: [ArtMix532](https://github.com/ArtMix532)


- ✉️ Email: `albertluis123y88@gmail.com`
- 🔗 LinkedIn: [Albert Luis Pereira de Jesus](https://www.linkedin.com/in/albert-luis/)
- 🐙 GitHub: [SrGuzz](https://github.com/SrGuzz)


- ✉️ Email: `jonasrmartins17@gmail.com`
- 🔗 LinkedIn: [Jonas Rafael Martins](https://www.linkedin.com/in/SEU-LINKEDIN-AQUI/)
- 🐙 GitHub: [Kjonps](https://github.com/Kjonps)
