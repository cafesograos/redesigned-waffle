// Lógica do carrinho — guardado em memória (não usa localStorage, para funcionar
// de forma previsível dentro de artifacts/preview e em qualquer navegador).
const Cart = {
  items: {}, // { productId: qty }

  add(id) {
    this.items[id] = (this.items[id] || 0) + 1;
    this.render();
  },

  remove(id) {
    delete this.items[id];
    this.render();
  },

  setQty(id, qty) {
    qty = Math.max(0, parseInt(qty) || 0);
    if (qty === 0) { this.remove(id); return; }
    this.items[id] = qty;
    this.render();
  },

  totalItems() {
    return Object.values(this.items).reduce((a, b) => a + b, 0);
  },

  totalValue() {
    return Object.entries(this.items).reduce((sum, [id, qty]) => {
      const p = PRODUCTS.find(p => p.id === id);
      return sum + (p ? p.preco * qty : 0);
    }, 0);
  },

  toLineItems() {
    return Object.entries(this.items).map(([id, qty]) => {
      const p = PRODUCTS.find(p => p.id === id);
      return { id, title: p.nome, quantity: qty, unit_price: p.preco };
    });
  },

  render() {
    const count = this.totalItems();
    document.getElementById('cartCount').textContent = count;

    const itemsEl = document.getElementById('cartItems');
    itemsEl.innerHTML = '';

    if (count === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
    } else {
      Object.entries(this.items).forEach(([id, qty]) => {
        const p = PRODUCTS.find(p => p.id === id);
        if (!p) return;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <div class="cart-item-info">
            <strong>${p.nome}</strong>
            <span>R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="dec" data-id="${id}">−</button>
            <span>${qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${id}">+</button>
          </div>
        `;
        itemsEl.appendChild(row);
      });
    }

    document.getElementById('cartTotal').textContent =
      'R$ ' + this.totalValue().toFixed(2).replace('.', ',');
    document.getElementById('checkoutBtn').disabled = count === 0;
  }
};

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.qty-btn');
  if (!btn) return;
  const id = btn.dataset.id;
  const current = Cart.items[id] || 0;
  if (btn.dataset.action === 'inc') Cart.setQty(id, current + 1);
  else Cart.setQty(id, current - 1);
});
