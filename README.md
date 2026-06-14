# TPlace-gest-o-imobili-ria
T'Place Gestão Imobiliária — MVP

Landing page com sistema de captação de leads para a empresa T'Place Gestão Imobiliária, desenvolvida como projeto acadêmico MVP (Mínimo Produto Viável) para resolver a dor real de marketing e captação de proprietários de imóveis para locação de curta temporada em Curitiba.

Problema Resolvido

A T'Place não possuía presença digital nem canal próprio para captar proprietários interessados em colocar seus imóveis para locação no Airbnb e plataformas similares. Todo o processo dependia de indicações e contatos manuais, tornando a expansão lenta e limitada. Solução entregue: uma landing page profissional com formulário de captação integrado ao WhatsApp e banco de dados em nuvem, permitindo que proprietários encontrem e contatem a empresa online 24h por dia.

Funcionalidades

Landing page responsiva com seções de apresentação, como funciona, vantagens e depoimentos Formulário de captação de leads com validação em tempo real Envio automático de mensagem para o WhatsApp do responsável ao preencher o formulário Painel administrativo com login para visualizar, filtrar e gerenciar todos os leads Atualização de status dos leads (Novo → Contatado → Negociando → Fechado → Descartado) Exportação de leads em CSV para Excel Banco de dados em nuvem com persistência total dos dados

Tecnologias Utilizadas

TecnologiaFunçãoHTML + CSS + JavaScriptFrontend — estrutura, visual e interatividadeNode.js + ExpressBackend — servidor e rotas da API RESTSupabase (PostgreSQL)Banco de dados em nuvemGoogle FontsTipografia (DM Sans + Playfair Display)WhatsApp API (wa.me)Notificação instantânea de novos leadsGit + GitHubControle de versão e deployRender.comHospedagem do backend (free tier)

Estrutura do Projeto

tplace-backend/ ├── server.js # Backend Node.js + Express + Supabase ├── package.json # Dependências do projeto ├── .env # Variáveis de ambiente (não commitado) ├── .gitignore └── public/ ├── index.html # Landing page principal ├── style.css # Estilos ├── script.js # Lógica do frontend + envio para API ├── admin.html # Painel administrativo └── logo.jpg # Logo da T'Place

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