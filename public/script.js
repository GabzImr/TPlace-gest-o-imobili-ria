const CONFIG = {
  apiUrl: '',
  whatsappNumber: '554192145139',
  whatsappMsg: (d) =>
    `Olá Antonio Carlos! Vi o site da T'Place e quero cadastrar meu imóvel. \n\n` +
    `*Meus dados:*\n` +
    ` Nome: ${d.nome}\n` +
    ` Bairro: ${d.bairro}\n` +
    ` Tipo: ${d.tipo}\n` +
    ` E-mail: ${d.email}\n` +
    ` WhatsApp: ${d.telefone}\n` +
    (d.situacao ? ` Situação: ${d.situacao}\n` : '') +
    (d.mensagem ? ` Obs: ${d.mensagem}` : ''),
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
  nav.style.boxShadow = window.scrollY > 40 ? '0 4px 30px rgba(0,0,0,.3)' : 'none';
});


function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
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


function openWhatsApp(data) {
  const msg = encodeURIComponent(CONFIG.whatsappMsg(data));
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, '_blank');
}


const form = document.getElementById('captacao-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async function (e) {
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

    try {
      const res = await fetch(`${CONFIG.apiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Erro no servidor');
      const result = await res.json();
      console.log('Lead salvo no banco:', result.lead);

    } catch (err) {
      console.warn(' Erro ao salvar:', err);
    }

    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';

    form.style.display        = 'none';
    formSuccess.style.display = 'block';
    document.getElementById('success-nome').textContent = data.nome.split(' ')[0];

    setTimeout(() => openWhatsApp(data), 1500);
  });
}

function resetForm() {
  form.reset();
  clearErrors();
  form.style.display        = 'flex';
  formSuccess.style.display = 'none';
}