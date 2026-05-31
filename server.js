// ============================================
//  T'Place Gestão Imobiliária — Backend
//  Stack: Node.js + Express + lowdb (JSON)
//  Deploy: Render.com (free tier)
// ============================================

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const low     = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── MIDDLEWARES ────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── BANCO DE DADOS (JSON via lowdb) ────────
const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = low(adapter);

db.defaults({ leads: [] }).write();
console.log('✅ Banco de dados conectado — db.json');


// ════════════════════════════════════════════
//  ROTAS DA API
// ════════════════════════════════════════════

// ── POST /api/leads ──────────────────────────
app.post('/api/leads', (req, res) => {
  const { nome, email, telefone, bairro, tipo, situacao, mensagem } = req.body;

  if (!nome || !email || !telefone || !bairro || !tipo) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando.' });
  }

  const lead = {
    id:        Date.now(),
    nome, email, telefone, bairro, tipo,
    situacao:  situacao  || '',
    mensagem:  mensagem  || '',
    status:    'Novo',
    criado_em: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  };

  db.get('leads').push(lead).write();
  console.log(`📥 Novo lead: ${nome} — ${bairro} (${tipo})`);
  res.status(201).json({ sucesso: true, lead });
});


// ── GET /api/leads ───────────────────────────
app.get('/api/leads', (req, res) => {
  const SENHA = process.env.ADMIN_SENHA || 'tplace2025';
  if (req.query.senha !== SENHA) {
    return res.status(401).json({ erro: 'Acesso não autorizado.' });
  }
  const leads = db.get('leads').value().slice().reverse();
  res.json({ total: leads.length, leads });
});


// ── PATCH /api/leads/:id/status ──────────────
app.patch('/api/leads/:id/status', (req, res) => {
  const SENHA = process.env.ADMIN_SENHA || 'tplace2025';
  if (req.query.senha !== SENHA) {
    return res.status(401).json({ erro: 'Acesso não autorizado.' });
  }
  const { status } = req.body;
  const validos = ['Novo','Contatado','Negociando','Fechado','Descartado'];
  if (!validos.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido.' });
  }
  db.get('leads').find({ id: Number(req.params.id) }).assign({ status }).write();
  res.json({ sucesso: true });
});


// ── GET /api/leads/export ────────────────────
app.get('/api/leads/export', (req, res) => {
  const SENHA = process.env.ADMIN_SENHA || 'tplace2025';
  if (req.query.senha !== SENHA) {
    return res.status(401).json({ erro: 'Acesso não autorizado.' });
  }
  const leads = db.get('leads').value().slice().reverse();
  const header = 'ID,Nome,Email,Telefone,Bairro,Tipo,Situação,Mensagem,Status,Criado em';
  const rows = leads.map(l =>
    [l.id, l.nome, l.email, l.telefone, l.bairro, l.tipo,
     l.situacao, l.mensagem, l.status, l.criado_em]
    .map(v => `"${(v||'').toString().replace(/"/g,'""')}"`)
    .join(',')
  );
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=tplace_leads.csv');
  res.send('\uFEFF' + [header, ...rows].join('\n'));
});


// ── serve o site ─────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 T'Place backend rodando em http://localhost:${PORT}`);
  console.log(`📊 Admin: http://localhost:${PORT}/admin.html`);
});
