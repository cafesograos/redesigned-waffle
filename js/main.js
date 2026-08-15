const API_BASE = "https://cafesograos-backend-production.up.railway.app";

let activeFilter = "todos";

// Tira de categorias no topo (estilo vitrine)
function renderCategoryStrip() {
  const strip = document.getElementById('categoryStrip');
  strip.innerHTML = CATEGORIES.map(c => `
    <a href="#produtos" data-filter="${c.id}">${c.nome}</a>
  `).join('');
}

// Pastilhas de filtro acima da grade de produtos
function renderFilterPills() {
  const pills = document.getElementById('filterPills');
  const all = [{ id: "todos", nome: "Todos" }, ...CATEGORIES];
  pills.innerHTML = all.map(c => `
    <button class="pill ${activeFilter === c.id ? 'active' : ''}" data-filter="${c.id}">${c.nome}</button>
  `).join('');
}

function priceHtml(p) {
  if (p.precoOriginal) {
    return `
      <span class="produto-preco-original">R$ ${p.precoOriginal.toFixed(2).replace('.', ',')}</span>
      <span class="produto-preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
    `;
  }
  return `<span class="produto-preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>`;
}

// Renderiza a vitrine de produtos, respeitando o filtro ativo
function renderProducts() {
  const grid = document.getElementById('produtosGrid');
  const items = activeFilter === "todos"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.categoria === activeFilter);

  grid.innerHTML = items.map(p => `
    <div class="produto-card">
      ${p.badge ? `<span class="produto-badge${p.badge.toUpperCase() === 'PROMOÇÃO' ? ' badge-sale' : ''}"${p.badge.includes('SCA') ? ' title="Avaliado por cooperativa parceira: acima de 83 pontos na escala SCA (Specialty Coffee Association), o padrão internacional de café especial."' : ''}>${p.badge}</span>` : ''}
      <div class="produto-img"${p.imgs ? ` data-gallery="${p.id}"` : ''}>${p.img ? `<img src="${p.img}" alt="${p.nome}">` : '☕'}</div>
      <div class="produto-info">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <div class="produto-footer">
          <div class="produto-precos">${priceHtml(p)}</div>
          <button class="btn btn-secondary" data-add="${p.id}">Adicionar</button>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-add]');
  if (addBtn) {
    Cart.add(addBtn.dataset.add);
    openCart();
    return;
  }
  const filterEl = e.target.closest('[data-filter]');
  if (filterEl) {
    activeFilter = filterEl.dataset.filter;
    renderFilterPills();
    renderProducts();
    return;
  }
  const galleryEl = e.target.closest('[data-gallery]');
  if (galleryEl) {
    const product = PRODUCTS.find(p => p.id === galleryEl.dataset.gallery);
    if (product) Lightbox.open(product.imgs, product.nome);
  }
});

// Galeria em tela cheia: clique na foto do produto abre, arraste/setas navegam entre as imagens.
const Lightbox = (() => {
  const el = document.getElementById('lightbox');
  const track = document.getElementById('lightboxTrack');
  const dotsEl = document.getElementById('lightboxDots');
  let images = [];
  let index = 0;
  let startX = 0;
  let dragging = false;

  function render() {
    track.style.transform = `translateX(${-index * 100}%)`;
    [...dotsEl.children].forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function open(imgs, alt) {
    images = imgs;
    index = 0;
    track.innerHTML = images.map(src => `<div class="lightbox-slide"><img src="${src}" alt="${alt}"></div>`).join('');
    dotsEl.innerHTML = images.map((_, i) => `<span class="lightbox-dot"></span>`).join('');
    dotsEl.style.display = images.length > 1 ? 'flex' : 'none';
    el.classList.add('open');
    render();
  }

  function close() { el.classList.remove('open'); }
  function next() { if (index < images.length - 1) { index++; render(); } }
  function prev() { if (index > 0) { index--; render(); } }

  document.getElementById('lightboxClose').addEventListener('click', close);
  document.getElementById('lightboxNext').addEventListener('click', next);
  document.getElementById('lightboxPrev').addEventListener('click', prev);
  el.addEventListener('click', (e) => { if (e.target === el) close(); });
  document.addEventListener('keydown', (e) => {
    if (!el.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  track.addEventListener('pointerdown', (e) => {
    dragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
  });
  track.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const delta = e.clientX - startX;
    track.style.transform = `translateX(calc(${-index * 100}% + ${delta}px))`;
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    const delta = e.clientX - startX;
    if (delta < -60) next();
    else if (delta > 60) prev();
    else render();
  }
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointerleave', (e) => { if (dragging) endDrag(e); });

  return { open };
})();

// Trava o scroll do body por trás de painéis sobrepostos (carrinho, menu
// mobile) — sem isso, no mobile o gesto de rolar dentro do painel rola a
// página por baixo e o navegador pode confundir toques com scroll.
let scrollYAntesDoTravamento = 0;
function travarScrollDoBody() {
  scrollYAntesDoTravamento = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollYAntesDoTravamento}px`;
  document.body.style.width = '100%';
}
function destravarScrollDoBody() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollYAntesDoTravamento);
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  travarScrollDoBody();
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  destravarScrollDoBody();
}

