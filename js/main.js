// ATENÇÃO: troque pela URL do seu backend depois do deploy (veja README.md).
// Ex: "https://cafesograos-backend.onrender.com"
const API_BASE = "https://SEU-BACKEND-AQUI.onrender.com";

// Renderiza a vitrine de produtos
function renderProducts() {
  const grid = document.getElementById('produtosGrid');
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="produto-card">
      <div class="produto-img">${p.img ? `<img src="${p.img}" alt="${p.nome}">` : '☕'}</div>
      <div class="produto-info">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <div class="produto-footer">
          <span class="produto-preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
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
  }
});

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

renderProducts();
Cart.render();
