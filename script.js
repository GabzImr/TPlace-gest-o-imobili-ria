
const CONFIG = {

  whatsappNumber: '554192145139',


  whatsappMsg: (d) =>
    `Olá Antonio Carlos! Vi o site da T'Place e quero cadastrar meu imóvel. 🏠\n\n` +
    `*Meus dados:*\n` +
    `👤 Nome: ${d.nome}\n` +
    `📍 Bairro: ${d.bairro}\n` +
    `🏠 Tipo: ${d.tipo}\n` +
    `📧 E-mail: ${d.email}\n` +
    `📞 WhatsApp: ${d.telefone}\n` +
    (d.situacao ? `📋 Situação atual: ${d.situacao}\n` : '') +
    (d.mensagem ? `💬 Obs: ${d.mensagem}` : ''),
};


const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));



const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 40
    ? '0 4px 30px rgba(0,0,0,.3)'
    : 'none';
});



function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});



const telInput = document.getElementById('telefone');
if (telInput) {
  telInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.length <= 10
      ? v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
      : v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    e.target.value = v;
  });
}



function clearErrors() {
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}
function showError(field, msg) {
  const input = document.getElementById(field);
  const errEl = document.getElementById('err-' + field);
  if (input) input.classList.add('error');
  if (errEl) errEl.textContent = msg;
}
function validateForm(data) {
  let valid = true;
  if (!data.nome || data.nome.trim().length < 3)
    { showError('nome', 'Informe seu nome completo.'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    { showError('email', 'E-mail inválido.'); valid = false; }
  if ((data.telefone || '').replace(/\D/g, '').length < 10)
    { showError('telefone', 'Informe um número com DDD.'); valid = false; }
  if (!data.bairro || data.bairro.trim().length < 2)
    { showError('bairro', 'Informe o bairro do imóvel.'); valid = false; }
  if (!data.tipo)
    { showError('tipo', 'Selecione o tipo do imóvel.'); valid = false; }
  return valid;
}



function saveLead(data) {
  const leads = JSON.parse(localStorage.getItem('flecta_leads') || '[]');
  const lead = {
    ...data,
    id: Date.now(),
    criadoEm: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    status: 'Novo'
  };
  leads.push(lead);
  localStorage.setItem('flecta_leads', JSON.stringify(leads));
  return lead;
}



function openWhatsApp(data) {
  const msg = encodeURIComponent(CONFIG.whatsappMsg(data));
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
  window.open(url, '_blank');
}



const form = document.getElementById('captacao-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const data = {
      nome:     document.getElementById('nome').value.trim(),
      email:    document.getElementById('email').value.trim(),
      telefone: document.getElementById('telefone').value.trim(),
      bairro:   document.getElementById('bairro').value.trim(),
      tipo:     document.getElementById('tipo').value,
      situacao: document.getElementById('situacao').value,
      mensagem: document.getElementById('mensagem').value.trim(),
    };

    if (!validateForm(data)) return;

    const btn     = document.getElementById('btn-submit');
    const btnText = document.getElementById('btn-text');
    const btnLoad = document.getElementById('btn-loading');

    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoad.style.display = 'inline';

    setTimeout(() => {
      
      const lead = saveLead(data);

      
      form.style.display        = 'none';
      formSuccess.style.display = 'block';
      document.getElementById('success-nome').textContent = data.nome.split(' ')[0];

      btn.disabled = false;
      btnText.style.display = 'inline';
      btnLoad.style.display = 'none';

      
      setTimeout(() => openWhatsApp(lead), 1500);
    }, 1200);
  });
}

function resetForm() {
  form.reset();
  clearErrors();
  form.style.display        = 'flex';
  formSuccess.style.display = 'none';
}



if (window.location.search.includes('admin=1')) renderAdmin();

