const API_BASE = "https://cafesograos-backend-production.up.railway.app";

let activeFilter = "todos";

const PRODUTO_PAGINA = {
  'cafe-tradicional-500-moido': 'cafe-tradicional-500g.html',
  'cafe-especial-500-grao': 'cafe-especial-500g.html',
  'cafe-especial-500-moido': 'cafe-especial-500g.html',
  'drip-coffee-caixa-10': 'drip-coffee.html',
  'drip-coffee-unidade': 'drip-coffee.html',
  'caixa-drip-coffee-vazia': 'caixa-presente-drip-coffee.html'
};

// Único ponto de configuração da regra de frete grátis -- vem sempre de
// GET /api/config (o mesmo FRETE_GRATIS que o backend usa pra valer o
// frete de verdade no checkout), nunca digitado aqui. O valor que já está
// escrito nas páginas HTML (barra do topo) é só o retrato do que valia no
// momento da publicação -- se o JS não carregar, ele fica estático, mas
// assim que carrega, passa a refletir a config ao vivo sozinho.
let FRETE_GRATIS_CONFIG = null;
// Black Friday 27-30/11/2026 (manual do Gustavo, 26/11/2026) -- mesma ideia
// do frete grátis acima: só o backend sabe os horários/valores de verdade,
// o front só espelha. Datas com fuso -03:00 explícito, então Date.parse()
// acerta sozinho não importa o fuso do navegador de quem acessa.
let BLACK_FRIDAY_CONFIG = null;
// Recalcula a fase a partir dos horários (nunca usa o campo "fase" cru do
// fetch, que fica parado no que valia no momento em que a página carregou)
// -- sem isso, quem deixasse a aba aberta atravessando a virada de 00h não
// veria a oferta começar/acabar sozinha, só atualizando se recarregasse a
// página. Mesma lógica de blackFridayFase() em server.js.
function blackFridayFase() {
  if (!BLACK_FRIDAY_CONFIG) return 'antes';
  const agora = Date.now();
  if (agora < Date.parse(BLACK_FRIDAY_CONFIG.inicio)) return 'antes';
  if (agora <= Date.parse(BLACK_FRIDAY_CONFIG.fimNormal)) return 'ativo';
  if (agora <= Date.parse(BLACK_FRIDAY_CONFIG.fimProrrogacao)) return 'prorrogacao';
  return 'depois';
}
function blackFridayAtiva() {
  const fase = blackFridayFase();
  return fase === 'ativo' || fase === 'prorrogacao';
}
// Mesma regra de blackFridayBeneficios (server.js) / Cart.beneficiosBlackFriday
// (cart.js), mas pra um valor solto -- usada na vitrine pra mostrar, no
// próprio card de um kit, se o preço dele sozinho já destrava o copo/frete
// da Black (sem depender do resto do carrinho).
function blackFridayBeneficiosPara(subtotal) {
  if (!blackFridayAtiva() || !BLACK_FRIDAY_CONFIG) return null;
  const valor = Number((Number(subtotal) || 0).toFixed(2));
  const { minimoCopo, minimoFrete } = BLACK_FRIDAY_CONFIG;
  return {
    copo: (valor >= minimoCopo && valor < minimoFrete) || valor >= 300,
    freteGratis: valor >= minimoFrete
  };
}
const freteGratisConfigPronta = fetch(`${API_BASE}/api/config`)
  .then((r) => r.json())
  .then((data) => {
    FRETE_GRATIS_CONFIG = data.freteGratis;
    BLACK_FRIDAY_CONFIG = data.blackFriday || null;
  })
  .catch((err) => console.warn('Não foi possível carregar a config de frete grátis:', err));

function freteGratisMinimo(escopo) {
  if (!FRETE_GRATIS_CONFIG) return null;
  const faixa = FRETE_GRATIS_CONFIG.faixas.find((f) => f.escopo === escopo);
  return faixa ? faixa.minimo : null;
}

// Frase única explicando as 3 faixas da Black, usada na barra do topo e no
// banner -- escrita pra deixar claro que copo e frete são faixas SEPARADAS
// (R$170-300 só tem frete, sem copo) e que os dois juntos só valem a partir
// de R$300. A versão anterior ("copo a partir de R$150 e frete a partir de
// R$170") lia como se os dois valessem juntos desde R$150/170, o que não é
// verdade -- gerou reclamação de confusão.
function textoBeneficiosBlack() {
  const minimoCopo = BLACK_FRIDAY_CONFIG.minimoCopo.toFixed(0);
  const minimoFrete = BLACK_FRIDAY_CONFIG.minimoFrete.toFixed(0);
  return `Acima de R$${minimoCopo}: copo de brinde. Acima de R$${minimoFrete}: frete grátis. Acima de R$300: copo + frete grátis juntos!`;
}

// Barra do topo: "a partir de R$X" usa sempre a faixa mais barata (hoje,
// Araraquara) -- se a config mudar, atualiza sozinha, sem editar HTML.
function atualizarAnnounceBar() {
  const bar = document.querySelector('.announce-bar');
  if (!bar) return;
  // Durante a Black, a barra do topo troca pra mensagem da promoção (só em
  // português, pedido do dono) em vez do aviso de frete grátis normal.
  if (blackFridayAtiva()) {
    bar.textContent = `🔥 BLACK FRIDAY: ${textoBeneficiosBlack()}`;
    return;
  }
  if (!FRETE_GRATIS_CONFIG) return;
  const menor = Math.min(...FRETE_GRATIS_CONFIG.faixas.map((f) => f.minimo));
  bar.textContent = t('announce_bar', { valor: menor % 1 === 0 ? menor.toFixed(0) : menor.toFixed(2).replace('.', ',') });
}
freteGratisConfigPronta.then(atualizarAnnounceBar);
// Reavalia a cada minuto -- cobre quem deixa a aba aberta bem na virada do
// início/fim da promoção (00h de sexta, fim de domingo/prorrogação),
// atualizando a barra, o carrinho e o banner sozinhos, sem precisar
// recarregar a página.
setInterval(() => {
  atualizarAnnounceBar();
  if (typeof Cart !== 'undefined') Cart.render();
  if (typeof renderProducts === 'function') renderProducts();
}, 60000);

