// Sistema de troca de idioma do site (PT/EN/ES). Elementos marcados com
// data-i18n="chave" têm o texto trocado pela tradução correspondente;
// data-i18n-placeholder/data-i18n-aria-label/data-i18n-title fazem o mesmo
// pros respectivos atributos. Preferência salva no localStorage — cada
// página novamente carregada já abre no idioma escolhido antes.
const TRANSLATIONS = {
  pt: {
    nav_produtos: 'Produtos', nav_sobre: 'Sobre', nav_contato: 'Contato',
    nav_rastrear: 'Rastrear pedido', nav_whatsapp: 'Pedir no WhatsApp', cart_label: 'CARRINHO',
    announce_bar: '🎁 Primeira compra: Drip Coffee de brinde + 5% na próxima · Frete grátis acima de R$ 300 para SP',

    hero_eyebrow: 'Da nossa roça para sua mesa',
    hero_title: 'Café brasileiro de verdade: torrado toda semana, direto do produtor para sua xícara.',
    hero_subtitle: 'Grãos selecionados com cuidado, em pequenos lotes. Peça online e receba fresquinho em casa.',
    hero_cta: 'Ver produtos',
    hero_badge1: '🔥 Torra semanal', hero_badge2: '🏆 83+ pontos SCA', hero_badge3: '🚚 Entrega para todo o Brasil',

    origem_eyebrow: 'Orgulho do agro brasileiro', origem_title: 'Da plantação até a sua xícara',
    origem_fig1: 'Plantação própria', origem_fig2: 'Grãos 100% arábica, selecionados um a um',
    origem_fig3: 'Beneficiamento cuidadoso, lote a lote',
    origem_nota: 'Nossos grãos vêm do Sul de Minas — um dos berços do café especial no Brasil — e são torrados e moídos por nós, aqui em Araraquara/SP.',

    destaques_statement: 'Torra recente, 100% arábica, entrega garantida.',
    destaque1_title: 'Torra recente', destaque1_desc: 'Torrado em pequenos lotes, toda semana',
    destaque2_title: 'Origem rastreada', destaque2_desc: 'Direto de produtores parceiros',
    destaque3_title: 'Entrega para todo o Brasil', destaque3_desc: 'Pagamento seguro via Mercado Pago',
    destaque4_title: 'Linha Especial 83+ SCA', destaque4_desc: 'Nossa torra de maior pontuação, avaliada oficialmente',
    sca_tooltip: 'Avaliado por cooperativa parceira: acima de 83 pontos na escala SCA (Specialty Coffee Association), o padrão internacional de café especial.',

    objecoes_title: 'Por que confiar no Só Grãos',
    objecao1_title: 'Rastreabilidade real', objecao1_desc: 'Direto de produtores parceiros do Sul de Minas, sem intermediário, até a sua xícara.',
    objecao2_title: 'Consistência entre lotes', objecao2_desc: 'O resultado que você aprovou hoje é o mesmo que chega no seu próximo pedido.',
    objecao3_title: 'Preço justo, torra a torra', objecao3_desc: 'Qualidade de verdade, sem economizar no grão — semana após semana.',

    linhas_eyebrow: 'Guia rápido', linhas_title: 'Tradicional, Gourmet ou Especial?',
    linhas_subtitle: 'Três linhas, cada uma pensada para um momento diferente.',
    linha_trad_badge: 'Tradicional', linha_trad_title: 'Para o dia a dia',
    linha_trad_desc: 'Uma mistura equilibrada de grãos com diferentes níveis de maturação. A torra mais forte padroniza o sabor e a cor — o resultado é um café encorpado e constante, 100% arábica.',
    linha_gourmet_badge: 'Gourmet', linha_gourmet_title: 'Um upgrade de qualidade',
    linha_gourmet_desc: 'Grãos selecionados um a um, com menos imperfeições (quebrados, grandes ou pequenos demais) e maturação bem mais uniforme entre eles. O resultado: sabor mais equilibrado e uma xícara mais limpa.',
    linha_especial_badge: 'Especial', linha_especial_title: 'Para quem quer o topo',
    linha_especial_desc: 'Avaliado numa escala internacional de pontuação (SCA), com nota acima de 80 — rastreável até a origem, com notas aromáticas complexas. Nosso café mais sofisticado.',
    linha_suave: 'Suave', linha_intenso: 'Intenso',

    produtos_title: 'Nossos cafés', produtos_subtitle: 'Grãos selecionados, torras variadas — do suave ao intenso.',
    filter_todos: 'Todos', add_button: 'Adicionar',

    avaliacoes_eyebrow: 'Prova real', avaliacoes_title: 'O que dizem sobre nós',
    avaliacoes_empty: 'Ainda não temos avaliações publicadas — seja a primeira pessoa a contar como foi sua experiência!',
    avaliacoes_form_title: 'Já comprou conosco? Deixe sua avaliação',
    avaliacoes_form_note: 'Toda avaliação passa por uma revisão rápida antes de aparecer no site.',
    av_ph_nome: 'Seu nome', av_select_placeholder: 'Qual linha você comprou?',
    av_opt_tradicional: 'Tradicional', av_opt_gourmet: 'Gourmet', av_opt_especial: 'Especial', av_opt_drip: 'Drip Coffee',
    av_estrelas_aria: 'Nota de 1 a 5',
    av_estrela1_aria: '1 estrela', av_estrela2_aria: '2 estrelas', av_estrela3_aria: '3 estrelas',
    av_estrela4_aria: '4 estrelas', av_estrela5_aria: '5 estrelas',
    av_ph_comentario: 'Conte como foi sua experiência com o Café Só Grãos', av_submit: 'Enviar avaliação',
    av_comprou: 'Comprou',

    sobre_eyebrow: 'Nossa história', sobre_title: 'Uma história movida a café',
    sobre_p1: 'Para mim, não existe dia sem café. Seja de manhã, à tarde ou à noite, ele está sempre presente. É o café que desperta, traz uma pausa, acompanha o trabalho, deixa a leitura mais agradável e transforma uma conversa simples em um momento especial.',
    sobre_p2: 'Posso dizer, sem exagero: sou movido a café.',
    sobre_p3: 'O Café Só Grãos nasceu dessa paixão e de uma inquietação. Ao observar as opções disponíveis no mercado, percebi que muitos brasileiros ainda precisavam escolher entre preço e qualidade. Eu queria mostrar que era possível oferecer um café 100% arábica, feito com cuidado e transparência, sem transformá-lo em algo reservado apenas para ocasiões especiais.',
    sobre_p4: 'Foi assim que nasceu a proposta das nossas linhas.',
    sobre_p5: 'O Café Só Grãos Tradicional é o parceiro do dia a dia. É o café que eu quis popularizar para fazer parte da rotina: no começo da manhã, na pausa do trabalho ou naquele momento em que tudo o que precisamos é de uma boa xícara de café.',
    sobre_p6: 'As linhas Gourmet e Especial foram criadas para quando a ocasião pede uma experiência diferente: um café da manhã com a família ou os amigos, um momento de lazer, uma conversa importante, a celebração de um negócio ou simplesmente o desejo de apreciar cada detalhe da bebida.',
    sobre_p7: 'Todos os nossos cafés são 100% arábica. Nas linhas Gourmet e Especial, trabalhamos também com grãos selecionados e perfis de torra desenvolvidos para valorizar os aromas, sabores e características de cada lote.',
    sobre_p8: 'Uma parte importante dos nossos cafés vem do Sul de Minas, região reconhecida por suas condições favoráveis ao cultivo. A altitude e o clima contribuem para uma maturação mais uniforme dos frutos e ajudam a encontrar lotes com qualidade consistente. Mas nossa busca não termina ali: também trabalhamos com produtores de outras regiões do Brasil, sempre procurando cafés que estejam de acordo com aquilo em que acreditamos.',
    sobre_p9: 'Guardo com carinho alguns momentos do início dessa história: a decisão de criar a marca, o aroma da primeira torra e a emoção da primeira entrega. Foi quando percebi que aquela ideia poderia se transformar em algo muito maior.',
    sobre_p10: 'Desde então, ver o Café Só Grãos chegar a novos lugares e conquistar espaço na mesa dos brasileiros tem sido uma das partes mais gratificantes dessa jornada.',
    sobre_p11: 'Hoje, continuo à frente dos principais passos da operação, mas nada disso é construído sozinho. Tenho ao meu lado uma equipe que participa da produção, da torra e da distribuição. São pessoas que, todas as semanas, trabalham comigo para que cada café seja preparado e entregue com o cuidado que deu origem à nossa marca.',
    sobre_p12: 'O Café Só Grãos nasceu da minha paixão pelo café, mas cresce todos os dias graças às pessoas que acreditam nessa história — da lavoura à xícara.',
    sobre_tagline: 'Café Só Grãos. Um café para cada momento.',
    sobre_cta: 'Conheça nosso catálogo',

    torra_eyebrow: 'Nossa torra', torra_title: 'Lotes pequenos, torrados toda semana',
    torra_text: 'Se você gosta de café com personalidade, mas sem discurso de sommelier, você está no lugar certo. Torramos perto da entrega para chegar sempre fresco na sua casa.',

    b2b_title: 'Tenha um café especial para seus clientes', b2b_eyebrow: 'Venda corporativa',
    b2b_text: 'Da cafeteria ao escritório, seu café também fala sobre o seu negócio. Fornecemos em volume, com a mesma torra fresca e cuidado de sempre — para quem quer servir bem quem entra pela porta.',
    b2b_cta: 'Fale sobre parceria B2B',

    contato_title: 'Fale conosco', contato_text: 'Dúvidas sobre pedidos, atacado ou parcerias? Envie uma mensagem.',

    novidades_eyebrow: 'Ainda não decidiu?', novidades_title: 'Fique sabendo da próxima torra',
    novidades_text: 'Deixe seu contato e a gente avisa quando sair uma torra nova ou uma promoção — sem spam.',
    nd_ph_nome: 'Seu nome (opcional)', nd_ph_email: 'Seu e-mail', nd_ph_whatsapp: 'Seu WhatsApp (opcional)',
    nd_submit: 'Quero ficar sabendo',
    nd_msg_preencha_email: 'Preencha ao menos o e-mail.', nd_msg_enviando: 'Enviando...',
    nd_msg_sucesso: 'Prontinho! Você vai ficar sabendo das novidades em primeira mão.',
    nd_msg_erro: 'Não foi possível salvar seu contato agora. Tente novamente em instantes.',

    footer_menu: 'Menu', footer_ajuda: 'Ajuda', footer_falecom: 'Fale conosco',
    footer_trocas: 'Trocas e devoluções', footer_rastrear: 'Rastrear pedido',
    footer_brand_title: 'Café Só Grãos',
    footer_brand_text: 'Selecionamos, torramos e embalamos cada lote com cuidado — do produtor até a sua xícara, em pequenos lotes toda semana.',
    footer_contato_title: 'Contato', footer_rights: 'Todos os direitos reservados.',
    footer_payment_note: 'Pagamento processado com segurança pelo Mercado Pago',

    cart_title: 'Seu carrinho', cart_close_aria: 'Fechar carrinho', cart_empty: 'Seu carrinho está vazio.',
    cart_entrega_title: 'Dados de entrega', cart_ph_cep: 'CEP', cart_btn_calcular_frete: 'Calcular frete',
    cart_ph_rua: 'Rua', cart_ph_numero: 'Número', cart_ph_complemento: 'Complemento (opcional)',
    cart_ph_nome: 'Nome completo', cart_ph_email: 'E-mail', cart_ph_telefone: 'Telefone / WhatsApp',
    cart_ph_cpf: 'CPF',
    cart_subtotal: 'Subtotal', cart_frete: 'Frete', cart_total: 'Total', cart_frete_gratis: 'Grátis',
    cart_checkout_btn: 'Finalizar compra', cart_checkout_note: 'Pagamento processado com segurança pelo Mercado Pago.',
    cart_open_aria: 'Abrir carrinho',

    lightbox_close: 'Fechar', lightbox_prev: 'Imagem anterior', lightbox_next: 'Próxima imagem',
    whatsapp_float_aria: 'Comprar pelo WhatsApp',
    menu_toggle_aria: 'Abrir menu', lang_switch_aria: 'Idioma',

    msg_cep_invalido: 'Digite um CEP válido.', msg_calculando_frete: 'Calculando frete...',
    msg_frete_gratis: 'Grátis 🎉', msg_frete_resultado: 'Frete: {frete} · entrega em até {prazo} dias úteis',
    msg_frete_erro: 'Não foi possível calcular o frete. Confira o CEP e tente de novo.',
    msg_calcule_frete_antes: 'Calcule o frete antes de finalizar a compra.',
    msg_preencha_dados: 'Preencha nome, e-mail, CPF e número do endereço para continuar.',
    msg_cpf_invalido: 'Digite um CPF válido.',
    msg_email_invalido: 'Digite um e-mail válido (ex.: nome@exemplo.com).',
    msg_processando: 'Processando...',
    msg_pagamento_erro: 'Não foi possível iniciar o pagamento. Tente novamente em instantes.',

    av_msg_preencha: 'Preencha nome, qual produto comprou, a nota e o comentário.', av_msg_enviando: 'Enviando...',
    av_msg_sucesso: 'Recebemos sua avaliação! Ela vai aparecer no site assim que for revisada.',
    av_msg_erro: 'Não foi possível enviar sua avaliação agora. Tente novamente em instantes.',

    politica_eyebrow: 'Institucional', politica_title: 'Trocas e devoluções',
    politica_h1: 'Arrependeu da compra? Sem problema.',
    politica_p1: 'Você tem até 7 dias corridos a partir do recebimento do produto para desistir da compra, sem precisar dar nenhum motivo — é um direito garantido pelo Código de Defesa do Consumidor (art. 49) para compras feitas fora de loja física.',
    politica_p2: 'Nesse caso, devolvemos 100% do valor pago, incluindo o frete, e o custo do envio de volta é por nossa conta.',
    politica_h2: 'Produto com defeito, errado ou danificado',
    politica_p3: 'Se algo chegou errado, com defeito ou danificado no transporte, trocamos o produto ou devolvemos o valor a qualquer momento dentro da validade do café — sem custo nenhum para você.',
    politica_h3: 'Como pedir uma troca ou devolução',
    politica_li1: 'Chame no WhatsApp', politica_li1b: 'ou mande e-mail para',
    politica_li2: 'Informe o número do seu pedido (está no e-mail de confirmação) e conte o que aconteceu',
    politica_li3: 'Combinamos com você a forma de devolução e o próximo passo',
    politica_btn_pedido: 'Consultar meu pedido', politica_btn_loja: 'Voltar à loja',

    privacidade_eyebrow: 'Institucional', privacidade_title: 'Política de Privacidade',
    privacidade_atualizado: 'Última atualização: agosto de 2026.',
    privacidade_h1: 'Quais dados coletamos',
    privacidade_p1: 'Quando você compra no nosso site, coletamos: nome, e-mail, telefone, endereço de entrega e CPF. O CPF é exigido pelo Mercado Pago para analisar o risco da transação e reduzir recusas de cartão — não guardamos o CPF no nosso próprio banco de dados, ele é enviado diretamente para o processador de pagamento.',
    privacidade_p2: 'Se você deixa seu contato no formulário "Fique sabendo da próxima torra", coletamos nome (opcional), e-mail e telefone (opcional). Se você envia uma avaliação de produto, coletamos seu nome, a nota e o comentário — que ficam visíveis publicamente na página do produto.',
    privacidade_p3: 'Também usamos o Google Analytics para entender, de forma agregada, como as pessoas navegam pelo site (páginas visitadas, produtos vistos, se a compra foi concluída). Isso não identifica você pessoalmente.',
    privacidade_h2: 'Por que coletamos esses dados',
    privacidade_li1: 'Processar seu pedido, calcular o frete e confirmar o pagamento',
    privacidade_li2: 'Enviar e-mails sobre o andamento da sua compra (confirmação, rastreio)',
    privacidade_li3: 'Avisar sobre novas torras e promoções, caso você peça isso explicitamente',
    privacidade_li4: 'Entender e melhorar o funcionamento do site',
    privacidade_h3: 'Com quem compartilhamos',
    privacidade_p4: 'Compartilhamos apenas o necessário com quem processa parte do pedido por nós: Mercado Pago (pagamento), Melhor Envio (cálculo e postagem do frete), Resend (envio dos e-mails transacionais) e Google Analytics (estatísticas de uso do site). Não vendemos nem alugamos seus dados para terceiros.',
    privacidade_h4: 'Por quanto tempo guardamos',
    privacidade_p5: 'Guardamos os dados do pedido enquanto necessário para cumprir obrigações fiscais e atender eventuais trocas, devoluções ou dúvidas sobre a compra. Contatos deixados no formulário de novidades ficam guardados até você pedir a remoção.',
    privacidade_h5: 'Seus direitos',
    privacidade_p6: 'De acordo com a Lei Geral de Proteção de Dados (LGPD), você pode a qualquer momento pedir para: saber quais dados temos sobre você, corrigir dados incorretos, apagar seus dados, ou parar de receber nossos avisos de novidades. Para isso, é só entrar em contato pelos canais abaixo.',
    privacidade_h6: 'Como falar com a gente',
    privacidade_li5: 'WhatsApp: (16) 99756-7559',
    privacidade_li6: 'E-mail: contato@cafesograos.com.br',
    privacidade_btn_loja: 'Voltar à loja',
    footer_privacidade: 'Política de Privacidade',
    checkout_consentimento: 'Ao finalizar a compra, você concorda com nossa',
    checkout_consentimento_link: 'Política de Privacidade',
    novidades_consentimento: 'Ao se cadastrar, você concorda com nossa',

    rastreio_eyebrow: 'Acompanhamento', rastreio_title: 'Rastrear pedido',
    rastreio_texto: 'Cole abaixo o número do pedido que enviamos no seu e-mail de confirmação.',
    rastreio_ph_numero: 'Número do pedido', rastreio_btn_consultar: 'Consultar',
    rastreio_btn_loja: 'Voltar à loja', rastreio_btn_whatsapp: 'Falar no WhatsApp',
    rastreio_msg_consultando: 'Consultando...',
    rastreio_msg_nao_encontrado: 'Não encontramos esse pedido. Confira o número (veja no e-mail de confirmação) e tente de novo.',
    rastreio_codigo: 'Código de rastreio',
    status_pending: 'Pagamento em processamento', status_approved: 'Pagamento aprovado',
    status_rejected: 'Pagamento não aprovado', status_in_process: 'Pagamento em análise',
    status_cancelled: 'Pedido cancelado', status_refunded: 'Pedido reembolsado',
    status_enviado: '— enviado', status_preparando: '— preparando envio',

    resultado_sucesso_eyebrow: 'Pedido confirmado', resultado_sucesso_title: 'Pagamento aprovado!',
    resultado_sucesso_texto: 'Obrigado pelo pedido! Você já vai receber um e-mail confirmando os detalhes, e assim que despacharmos seu café, mandamos outro com o código de rastreio.',
    resultado_resumo_title: 'Resumo do pedido', resultado_total: 'Total',
    resultado_btn_loja: 'Voltar à loja', resultado_btn_whatsapp: 'Falar no WhatsApp',

    resultado_pendente_eyebrow: 'Pagamento em análise', resultado_pendente_title: 'Seu pagamento está em análise',
    resultado_pendente_texto: 'Isso pode acontecer com algumas formas de pagamento (como boleto ou análise antifraude). Assim que for aprovado, avisamos por e-mail com todos os detalhes do pedido.',

    resultado_falha_eyebrow: 'Pagamento não concluído', resultado_falha_title: 'Não foi possível concluir o pagamento',
    resultado_falha_texto: 'Não se preocupe, nada foi cobrado. Seu carrinho continua salvo — volte à loja e tente novamente, ou fale conosco se o problema continuar.'
  },

  en: {
    nav_produtos: 'Products', nav_sobre: 'About', nav_contato: 'Contact',
    nav_rastrear: 'Track order', nav_whatsapp: 'Order on WhatsApp', cart_label: 'CART',
    announce_bar: '🎁 First purchase: free Drip Coffee + 5% off next order · Free shipping over R$ 300 for São Paulo state',

    hero_eyebrow: 'From our farm to your table',
    hero_title: 'Real Brazilian coffee: roasted every week, straight from the producer to your cup.',
    hero_subtitle: 'Carefully selected beans, in small batches. Order online and get it fresh at home.',
    hero_cta: 'View products',
    hero_badge1: '🔥 Weekly roast', hero_badge2: '🏆 83+ SCA points', hero_badge3: '🚚 Shipping all over Brazil',

    origem_eyebrow: 'Proud of Brazilian agriculture', origem_title: 'From the plantation to your cup',
    origem_fig1: 'Our own farm', origem_fig2: '100% arabica beans, hand-picked one by one',
    origem_fig3: 'Careful processing, batch by batch',
    origem_nota: 'Our beans come from Sul de Minas — one of the birthplaces of specialty coffee in Brazil — and are roasted and ground by us, here in Araraquara, São Paulo.',

    destaques_statement: 'Fresh roast, 100% arabica, guaranteed delivery.',
    destaque1_title: 'Fresh roast', destaque1_desc: 'Roasted in small batches, every week',
    destaque2_title: 'Traceable origin', destaque2_desc: 'Straight from partner producers',
    destaque3_title: 'Shipping all over Brazil', destaque3_desc: 'Secure payment via Mercado Pago',
    destaque4_title: 'Specialty line 83+ SCA', destaque4_desc: 'Our highest-rated roast, officially evaluated',
    sca_tooltip: 'Rated by a partner cooperative: above 83 points on the SCA scale (Specialty Coffee Association), the international standard for specialty coffee.',

    objecoes_title: 'Why trust Só Grãos',
    objecao1_title: 'Real traceability', objecao1_desc: 'Straight from partner producers in Sul de Minas, no middleman, to your cup.',
    objecao2_title: 'Consistency between batches', objecao2_desc: 'The result you approved today is the same one that arrives in your next order.',
    objecao3_title: 'Fair price, roast after roast', objecao3_desc: 'Real quality, without cutting corners on the beans — week after week.',

    linhas_eyebrow: 'Quick guide', linhas_title: 'Traditional, Gourmet or Specialty?',
    linhas_subtitle: 'Three lines, each built for a different moment.',
    linha_trad_badge: 'Traditional', linha_trad_title: 'For everyday life',
    linha_trad_desc: 'A balanced blend of beans at different ripeness levels. The stronger roast standardizes flavor and color — the result is a full-bodied, consistent, 100% arabica coffee.',
    linha_gourmet_badge: 'Gourmet', linha_gourmet_title: 'A quality upgrade',
    linha_gourmet_desc: 'Beans hand-picked one by one, with fewer imperfections (broken, too big or too small) and much more even ripeness. The result: a more balanced flavor and a cleaner cup.',
    linha_especial_badge: 'Specialty', linha_especial_title: 'For those who want the best',
    linha_especial_desc: 'Rated on an international scoring scale (SCA), with a score above 80 — traceable to the origin, with complex aromatic notes. Our most sophisticated coffee.',
    linha_suave: 'Mild', linha_intenso: 'Intense',

    produtos_title: 'Our coffees', produtos_subtitle: 'Selected beans, varied roasts — from mild to intense.',
    filter_todos: 'All', add_button: 'Add',

    avaliacoes_eyebrow: 'Real proof', avaliacoes_title: 'What people say about us',
    avaliacoes_empty: 'No reviews published yet — be the first to share your experience!',
    avaliacoes_form_title: 'Already bought from us? Leave your review',
    avaliacoes_form_note: 'Every review goes through a quick check before appearing on the site.',
    av_ph_nome: 'Your name', av_select_placeholder: 'Which line did you buy?',
    av_opt_tradicional: 'Traditional', av_opt_gourmet: 'Gourmet', av_opt_especial: 'Specialty', av_opt_drip: 'Drip Coffee',
    av_estrelas_aria: 'Rating from 1 to 5',
    av_estrela1_aria: '1 star', av_estrela2_aria: '2 stars', av_estrela3_aria: '3 stars',
    av_estrela4_aria: '4 stars', av_estrela5_aria: '5 stars',
    av_ph_comentario: 'Tell us about your experience with Café Só Grãos', av_submit: 'Submit review',
    av_comprou: 'Bought',

    sobre_eyebrow: 'Our story', sobre_title: 'A story fueled by coffee',
    sobre_p1: 'For me, there is no day without coffee. Whether in the morning, afternoon or night, it is always there. It is the coffee that wakes you up, brings a pause, keeps you company at work, makes reading more enjoyable and turns a simple conversation into a special moment.',
    sobre_p2: 'I can say, without exaggeration: I run on coffee.',
    sobre_p3: 'Café Só Grãos was born from that passion and a restlessness. Looking at what was available on the market, I noticed that many Brazilians still had to choose between price and quality. I wanted to show it was possible to offer 100% arabica coffee, made with care and transparency, without turning it into something reserved only for special occasions.',
    sobre_p4: 'That is how the idea for our lines was born.',
    sobre_p5: 'Café Só Grãos Traditional is your everyday companion. It is the coffee I wanted to make part of everyone’s routine: first thing in the morning, during a work break, or whenever all you need is a good cup of coffee.',
    sobre_p6: 'The Gourmet and Specialty lines were created for when the occasion calls for something different: breakfast with family or friends, a moment of leisure, an important conversation, celebrating a deal, or simply the desire to savor every detail of the drink.',
    sobre_p7: 'All our coffees are 100% arabica. In the Gourmet and Specialty lines, we also work with selected beans and roast profiles developed to bring out the aromas, flavors and characteristics of each batch.',
    sobre_p8: 'A significant part of our coffee comes from Sul de Minas, a region known for its favorable growing conditions. The altitude and climate help the fruit ripen more evenly and make it easier to find batches with consistent quality. But our search does not end there: we also work with producers from other regions of Brazil, always looking for coffees that match what we believe in.',
    sobre_p9: 'I fondly keep a few memories from the early days of this story: the decision to create the brand, the smell of the first roast, and the excitement of the first delivery. That was when I realized that idea could become something much bigger.',
    sobre_p10: 'Since then, watching Café Só Grãos reach new places and win a spot on Brazilian tables has been one of the most rewarding parts of this journey.',
    sobre_p11: 'Today, I am still at the front of the main steps of the operation, but none of this is built alone. I have a team by my side that takes part in production, roasting and distribution. Every week, these people work with me so that each coffee is prepared and delivered with the same care that gave rise to our brand.',
    sobre_p12: 'Café Só Grãos was born from my passion for coffee, but it grows every day thanks to the people who believe in this story — from the field to the cup.',
    sobre_tagline: 'Café Só Grãos. A coffee for every moment.',
    sobre_cta: 'Check out our catalog',

    torra_eyebrow: 'Our roast', torra_title: 'Small batches, roasted every week',
    torra_text: 'If you like coffee with personality, without the sommelier talk, you are in the right place. We roast close to delivery so it always arrives fresh at your home.',

    b2b_title: 'Offer your customers a specialty coffee', b2b_eyebrow: 'Corporate sales',
    b2b_text: 'From the coffee shop to the office, your coffee also speaks about your business. We supply in volume, with the same fresh roast and care as always — for those who want to treat everyone who walks through the door well.',
    b2b_cta: 'Ask about a B2B partnership',

    contato_title: 'Get in touch', contato_text: 'Questions about orders, wholesale or partnerships? Send us a message.',

    novidades_eyebrow: 'Still not sure?', novidades_title: 'Find out about the next roast',
    novidades_text: 'Leave your contact and we will let you know when a new roast or promotion comes out — no spam.',
    nd_ph_nome: 'Your name (optional)', nd_ph_email: 'Your email', nd_ph_whatsapp: 'Your WhatsApp (optional)',
    nd_submit: 'Keep me posted',
    nd_msg_preencha_email: 'Please fill in at least the email.', nd_msg_enviando: 'Sending...',
    nd_msg_sucesso: 'All set! You will be the first to know about our news.',
    nd_msg_erro: 'We could not save your contact right now. Please try again shortly.',

    footer_menu: 'Menu', footer_ajuda: 'Help', footer_falecom: 'Get in touch',
    footer_trocas: 'Exchanges & returns', footer_rastrear: 'Track order',
    footer_brand_title: 'Café Só Grãos',
    footer_brand_text: 'We select, roast and pack every batch with care — from the producer to your cup, in small weekly batches.',
    footer_contato_title: 'Contact', footer_rights: 'All rights reserved.',
    footer_payment_note: 'Payment securely processed by Mercado Pago',

    cart_title: 'Your cart', cart_close_aria: 'Close cart', cart_empty: 'Your cart is empty.',
    cart_entrega_title: 'Delivery details', cart_ph_cep: 'ZIP code', cart_btn_calcular_frete: 'Calculate shipping',
    cart_ph_rua: 'Street', cart_ph_numero: 'Number', cart_ph_complemento: 'Complement (optional)',
    cart_ph_nome: 'Full name', cart_ph_email: 'Email', cart_ph_telefone: 'Phone / WhatsApp',
    cart_ph_cpf: 'CPF (Brazilian tax ID)',
    cart_subtotal: 'Subtotal', cart_frete: 'Shipping', cart_total: 'Total', cart_frete_gratis: 'Free',
    cart_checkout_btn: 'Checkout', cart_checkout_note: 'Payment securely processed by Mercado Pago.',
    cart_open_aria: 'Open cart',

    lightbox_close: 'Close', lightbox_prev: 'Previous image', lightbox_next: 'Next image',
    whatsapp_float_aria: 'Buy on WhatsApp',
    menu_toggle_aria: 'Open menu', lang_switch_aria: 'Language',

    msg_cep_invalido: 'Enter a valid ZIP code.', msg_calculando_frete: 'Calculating shipping...',
    msg_frete_gratis: 'Free 🎉', msg_frete_resultado: 'Shipping: {frete} · delivery within {prazo} business days',
    msg_frete_erro: 'We could not calculate shipping. Please check the ZIP code.',
    msg_calcule_frete_antes: 'Calculate shipping before checking out.',
    msg_preencha_dados: 'Please fill in name, email, CPF and address number to continue.',
    msg_cpf_invalido: 'Enter a valid CPF.',
    msg_email_invalido: 'Enter a valid email (e.g., name@example.com).',
    msg_processando: 'Processing...',
    msg_pagamento_erro: 'We could not start the payment. Please try again shortly.',

    av_msg_preencha: 'Fill in your name, which line you bought, the rating and the comment.', av_msg_enviando: 'Sending...',
    av_msg_sucesso: 'We received your review! It will appear on the site once it is checked.',
    av_msg_erro: 'We could not send your review right now. Please try again shortly.',

    politica_eyebrow: 'Company info', politica_title: 'Exchanges & returns',
    politica_h1: 'Changed your mind? No problem.',
    politica_p1: 'You have up to 7 calendar days from receiving the product to cancel the purchase, with no need to give a reason — it is a right guaranteed by Brazilian consumer protection law (CDC, art. 49) for purchases made outside a physical store.',
    politica_p2: 'In that case, we refund 100% of the amount paid, including shipping, and we cover the cost of sending it back.',
    politica_h2: 'Wrong, defective or damaged product',
    politica_p3: 'If something arrived wrong, defective, or damaged in transit, we will exchange the product or refund the amount at any time within the coffee’s shelf life — at no cost to you.',
    politica_h3: 'How to request an exchange or return',
    politica_li1: 'Message us on WhatsApp at', politica_li1b: 'or email',
    politica_li2: 'Give us your order number (it is in your confirmation email) and tell us what happened',
    politica_li3: 'We will work out the return method and next steps with you',
    politica_btn_pedido: 'Check my order', politica_btn_loja: 'Back to store',

    privacidade_eyebrow: 'About us', privacidade_title: 'Privacy Policy',
    privacidade_atualizado: 'Last updated: August 2026.',
    privacidade_h1: 'What data we collect',
    privacidade_p1: 'When you buy on our site, we collect: name, email, phone, delivery address and CPF (Brazilian tax ID). The CPF is required by Mercado Pago to assess transaction risk and reduce card declines — we do not store your CPF in our own database, it is sent directly to the payment processor.',
    privacidade_p2: 'If you leave your contact in the "Find out about the next roast" form, we collect name (optional), email and phone (optional). If you submit a product review, we collect your name, rating and comment — which are shown publicly on the product page.',
    privacidade_p3: 'We also use Google Analytics to understand, in aggregate, how people browse the site (pages visited, products viewed, whether a purchase was completed). This does not personally identify you.',
    privacidade_h2: 'Why we collect this data',
    privacidade_li1: 'Process your order, calculate shipping and confirm payment',
    privacidade_li2: 'Send emails about your order status (confirmation, tracking)',
    privacidade_li3: 'Let you know about new roasts and promotions, if you explicitly ask for that',
    privacidade_li4: 'Understand and improve how the site works',
    privacidade_h3: 'Who we share it with',
    privacidade_p4: 'We only share what is necessary with those who process part of the order for us: Mercado Pago (payment), Melhor Envio (shipping calculation and dispatch), Resend (transactional emails) and Google Analytics (site usage statistics). We do not sell or rent your data to third parties.',
    privacidade_h4: 'How long we keep it',
    privacidade_p5: 'We keep order data for as long as needed to meet tax obligations and handle any exchanges, returns or questions about the purchase. Contacts left in the news signup form are kept until you ask us to remove them.',
    privacidade_h5: 'Your rights',
    privacidade_p6: 'Under Brazil\'s General Data Protection Law (LGPD), you can at any time ask to: know what data we have about you, correct inaccurate data, delete your data, or stop receiving our news updates. Just get in touch through the channels below.',
    privacidade_h6: 'How to reach us',
    privacidade_li5: 'WhatsApp: (16) 99756-7559',
    privacidade_li6: 'Email: contato@cafesograos.com.br',
    privacidade_btn_loja: 'Back to store',
    footer_privacidade: 'Privacy Policy',
    checkout_consentimento: 'By checking out, you agree to our',
    checkout_consentimento_link: 'Privacy Policy',
    novidades_consentimento: 'By signing up, you agree to our',

    rastreio_eyebrow: 'Order tracking', rastreio_title: 'Track order',
    rastreio_texto: 'Paste below the order number we sent in your confirmation email.',
    rastreio_ph_numero: 'Order number', rastreio_btn_consultar: 'Track',
    rastreio_btn_loja: 'Back to store', rastreio_btn_whatsapp: 'Chat on WhatsApp',
    rastreio_msg_consultando: 'Looking it up...',
    rastreio_msg_nao_encontrado: 'We could not find that order. Check the number (see your confirmation email) and try again.',
    rastreio_codigo: 'Tracking code',
    status_pending: 'Payment processing', status_approved: 'Payment approved',
    status_rejected: 'Payment not approved', status_in_process: 'Payment under review',
    status_cancelled: 'Order cancelled', status_refunded: 'Order refunded',
    status_enviado: '— shipped', status_preparando: '— preparing shipment',

    resultado_sucesso_eyebrow: 'Order confirmed', resultado_sucesso_title: 'Payment approved!',
    resultado_sucesso_texto: 'Thanks for your order! You will receive an email confirming the details shortly, and as soon as we ship your coffee, we will send another one with the tracking code.',
    resultado_resumo_title: 'Order summary', resultado_total: 'Total',
    resultado_btn_loja: 'Back to store', resultado_btn_whatsapp: 'Chat on WhatsApp',

    resultado_pendente_eyebrow: 'Payment under review', resultado_pendente_title: 'Your payment is under review',
    resultado_pendente_texto: 'This can happen with some payment methods (like a boleto or anti-fraud checks). As soon as it is approved, we will email you with all the order details.',

    resultado_falha_eyebrow: 'Payment not completed', resultado_falha_title: 'We could not complete the payment',
    resultado_falha_texto: 'Don’t worry, nothing was charged. Your cart is still saved — go back to the store and try again, or get in touch if the problem continues.'
  },

  es: {
    nav_produtos: 'Productos', nav_sobre: 'Nosotros', nav_contato: 'Contacto',
    nav_rastrear: 'Rastrear pedido', nav_whatsapp: 'Pedir por WhatsApp', cart_label: 'CARRITO',
    announce_bar: '🎁 Primera compra: Drip Coffee de regalo + 5% en la próxima · Envío gratis a partir de R$ 300 para SP',

    hero_eyebrow: 'De nuestra finca a tu mesa',
    hero_title: 'Café brasileño de verdad: tostado cada semana, directo del productor a tu taza.',
    hero_subtitle: 'Granos seleccionados con cuidado, en lotes pequeños. Pide online y recíbelo recién hecho en casa.',
    hero_cta: 'Ver productos',
    hero_badge1: '🔥 Tueste semanal', hero_badge2: '🏆 83+ puntos SCA', hero_badge3: '🚚 Envíos a todo Brasil',

    origem_eyebrow: 'Orgullo del agro brasileño', origem_title: 'De la plantación a tu taza',
    origem_fig1: 'Plantación propia', origem_fig2: 'Granos 100% arábica, seleccionados uno a uno',
    origem_fig3: 'Beneficiado cuidadoso, lote a lote',
    origem_nota: 'Nuestros granos vienen del Sur de Minas — una de las cunas del café especial en Brasil — y los tostamos y molemos nosotros mismos, aquí en Araraquara/SP.',

    destaques_statement: 'Tueste reciente, 100% arábica, entrega garantizada.',
    destaque1_title: 'Tueste reciente', destaque1_desc: 'Tostado en lotes pequeños, cada semana',
    destaque2_title: 'Origen rastreable', destaque2_desc: 'Directo de productores asociados',
    destaque3_title: 'Envíos a todo Brasil', destaque3_desc: 'Pago seguro vía Mercado Pago',
    destaque4_title: 'Línea Especial 83+ SCA', destaque4_desc: 'Nuestro tueste de mayor puntuación, evaluado oficialmente',
    sca_tooltip: 'Evaluado por cooperativa asociada: más de 83 puntos en la escala SCA (Specialty Coffee Association), el estándar internacional de café especial.',

    objecoes_title: 'Por qué confiar en Só Grãos',
    objecao1_title: 'Trazabilidad real', objecao1_desc: 'Directo de productores asociados del Sur de Minas, sin intermediarios, hasta tu taza.',
    objecao2_title: 'Consistencia entre lotes', objecao2_desc: 'El resultado que aprobaste hoy es el mismo que llega en tu próximo pedido.',
    objecao3_title: 'Precio justo, tueste a tueste', objecao3_desc: 'Calidad de verdad, sin ahorrar en el grano — semana tras semana.',

    linhas_eyebrow: 'Guía rápida', linhas_title: '¿Tradicional, Gourmet o Especial?',
    linhas_subtitle: 'Tres líneas, cada una pensada para un momento diferente.',
    linha_trad_badge: 'Tradicional', linha_trad_title: 'Para el día a día',
    linha_trad_desc: 'Una mezcla equilibrada de granos con distintos niveles de maduración. El tueste más fuerte estandariza el sabor y el color — el resultado es un café con cuerpo y constante, 100% arábica.',
    linha_gourmet_badge: 'Gourmet', linha_gourmet_title: 'Una mejora de calidad',
    linha_gourmet_desc: 'Granos seleccionados uno a uno, con menos imperfecciones (rotos, demasiado grandes o pequeños) y una maduración mucho más uniforme entre ellos. El resultado: sabor más equilibrado y una taza más limpia.',
    linha_especial_badge: 'Especial', linha_especial_title: 'Para quien quiere lo mejor',
    linha_especial_desc: 'Evaluado en una escala internacional de puntuación (SCA), con nota superior a 80 — trazable hasta el origen, con notas aromáticas complejas. Nuestro café más sofisticado.',
    linha_suave: 'Suave', linha_intenso: 'Intenso',

    produtos_title: 'Nuestros cafés', produtos_subtitle: 'Granos seleccionados, tuestes variados — de suave a intenso.',
    filter_todos: 'Todos', add_button: 'Agregar',

    avaliacoes_eyebrow: 'Prueba real', avaliacoes_title: 'Lo que dicen sobre nosotros',
    avaliacoes_empty: 'Todavía no tenemos reseñas publicadas — ¡sé la primera persona en contar cómo fue tu experiencia!',
    avaliacoes_form_title: '¿Ya compraste con nosotros? Deja tu reseña',
    avaliacoes_form_note: 'Toda reseña pasa por una revisión rápida antes de aparecer en el sitio.',
    av_ph_nome: 'Tu nombre', av_select_placeholder: '¿Qué línea compraste?',
    av_opt_tradicional: 'Tradicional', av_opt_gourmet: 'Gourmet', av_opt_especial: 'Especial', av_opt_drip: 'Drip Coffee',
    av_estrelas_aria: 'Calificación de 1 a 5',
    av_estrela1_aria: '1 estrella', av_estrela2_aria: '2 estrellas', av_estrela3_aria: '3 estrellas',
    av_estrela4_aria: '4 estrellas', av_estrela5_aria: '5 estrellas',
    av_ph_comentario: 'Cuéntanos cómo fue tu experiencia con Café Só Grãos', av_submit: 'Enviar reseña',
    av_comprou: 'Compró',

    sobre_eyebrow: 'Nuestra historia', sobre_title: 'Una historia movida a café',
    sobre_p1: 'Para mí, no existe un día sin café. Ya sea por la mañana, por la tarde o por la noche, siempre está presente. Es el café que despierta, trae una pausa, acompaña el trabajo, hace la lectura más agradable y transforma una charla simple en un momento especial.',
    sobre_p2: 'Puedo decirlo sin exagerar: me muevo a café.',
    sobre_p3: 'Café Só Grãos nació de esa pasión y de una inquietud. Al observar las opciones disponibles en el mercado, noté que muchos brasileños todavía tenían que elegir entre precio y calidad. Quería demostrar que era posible ofrecer un café 100% arábica, hecho con cuidado y transparencia, sin convertirlo en algo reservado solo para ocasiones especiales.',
    sobre_p4: 'Así nació la propuesta de nuestras líneas.',
    sobre_p5: 'Café Só Grãos Tradicional es el compañero del día a día. Es el café que quise popularizar para que formara parte de la rutina: a primera hora de la mañana, en la pausa del trabajo o en ese momento en que lo único que necesitamos es una buena taza de café.',
    sobre_p6: 'Las líneas Gourmet y Especial fueron creadas para cuando la ocasión pide una experiencia diferente: un desayuno con la familia o los amigos, un momento de ocio, una conversación importante, la celebración de un negocio o simplemente el deseo de apreciar cada detalle de la bebida.',
    sobre_p7: 'Todos nuestros cafés son 100% arábica. En las líneas Gourmet y Especial, también trabajamos con granos seleccionados y perfiles de tueste desarrollados para resaltar los aromas, sabores y características de cada lote.',
    sobre_p8: 'Una parte importante de nuestro café viene del Sur de Minas, región reconocida por sus condiciones favorables para el cultivo. La altitud y el clima contribuyen a una maduración más uniforme de los frutos y ayudan a encontrar lotes con calidad consistente. Pero nuestra búsqueda no termina ahí: también trabajamos con productores de otras regiones de Brasil, siempre buscando cafés que estén de acuerdo con aquello en lo que creemos.',
    sobre_p9: 'Guardo con cariño algunos momentos del inicio de esta historia: la decisión de crear la marca, el aroma del primer tueste y la emoción de la primera entrega. Fue cuando percibí que esa idea podría convertirse en algo mucho más grande.',
    sobre_p10: 'Desde entonces, ver a Café Só Grãos llegar a nuevos lugares y ganar espacio en la mesa de los brasileños ha sido una de las partes más gratificantes de este camino.',
    sobre_p11: 'Hoy, sigo al frente de los principales pasos de la operación, pero nada de esto se construye solo. Tengo a mi lado un equipo que participa en la producción, el tueste y la distribución. Son personas que, cada semana, trabajan conmigo para que cada café sea preparado y entregado con el cuidado que dio origen a nuestra marca.',
    sobre_p12: 'Café Só Grãos nació de mi pasión por el café, pero crece cada día gracias a las personas que creen en esta historia — del cultivo a la taza.',
    sobre_tagline: 'Café Só Grãos. Un café para cada momento.',
    sobre_cta: 'Conoce nuestro catálogo',

    torra_eyebrow: 'Nuestro tueste', torra_title: 'Lotes pequeños, tostados cada semana',
    torra_text: 'Si te gusta el café con personalidad, pero sin discurso de sommelier, estás en el lugar correcto. Tostamos cerca de la entrega para que siempre llegue fresco a tu casa.',

    b2b_title: 'Ofrece un café especial a tus clientes', b2b_eyebrow: 'Venta corporativa',
    b2b_text: 'De la cafetería a la oficina, tu café también habla de tu negocio. Suministramos en volumen, con el mismo tueste fresco y cuidado de siempre — para quien quiere atender bien a quien entra por la puerta.',
    b2b_cta: 'Hablar sobre alianza B2B',

    contato_title: 'Hablemos', contato_text: '¿Dudas sobre pedidos, mayoreo o alianzas? Envía un mensaje.',

    novidades_eyebrow: '¿Todavía no decides?', novidades_title: 'Entérate del próximo tueste',
    novidades_text: 'Déjanos tu contacto y te avisamos cuando salga un tueste nuevo o una promoción — sin spam.',
    nd_ph_nome: 'Tu nombre (opcional)', nd_ph_email: 'Tu correo electrónico', nd_ph_whatsapp: 'Tu WhatsApp (opcional)',
    nd_submit: 'Quiero enterarme',
    nd_msg_preencha_email: 'Completa al menos el correo electrónico.', nd_msg_enviando: 'Enviando...',
    nd_msg_sucesso: '¡Listo! Serás de los primeros en enterarte de las novedades.',
    nd_msg_erro: 'No pudimos guardar tu contacto ahora. Intenta de nuevo en unos instantes.',

    footer_menu: 'Menú', footer_ajuda: 'Ayuda', footer_falecom: 'Hablemos',
    footer_trocas: 'Cambios y devoluciones', footer_rastrear: 'Rastrear pedido',
    footer_brand_title: 'Café Só Grãos',
    footer_brand_text: 'Seleccionamos, tostamos y empacamos cada lote con cuidado — del productor a tu taza, en lotes pequeños cada semana.',
    footer_contato_title: 'Contacto', footer_rights: 'Todos los derechos reservados.',
    footer_payment_note: 'Pago procesado de forma segura por Mercado Pago',

    cart_title: 'Tu carrito', cart_close_aria: 'Cerrar carrito', cart_empty: 'Tu carrito está vacío.',
    cart_entrega_title: 'Datos de entrega', cart_ph_cep: 'Código postal', cart_btn_calcular_frete: 'Calcular envío',
    cart_ph_rua: 'Calle', cart_ph_numero: 'Número', cart_ph_complemento: 'Complemento (opcional)',
    cart_ph_nome: 'Nombre completo', cart_ph_email: 'Correo electrónico', cart_ph_telefone: 'Teléfono / WhatsApp',
    cart_ph_cpf: 'CPF (documento fiscal brasileño)',
    cart_subtotal: 'Subtotal', cart_frete: 'Envío', cart_total: 'Total', cart_frete_gratis: 'Gratis',
    cart_checkout_btn: 'Finalizar compra', cart_checkout_note: 'Pago procesado de forma segura por Mercado Pago.',
    cart_open_aria: 'Abrir carrito',

    lightbox_close: 'Cerrar', lightbox_prev: 'Imagen anterior', lightbox_next: 'Siguiente imagen',
    whatsapp_float_aria: 'Comprar por WhatsApp',
    menu_toggle_aria: 'Abrir menú', lang_switch_aria: 'Idioma',

    msg_cep_invalido: 'Ingresa un código postal válido.', msg_calculando_frete: 'Calculando envío...',
    msg_frete_gratis: 'Gratis 🎉', msg_frete_resultado: 'Envío: {frete} · entrega en hasta {prazo} días hábiles',
    msg_frete_erro: 'No pudimos calcular el envío. Revisa el código postal.',
    msg_calcule_frete_antes: 'Calcula el envío antes de finalizar la compra.',
    msg_preencha_dados: 'Completa nombre, correo electrónico, CPF y número de dirección para continuar.',
    msg_cpf_invalido: 'Ingresa un CPF válido.',
    msg_email_invalido: 'Ingresa un correo válido (ej.: nombre@ejemplo.com).',
    msg_processando: 'Procesando...',
    msg_pagamento_erro: 'No pudimos iniciar el pago. Intenta de nuevo en unos instantes.',

    av_msg_preencha: 'Completa el nombre, qué línea compraste, la calificación y el comentario.', av_msg_enviando: 'Enviando...',
    av_msg_sucesso: '¡Recibimos tu reseña! Aparecerá en el sitio en cuanto sea revisada.',
    av_msg_erro: 'No pudimos enviar tu reseña ahora. Intenta de nuevo en unos instantes.',

    politica_eyebrow: 'Institucional', politica_title: 'Cambios y devoluciones',
    politica_h1: '¿Te arrepentiste de la compra? No hay problema.',
    politica_p1: 'Tienes hasta 7 días corridos desde que recibes el producto para desistir de la compra, sin necesidad de dar ningún motivo — es un derecho garantizado por el Código de Defensa del Consumidor de Brasil (art. 49) para compras hechas fuera de una tienda física.',
    politica_p2: 'En ese caso, devolvemos el 100% del valor pagado, incluido el envío, y el costo de la devolución corre por nuestra cuenta.',
    politica_h2: 'Producto con defecto, equivocado o dañado',
    politica_p3: 'Si algo llegó equivocado, con defecto o dañado durante el transporte, cambiamos el producto o devolvemos el valor en cualquier momento dentro de la vigencia del café — sin ningún costo para ti.',
    politica_h3: 'Cómo pedir un cambio o devolución',
    politica_li1: 'Escríbenos por WhatsApp al', politica_li1b: 'o envía un correo a',
    politica_li2: 'Indícanos el número de tu pedido (está en el correo de confirmación) y cuéntanos qué pasó',
    politica_li3: 'Acordamos contigo la forma de devolución y el siguiente paso',
    politica_btn_pedido: 'Consultar mi pedido', politica_btn_loja: 'Volver a la tienda',

    privacidade_eyebrow: 'Institucional', privacidade_title: 'Política de Privacidad',
    privacidade_atualizado: 'Última actualización: agosto de 2026.',
    privacidade_h1: 'Qué datos recopilamos',
    privacidade_p1: 'Cuando compras en nuestro sitio, recopilamos: nombre, correo electrónico, teléfono, dirección de entrega y CPF (documento fiscal brasileño). El CPF es exigido por Mercado Pago para evaluar el riesgo de la transacción y reducir rechazos de tarjeta — no guardamos tu CPF en nuestra propia base de datos, se envía directamente al procesador de pago.',
    privacidade_p2: 'Si dejas tu contacto en el formulario "Entérate del próximo tueste", recopilamos nombre (opcional), correo electrónico y teléfono (opcional). Si envías una reseña de producto, recopilamos tu nombre, la calificación y el comentario — que quedan visibles públicamente en la página del producto.',
    privacidade_p3: 'También usamos Google Analytics para entender, de forma agregada, cómo las personas navegan por el sitio (páginas visitadas, productos vistos, si la compra se completó). Esto no te identifica personalmente.',
    privacidade_h2: 'Por qué recopilamos estos datos',
    privacidade_li1: 'Procesar tu pedido, calcular el envío y confirmar el pago',
    privacidade_li2: 'Enviar correos sobre el estado de tu compra (confirmación, seguimiento)',
    privacidade_li3: 'Avisarte sobre nuevos tuestes y promociones, si lo pides explícitamente',
    privacidade_li4: 'Entender y mejorar el funcionamiento del sitio',
    privacidade_h3: 'Con quién lo compartimos',
    privacidade_p4: 'Compartimos solo lo necesario con quienes procesan parte del pedido por nosotros: Mercado Pago (pago), Melhor Envio (cálculo y despacho del envío), Resend (envío de correos transaccionales) y Google Analytics (estadísticas de uso del sitio). No vendemos ni alquilamos tus datos a terceros.',
    privacidade_h4: 'Por cuánto tiempo lo guardamos',
    privacidade_p5: 'Guardamos los datos del pedido mientras sea necesario para cumplir obligaciones fiscales y atender eventuales cambios, devoluciones o dudas sobre la compra. Los contactos dejados en el formulario de novedades se guardan hasta que pidas su eliminación.',
    privacidade_h5: 'Tus derechos',
    privacidade_p6: 'De acuerdo con la Ley General de Protección de Datos de Brasil (LGPD), puedes en cualquier momento pedir: saber qué datos tenemos sobre ti, corregir datos incorrectos, eliminar tus datos, o dejar de recibir nuestros avisos de novedades. Para eso, solo contáctanos por los canales de abajo.',
    privacidade_h6: 'Cómo hablar con nosotros',
    privacidade_li5: 'WhatsApp: (16) 99756-7559',
    privacidade_li6: 'Correo electrónico: contato@cafesograos.com.br',
    privacidade_btn_loja: 'Volver a la tienda',
    footer_privacidade: 'Política de Privacidad',
    checkout_consentimento: 'Al finalizar la compra, aceptas nuestra',
    checkout_consentimento_link: 'Política de Privacidad',
    novidades_consentimento: 'Al registrarte, aceptas nuestra',

    rastreio_eyebrow: 'Seguimiento', rastreio_title: 'Rastrear pedido',
    rastreio_texto: 'Pega abajo el número de pedido que enviamos en tu correo de confirmación.',
    rastreio_ph_numero: 'Número de pedido', rastreio_btn_consultar: 'Consultar',
    rastreio_btn_loja: 'Volver a la tienda', rastreio_btn_whatsapp: 'Hablar por WhatsApp',
    rastreio_msg_consultando: 'Consultando...',
    rastreio_msg_nao_encontrado: 'No encontramos ese pedido. Revisa el número (está en el correo de confirmación) e intenta de nuevo.',
    rastreio_codigo: 'Código de rastreo',
    status_pending: 'Pago en procesamiento', status_approved: 'Pago aprobado',
    status_rejected: 'Pago no aprobado', status_in_process: 'Pago en análisis',
    status_cancelled: 'Pedido cancelado', status_refunded: 'Pedido reembolsado',
    status_enviado: '— enviado', status_preparando: '— preparando envío',

    resultado_sucesso_eyebrow: 'Pedido confirmado', resultado_sucesso_title: '¡Pago aprobado!',
    resultado_sucesso_texto: '¡Gracias por tu pedido! En breve recibirás un correo confirmando los detalles, y en cuanto despachemos tu café, te enviaremos otro con el código de rastreo.',
    resultado_resumo_title: 'Resumen del pedido', resultado_total: 'Total',
    resultado_btn_loja: 'Volver a la tienda', resultado_btn_whatsapp: 'Hablar por WhatsApp',

    resultado_pendente_eyebrow: 'Pago en análisis', resultado_pendente_title: 'Tu pago está en análisis',
    resultado_pendente_texto: 'Esto puede ocurrir con algunas formas de pago (como boleto o análisis antifraude). En cuanto sea aprobado, te avisamos por correo con todos los detalles del pedido.',

    resultado_falha_eyebrow: 'Pago no completado', resultado_falha_title: 'No pudimos completar el pago',
    resultado_falha_texto: 'No te preocupes, no se realizó ningún cobro. Tu carrito sigue guardado — vuelve a la tienda e intenta de nuevo, o contáctanos si el problema continúa.'
  }
};

