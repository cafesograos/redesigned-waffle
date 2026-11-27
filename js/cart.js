// Lógica do carrinho — os itens ficam salvos no localStorage pra não se perderem
// se a pessoa atualizar a página ou voltar depois. Frete e dados de entrega não
// são salvos, pois precisam ser recalculados/conferidos a cada visita.
const CART_STORAGE_KEY = 'cafesograos-carrinho';
// Mesmo teto por item que o backend aplica em /api/create-preference
// (Math.min(50, ...) em server.js) — sem isso, o carrinho deixava somar
// qualquer quantidade e mostrava um subtotal que o servidor nunca cobraria
// de verdade, porque cortava em silêncio na hora de gerar o pagamento.
const CART_MAX_QTY = 50;

const Cart = {
  items: {}, // { productId: qty }
  frete: null, // { valor, prazoDias }
  // Valor mínimo de compra pra frete grátis nesse CEP (R$100/300/500,
  // conforme a localidade) — fica fora de "frete" de propósito, porque não
  // depende do peso e precisa sobreviver a add/remove de item (que zera
  // "frete" pra forçar recálculo do peso), senão a barra de progresso some
  // toda vez que a pessoa mexe no carrinho.
  limiteFreteGratis: null,
  entrega: {}, // cep, endereco, numero, complemento, bairro, cidade, estado
  cliente: {}, // nome, email, telefone

  load() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '{}');
      if (saved && typeof saved === 'object') this.items = saved;
    } catch (err) {
      console.warn('Não foi possível carregar o carrinho salvo.', err);
    }
  },

  save() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
    } catch (err) {
      console.warn('Não foi possível salvar o carrinho.', err);
    }
  },

  totalWeightKg() {
    const gramas = Object.entries(this.items).reduce((sum, [id, qty]) => {
      const p = PRODUCTS.find(p => p.id === id);
      return sum + (p ? (p.pesoGramas || 300) * qty : 0);
    }, 0);
    // Soma o peso do brinde de boas-vindas (Drip Coffee) mesmo sem saber ainda
    // se esse cliente é novo — nesse ponto do checkout (CEP calculado antes
    // do e-mail) não dá pra saber se ele tem direito ao brinde. Estimar o
    // frete já contando esse peso evita que o valor mostrado aqui fique mais
    // barato do que o frete realmente cobrado depois em /api/create-preference
    // (que soma esse peso de verdade pra cliente novo).
    const brinde = PRODUCTS.find(p => p.id === 'drip-coffee-caixa-10');
    const gramasComBrinde = gramas + (brinde ? brinde.pesoGramas || 400 : 400);
    return gramasComBrinde / 1000;
  },

  grandTotal() {
    return this.totalValue() + (this.frete ? this.frete.valor : 0);
  },

  add(id) {
    this.items[id] = Math.min(CART_MAX_QTY, (this.items[id] || 0) + 1);
    this.frete = null;
    this.save();
    this.render();

    const p = PRODUCTS.find(p => p.id === id);
    if (p && window.gtag) {
      gtag('event', 'add_to_cart', {
        currency: 'BRL',
        value: p.preco,
        items: [{ item_id: id, item_name: p.nome, price: p.preco, quantity: 1 }]
      });
    }
    if (p && window.fbq) {
      fbq('track', 'AddToCart', {
        content_ids: [id],
        content_name: p.nome,
        content_type: 'product',
        num_items: 1,
        currency: 'BRL',
        value: p.preco
      });
    }
  },

  remove(id) {
    delete this.items[id];
    this.frete = null;
    this.save();
    this.render();
  },

  setQty(id, qty) {
    qty = Math.min(CART_MAX_QTY, Math.max(0, parseInt(qty) || 0));
    this.frete = null;
    if (qty === 0) { this.remove(id); return; }
    this.items[id] = qty;
    this.save();
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

  // null enquanto o CEP ainda não foi calculado nenhuma vez (não dá pra
  // saber a faixa de frete grátis sem CEP); depois disso sempre retorna um
  // número, porque a faixa "Brasil inteiro" (R$500) cobre todo mundo.
  faltaParaFreteGratis() {
    if (this.limiteFreteGratis == null) return null;
    return Math.max(0, this.limiteFreteGratis - this.totalValue());
  },

  progressoFreteGratis() {
    if (this.limiteFreteGratis == null || this.limiteFreteGratis <= 0) return 0;
    return Math.min(100, (this.totalValue() / this.limiteFreteGratis) * 100);
  },

  // Espelha blackFridayBeneficios() do backend (server.js) -- mesma regra
  // aprovada: copo sozinho de R$150 a R$170, frete grátis sozinho de R$170
  // a R$300, os dois só a partir de R$300 (o 300 é fixo nos dois lados, não
  // vem de /api/config porque o backend também não manda esse valor —
  // só minimoCopo/minimoFrete). Só é cosmético: quem decide de verdade o
  // que entra no pedido é o backend em /api/create-preference.
  beneficiosBlackFriday() {
    if (typeof blackFridayAtiva !== 'function' || !blackFridayAtiva() || !BLACK_FRIDAY_CONFIG) return null;
    const valor = Number(this.totalValue().toFixed(2));
    const { minimoCopo, minimoFrete } = BLACK_FRIDAY_CONFIG;
    return {
      copo: (valor >= minimoCopo && valor < minimoFrete) || valor >= 300,
      freteGratis: valor >= minimoFrete
    };
  },

  toLineItems() {
    return Object.entries(this.items)
      .map(([id, qty]) => {
        const p = PRODUCTS.find(p => p.id === id);
        return p ? { id, title: p.nome, quantity: qty, unit_price: p.preco } : null;
      })
      .filter(Boolean);
  },

  render() {
    const count = this.totalItems();
    document.getElementById('cartCount').textContent = `(${count})`;
    const black = this.beneficiosBlackFriday();

    const itemsEl = document.getElementById('cartItems');
    itemsEl.innerHTML = '';

    if (count === 0) {
      itemsEl.innerHTML = `<p class="cart-empty">${t('cart_empty')}</p>`;
    } else {
      Object.entries(this.items).forEach(([id, qty]) => {
        const p = PRODUCTS.find(p => p.id === id);
        if (!p) return;
        const nome = typeof nomeProduto === 'function' ? nomeProduto(p) : p.nome;
        // Mesmo escape usado nos cards da vitrine (ver escapeHtml em main.js)
        // -- hoje o catálogo não vem de input de cliente, mas o carrinho é a
        // única tela que ainda montava esse HTML sem escapar nada.
        const esc = typeof escapeHtml === 'function' ? escapeHtml : (s) => String(s ?? '');
        const nomeEsc = esc(nome);
        const idEsc = esc(id);
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <div class="cart-item-thumb">${p.img ? `<img src="${esc(p.img)}" alt="${nomeEsc}">` : ''}</div>
          <div class="cart-item-info">
            <strong>${nomeEsc}</strong>
            <span>R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="dec" data-id="${idEsc}">−</button>
            <span>${qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${idEsc}"${qty >= CART_MAX_QTY ? ' disabled title="Quantidade máxima por item: 50"' : ''}>+</button>
          </div>
        `;
        itemsEl.appendChild(row);
      });

      // Copo de brinde Black Friday -- só exibição; o backend quem decide
      // de verdade o que entra no pedido em /api/create-preference.
      if (black && black.copo) {
        const giftRow = document.createElement('div');
        giftRow.className = 'cart-item cart-item-brinde';
        giftRow.innerHTML = `
          <div class="cart-item-thumb"></div>
          <div class="cart-item-info">
            <strong>Copo Café Só Grãos 350ml</strong>
            <span>🎁 Brinde Black Friday — R$ 0,00</span>
          </div>
        `;
        itemsEl.appendChild(giftRow);
      }
    }

    const progressoEl = document.getElementById('cartFreteProgresso');
    if (progressoEl) {
      if (count === 0) {
        progressoEl.hidden = true;
      } else if (black) {
        progressoEl.hidden = false;
        const valor = this.totalValue();
        const { minimoCopo, minimoFrete } = BLACK_FRIDAY_CONFIG;
        let texto, pct;
        if (black.copo && black.freteGratis) {
          texto = '🎉 Copo de brinde + frete grátis garantidos!';
          pct = 100;
        } else if (black.freteGratis) {
          const faltaCopo = Math.max(0, 300 - valor);
          texto = `Frete grátis garantido! Faltam R$ ${faltaCopo.toFixed(2).replace('.', ',')} para o copo de brinde também`;
          pct = Math.min(100, (valor / 300) * 100);
        } else if (black.copo) {
          const faltaFrete = Math.max(0, minimoFrete - valor);
          texto = `Copo de brinde garantido! Faltam R$ ${faltaFrete.toFixed(2).replace('.', ',')} para o frete grátis`;
          pct = Math.min(100, (valor / minimoFrete) * 100);
        } else {
          const faltaCopo = Math.max(0, minimoCopo - valor);
          texto = `Faltam R$ ${faltaCopo.toFixed(2).replace('.', ',')} para ganhar o copo Café Só Grãos de brinde`;
          pct = Math.min(100, (valor / minimoCopo) * 100);
        }
        document.getElementById('cartFreteProgressoTexto').textContent = texto;
        document.getElementById('cartFreteProgressoFill').style.width = pct + '%';
        progressoEl.classList.toggle('liberado', black.freteGratis);
      } else {
        const falta = this.faltaParaFreteGratis();
        if (falta === null) {
          progressoEl.hidden = true;
        } else {
          progressoEl.hidden = false;
          const liberado = falta <= 0;
          document.getElementById('cartFreteProgressoTexto').textContent = liberado
            ? t('cart_frete_liberado')
            : t('cart_frete_faltam', { valor: 'R$ ' + falta.toFixed(2).replace('.', ',') });
          document.getElementById('cartFreteProgressoFill').style.width = this.progressoFreteGratis() + '%';
          progressoEl.classList.toggle('liberado', liberado);
        }
      }
    }

    document.getElementById('cartSubtotal').textContent =
      'R$ ' + this.totalValue().toFixed(2).replace('.', ',');
    document.getElementById('cartFrete').textContent = this.frete
      ? (this.frete.valor === 0 ? t('cart_frete_gratis') : 'R$ ' + this.frete.valor.toFixed(2).replace('.', ','))
      : '—';
    document.getElementById('cartTotal').textContent =
      'R$ ' + this.grandTotal().toFixed(2).replace('.', ',');

    const entregaEl = document.getElementById('cartEntrega');
    entregaEl.style.display = count === 0 ? 'none' : 'block';

    document.getElementById('checkoutBtn').disabled = count === 0 || !this.frete;
    // Sem isso, depois de remover/alterar a quantidade de um item o frete
    // zerava (precisa recalcular pro peso novo) mas nada na tela avisava —
    // o botão só ficava com uma cor um pouco mais clara, fácil de não notar
    // que estava bloqueado.
    // Esse aviso também é reaproveitado por mostrarErroCheckout() (main.js)
    // pra erro de campo (CPF/nome/etc.) -- enquanto ele estiver no ar
    // (erroCheckoutAtivo), este render() não deve tocar nele por nenhum
    // motivo (troca de idioma, config da Black chegando atrasada etc.),
    // senão o erro desaparece sem o problema real ter sido corrigido.
    if (typeof erroCheckoutAtivo === 'undefined' || !erroCheckoutAtivo) {
      const avisoFreteEl = document.getElementById('cartAvisoFrete');
      avisoFreteEl.hidden = count === 0 || !!this.frete;
      // Se o frete virar null de novo (item mudou, precisa recalcular),
      // esse é sempre o motivo de verdade agora -- o texto tem que voltar a
      // ser o da falta de frete, não um erro de campo antigo que ficou.
      if (!avisoFreteEl.hidden) avisoFreteEl.textContent = t('msg_calcule_frete_antes');
    }
  }
};

Cart.load();

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.qty-btn');
  if (!btn) return;
  const id = btn.dataset.id;
  const current = Cart.items[id] || 0;
  if (btn.dataset.action === 'inc') Cart.setQty(id, current + 1);
  else Cart.setQty(id, current - 1);
});