// Banner Black Friday (só existe na home) -- liga/desliga e atualiza a
// contagem regressiva sozinho, nunca precisa editar o HTML na mão.
// ?teste-black=1 na URL força mostrar o banner fora do horário real, só pra
// conferir o visual (nunca muda preço/frete/brinde -- isso é sempre decidido
// pelo servidor, nunca por esse parâmetro de teste).
function formatarContagemBlack(ms) {
  if (ms < 0) ms = 0;
  const segTotal = Math.floor(ms / 1000);
  const dias = Math.floor(segTotal / 86400);
  const horas = Math.floor((segTotal % 86400) / 3600);
  const min = Math.floor((segTotal % 3600) / 60);
  const seg = segTotal % 60;
  const partes = [];
  if (dias > 0) partes.push({ valor: dias, rotulo: dias === 1 ? 'dia' : 'dias' });
  partes.push({ valor: horas, rotulo: 'h' });
  partes.push({ valor: min, rotulo: 'min' });
  partes.push({ valor: seg, rotulo: 'seg' });
  return partes.map((p) => `<div class="unidade"><strong>${String(p.valor).padStart(2, '0')}</strong><span>${p.rotulo}</span></div>`).join('');
}
function atualizarBannerBlackFriday() {
  const secao = document.getElementById('bannerBlackFriday');
  if (!secao || !BLACK_FRIDAY_CONFIG) return;
  const testeBlack = new URLSearchParams(location.search).get('teste-black') === '1';
  let fase = blackFridayFase();
  if (testeBlack && fase === 'antes') fase = 'ativo'; // só pra ver o visual antes da hora chegar
  if (fase === 'depois' && !testeBlack) {
    secao.hidden = true;
    return;
  }
  secao.hidden = false;
  const tituloEl = document.getElementById('bannerBlackTitulo');
  const textoEl = document.getElementById('bannerBlackTexto');
  const countdownEl = document.getElementById('bannerBlackCountdown');
  let alvo;
  if (fase === 'antes') {
    tituloEl.textContent = 'A Black Friday está chegando';
    textoEl.textContent = `A partir de sexta: ${textoBeneficiosBlack()}`;
    alvo = Date.parse(BLACK_FRIDAY_CONFIG.inicio);
  } else if (fase === 'prorrogacao') {
    tituloEl.textContent = 'Últimas horas da Black Friday!';
    textoEl.textContent = `${textoBeneficiosBlack()} Só até acabar a prorrogação.`;
    alvo = Date.parse(BLACK_FRIDAY_CONFIG.fimProrrogacao);
  } else {
    tituloEl.textContent = 'Copo de brinde + frete grátis';
    textoEl.textContent = `${textoBeneficiosBlack()} Só até domingo!`;
    alvo = Date.parse(BLACK_FRIDAY_CONFIG.fimNormal);
  }
  countdownEl.innerHTML = formatarContagemBlack(alvo - Date.now());
}
freteGratisConfigPronta.then(() => {
  if (!document.getElementById('bannerBlackFriday')) return; // só existe na home
  atualizarBannerBlackFriday();
  setInterval(atualizarBannerBlackFriday, 1000);
});

// Subtítulo da página de Araraquara: mesma ideia da barra do topo, mas com
// o valor da faixa "araraquara-regiao" -- muda sozinho se a config mudar,
// nunca precisa editar o HTML.
function atualizarAraraquaraSubtitle() {
  const el = document.querySelector('[data-i18n="araraquara_page_subtitle"]');
  const valor = freteGratisMinimo('araraquara-regiao');
  if (!el || valor === null) return;
  el.textContent = t('araraquara_page_subtitle', { valor: valor % 1 === 0 ? valor.toFixed(0) : valor.toFixed(2).replace('.', ',') });
}
freteGratisConfigPronta.then(atualizarAraraquaraSubtitle);
// Se o carrinho já tinha sido desenhado antes dessa config chegar (corrida
// normal entre o fetch e a primeira renderização), redesenha pra mostrar
// a faixa/brinde da Black Friday sem precisar a pessoa mexer no carrinho.
freteGratisConfigPronta.then(() => { if (typeof Cart !== 'undefined') Cart.render(); });
// Mesma corrida de novo: se a vitrine já tiver sido desenhada antes dessa
// config chegar, redesenha pra aplicar badge/ordem dos combos da Black sem
// esperar o próximo minuto do setInterval acima.
freteGratisConfigPronta.then(() => { if (typeof renderProducts === 'function') renderProducts(); });

// Nome/descrição do produto no idioma atual — cai pro português se a
// tradução específica não existir (ex.: catálogo local desatualizado) ou se
// i18n.js não tiver terminado de carregar a tempo (visto em produção: uma
// falha de rede no carregamento do script derrubava a vitrine inteira, já
// que esse ReferenceError não tratado interrompia carregarCatalogo() antes
// de renderProducts() rodar).
function idiomaSufixo() {
  const lang = typeof idiomaAtual === 'function' ? idiomaAtual() : 'pt';
  return lang === 'pt' ? '' : `_${lang}`;
}
function nomeProduto(p) { return p[`nome${idiomaSufixo()}`] || p.nome; }
function descricaoProduto(p) { return p[`descricao${idiomaSufixo()}`] || p.descricao; }
function nomeCategoria(c) { return c[`nome${idiomaSufixo()}`] || c.nome; }