// Menu mobile (hambúrguer)
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const siteHeader = document.querySelector('.site-header');
menuToggle.addEventListener('click', () => {
  // A barra de aviso no topo pode ter altura variável (quebra linha em
  // telas estreitas), então a posição do menu é calculada a partir da
  // altura real do cabeçalho, nunca fixa — senão o menu abre por cima do
  // logo e dos ícones em vez de logo abaixo deles.
  mainNav.style.top = `${siteHeader.getBoundingClientRect().bottom}px`;
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) travarScrollDoBody();
  else destravarScrollDoBody();
});
mainNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    destravarScrollDoBody();
  }
});

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

// Busca o CEP no ViaCEP e calcula o frete no nosso backend (Melhor Envio).
document.getElementById('btnCalcularFrete').addEventListener('click', async () => {
  const cepInput = document.getElementById('inCep');
  const statusEl = document.getElementById('entregaStatus');
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length !== 8) {
    statusEl.textContent = 'Digite um CEP válido.';
    return;
  }

  statusEl.textContent = 'Calculando frete...';
  Cart.frete = null;

  try {
    const viaCepRes = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const endereco = await viaCepRes.json();
    if (endereco.erro) throw new Error('CEP não encontrado.');

    const freteRes = await fetch(`${API_BASE}/api/calcular-frete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cep, pesoKg: Cart.totalWeightKg(), subtotal: Cart.totalValue() })
    });
    if (!freteRes.ok) throw new Error('Não foi possível calcular o frete.');
    const frete = await freteRes.json();

    Cart.frete = frete;
    Cart.entrega = {
      cep: endereco.cep,
      endereco: endereco.logradouro,
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      estado: endereco.uf
    };

    document.getElementById('inEndereco').value = endereco.logradouro || '';
    document.getElementById('inBairroCidade').value = `${endereco.bairro} — ${endereco.localidade}/${endereco.uf}`;
    document.getElementById('enderecoFields').hidden = false;
    const freteTexto = frete.valor === 0 ? 'Grátis 🎉' : 'R$ ' + frete.valor.toFixed(2).replace('.', ',');
    statusEl.textContent = `Frete: ${freteTexto} · entrega em até ${frete.prazoDias} dias úteis`;

    Cart.render();

    if (window.gtag) {
      gtag('event', 'begin_checkout', {
        currency: 'BRL',
        value: Cart.grandTotal(),
        items: Cart.toLineItems().map((i) => ({ item_id: i.id, item_name: i.title, price: i.unit_price, quantity: i.quantity }))
      });
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Não foi possível calcular o frete. Confira o CEP e tente de novo.';
  }
});

document.getElementById('checkoutBtn').addEventListener('click', async () => {
  const btn = document.getElementById('checkoutBtn');

  const nome = document.getElementById('inNome').value.trim();
  const email = document.getElementById('inEmail').value.trim();
  const telefone = document.getElementById('inTelefone').value.trim();
  const numero = document.getElementById('inNumero').value.trim();
  const complemento = document.getElementById('inComplemento').value.trim();

  if (!Cart.frete) {
    alert('Calcule o frete antes de finalizar a compra.');
    return;
  }
  if (!nome || !email || !numero) {
    alert('Preencha nome, e-mail e número do endereço pra continuar.');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Processando...';
  try {
    const res = await fetch(`${API_BASE}/api/create-preference`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: Cart.toLineItems(),
        frete: Cart.frete.valor,
        cliente: { nome, email, telefone },
        entrega: { ...Cart.entrega, numero, complemento }
      })
    });
    if (!res.ok) throw new Error('Falha ao criar pagamento');
    const data = await res.json();
    window.location.href = data.init_point; // redireciona pro checkout do Mercado Pago
  } catch (err) {
    alert('Não foi possível iniciar o pagamento. Tente novamente em instantes.');
    console.error(err);
    btn.disabled = false;
    btn.textContent = 'Finalizar compra';
  }
});

// Busca o catálogo real no backend (fonte da verdade); se falhar, segue com
// o catálogo local de js/products.js pra loja não ficar fora do ar.
async function carregarCatalogo() {
  try {
    const res = await fetch(`${API_BASE}/api/produtos`);
    if (!res.ok) throw new Error('Falha ao buscar catálogo');
    const data = await res.json();
    if (Array.isArray(data.categories) && data.categories.length) CATEGORIES = data.categories;
    if (Array.isArray(data.products) && data.products.length) PRODUCTS = data.products;
  } catch (err) {
    console.error('Não foi possível carregar o catálogo do servidor, usando catálogo local.', err);
  }
  renderCategoryStrip();
  renderFilterPills();
  renderProducts();
  Cart.render();
}

carregarCatalogo();

// Avaliações de clientes: seleção de estrelas, envio (fica pendente até aprovação) e listagem das aprovadas.
(function avaliacoesInit() {
  const estrelasEl = document.getElementById('avEstrelas');
  const form = document.getElementById('formAvaliacao');
  const statusEl = document.getElementById('avaliacaoStatus');
  const grid = document.getElementById('avaliacoesGrid');
  if (!form) return;

  let notaSelecionada = 0;

  function renderEstrelas() {
    [...estrelasEl.children].forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.nota) <= notaSelecionada);
    });
  }

  estrelasEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-nota]');
    if (!btn) return;
    notaSelecionada = Number(btn.dataset.nota);
    renderEstrelas();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('avNome').value.trim();
    const produto = document.getElementById('avProduto').value;
    const comentario = document.getElementById('avComentario').value.trim();

    if (!nome || !produto || !comentario || !notaSelecionada) {
      statusEl.textContent = 'Preencha nome, qual produto comprou, a nota e o comentário.';
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    statusEl.textContent = 'Enviando...';

    try {
      const res = await fetch(`${API_BASE}/api/avaliacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, produto, nota: notaSelecionada, comentario })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao enviar avaliação');

      statusEl.textContent = data.message;
      form.reset();
      notaSelecionada = 0;
      renderEstrelas();
    } catch (err) {
      console.error(err);
      statusEl.textContent = 'Não foi possível enviar sua avaliação agora. Tente novamente em instantes.';
    } finally {
      btn.disabled = false;
    }
  });

  async function carregarAvaliacoes() {
    try {
      const res = await fetch(`${API_BASE}/api/avaliacoes`);
      if (!res.ok) throw new Error('Falha ao buscar avaliações');
      const avaliacoes = await res.json();
      if (!Array.isArray(avaliacoes) || !avaliacoes.length) return;

      const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

      grid.innerHTML = avaliacoes.map((a) => `
        <div class="avaliacao-card">
          <div class="avaliacao-estrelas-view">${'★'.repeat(a.rating)}${'☆'.repeat(5 - a.rating)}</div>
          ${a.product_line ? `<span class="avaliacao-produto">Comprou: ${esc(a.product_line)}</span>` : ''}
          <p>"${esc(a.comment)}"</p>
          <span class="avaliacao-autor">${esc(a.customer_name)}</span><span class="avaliacao-data">${new Date(a.created_at).toLocaleDateString('pt-BR')}</span>
        </div>
      `).join('');
    } catch (err) {
      console.error('Não foi possível carregar as avaliações.', err);
    }
  }

  carregarAvaliacoes();
})();
