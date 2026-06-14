## T'Place Gestão Imobiliária — MVP
> Landing page com sistema de captação de leads para locação de curta temporada em Curitiba.
[![Status](https://img.shields.io/badge/status-em%20produ%C3%A7%C3%A3o-brightgreen)](#deploy)
[![Deploy](https://img.shields.io/badge/deploy-Render.com-4351e8)](#deploy)
[![Banco de Dados](https://img.shields.io/badge/database-Supabase-3ecf8e)](#tecnologias-utilizadas)
 **Site:** [tplacegestaoimobiliria.onrender.com](https://tplacegestaoimobiliria.onrender.com)
 **Admin:** [Painel Administrativo](https://tplacegestaoimobiliria.onrender.com/admin.html)
---
##  Tecnologias Utilizadas
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)
![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

##  Índice
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Problema Resolvido](#-problema-resolvido)
- [Solução](#-solução)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Deploy](#-deploy)
- [Painel Administrativo](#-painel-administrativo)
- [Equipe e Papéis](#-equipe-e-papéis)

##  Problema Resolvido
A **T'Place** não possuía presença digital nem canal próprio para captar proprietários interessados em colocar seus imóveis para locação no Airbnb e plataformas similares. Todo o processo dependia de **indicações e contatos manuais**, tornando a expansão lenta e limitada.

##  Solução
Uma **landing page profissional** com formulário de captação integrado ao **WhatsApp** e **banco de dados em nuvem** (Supabase), permitindo que proprietários encontrem e contatem a empresa online **24 horas por dia**.

##  Funcionalidades
### Landing Page
-  Layout responsivo com seções: **Apresentação**, **Como Funciona**, **Vantagens** e **Depoimentos**
-  Formulário de captação de leads com **validação em tempo real**
-  Envio automático de mensagem para o **WhatsApp** do responsável ao preencher o formulário
### Painel Administrativo
-  Login protegido por senha (`ADMIN_SENHA`)
-  Visualização de todos os leads em tempo real
-  Filtro por status
-  Atualização de status diretamente na tabela
-  Pipeline de status: `Novo → Contatado → Negociando → Fechado → Descartado`
-  Botões de contato rápido via **WhatsApp** e **e-mail**
-  Exportação de leads em **CSV** para Excel
### Backend
-  API REST com Node.js + Express
-  Banco de dados em nuvem com **persistência total** (Supabase / PostgreSQL)
--

##  Estrutura do Projeto
```
tplace-backend/
├── server.js          # Backend Node.js + Express + Supabase
├── package.json       # Dependências do projeto
├── .env               # Variáveis de ambiente (não commitado)
├── .gitignore
└── public/
    ├── index.html     # Landing page principal
    ├── style.css      # Estilos
    ├── script.js      # Lógica do frontend + envio para API
    ├── admin.html     # Painel administrativo
    └── logo.jpg       # Logo da T'Place
```

Deploy

O projeto está hospedado no Render.com com deploy automático via GitHub. Qualquer git push na branch main atualiza o site automaticamente em 1-2 minutos. Variáveis de ambiente configuradas no Render:

SUPABASE_URL SUPABASE_KEY ADMIN_SENHA

Painel Administrativo

Acessível em /admin.html — login com senha definida em ADMIN_SENHA.

Funcionalidades:

Visualização de todos os leads em tempo real Filtro por status Atualização de status diretamente na tabela Botões de contato rápido via WhatsApp e e-mail Exportação para CSV

Projeto desenvolvido como atividade prática de startup — "Do Zero ao MVP" — com o objetivo de vivenciar a rotina de uma startup de TI, validando a jornada do usuário e entregando um software funcional para atender uma dor real de uma empresa parceira.

Papéis do projeto:

CEO / Product Owner UX/UI Designer Desenvolvedor Full Stack QA / Tester

link: https://tplacegestaoimobiliria.onrender.com admin: https://tplacegestaoimobiliria.onrender.com/admin.html