// Tira de categorias no topo (estilo "mega menu" da Baggio): cada categoria
// que tem produto vira um dropdown listando os produtos dela direto (ex:
// "Acessórios" mostra "Copo" e "Caixa de presente" sem precisar
// passar pelo filtro da vitrine primeiro) -- clicar num produto do dropdown
// já leva direto pra ele (ver handler de clique mais abaixo).
function renderCategoryStrip() {
  const strip = document.getElementById('categoryStrip');
  if (!strip) return;
  // Fora da home não existe vitrine pra filtrar (#produtosGrid não existe) —
  // sem isso, clicar numa categoria em qualquer página de produto/conteúdo
  // não fazia nada visível (o link só mudava a URL pro #produtos inexistente
  // e o clique era interceptado por um listener que também não achava nada
  // pra filtrar). Agora manda pra home já com a categoria certa na URL.
  const estaNaHome = !!document.getElementById('produtosGrid');
  const destino = (categoriaId, produtoId) => {
    const hash = produtoId ? `#produto-${encodeURIComponent(produtoId)}` : '#produtos';
    return estaNaHome ? hash : `index.html?categoria=${categoriaId}${hash}`;
  };
  strip.innerHTML = CATEGORIES.map((c) => {
    const produtosDaCategoria = PRODUCTS.filter((p) => (p.categorias || []).includes(c.id));
    return `
      <div class="category-item${produtosDaCategoria.length ? ' has-dropdown' : ''}">
        <a href="${destino(c.id)}" data-filter="${c.id}" class="category-trigger">${nomeCategoria(c)}</a>
        ${produtosDaCategoria.length ? `
          <div class="category-dropdown">
            ${produtosDaCategoria.map((p) => `<a href="${destino(c.id, p.id)}" data-filter="${c.id}" data-produto="${escapeHtml(p.id)}">${escapeHtml(nomeProduto(p))}</a>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// Rola até o card e pisca um destaque nele -- usado tanto por quem chega de
// outra página (index.html?categoria=X#produto-Y) quanto por quem clica no
// dropdown já estando na home (ver handler de clique mais abaixo).
function destacarProduto(produtoId) {
  const card = document.getElementById(`produto-${produtoId}`);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('produto-destacado');
  setTimeout(() => card.classList.remove('produto-destacado'), 2500);
}

// Pastilhas de filtro acima da grade de produtos
function renderFilterPills() {
  const pills = document.getElementById('filterPills');
  if (!pills) return;
  const all = [{ id: "todos", nome: t('filter_todos') }, ...CATEGORIES];
  pills.innerHTML = all.map(c => `
    <button class="pill ${activeFilter === c.id ? 'active' : ''}" data-filter="${c.id}">${c.id === 'todos' ? c.nome : nomeCategoria(c)}</button>
  `).join('');
}

function priceHtml(p) {
  if (p.precoOriginal) {
    const desconto = Math.round((1 - p.preco / p.precoOriginal) * 100);
    return `
      <span class="produto-preco-linha">
        <span class="produto-preco-original">R$ ${p.precoOriginal.toFixed(2).replace('.', ',')}</span>
        <span class="produto-desconto">-${desconto}%</span>
      </span>
      <span class="produto-preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
    `;
  }
  return `
    <span class="produto-preco-linha" aria-hidden="true" style="visibility:hidden">
      <span class="produto-preco-original">R$ 0,00</span>
      <span class="produto-desconto">-0%</span>
    </span>
    <span class="produto-preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
  `;
}

// Peso em texto (500 g, 1 kg) -- mesma unidade que os cards estáticos do
// HTML já usam, pra não ficar nada diferente quando o JS reconstrói do zero.
function pesoHtml(p) {
  return p.pesoGramas >= 1000
    ? `${(p.pesoGramas / 1000).toFixed(1).replace('.0', '').replace('.', ',')} kg`
    : `${p.pesoGramas} g`;
}

// Renderiza a vitrine de produtos, respeitando o filtro ativo. Os produtos
// já vêm escritos no HTML (ver index.html) pra aparecer com JavaScript
// desativado -- em vez de recriar os cards do zero a cada chamada, isso
// sincroniza texto/idioma nos cards que já existem e só mostra/esconde
// conforme o filtro. Only reconstrói do zero se o HTML não tiver os cards
// (fallback de segurança, ex.: página que inclua o grid vazio).
// Escapa dado antes de entrar em template HTML — hoje PRODUCTS só vem de
// products.js (editado só pelo dono) ou da API do servidor, nunca de input
// de cliente, mas o resto do sistema sempre escapa saída mesmo assim (ver
// escapeHtml no backend), então faz o mesmo aqui por consistência e defesa
// em profundidade (ex: se o catálogo um dia aceitar cadastro por formulário).
function escapeHtml(valor) {
  return String(valor ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function montarCardProdutoHtml(p) {
  const nome = escapeHtml(nomeProduto(p));
  const descricao = escapeHtml(descricaoProduto(p));
  const id = escapeHtml(p.id);
  return `
    <article class="produto-card" id="produto-${id}" data-id="${id}" data-categoria="${escapeHtml((p.categorias || []).join(' '))}">
      ${p.badge ? `<span class="produto-badge${p.badge.toUpperCase() === 'PROMOÇÃO' ? ' badge-sale' : ''}"${p.badge.includes('SCA') ? ` title="${escapeHtml(t('sca_tooltip'))}"` : ''}>${escapeHtml(p.badge)}</span>` : ''}
      <span class="produto-badge-black" hidden>Black</span>
      <div class="produto-img"${p.imgs ? ` data-gallery="${id}"` : ''}>${p.img ? `<img src="${escapeHtml(p.img)}" alt="${nome}" loading="lazy">` : ''}</div>
      <div class="produto-info">
        <h3>${nome}</h3>
        <p>${descricao}</p>
        ${PRODUTO_PAGINA[p.id] ? `<a href="${escapeHtml(PRODUTO_PAGINA[p.id])}?sku=${id}" class="produto-ficha-link">${escapeHtml(t('produto_ver_ficha'))}</a>` : ''}
        <p class="produto-kit-black-info" hidden></p>
        <div class="produto-footer">
          <div class="produto-precos">
            <span class="produto-peso">${pesoHtml(p)}</span>
            ${priceHtml(p)}
          </div>
          <button class="btn btn-secondary" data-add="${id}">${escapeHtml(t('add_button'))}</button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const grid = document.getElementById('produtosGrid');
  if (!grid) return;
  const items = activeFilter === "todos"
    ? PRODUCTS
    : PRODUCTS.filter(p => (p.categorias || []).includes(activeFilter));
  const idsVisiveis = new Set(items.map((p) => p.id));
  const idsCatalogoAtual = new Set(PRODUCTS.map((p) => p.id));

  // Tira card de produto que não existe mais no catálogo atual (ex: id
  // trocado, item removido) — senão ficava um card fantasma pra sempre.
  grid.querySelectorAll('[data-id]').forEach((card) => {
    if (!idsCatalogoAtual.has(card.dataset.id)) card.remove();
  });

  PRODUCTS.forEach((p) => {
    let card = grid.querySelector(`[data-id="${p.id}"]`);
    if (!card) {
      // Produto que ainda não tem card no DOM (acabou de entrar no
      // catálogo, ex: carregarCatalogo() trocou PRODUCTS pelo retorno da
      // API) — sem isso, qualquer produto novo nunca aparecia no site,
      // só a API confirmava que ele existia.
      grid.insertAdjacentHTML('beforeend', montarCardProdutoHtml(p));
      card = grid.querySelector(`[data-id="${p.id}"]`);
    }
    card.hidden = !idsVisiveis.has(p.id);
    // Card estático já escrito no HTML (ver comentário acima de produtosGrid)
    // não nasce com esse id -- sem isso, o menu de categorias não acha o
    // card pra rolar/destacar quando o produto já existia antes do JS entrar.
    if (!card.id) card.id = `produto-${p.id}`;
    const h3 = card.querySelector('h3');
    const descEl = card.querySelector('p');
    const btn = card.querySelector('[data-add]');
    const img = card.querySelector('img');
    if (h3) h3.textContent = nomeProduto(p);
    if (descEl) descEl.textContent = descricaoProduto(p);
    if (btn) btn.textContent = t('add_button');
    if (img) img.alt = nomeProduto(p);

    // Combo da Black: só os 4 combos que já existem (badge "Combo" no
    // catálogo), não todo item de "kits" -- pedido do dono, não inventar
    // combo novo. Reavaliado toda vez que renderProducts() roda de novo
    // (troca de idioma, atualização por minuto da Black), então liga/desliga
    // sozinho junto com o resto da promoção.
    const ehComboBlack = p.badge === 'Combo';
    const badgeBlackEl = card.querySelector('.produto-badge-black');
    const kitInfoEl = card.querySelector('.produto-kit-black-info');
    const beneficio = ehComboBlack ? blackFridayBeneficiosPara(p.preco) : null;
    if (beneficio) {
      card.style.order = '-1'; // sobe pro topo da vitrine (grid: order funciona igual flex)
      if (badgeBlackEl) badgeBlackEl.hidden = false;
      if (kitInfoEl) {
        kitInfoEl.hidden = false;
        if (beneficio.copo && beneficio.freteGratis) {
          kitInfoEl.textContent = '🎉 Esse kit sozinho já garante o copo de brinde + frete grátis!';
        } else if (beneficio.freteGratis) {
          kitInfoEl.textContent = '🚚 Esse kit sozinho já garante o frete grátis!';
        } else if (beneficio.copo) {
          kitInfoEl.textContent = '🎁 Esse kit sozinho já garante o copo de brinde!';
        } else {
          const falta = Math.max(0, BLACK_FRIDAY_CONFIG.minimoCopo - p.preco).toFixed(2).replace('.', ',');
          kitInfoEl.textContent = `Faltam R$ ${falta} pra esse kit garantir o copo de brinde`;
        }
      }
    } else {
      card.style.order = '';
      if (badgeBlackEl) badgeBlackEl.hidden = true;
      if (kitInfoEl) kitInfoEl.hidden = true;
    }
  });
}

document.addEventListener('click', (e) => {
  // Fecha qualquer dropdown de categoria aberto que não seja o que acabou de
  // ser clicado -- sem isso, num toque (sem hover) o menu ficava aberto pra
  // sempre depois de abrir, mesmo clicando em outro lugar da página.
  const itemClicado = e.target.closest('.category-item');
  document.querySelectorAll('.category-item.open').forEach((item) => {
    if (item !== itemClicado) item.classList.remove('open');
  });

  const addBtn = e.target.closest('[data-add]');
  if (addBtn) {
    Cart.add(addBtn.dataset.add);
    openCart();
    return;
  }
  // Gatilho do mega menu (ex: "Acessórios ▾") -- em tela sem hover (celular)
  // o primeiro toque só abre a lista de produtos da categoria embaixo, não
  // navega ainda; só um segundo toque no mesmo link (já aberto) navega de
  // verdade. Em tela com mouse o hover já mostra o dropdown, então o clique
  // sempre navega direto (comportamento de link normal).
  const trigger = e.target.closest('.category-trigger');
  if (trigger) {
    const item = trigger.closest('.category-item');
    const temHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (item && item.classList.contains('has-dropdown') && !temHover && !item.classList.contains('open')) {
      e.preventDefault();
      item.classList.add('open');
      return;
    }
  }
  const filterEl = e.target.closest('[data-filter]');
  if (filterEl) {
    activeFilter = filterEl.dataset.filter;
    renderFilterPills();
    renderProducts();
    // Link de produto específico do dropdown (ex: "Copo 350ml"
    // dentro de "Acessórios") -- já estando na home, rola até o card em vez
    // de deixar o navegador pular sem transição (e sem o destaque visual).
    if (filterEl.dataset.produto && document.getElementById('produtosGrid')) {
      e.preventDefault();
      destacarProduto(filterEl.dataset.produto);
    }
    return;
  }
  const galleryEl = e.target.closest('[data-gallery]');
  if (galleryEl) {
    const product = PRODUCTS.find(p => p.id === galleryEl.dataset.gallery);
    if (product) {
      Lightbox.open(product.imgs, nomeProduto(product));
      if (window.gtag) {
        gtag('event', 'view_item', {
          currency: 'BRL',
          value: product.preco,
          items: [{ item_id: product.id, item_name: product.nome, price: product.preco }]
        });
      }
      if (window.fbq) {
        fbq('track', 'ViewContent', {
          content_ids: [product.id],
          content_name: product.nome,
          content_type: 'product',
          num_items: 1,
          currency: 'BRL',
          value: product.preco
        });
      }
    }
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
    const altEsc = escapeHtml(alt);
    track.innerHTML = images.map(src => `<div class="lightbox-slide"><img src="${escapeHtml(src)}" alt="${altEsc}"></div>`).join('');
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

// CNPJ fica escondido até a pessoa pedir -- é opcional (só quem quer nota de
// empresa preenche) e, visível direto, só poluía o formulário pra maioria.
document.getElementById('btnMostrarCnpj').addEventListener('click', () => {
  const campo = document.getElementById('inCnpj');
  campo.hidden = false;
  document.getElementById('btnMostrarCnpj').hidden = true;
  campo.focus();
});

// Busca o CEP no ViaCEP e calcula o frete no nosso backend (Melhor Envio).
// Roda tanto no clique do botão (mantido pra quem preferir) quanto sozinho
// assim que o CEP completa 8 dígitos (Black Friday: carrinho/checkout não
// deve exigir clique extra pra avançar -- ver manual do Gustavo).
let freteEmAndamento = false;
async function calcularFreteCep() {
  if (freteEmAndamento) return;
  const cepInput = document.getElementById('inCep');
  const statusEl = document.getElementById('entregaStatus');
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length !== 8) {
    statusEl.textContent = t('msg_cep_invalido');
    return;
  }

  freteEmAndamento = true;
  statusEl.textContent = t('msg_calculando_frete');
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
    // Guardado à parte de Cart.frete (que vira null a cada item adicionado/
    // removido, pois o peso muda) — o limite de frete grátis só depende do
    // CEP, não do peso, então continua valendo pra barra de progresso
    // mesmo depois do carrinho mudar, sem precisar recalcular frete de novo.
    Cart.limiteFreteGratis = frete.limiteFreteGratis;
    Cart.entrega = {
      cep: endereco.cep,
      endereco: endereco.logradouro,
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      estado: endereco.uf
    };

    document.getElementById('inEndereco').value = endereco.logradouro || '';
    document.getElementById('inBairroCidade').value = `${endereco.bairro}, ${endereco.localidade}/${endereco.uf}`;
    document.getElementById('enderecoFields').hidden = false;
    const freteTexto = frete.valor === 0 ? t('msg_frete_gratis') : 'R$ ' + frete.valor.toFixed(2).replace('.', ',');
    statusEl.textContent = t('msg_frete_resultado', { frete: freteTexto, prazo: frete.prazoDias });

    atualizarOpcaoRetiradaAraraquara(cep);
    aplicarRetiradaNoFrete();
    Cart.render();
  } catch (err) {
    console.error(err);
    statusEl.textContent = t('msg_frete_erro');
  } finally {
    freteEmAndamento = false;
  }
}
document.getElementById('btnCalcularFrete').addEventListener('click', calcularFreteCep);
document.getElementById('inCep').addEventListener('input', (e) => {
  const digitos = e.target.value.replace(/\D/g, '');
  if (digitos.length === 8) calcularFreteCep();
});

// Araraquara (CEP 14800-14814, mesma faixa usada no backend pro frete
// regional) continua com entrega normal no próximo dia útil -- o dono pediu
// explicitamente pra NÃO prometer "entrega hoje" (isso era sugestão do
// manual do Gustavo, não decisão dele). Em vez disso, mostra a opção extra
// de retirar no endereço da loja pra quem preferir.
function cepEhAraraquaraFront(cep) {
  const digitos = String(cep || '').replace(/\D/g, '');
  if (digitos.length < 5) return false;
  const prefixo = Number(digitos.slice(0, 5));
  return prefixo >= 14800 && prefixo <= 14814;
}
function atualizarOpcaoRetiradaAraraquara(cep) {
  const containerEl = document.getElementById('cartRetiradaAraraquara');
  const checkboxEl = document.getElementById('inRetiradaAraraquara');
  if (!containerEl || !checkboxEl) return;
  const eAraraquara = cepEhAraraquaraFront(cep);
  containerEl.hidden = !eAraraquara;
  // Saiu de Araraquara (ex.: trocou o CEP) -- desmarca sem restaurar nenhum
  // valor guardado: o frete que acabou de ser cotado pro CEP novo (atribuído
  // em Cart.frete ANTES desta função ser chamada, ver calcularFreteCep) já
  // é o valor real certo, então o que estava guardado de Araraquara teria
  // que ser jogado fora mesmo, nunca reaplicado por cima do valor novo.
  if (!eAraraquara) {
    checkboxEl.checked = false;
    Cart.freteTransportadora = null;
  }
}
// Marcar "retirar na loja" zera o frete exibido (o que será cobrado de
// verdade também, já validado de novo no backend) sem precisar recalcular
// nada no Melhor Envio; desmarcar devolve o valor real que já tinha sido
// cotado, sem precisar chamar a API de frete outra vez. Chamada tanto pelo
// clique na caixinha quanto de novo a cada recálculo de frete (o peso pode
// ter mudado desde a última vez que a caixinha foi marcada).
function aplicarRetiradaNoFrete() {
  const checkboxEl = document.getElementById('inRetiradaAraraquara');
  if (!checkboxEl || !Cart.frete) return;
  if (checkboxEl.checked) {
    // Só reguarda o valor real se o frete atual não for o próprio zero que
    // a gente aplicou -- senão, marcar duas vezes sem desmarcar perderia o
    // valor real debaixo do zero já aplicado antes.
    if (Cart.frete.valor !== 0 || Cart.freteTransportadora == null) {
      Cart.freteTransportadora = Cart.frete.valor;
    }
    Cart.frete = { ...Cart.frete, valor: 0 };
  } else if (Cart.freteTransportadora != null) {
    Cart.frete = { ...Cart.frete, valor: Cart.freteTransportadora };
    Cart.freteTransportadora = null;
  }
}
document.getElementById('inRetiradaAraraquara').addEventListener('change', () => {
  aplicarRetiradaNoFrete();
  Cart.render();
});

// Validação padrão de CPF (dígitos verificadores) — recusa também sequências
// óbvias tipo "00000000000" que passariam na conta mas nunca são um CPF real.
function cpfValido(cpf) {
  cpf = String(cpf || '').replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i], 10) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9], 10)) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i], 10) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10], 10);
}

