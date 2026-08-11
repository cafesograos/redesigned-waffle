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
      ${p.badge ? `<span class="produto-badge${p.badge.toUpperCase() === 'PROMOÇÃO' ? ' badge-sale' : ''}">${p.badge}</span>` : ''}
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

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

document.getElementById('checkoutBtn').addEventListener('click', async () => {
  const btn = document.getElementById('checkoutBtn');
  btn.disabled = true;
  btn.textContent = 'Processando...';
  try {
    const res = await fetch(`${API_BASE}/api/create-preference`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: Cart.toLineItems() })
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

renderCategoryStrip();
renderFilterPills();
renderProducts();
Cart.render();