function renderAdmin() {
  const leads = JSON.parse(localStorage.getItem('flecta_leads') || '[]');

  const overlay = document.createElement('div');
  overlay.id = 'admin-panel';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,.65);backdrop-filter:blur(4px);
    display:flex;align-items:center;justify-content:center;padding:1rem;
  `;

  overlay.innerHTML = `
    <div style="
      background:#0d1b2a;color:#fff;border-radius:20px;
      padding:2rem;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;
      border:1px solid rgba(201,168,76,.3);box-shadow:0 30px 80px rgba(0,0,0,.6);
      font-family:'DM Sans',sans-serif;
    ">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
        <div>
          <div style="color:#c9a84c;font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;font-weight:700">Painel Admin · Flecta</div>
          <strong style="font-size:1.2rem">${leads.length} lead${leads.length !== 1 ? 's' : ''} captado${leads.length !== 1 ? 's' : ''}</strong>
        </div>
        <button onclick="document.getElementById('admin-panel').remove()"
          style="background:rgba(255,255,255,.1);border:none;color:#fff;cursor:pointer;
                 width:36px;height:36px;border-radius:50%;font-size:1.2rem">×</button>
      </div>

      ${leads.length === 0
        ? `<div style="text-align:center;padding:3rem 1rem;color:rgba(255,255,255,.35)">
             <div style="font-size:2.5rem;margin-bottom:.75rem">📭</div>
             <p>Nenhum lead capturado ainda.<br/>Preencha o formulário para testar!</p>
           </div>`
        : leads.slice().reverse().map(l => `
          <div style="
            background:rgba(255,255,255,.05);border-radius:12px;
            padding:1.25rem;margin-bottom:1rem;
            border:1px solid rgba(201,168,76,.12);
          ">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem">
              <strong style="color:#c9a84c;font-size:1rem">${escHtml(l.nome)}</strong>
              <span style="background:rgba(201,168,76,.15);color:#e8c97a;
                font-size:.7rem;padding:.2rem .6rem;border-radius:50px;font-weight:600">${l.status}</span>
            </div>
            <div style="display:grid;gap:.35rem;margin-bottom:1rem">
              <div style="color:rgba(255,255,255,.75);font-size:.85rem">📧 ${escHtml(l.email)}</div>
              <div style="color:rgba(255,255,255,.75);font-size:.85rem">📞 ${escHtml(l.telefone)}</div>
              <div style="color:rgba(255,255,255,.75);font-size:.85rem">📍 ${escHtml(l.bairro)} · ${escHtml(l.tipo)}</div>
              ${l.situacao ? `<div style="color:rgba(255,255,255,.5);font-size:.82rem">Situação: ${escHtml(l.situacao)}</div>` : ''}
              ${l.mensagem ? `<div style="color:rgba(255,255,255,.5);font-size:.82rem;font-style:italic">"${escHtml(l.mensagem)}"</div>` : ''}
            </div>
            <div style="display:flex;gap:.5rem">
              <a href="https://wa.me/55${l.telefone.replace(/\D/g,'')}" target="_blank"
                style="background:rgba(37,211,102,.15);color:#25d366;border:1px solid rgba(37,211,102,.25);
                       border-radius:8px;padding:.35rem .85rem;text-decoration:none;font-size:.78rem;font-weight:600">
                💬 WhatsApp
              </a>
              <a href="mailto:${escHtml(l.email)}"
                style="background:rgba(201,168,76,.12);color:#e8c97a;border:1px solid rgba(201,168,76,.2);
                       border-radius:8px;padding:.35rem .85rem;text-decoration:none;font-size:.78rem;font-weight:600">
                📧 E-mail
              </a>
            </div>
            <div style="color:rgba(255,255,255,.25);font-size:.72rem;margin-top:.75rem">🕐 ${l.criadoEm}</div>
          </div>
        `).join('')
      }

      ${leads.length > 0 ? `
        <div style="display:flex;gap:.75rem;margin-top:.5rem">
          <button onclick="exportCSV()"
            style="flex:1;background:rgba(201,168,76,.12);color:#e8c97a;
                   border:1px solid rgba(201,168,76,.2);border-radius:10px;
                   padding:.65rem;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600">
            📥 Exportar CSV
          </button>
          <button onclick="clearLeads()"
            style="background:rgba(255,0,0,.1);color:#ff6b6b;border:1px solid rgba(255,0,0,.2);
                   border-radius:10px;padding:.65rem 1rem;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.85rem">
            🗑️ Limpar
          </button>
        </div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(overlay);
}

function escHtml(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function clearLeads() {
  if (confirm('Apagar todos os leads?')) {
    localStorage.removeItem('flecta_leads');
    document.getElementById('admin-panel').remove();
    renderAdmin();
  }
}

function exportCSV() {
  const leads = JSON.parse(localStorage.getItem('flecta_leads') || '[]');
  if (!leads.length) return;
  const headers = ['ID','Nome','Email','Telefone','Bairro','Tipo','Situação','Mensagem','Criado em','Status'];
  const rows = leads.map(l => [
    l.id, l.nome, l.email, l.telefone, l.bairro,
    l.tipo, l.situacao, l.mensagem, l.criadoEm, l.status
  ].map(v => `"${(v||'').toString().replace(/"/g,'""')}"`));
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(blob), download: 'flecta_leads.csv'
  });
  a.click();
}