// Erro de checkout: usa a mesma nota que já avisava "calcule o frete antes"
// (existe em todas as páginas que têm carrinho) em vez de alert(), que trava
// a tela inteira -- reclamação explícita do manual da Black. Foca o campo
// problemático pra pessoa já saber onde corrigir. A flag erroCheckoutAtivo
// avisa Cart.render() (cart.js) pra não pisar nesse aviso enquanto ele
// estiver no ar -- sem ela, qualquer render() disparado por outro motivo
// (troca de idioma, chegada tardia da config da Black) apagava o erro de
// campo sem o problema ter sido corrigido.
let erroCheckoutAtivo = false;
function mostrarErroCheckout(msg, focusId) {
  erroCheckoutAtivo = true;
  const avisoEl = document.getElementById('cartAvisoFrete');
  avisoEl.textContent = msg;
  avisoEl.hidden = false;
  if (focusId) document.getElementById(focusId)?.focus();
}
function esconderErroCheckout() {
  erroCheckoutAtivo = false;
  const avisoEl = document.getElementById('cartAvisoFrete');
  // Só esconde se não for o aviso padrão de "calcule o frete" (esse quem
  // controla é Cart.render(), que sabe se o frete já foi calculado ou não).
  if (Cart.frete) avisoEl.hidden = true;
}

