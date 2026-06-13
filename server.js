require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const { createClient } = require('@supabase/supabase-js');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(' Conectado ao Supabase com sucesso!');




app.post('/api/leads', async (req, res) => {
  const { nome, email, telefone, bairro, tipo, situacao, mensagem } = req.body;

  if (!nome || !email || !telefone || !bairro || !tipo) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando.' });
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { 
          nome, email, telefone, bairro, tipo, 
          situacao: situacao || '', 
          mensagem: mensagem || '',
          status: 'Novo'
          
        }
      ])
      .select();

    if (error) throw error;

    console.log(` Novo lead cadastrado no Supabase: ${nome}`);
    res.status(201).json({ sucesso: true, lead: data[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro interno ao salvar o lead.' });
  }
});


app.get('/api/leads', async (req, res) => {
  const SENHA = process.env.ADMIN_SENHA || 'tplace2025';
  if (req.query.senha !== SENHA) {
    return res.status(401).json({ erro: 'Acesso não autorizado.' });
  }

  try {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .order('id', { ascending: false }); 

    if (error) throw error;

    res.json({ total: leads.length, leads });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar leads.' });
  }
});

app.patch('/api/leads/:id/status', async (req, res) => {
  const SENHA = process.env.ADMIN_SENHA || 'tplace2025';
  if (req.query.senha !== SENHA) {
    return res.status(401).json({ erro: 'Acesso não autorizado.' });
  }

  const { status } = req.body;
  const validos = ['Novo','Contatado','Negociando','Fechado','Descartado'];
  if (!validos.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido.' });
  }

  try {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ sucesso: true });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar status.' });
  }
});


app.get('/api/leads/export', async (req, res) => {
  const SENHA = process.env.ADMIN_SENHA || 'tplace2025';
  if (req.query.senha !== SENHA) {
    return res.status(401).json({ erro: 'Acesso não autorizado.' });
  }

  try {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;

    const header = 'ID,Nome,Email,Telefone,Bairro,Tipo,Situação,Mensagem,Status,Criado em';
    const rows = leads.map(l =>
      [l.id, l.nome, l.email, l.telefone, l.bairro, l.tipo,
       l.situacao, l.mensagem, l.status, l.created_at] 
      .map(v => `"${(v||'').toString().replace(/"/g,'""')}"`)
      .join(',')
    );

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=tplace_leads.csv');
    res.send('\uFEFF' + [header, ...rows].join('\n'));
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao exportar dados.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(` T'Place backend rodando com Supabase em http://localhost:${PORT}`);
});