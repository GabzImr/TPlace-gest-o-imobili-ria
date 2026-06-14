T'Place Gestão Imobiliária — MVP
> Landing page com sistema de captação de leads para locação de curta temporada em Curitiba.
[![Status](https://img.shields.io/badge/status-em%20produ%C3%A7%C3%A3o-brightgreen)](#deploy)
[![Deploy](https://img.shields.io/badge/deploy-Render.com-4351e8)](#deploy)
[![Banco de Dados](https://img.shields.io/badge/database-Supabase-3ecf8e)](#tecnologias-utilizadas)
 **Site:** [tplacegestaoimobiliria.onrender.com](https://tplacegestaoimobiliria.onrender.com)
 **Admin:** [Painel Administrativo](https://tplacegestaoimobiliria.onrender.com/admin.html)
---
##  Índice
- [Problema Resolvido](#-problema-resolvido)
- [Solução](#-solução)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Deploy](#-deploy)
- [Painel Administrativo](#-painel-administrativo)
- [Equipe e Papéis](#-equipe-e-papéis)
---
##  Problema Resolvido
A **T'Place** não possuía presença digital nem canal próprio para captar proprietários interessados em colocar seus imóveis para locação no Airbnb e plataformas similares. Todo o processo dependia de **indicações e contatos manuais**, tornando a expansão lenta e limitada.
##  Solução
Uma **landing page profissional** com formulário de captação integrado ao **WhatsApp** e **banco de dados em nuvem** (Supabase), permitindo que proprietários encontrem e contatem a empresa online **24 horas por dia**.
---
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
- ✔️ API REST com Node.js + Express
- ✔️ Banco de dados em nuvem com **persistência total** (Supabase / PostgreSQL)
---
## 🛠️ Tecnologias Utilizadas
|
 Tecnologia 
|
 Função 
|
|
---
|
---
|
|
**
HTML + CSS + JavaScript
**
|
 Frontend — estrutura, visual e interatividade 
|
|
**
Node.js + Express
**
|
 Backend — servidor e rotas da API REST 
|
|
**
Supabase (PostgreSQL)
**
|
 Banco de dados em nuvem 
|
|
**
Google Fonts
**
|
 Tipografia (DM Sans + Playfair Display) 
|
|
**
WhatsApp API (
`wa.me`
)
**
|
 Notificação instantânea de novos leads 
|
|
**
Git + GitHub
**
|
 Controle de versão e deploy 
|
|
**
Render.com
**
|
 Hospedagem do backend (free tier) 
|
---
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