document.getElementById('checkoutBtn').addEventListener('click', async () => {
  const btn = document.getElementById('checkoutBtn');

  const nome = document.getElementById('inNome').value.trim();
  const email = document.getElementById('inEmail').value.trim();
  const telefone = document.getElementById('inTelefone').value.trim();
  const cpf = document.getElementById('inCpf').value.replace(/\D/g, '');
  const cnpj = document.getElementById('inCnpj').value.replace(/\D/g, '');
  const numero = document.getElementById('inNumero').value.trim();
  const complemento = document.getElementById('inComplemento').value.trim();
  const retiradaCheckbox = document.getElementById('inRetiradaAraraquara');
  const retirada = !!(retiradaCheckbox && retiradaCheckbox.checked);

  if (!Cart.frete) {
    mostrarErroCheckout(t('msg_calcule_frete_antes'), 'inCep');
    return;
  }
  if (!nome) { mostrarErroCheckout(t('msg_preencha_dados'), 'inNome'); return; }
  if (!email) { mostrarErroCheckout(t('msg_preencha_dados'), 'inEmail'); return; }
  if (!cpf) { mostrarErroCheckout(t('msg_preencha_dados'), 'inCpf'); return; }
  if (!numero) { mostrarErroCheckout(t('msg_preencha_dados'), 'inNumero'); return; }
  // O type="email" do navegador aceita endereço sem ponto no domínio (ex.:
  // "nome@hotmailcom") — já vazou pedido aprovado com e-mail assim, cujo
  // envio (confirmação + rastreio) falhou silenciosamente pro cliente nunca
  // saber. Essa checagem extra exige pelo menos um ponto depois do @.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarErroCheckout(t('msg_email_invalido'), 'inEmail');
    return;
  }
  if (!cpfValido(cpf)) {
    mostrarErroCheckout(t('msg_cpf_invalido'), 'inCpf');
    return;
  }
  esconderErroCheckout();

  if (window.gtag) {
    gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: Cart.grandTotal(),
      items: Cart.toLineItems().map((i) => ({ item_id: i.id, item_name: i.title, price: i.unit_price, quantity: i.quantity }))
    });
  }
  if (window.fbq) {
    const lineItems = Cart.toLineItems();
    fbq('track', 'InitiateCheckout', {
      content_ids: lineItems.map((i) => i.id),
      content_type: 'product',
      contents: lineItems.map((i) => ({ id: i.id, quantity: i.quantity })),
      currency: 'BRL',
      value: Cart.grandTotal(),
      num_items: lineItems.reduce((sum, i) => sum + i.quantity, 0)
    });
  }

  btn.disabled = true;
  btn.textContent = t('msg_processando');
  try {
    const res = await fetch(`${API_BASE}/api/create-preference`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: Cart.toLineItems(),
        frete: Cart.frete.valor,
        cliente: { nome, email, telefone, cpf, cnpj },
        entrega: { ...Cart.entrega, numero, complemento, retirada }
      })
    });
    if (!res.ok) throw new Error('Falha ao criar pagamento');
    const data = await res.json();
    window.location.href = data.init_point; // redireciona pro checkout da InfinitePay
  } catch (err) {
    alert(t('msg_pagamento_erro'));
    console.error(err);
    btn.disabled = false;
    btn.textContent = t('cart_checkout_btn');
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
  // Categoria vinda de outra página (ex.: index.html?categoria=drip#produtos,
  // gerado por renderCategoryStrip) -- só aplica se for uma categoria real.
  const categoriaUrl = new URLSearchParams(location.search).get('categoria');
  if (categoriaUrl && CATEGORIES.some((c) => c.id === categoriaUrl)) activeFilter = categoriaUrl;
  renderCategoryStrip();
  renderFilterPills();
  renderProducts();
  // Produto específico vindo de outra página pelo menu de categorias (ex.:
  // index.html?categoria=acessorios#produto-copo-termico-350) -- o navegador
  // só tenta pular sozinho pra esse #hash uma vez, antes do card existir no
  // DOM (ele só é criado/revelado pelo renderProducts() logo acima), então
  // sem isso o link nunca rolava até o produto certo.
  if (location.hash.startsWith('#produto-')) {
    destacarProduto(decodeURIComponent(location.hash.slice('#produto-'.length)));
  }
  Cart.render();
  injetarSchemaProdutos();
  // Avisa páginas de ficha de produto (ex.: drip-coffee.html) que o catálogo
  // real acabou de chegar da API -- sem isso, uma página que lê preço/peso
  // direto de PRODUCTS no carregamento mostraria o valor do catálogo de
  // emergência (js/products.js, só atualizado de vez em quando) até a
  // pessoa trocar de idioma ou interagir com algo que re-renderize.
  if (typeof window.onCatalogLoaded === 'function') window.onCatalogLoaded();
}

