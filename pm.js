// PM Seguridad v2: menú del celular y formulario (sin servidor: WhatsApp y mail)
const WA = '5493415614199';

const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const abierto = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!abierto));
  menu.classList.toggle('is-open', !abierto);
});
menu.addEventListener('click', (e) => {
  if (e.target.closest('a')) { burger.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }
});

// el formulario arma un mail a ventas
const form = document.getElementById('form-cotizar');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const ok = d.nombre.trim() && /\S+@\S+\.\S+/.test(d.mail) && d.pedido.trim();
  form.querySelector('.form__error').hidden = !!ok;
  if (!ok) return;
  const cuerpo = `Nombre: ${d.nombre}\nEmpresa: ${d.empresa}\nMail: ${d.mail}\nTeléfono: ${d.tel}\n\nPedido:\n${d.pedido}`;
  location.href = `mailto:ventas@pmseguridad.com.ar?subject=${encodeURIComponent('Pedido de cotización - ' + (d.empresa || d.nombre))}&body=${encodeURIComponent(cuerpo)}`;
});