const IDIOMA_PADRAO = 'pt';
const IDIOMAS_VALIDOS = Object.keys(TRANSLATIONS);

function idiomaAtual() {
  const salvo = localStorage.getItem('cafesograos-idioma');
  return IDIOMAS_VALIDOS.includes(salvo) ? salvo : IDIOMA_PADRAO;
}

// Usado pelo JS de cada página pra traduzir mensagens dinâmicas (alertas,
// status de formulário). "{chave}" dentro do texto é trocado pelo valor
// correspondente em vars — ex.: t('msg_frete_resultado', { frete: 'R$ 10,00', prazo: 5 }).
function t(chave, vars) {
  const dict = TRANSLATIONS[idiomaAtual()] || TRANSLATIONS[IDIOMA_PADRAO];
  let texto = dict[chave] ?? TRANSLATIONS[IDIOMA_PADRAO][chave] ?? chave;
  if (vars) {
    Object.keys(vars).forEach((k) => { texto = texto.replace(`{${k}}`, vars[k]); });
  }
  return texto;
}

function aplicarTraducoes(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS[IDIOMA_PADRAO];
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const chave = el.getAttribute('data-i18n');
    if (dict[chave] !== undefined) el.textContent = dict[chave];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const chave = el.getAttribute('data-i18n-placeholder');
    if (dict[chave] !== undefined) el.setAttribute('placeholder', dict[chave]);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const chave = el.getAttribute('data-i18n-aria-label');
    if (dict[chave] !== undefined) el.setAttribute('aria-label', dict[chave]);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const chave = el.getAttribute('data-i18n-title');
    if (dict[chave] !== undefined) el.setAttribute('title', dict[chave]);
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('ativo', btn.dataset.lang === lang);
  });
}

function setLanguage(lang) {
  if (!IDIOMAS_VALIDOS.includes(lang)) return;
  localStorage.setItem('cafesograos-idioma', lang);
  aplicarTraducoes(lang);
  // Catálogo (nomes/descrições de produto) e avaliações já carregadas
  // precisam ser redesenhados no novo idioma — cada página expõe seu
  // próprio hook opcional, só chama se existir.
  if (typeof window.onLanguageChange === 'function') window.onLanguageChange(lang);
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.lang-btn');
  if (btn) setLanguage(btn.dataset.lang);
});

document.addEventListener('DOMContentLoaded', () => {
  aplicarTraducoes(idiomaAtual());
});