// Dados estruturados (Schema.org) pros produtos, pra buscadores poderem
// mostrar preço/disponibilidade no resultado de busca. Gerado a partir do
// catálogo que acabou de carregar (nunca hardcoded) pra nunca ficar
// desatualizado quando preço/produto mudar. Sem página própria por produto
// o Google não cria um rich result separado pra cada um, mas os dados ficam
// corretos e disponíveis mesmo assim.
function injetarSchemaProdutos() {
  const anterior = document.getElementById('schema-produtos');
  if (anterior) anterior.remove();

  const graph = PRODUCTS.map((p) => ({
    '@type': 'Product',
    name: p.nome,
    description: p.descricao,
    image: `${location.origin}/${p.img}`,
    sku: p.id,
    brand: { '@type': 'Brand', name: 'Café Só Grãos' },
    offers: {
      '@type': 'Offer',
      url: `${location.origin}/#produtos`,
      priceCurrency: 'BRL',
      price: Number(p.preco).toFixed(2),
      availability: 'https://schema.org/InStock'
    }
  }));

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'schema-produtos';
  script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  document.head.appendChild(script);
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
  let ultimasAvaliacoes = [];

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

    if (!nome || !produto || !notaSelecionada) {
      statusEl.textContent = t('av_msg_preencha');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    statusEl.textContent = t('av_msg_enviando');

    try {
      const res = await fetch(`${API_BASE}/api/avaliacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, produto, nota: notaSelecionada, comentario })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao enviar avaliação');

      statusEl.textContent = t('av_msg_sucesso');
      form.reset();
      notaSelecionada = 0;
      renderEstrelas();
    } catch (err) {
      console.error(err);
      statusEl.textContent = t('av_msg_erro');
    } finally {
      btn.disabled = false;
    }
  });

  // "Comprou: Tradicional" etc. — o valor vem gravado em português (é o
  // mesmo texto validado no backend), só a legenda exibida é traduzida.
  // "Gourmet" não tem mais chave de tradução (linha descontinuada) — quem já
  // tinha avaliação marcada com ela continua mostrando o texto "Gourmet" (o
  // valor cru salvo no banco), só não traduz pros outros idiomas.
  const CHAVE_LINHA = { Tradicional: 'av_opt_tradicional', Especial: 'av_opt_especial', 'Drip Coffee': 'av_opt_drip' };

  function renderAvaliacoes() {
    if (!ultimasAvaliacoes.length) return;
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    grid.innerHTML = ultimasAvaliacoes.map((a) => `
      <div class="avaliacao-card">
        <div class="avaliacao-estrelas-view">${'★'.repeat(a.rating)}${'☆'.repeat(5 - a.rating)}</div>
        ${a.product_line ? `<span class="avaliacao-produto">${t('av_comprou')}: ${esc(CHAVE_LINHA[a.product_line] ? t(CHAVE_LINHA[a.product_line]) : a.product_line)}</span>` : ''}
        ${a.comment ? `<p>"${esc(a.comment)}"</p>` : ''}
        <span class="avaliacao-autor">${esc(a.customer_name)}</span>
      </div>
    `).join('');
  }

  async function carregarAvaliacoes() {
    try {
      const res = await fetch(`${API_BASE}/api/avaliacoes`);
      if (!res.ok) throw new Error('Falha ao buscar avaliações');
      const avaliacoes = await res.json();
      if (!Array.isArray(avaliacoes) || !avaliacoes.length) return;
      ultimasAvaliacoes = avaliacoes;
      renderAvaliacoes();
    } catch (err) {
      console.error('Não foi possível carregar as avaliações.', err);
    }
  }

  carregarAvaliacoes();
  window.renderAvaliacoesNoIdioma = renderAvaliacoes;
})();

// Formulário "avise-me": captura contato de quem ainda não comprou, pra
// reengajar depois com novidade de torra ou promoção.
(function novidadesInit() {
  const form = document.getElementById('formNovidades');
  const statusEl = document.getElementById('novidadesStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('ndNome').value.trim();
    const email = document.getElementById('ndEmail').value.trim();
    const telefone = document.getElementById('ndWhatsapp').value.trim();

    if (!email) {
      statusEl.textContent = t('nd_msg_preencha_email');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    statusEl.textContent = t('nd_msg_enviando');

    try {
      const res = await fetch(`${API_BASE}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao salvar contato');

      statusEl.textContent = t('nd_msg_sucesso');
      form.reset();
    } catch (err) {
      console.error(err);
      statusEl.textContent = t('nd_msg_erro');
    } finally {
      btn.disabled = false;
    }
  });
})();

// Popup de cadastro (nome + telefone) na entrada do site: quem se cadastra
// aqui ganha 2 Drip Coffee de brinde (em vez de 1) na primeira compra. Só
// marca como "já cadastrado" (nunca mais aparece) depois de um cadastro com
// sucesso. Fechar com o X (ou clicar fora) só dispensa pra essa visita,
// reaparece na próxima — mas "essa visita" cruza várias páginas (cada
// clique em um link recarrega a página do zero), então sem guardar isso em
// algum lugar entre páginas ele reaparecia a cada navegação. sessionStorage
// resolve: dura enquanto a aba ficar aberta, zera numa visita nova de
// verdade (fechar a aba/reabrir o site).
(function popupCadastroInit() {
  const overlay = document.getElementById('popupCadastroOverlay');
  const closeBtn = document.getElementById('popupCadastroClose');
  const form = document.getElementById('formPopupCadastro');
  const statusEl = document.getElementById('popupCadastroStatus');
  const cepInput = document.getElementById('popupCep');
  const freteEl = document.getElementById('popupCadastroFrete');
  if (!overlay || !form) return;

  const CADASTRADO_KEY = 'cafesograos-cadastro-popup';
  const JA_MOSTROU_SESSAO_KEY = 'cafesograos-popup-mostrou-sessao';

  function fechar() {
    overlay.classList.remove('open');
  }

  closeBtn.addEventListener('click', fechar);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });

  // Revela a condição de frete grátis da pessoa assim que ela termina de
  // digitar o CEP (8 dígitos) — antes mesmo de enviar o formulário. Mesmas
  // 3 faixas do servidor (ver freteGratisParaCep em server.js), só pra
  // decidir qual mensagem mostrar aqui; o frete de verdade é sempre
  // calculado no carrinho, nunca a partir disso.
  if (cepInput && freteEl) {
    cepInput.addEventListener('input', () => {
      const digits = cepInput.value.replace(/\D/g, '');
      if (digits.length < 8) {
        freteEl.classList.remove('show');
        return;
      }
      const prefixo = Number(digits.slice(0, 5));
      let chave, valor;
      if (prefixo >= 14800 && prefixo <= 14814) { chave = 'popup_frete_araraquara'; valor = freteGratisMinimo('araraquara-regiao'); }
      else if (prefixo >= 1000 && prefixo <= 19999) { chave = 'popup_frete_sp'; valor = freteGratisMinimo('SP'); }
      else { chave = 'popup_frete_brasil'; valor = freteGratisMinimo('BR'); }
      if (valor == null) { freteEl.classList.remove('show'); return; } // config ainda não carregou
      freteEl.textContent = t(chave, { valor });
      freteEl.classList.add('show');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('popupNome').value.trim();
    const telefone = document.getElementById('popupTelefone').value.trim();
    const cep = cepInput ? cepInput.value.trim() : '';

    if (!nome || telefone.replace(/\D/g, '').length < 10) {
      statusEl.textContent = t('popup_cadastro_msg_preencha');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    statusEl.textContent = t('popup_cadastro_msg_enviando');

    try {
      const res = await fetch(`${API_BASE}/api/cadastro-popup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone, cep })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao cadastrar');

      localStorage.setItem(CADASTRADO_KEY, '1');
      statusEl.textContent = t('popup_cadastro_msg_sucesso');
      setTimeout(fechar, 2000);
    } catch (err) {
      console.error(err);
      statusEl.textContent = t('popup_cadastro_msg_erro');
      btn.disabled = false;
    }
  });

  // Pequeno atraso pra não competir com o carregamento inicial da página.
  // Marca "já mostrou nessa sessão" no instante que abre -- não só quando
  // fecha -- pra nunca reaparecer de novo navegando pra outra página, nem
  // que a pessoa saia sem interagir com o popup.
  if (!localStorage.getItem(CADASTRADO_KEY) && !sessionStorage.getItem(JA_MOSTROU_SESSAO_KEY)) {
    setTimeout(() => {
      // Esse popup oferece o brinde de boas-vindas (Drip Coffee + cashback),
      // que fica pausado durante a Black pra não confundir com o copo/frete
      // grátis da promoção (decisão do dono, 26/11/2026) -- espera a config
      // da Black chegar antes de decidir (ela já começou a carregar lá em
      // cima, então aqui isso quase nunca significa esperar de verdade).
      freteGratisConfigPronta.then(() => {
        if (blackFridayAtiva()) return;
        overlay.classList.add('open');
        sessionStorage.setItem(JA_MOSTROU_SESSAO_KEY, '1');
      });
    }, 1200);
  }
})();

// Quando o idioma muda, redesenha tudo que foi montado dinamicamente em JS
// (o data-i18n cuida sozinho do texto estático do HTML).
window.onLanguageChange = function () {
  renderCategoryStrip();
  renderFilterPills();
  renderProducts();
  Cart.render();
  atualizarAnnounceBar();
  atualizarAraraquaraSubtitle();
  if (typeof window.renderAvaliacoesNoIdioma === 'function') window.renderAvaliacoesNoIdioma();
};

// Degradê do hero: em vez de um degradê já pronto parado num pedaço fixo da
// foto, o véu laranja (.hero::after, que nasce com opacity 0 no CSS) vai
// ficando mais opaco ao vivo conforme a pessoa rola a página — a foto some
// aos poucos e o laranja entra, terminando 100% opaco bem na hora em que o
// hero sai de cena e a vitrine de produtos (que já é laranja sólido) assume.
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  function atualizarVeuHero() {
    const alturaHero = hero.offsetHeight || 1;
    const progresso = Math.min(1, Math.max(0, window.scrollY / alturaHero));
    hero.style.setProperty('--veu-opacity', progresso);
  }

  window.addEventListener('scroll', atualizarVeuHero, { passive: true });
  window.addEventListener('resize', atualizarVeuHero);
  atualizarVeuHero();
})();

// Degradê de fundo: a vitrine de produtos (.produtos) já nasce 100% laranja
// logo após o hero — sem espaço antes dela pra fazer o laranja "crescer".
// Em vez disso, o degradê acontece DEPOIS: a cor vai esmaecendo do laranja
// cheio (encostando no fim da vitrine) de volta pro branco, conforme a
// página desce pelas seções seguintes (origem, destaques, objeções, linhas)
// — suaviza o corte seco laranja→branco em vez de um salto abrupto.
// Pinta o background-color direto nas seções via inline style (prioridade
// maior que o CSS, então não precisa remover o background padrão de cada
// uma — se o JS falhar, cada seção some pro fundo estático de sempre).
(function () {
  const secoesDegrade = document.querySelectorAll('.origem, .destaques, .objecoes, .linhas');
  const produtosEl = document.querySelector('.produtos');
  const ultimaSecao = secoesDegrade[secoesDegrade.length - 1];
  if (!secoesDegrade.length || !produtosEl || !ultimaSecao) return;

  const BRANCO = [255, 255, 255];
  const LARANJA = [214, 107, 62]; // --laranja (#D66B3E)

  function atualizarDegrade() {
    const inicio = produtosEl.offsetTop + produtosEl.offsetHeight;
    const fim = ultimaSecao.offsetTop + ultimaSecao.offsetHeight;
    const progresso = fim > inicio
      ? Math.min(1, Math.max(0, (window.scrollY - inicio) / (fim - inicio)))
      : 0;
    const [r, g, b] = LARANJA.map((c, i) => Math.round(c + (BRANCO[i] - c) * progresso));
    const cor = `rgb(${r}, ${g}, ${b})`;
    secoesDegrade.forEach((el) => { el.style.backgroundColor = cor; });
  }

  window.addEventListener('scroll', atualizarDegrade, { passive: true });
  window.addEventListener('resize', atualizarDegrade);
  atualizarDegrade();
})();
