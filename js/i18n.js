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
    destaque3_title: 'Entrega para todo o Brasil', destaque3_desc: 'Pagamento seguro via InfinitePay',
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
    footer_payment_note: 'Pagamento processado com segurança pela InfinitePay',

    cart_title: 'Seu carrinho', cart_close_aria: 'Fechar carrinho', cart_empty: 'Seu carrinho está vazio.',
    cart_entrega_title: 'Dados de entrega', cart_ph_cep: 'CEP', cart_btn_calcular_frete: 'Calcular frete',
    cart_ph_rua: 'Rua', cart_ph_numero: 'Número', cart_ph_complemento: 'Complemento (opcional)',
    cart_ph_nome: 'Nome completo', cart_ph_email: 'E-mail', cart_ph_telefone: 'Telefone / WhatsApp',
    cart_ph_cpf: 'CPF',
    cart_subtotal: 'Subtotal', cart_frete: 'Frete', cart_total: 'Total', cart_frete_gratis: 'Grátis',
    cart_checkout_btn: 'Finalizar compra', cart_checkout_note: 'Pagamento processado com segurança pela InfinitePay.',
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
    politica_h1: 'Precisa trocar ou devolver seu pedido? Fale com a gente pelo WhatsApp.',
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
    privacidade_p1: 'Quando você compra no nosso site, coletamos: nome, e-mail, telefone, CPF e endereço de entrega. O CPF é usado pra validar o formulário e fica registrado no pedido só pra emissão da etiqueta de envio (exigência das transportadoras) — não é compartilhado com o processador de pagamento.',
    privacidade_p2: 'Se você deixa seu contato no formulário "Fique sabendo da próxima torra", coletamos nome (opcional), e-mail e telefone (opcional). Se você envia uma avaliação de produto, coletamos seu nome, a nota e o comentário — que ficam visíveis publicamente na página do produto.',
    privacidade_p3: 'Também usamos o Google Analytics e o Meta Pixel (Facebook/Instagram) para entender, de forma agregada, como as pessoas navegam pelo site e avaliar o resultado dos nossos anúncios (páginas visitadas, produtos vistos, se a compra foi concluída) — isso não identifica você pessoalmente.',
    privacidade_h2: 'Por que coletamos esses dados',
    privacidade_li1: 'Processar seu pedido, calcular o frete e confirmar o pagamento',
    privacidade_li2: 'Enviar e-mails sobre o andamento da sua compra (confirmação, rastreio)',
    privacidade_li3: 'Avisar sobre novas torras e promoções, caso você peça isso explicitamente',
    privacidade_li4: 'Entender e melhorar o funcionamento do site',
    privacidade_h3: 'Com quem compartilhamos',
    privacidade_p4: 'Compartilhamos apenas o necessário com quem processa parte do pedido por nós: InfinitePay (pagamento e prevenção de fraude), Melhor Envio (cálculo e postagem do frete), Resend (envio dos e-mails transacionais), Google Analytics e Meta (estatísticas de uso do site e desempenho de anúncios). Não vendemos nem alugamos seus dados para terceiros.',
    privacidade_h4: 'Por quanto tempo guardamos',
    privacidade_p5: 'Guardamos os dados do pedido enquanto necessário para cumprir obrigações fiscais e atender eventuais trocas, devoluções ou dúvidas sobre a compra. Contatos deixados no formulário de novidades ficam guardados até você pedir a remoção.',
    privacidade_h5: 'Seus direitos',
    privacidade_p6: 'De acordo com a Lei Geral de Proteção de Dados (LGPD), você pode a qualquer momento pedir para: saber quais dados temos sobre você, corrigir dados incorretos, apagar seus dados, ou parar de receber nossos avisos de novidades. Para isso, é só entrar em contato pelos canais abaixo.',
    privacidade_h6: 'Como falar com a gente',
    privacidade_li5: 'WhatsApp: (16) 99761-6459',
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
    resultado_sucesso_texto: 'Obrigado pelo pedido! Pode ficar tranquilo(a): seu pedido é de verdade e seu café será despachado em até 1 dia útil. Você já vai receber um e-mail confirmando os detalhes, e assim que despacharmos, mandamos outro com o código de rastreio.',
    resultado_resumo_title: 'Resumo do pedido', resultado_total: 'Total',
    resultado_btn_loja: 'Voltar à loja', resultado_btn_whatsapp: 'Falar no WhatsApp',

    resultado_pendente_eyebrow: 'Pagamento em análise', resultado_pendente_title: 'Seu pagamento está em análise',
    resultado_pendente_texto: 'Isso pode acontecer quando o pagamento passa por uma análise antifraude. Assim que for aprovado, avisamos por e-mail com todos os detalhes do pedido.',

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
    destaque3_title: 'Shipping all over Brazil', destaque3_desc: 'Secure payment via InfinitePay',
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
    footer_payment_note: 'Payment securely processed by InfinitePay',

    cart_title: 'Your cart', cart_close_aria: 'Close cart', cart_empty: 'Your cart is empty.',
    cart_entrega_title: 'Delivery details', cart_ph_cep: 'ZIP code', cart_btn_calcular_frete: 'Calculate shipping',
    cart_ph_rua: 'Street', cart_ph_numero: 'Number', cart_ph_complemento: 'Complement (optional)',
    cart_ph_nome: 'Full name', cart_ph_email: 'Email', cart_ph_telefone: 'Phone / WhatsApp',
    cart_ph_cpf: 'CPF (Brazilian tax ID)',
    cart_subtotal: 'Subtotal', cart_frete: 'Shipping', cart_total: 'Total', cart_frete_gratis: 'Free',
    cart_checkout_btn: 'Checkout', cart_checkout_note: 'Payment securely processed by InfinitePay.',
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
    politica_h1: 'Need to exchange or return your order? Contact us on WhatsApp.',
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
    privacidade_p1: 'When you buy on our site, we collect: name, email, phone, CPF (Brazilian tax ID) and delivery address. CPF is used to validate the form and is kept with the order only for generating the shipping label (a carrier requirement) — it is not shared with the payment processor.',
    privacidade_p2: 'If you leave your contact in the "Find out about the next roast" form, we collect name (optional), email and phone (optional). If you submit a product review, we collect your name, rating and comment — which are shown publicly on the product page.',
    privacidade_p3: 'We also use Google Analytics and the Meta Pixel (Facebook/Instagram) to understand, in aggregate, how people browse the site and to measure our ad performance (pages visited, products viewed, whether a purchase was completed) — this does not personally identify you.',
    privacidade_h2: 'Why we collect this data',
    privacidade_li1: 'Process your order, calculate shipping and confirm payment',
    privacidade_li2: 'Send emails about your order status (confirmation, tracking)',
    privacidade_li3: 'Let you know about new roasts and promotions, if you explicitly ask for that',
    privacidade_li4: 'Understand and improve how the site works',
    privacidade_h3: 'Who we share it with',
    privacidade_p4: 'We only share what is necessary with those who process part of the order for us: InfinitePay (payment and fraud prevention), Melhor Envio (shipping calculation and dispatch), Resend (transactional emails), Google Analytics and Meta (site usage statistics and ad performance). We do not sell or rent your data to third parties.',
    privacidade_h4: 'How long we keep it',
    privacidade_p5: 'We keep order data for as long as needed to meet tax obligations and handle any exchanges, returns or questions about the purchase. Contacts left in the news signup form are kept until you ask us to remove them.',
    privacidade_h5: 'Your rights',
    privacidade_p6: 'Under Brazil\'s General Data Protection Law (LGPD), you can at any time ask to: know what data we have about you, correct inaccurate data, delete your data, or stop receiving our news updates. Just get in touch through the channels below.',
    privacidade_h6: 'How to reach us',
    privacidade_li5: 'WhatsApp: (16) 99761-6459',
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
    resultado_sucesso_texto: 'Thanks for your order! You can rest assured: your order is real and your coffee will be dispatched within 1 business day. You will receive an email confirming the details shortly, and as soon as we ship it, we will send another one with the tracking code.',
    resultado_resumo_title: 'Order summary', resultado_total: 'Total',
    resultado_btn_loja: 'Back to store', resultado_btn_whatsapp: 'Chat on WhatsApp',

    resultado_pendente_eyebrow: 'Payment under review', resultado_pendente_title: 'Your payment is under review',
    resultado_pendente_texto: 'This can happen when the payment goes through an anti-fraud review. As soon as it is approved, we will email you with all the order details.',

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
    destaque3_title: 'Envíos a todo Brasil', destaque3_desc: 'Pago seguro vía InfinitePay',
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
    footer_payment_note: 'Pago procesado de forma segura por InfinitePay',

    cart_title: 'Tu carrito', cart_close_aria: 'Cerrar carrito', cart_empty: 'Tu carrito está vacío.',
    cart_entrega_title: 'Datos de entrega', cart_ph_cep: 'Código postal', cart_btn_calcular_frete: 'Calcular envío',
    cart_ph_rua: 'Calle', cart_ph_numero: 'Número', cart_ph_complemento: 'Complemento (opcional)',
    cart_ph_nome: 'Nombre completo', cart_ph_email: 'Correo electrónico', cart_ph_telefone: 'Teléfono / WhatsApp',
    cart_ph_cpf: 'CPF (documento fiscal brasileño)',
    cart_subtotal: 'Subtotal', cart_frete: 'Envío', cart_total: 'Total', cart_frete_gratis: 'Gratis',
    cart_checkout_btn: 'Finalizar compra', cart_checkout_note: 'Pago procesado de forma segura por InfinitePay.',
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
    politica_h1: '¿Necesitas cambiar o devolver tu pedido? Contáctanos por WhatsApp.',
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
    privacidade_p1: 'Cuando compras en nuestro sitio, recopilamos: nombre, correo electrónico, teléfono, CPF y dirección de entrega. El CPF se usa para validar el formulario y queda registrado en el pedido solo para la emisión de la etiqueta de envío (exigencia de las transportadoras) — no se comparte con el procesador de pago.',
    privacidade_p2: 'Si dejas tu contacto en el formulario "Entérate del próximo tueste", recopilamos nombre (opcional), correo electrónico y teléfono (opcional). Si envías una reseña de producto, recopilamos tu nombre, la calificación y el comentario — que quedan visibles públicamente en la página del producto.',
    privacidade_p3: 'También usamos Google Analytics y el Meta Pixel (Facebook/Instagram) para entender, de forma agregada, cómo las personas navegan por el sitio y evaluar el resultado de nuestros anuncios (páginas visitadas, productos vistos, si la compra se completó) — esto no te identifica personalmente.',
    privacidade_h2: 'Por qué recopilamos estos datos',
    privacidade_li1: 'Procesar tu pedido, calcular el envío y confirmar el pago',
    privacidade_li2: 'Enviar correos sobre el estado de tu compra (confirmación, seguimiento)',
    privacidade_li3: 'Avisarte sobre nuevos tuestes y promociones, si lo pides explícitamente',
    privacidade_li4: 'Entender y mejorar el funcionamiento del sitio',
    privacidade_h3: 'Con quién lo compartimos',
    privacidade_p4: 'Compartimos solo lo necesario con quienes procesan parte del pedido por nosotros: InfinitePay (pago y prevención de fraude), Melhor Envio (cálculo y despacho del envío), Resend (envío de correos transaccionales), Google Analytics y Meta (estadísticas de uso del sitio y desempeño de anuncios). No vendemos ni alquilamos tus datos a terceros.',
    privacidade_h4: 'Por cuánto tiempo lo guardamos',
    privacidade_p5: 'Guardamos los datos del pedido mientras sea necesario para cumplir obligaciones fiscales y atender eventuales cambios, devoluciones o dudas sobre la compra. Los contactos dejados en el formulario de novedades se guardan hasta que pidas su eliminación.',
    privacidade_h5: 'Tus derechos',
    privacidade_p6: 'De acuerdo con la Ley General de Protección de Datos de Brasil (LGPD), puedes en cualquier momento pedir: saber qué datos tenemos sobre ti, corregir datos incorrectos, eliminar tus datos, o dejar de recibir nuestros avisos de novedades. Para eso, solo contáctanos por los canales de abajo.',
    privacidade_h6: 'Cómo hablar con nosotros',
    privacidade_li5: 'WhatsApp: (16) 99761-6459',
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
    resultado_sucesso_texto: '¡Gracias por tu pedido! Puedes quedarte tranquilo(a): tu pedido es real y tu café será despachado en hasta 1 día hábil. En breve recibirás un correo confirmando los detalles, y en cuanto lo despachemos, te enviaremos otro con el código de rastreo.',
    resultado_resumo_title: 'Resumen del pedido', resultado_total: 'Total',
    resultado_btn_loja: 'Volver a la tienda', resultado_btn_whatsapp: 'Hablar por WhatsApp',

    resultado_pendente_eyebrow: 'Pago en análisis', resultado_pendente_title: 'Tu pago está en análisis',
    resultado_pendente_texto: 'Esto puede ocurrir cuando el pago pasa por un análisis antifraude. En cuanto sea aprobado, te avisamos por correo con todos los detalles del pedido.',

    resultado_falha_eyebrow: 'Pago no completado', resultado_falha_title: 'No pudimos completar el pago',
    resultado_falha_texto: 'No te preocupes, no se realizó ningún cobro. Tu carrito sigue guardado — vuelve a la tienda e intenta de nuevo, o contáctanos si el problema continúa.'
  },

  fr: {
    nav_produtos: 'Produits', nav_sobre: 'À propos', nav_contato: 'Contact',
    nav_rastrear: 'Suivre ma commande', nav_whatsapp: 'Commander sur WhatsApp', cart_label: 'PANIER',
    announce_bar: '🎁 Premier achat : Drip Coffee offert + 5% sur la prochaine commande · Livraison gratuite dès R$ 300 pour l’État de São Paulo',

    hero_eyebrow: 'De notre plantation à votre table',
    hero_title: 'Du vrai café brésilien : torréfié chaque semaine, directement du producteur à votre tasse.',
    hero_subtitle: 'Grains sélectionnés avec soin, en petits lots. Commandez en ligne et recevez-le tout frais chez vous.',
    hero_cta: 'Voir les produits',
    hero_badge1: '🔥 Torréfaction hebdomadaire', hero_badge2: '🏆 83+ points SCA', hero_badge3: '🚚 Livraison dans tout le Brésil',

    origem_eyebrow: 'Fierté de l’agriculture brésilienne', origem_title: 'De la plantation à votre tasse',
    origem_fig1: 'Plantation propre', origem_fig2: 'Grains 100% arabica, sélectionnés un par un',
    origem_fig3: 'Traitement soigné, lot par lot',
    origem_nota: 'Nos grains viennent du Sul de Minas — l’un des berceaux du café spécial au Brésil — et sont torréfiés et moulus par nous, ici à Araraquara/SP.',

    destaques_statement: 'Torréfaction récente, 100% arabica, livraison garantie.',
    destaque1_title: 'Torréfaction récente', destaque1_desc: 'Torréfié en petits lots, chaque semaine',
    destaque2_title: 'Origine traçable', destaque2_desc: 'Directement des producteurs partenaires',
    destaque3_title: 'Livraison dans tout le Brésil', destaque3_desc: 'Paiement sécurisé via InfinitePay',
    destaque4_title: 'Ligne Spéciale 83+ SCA', destaque4_desc: 'Notre torréfaction la mieux notée, évaluée officiellement',
    sca_tooltip: 'Évalué par une coopérative partenaire : plus de 83 points sur l’échelle SCA (Specialty Coffee Association), la norme internationale du café spécial.',

    objecoes_title: 'Pourquoi faire confiance à Só Grãos',
    objecao1_title: 'Traçabilité réelle', objecao1_desc: 'Directement des producteurs partenaires du Sul de Minas, sans intermédiaire, jusqu’à votre tasse.',
    objecao2_title: 'Constance entre les lots', objecao2_desc: 'Le résultat que vous avez approuvé aujourd’hui est le même qui arrive dans votre prochaine commande.',
    objecao3_title: 'Prix juste, torréfaction après torréfaction', objecao3_desc: 'Une qualité réelle, sans économiser sur le grain — semaine après semaine.',

    linhas_eyebrow: 'Guide rapide', linhas_title: 'Traditionnel, Gourmet ou Spécial ?',
    linhas_subtitle: 'Trois lignes, chacune pensée pour un moment différent.',
    linha_trad_badge: 'Traditionnel', linha_trad_title: 'Pour le quotidien',
    linha_trad_desc: 'Un mélange équilibré de grains à différents niveaux de maturation. La torréfaction plus forte uniformise la saveur et la couleur — le résultat est un café corsé et constant, 100% arabica.',
    linha_gourmet_badge: 'Gourmet', linha_gourmet_title: 'Une montée en qualité',
    linha_gourmet_desc: 'Grains sélectionnés un par un, avec moins d’imperfections (brisés, trop gros ou trop petits) et une maturation bien plus uniforme entre eux. Le résultat : une saveur plus équilibrée et une tasse plus nette.',
    linha_especial_badge: 'Spécial', linha_especial_title: 'Pour ceux qui veulent le meilleur',
    linha_especial_desc: 'Évalué sur une échelle internationale de notation (SCA), avec une note supérieure à 80 — traçable jusqu’à l’origine, avec des notes aromatiques complexes. Notre café le plus sophistiqué.',
    linha_suave: 'Doux', linha_intenso: 'Intense',

    produtos_title: 'Nos cafés', produtos_subtitle: 'Grains sélectionnés, torréfactions variées — du doux à l’intense.',
    filter_todos: 'Tous', add_button: 'Ajouter',

    avaliacoes_eyebrow: 'Preuve réelle', avaliacoes_title: 'Ce que l’on dit de nous',
    avaliacoes_empty: 'Nous n’avons pas encore d’avis publiés — soyez la première personne à raconter votre expérience !',
    avaliacoes_form_title: 'Vous avez déjà acheté chez nous ? Laissez votre avis',
    avaliacoes_form_note: 'Chaque avis passe par une vérification rapide avant d’apparaître sur le site.',
    av_ph_nome: 'Votre nom', av_select_placeholder: 'Quelle ligne avez-vous achetée ?',
    av_opt_tradicional: 'Traditionnel', av_opt_gourmet: 'Gourmet', av_opt_especial: 'Spécial', av_opt_drip: 'Drip Coffee',
    av_estrelas_aria: 'Note de 1 à 5',
    av_estrela1_aria: '1 étoile', av_estrela2_aria: '2 étoiles', av_estrela3_aria: '3 étoiles',
    av_estrela4_aria: '4 étoiles', av_estrela5_aria: '5 étoiles',
    av_ph_comentario: 'Racontez votre expérience avec Café Só Grãos', av_submit: 'Envoyer l’avis',
    av_comprou: 'A acheté',

    sobre_eyebrow: 'Notre histoire', sobre_title: 'Une histoire portée par le café',
    sobre_p1: 'Pour moi, il n’y a pas de jour sans café. Que ce soit le matin, l’après-midi ou le soir, il est toujours présent. C’est le café qui réveille, apporte une pause, accompagne le travail, rend la lecture plus agréable et transforme une conversation simple en un moment spécial.',
    sobre_p2: 'Je peux le dire, sans exagérer : je carbure au café.',
    sobre_p3: 'Café Só Grãos est né de cette passion et d’une inquiétude. En observant les options disponibles sur le marché, j’ai remarqué que beaucoup de Brésiliens devaient encore choisir entre prix et qualité. Je voulais montrer qu’il était possible d’offrir un café 100% arabica, fait avec soin et transparence, sans en faire quelque chose réservé uniquement aux occasions spéciales.',
    sobre_p4: 'C’est ainsi qu’est née la proposition de nos lignes.',
    sobre_p5: 'Le Café Só Grãos Traditionnel est le compagnon du quotidien. C’est le café que je voulais rendre populaire pour qu’il fasse partie de la routine : au début de la matinée, pendant la pause au travail, ou à ce moment où tout ce dont on a besoin est une bonne tasse de café.',
    sobre_p6: 'Les lignes Gourmet et Spécial ont été créées pour les occasions qui appellent une expérience différente : un petit-déjeuner en famille ou entre amis, un moment de détente, une conversation importante, la célébration d’une affaire ou simplement l’envie d’apprécier chaque détail de la boisson.',
    sobre_p7: 'Tous nos cafés sont 100% arabica. Dans les lignes Gourmet et Spécial, nous travaillons aussi avec des grains sélectionnés et des profils de torréfaction développés pour mettre en valeur les arômes, les saveurs et les caractéristiques de chaque lot.',
    sobre_p8: 'Une part importante de notre café vient du Sul de Minas, région reconnue pour ses conditions favorables à la culture. L’altitude et le climat contribuent à une maturation plus uniforme des fruits et aident à trouver des lots de qualité constante. Mais notre recherche ne s’arrête pas là : nous travaillons aussi avec des producteurs d’autres régions du Brésil, toujours à la recherche de cafés en accord avec ce en quoi nous croyons.',
    sobre_p9: 'Je garde précieusement quelques souvenirs du début de cette histoire : la décision de créer la marque, l’arôme de la première torréfaction et l’émotion de la première livraison. C’est là que j’ai compris que cette idée pourrait devenir quelque chose de bien plus grand.',
    sobre_p10: 'Depuis, voir Café Só Grãos arriver dans de nouveaux endroits et gagner une place sur la table des Brésiliens a été l’une des parties les plus gratifiantes de ce parcours.',
    sobre_p11: 'Aujourd’hui, je reste à la tête des principales étapes de l’opération, mais rien de tout cela ne se construit seul. J’ai à mes côtés une équipe qui participe à la production, à la torréfaction et à la distribution. Ce sont des personnes qui, chaque semaine, travaillent avec moi pour que chaque café soit préparé et livré avec le soin qui a donné naissance à notre marque.',
    sobre_p12: 'Café Só Grãos est né de ma passion pour le café, mais grandit chaque jour grâce aux personnes qui croient en cette histoire — de la plantation à la tasse.',
    sobre_tagline: 'Café Só Grãos. Un café pour chaque moment.',
    sobre_cta: 'Découvrez notre catalogue',

    torra_eyebrow: 'Notre torréfaction', torra_title: 'Petits lots, torréfiés chaque semaine',
    torra_text: 'Si vous aimez le café qui a du caractère, mais sans discours de sommelier, vous êtes au bon endroit. Nous torréfions près de la livraison pour qu’il arrive toujours frais chez vous.',

    b2b_title: 'Offrez un café spécial à vos clients', b2b_eyebrow: 'Vente aux entreprises',
    b2b_text: 'Du café à la maison ou au bureau, votre café parle aussi de votre entreprise. Nous fournissons en volume, avec la même torréfaction fraîche et le même soin que toujours — pour ceux qui veulent bien accueillir qui franchit leur porte.',
    b2b_cta: 'Parlez-nous d’un partenariat B2B',

    contato_title: 'Contactez-nous', contato_text: 'Des questions sur les commandes, la vente en gros ou les partenariats ? Envoyez-nous un message.',

    novidades_eyebrow: 'Vous hésitez encore ?', novidades_title: 'Soyez informé de la prochaine torréfaction',
    novidades_text: 'Laissez-nous votre contact et nous vous préviendrons dès qu’une nouvelle torréfaction ou une promotion sortira — sans spam.',
    nd_ph_nome: 'Votre nom (facultatif)', nd_ph_email: 'Votre e-mail', nd_ph_whatsapp: 'Votre WhatsApp (facultatif)',
    nd_submit: 'Je veux être informé',
    nd_msg_preencha_email: 'Renseignez au moins l’e-mail.', nd_msg_enviando: 'Envoi en cours...',
    nd_msg_sucesso: 'C’est fait ! Vous serez informé des nouveautés en premier.',
    nd_msg_erro: 'Impossible d’enregistrer votre contact pour le moment. Réessayez dans un instant.',

    footer_menu: 'Menu', footer_ajuda: 'Aide', footer_falecom: 'Contactez-nous',
    footer_trocas: 'Échanges et retours', footer_rastrear: 'Suivre ma commande',
    footer_brand_title: 'Café Só Grãos',
    footer_brand_text: 'Nous sélectionnons, torréfions et emballons chaque lot avec soin — du producteur à votre tasse, en petits lots chaque semaine.',
    footer_contato_title: 'Contact', footer_rights: 'Tous droits réservés.',
    footer_payment_note: 'Paiement traité en toute sécurité par InfinitePay',

    cart_title: 'Votre panier', cart_close_aria: 'Fermer le panier', cart_empty: 'Votre panier est vide.',
    cart_entrega_title: 'Informations de livraison', cart_ph_cep: 'Code postal', cart_btn_calcular_frete: 'Calculer la livraison',
    cart_ph_rua: 'Rue', cart_ph_numero: 'Numéro', cart_ph_complemento: 'Complément (facultatif)',
    cart_ph_nome: 'Nom complet', cart_ph_email: 'E-mail', cart_ph_telefone: 'Téléphone / WhatsApp',
    cart_ph_cpf: 'CPF (identifiant fiscal brésilien)',
    cart_subtotal: 'Sous-total', cart_frete: 'Livraison', cart_total: 'Total', cart_frete_gratis: 'Gratuit',
    cart_checkout_btn: 'Finaliser la commande', cart_checkout_note: 'Paiement traité en toute sécurité par InfinitePay.',
    cart_open_aria: 'Ouvrir le panier',

    lightbox_close: 'Fermer', lightbox_prev: 'Image précédente', lightbox_next: 'Image suivante',
    whatsapp_float_aria: 'Acheter sur WhatsApp',
    menu_toggle_aria: 'Ouvrir le menu', lang_switch_aria: 'Langue',

    msg_cep_invalido: 'Entrez un code postal valide.', msg_calculando_frete: 'Calcul de la livraison...',
    msg_frete_gratis: 'Gratuit 🎉', msg_frete_resultado: 'Livraison : {frete} · livraison en {prazo} jours ouvrables',
    msg_frete_erro: 'Impossible de calculer la livraison. Vérifiez le code postal et réessayez.',
    msg_calcule_frete_antes: 'Calculez la livraison avant de finaliser la commande.',
    msg_preencha_dados: 'Renseignez le nom, l’e-mail, le CPF et le numéro de l’adresse pour continuer.',
    msg_cpf_invalido: 'Entrez un CPF valide.',
    msg_email_invalido: 'Entrez un e-mail valide (ex. : nom@exemple.com).',
    msg_processando: 'Traitement en cours...',
    msg_pagamento_erro: 'Impossible de démarrer le paiement. Réessayez dans un instant.',

    av_msg_preencha: 'Renseignez le nom, la ligne achetée, la note et le commentaire.', av_msg_enviando: 'Envoi en cours...',
    av_msg_sucesso: 'Nous avons bien reçu votre avis ! Il apparaîtra sur le site après vérification.',
    av_msg_erro: 'Impossible d’envoyer votre avis pour le moment. Réessayez dans un instant.',

    politica_eyebrow: 'Institutionnel', politica_title: 'Échanges et retours',
    politica_h1: 'Besoin d’échanger ou de retourner votre commande ? Contactez-nous sur WhatsApp.',
    politica_p1: 'Vous avez jusqu’à 7 jours calendaires à partir de la réception du produit pour annuler l’achat, sans avoir à donner de motif — c’est un droit garanti par le Code de défense du consommateur brésilien (art. 49) pour les achats effectués en dehors d’un magasin physique.',
    politica_p2: 'Dans ce cas, nous remboursons 100% du montant payé, frais de livraison inclus, et les frais de retour sont à notre charge.',
    politica_h2: 'Produit défectueux, erroné ou endommagé',
    politica_p3: 'Si quelque chose est arrivé erroné, défectueux ou endommagé pendant le transport, nous échangeons le produit ou remboursons le montant à tout moment pendant la durée de conservation du café — sans aucun coût pour vous.',
    politica_h3: 'Comment demander un échange ou un retour',
    politica_li1: 'Contactez-nous sur WhatsApp au', politica_li1b: 'ou envoyez un e-mail à',
    politica_li2: 'Indiquez le numéro de votre commande (il figure dans l’e-mail de confirmation) et racontez-nous ce qui s’est passé',
    politica_li3: 'Nous conviendrons ensemble de la méthode de retour et des prochaines étapes',
    politica_btn_pedido: 'Consulter ma commande', politica_btn_loja: 'Retour à la boutique',

    privacidade_eyebrow: 'Institutionnel', privacidade_title: 'Politique de confidentialité',
    privacidade_atualizado: 'Dernière mise à jour : août 2026.',
    privacidade_h1: 'Quelles données nous collectons',
    privacidade_p1: 'Lorsque vous achetez sur notre site, nous collectons : nom, e-mail, téléphone, CPF et adresse de livraison. Le CPF sert à valider le formulaire et reste enregistré avec la commande uniquement pour la génération de l’étiquette d’expédition (exigence des transporteurs) — il n’est pas partagé avec le processeur de paiement.',
    privacidade_p2: 'Si vous laissez votre contact dans le formulaire « Soyez informé de la prochaine torréfaction », nous collectons le nom (facultatif), l’e-mail et le téléphone (facultatif). Si vous soumettez un avis sur un produit, nous collectons votre nom, la note et le commentaire — qui restent visibles publiquement sur la page du produit.',
    privacidade_p3: 'Nous utilisons aussi Google Analytics et le Meta Pixel (Facebook/Instagram) pour comprendre, de façon agrégée, comment les personnes naviguent sur le site et évaluer les performances de nos publicités (pages visitées, produits consultés, si l’achat a été finalisé) — cela ne vous identifie pas personnellement.',
    privacidade_h2: 'Pourquoi nous collectons ces données',
    privacidade_li1: 'Traiter votre commande, calculer la livraison et confirmer le paiement',
    privacidade_li2: 'Envoyer des e-mails sur le suivi de votre commande (confirmation, suivi)',
    privacidade_li3: 'Vous informer des nouvelles torréfactions et promotions, si vous le demandez explicitement',
    privacidade_li4: 'Comprendre et améliorer le fonctionnement du site',
    privacidade_h3: 'Avec qui nous partageons',
    privacidade_p4: 'Nous partageons uniquement le nécessaire avec ceux qui traitent une partie de la commande pour nous : InfinitePay (paiement et prévention de la fraude), Melhor Envio (calcul et expédition de la livraison), Resend (envoi des e-mails transactionnels), Google Analytics et Meta (statistiques d’utilisation du site et performance des publicités). Nous ne vendons ni ne louons vos données à des tiers.',
    privacidade_h4: 'Pendant combien de temps nous les conservons',
    privacidade_p5: 'Nous conservons les données de la commande aussi longtemps que nécessaire pour respecter les obligations fiscales et traiter d’éventuels échanges, retours ou questions sur l’achat. Les contacts laissés dans le formulaire de nouveautés sont conservés jusqu’à ce que vous en demandiez la suppression.',
    privacidade_h5: 'Vos droits',
    privacidade_p6: 'Conformément à la Loi générale sur la protection des données du Brésil (LGPD), vous pouvez à tout moment demander à : savoir quelles données nous avons sur vous, corriger des données incorrectes, supprimer vos données, ou arrêter de recevoir nos avis de nouveautés. Pour cela, il vous suffit de nous contacter via les canaux ci-dessous.',
    privacidade_h6: 'Comment nous contacter',
    privacidade_li5: 'WhatsApp : (16) 99761-6459',
    privacidade_li6: 'E-mail : contato@cafesograos.com.br',
    privacidade_btn_loja: 'Retour à la boutique',
    footer_privacidade: 'Politique de confidentialité',
    checkout_consentimento: 'En finalisant votre commande, vous acceptez notre',
    checkout_consentimento_link: 'Politique de confidentialité',
    novidades_consentimento: 'En vous inscrivant, vous acceptez notre',

    rastreio_eyebrow: 'Suivi', rastreio_title: 'Suivre ma commande',
    rastreio_texto: 'Collez ci-dessous le numéro de commande que nous vous avons envoyé dans votre e-mail de confirmation.',
    rastreio_ph_numero: 'Numéro de commande', rastreio_btn_consultar: 'Consulter',
    rastreio_btn_loja: 'Retour à la boutique', rastreio_btn_whatsapp: 'Discuter sur WhatsApp',
    rastreio_msg_consultando: 'Consultation en cours...',
    rastreio_msg_nao_encontrado: 'Nous n’avons pas trouvé cette commande. Vérifiez le numéro (voir votre e-mail de confirmation) et réessayez.',
    rastreio_codigo: 'Code de suivi',
    status_pending: 'Paiement en cours de traitement', status_approved: 'Paiement approuvé',
    status_rejected: 'Paiement non approuvé', status_in_process: 'Paiement en analyse',
    status_cancelled: 'Commande annulée', status_refunded: 'Commande remboursée',
    status_enviado: '— expédiée', status_preparando: '— préparation de l’envoi',

    resultado_sucesso_eyebrow: 'Commande confirmée', resultado_sucesso_title: 'Paiement approuvé !',
    resultado_sucesso_texto: 'Merci pour votre commande ! Vous pouvez être tranquille : votre commande est bien réelle et votre café sera expédié sous 1 jour ouvrable. Vous allez recevoir un e-mail confirmant les détails, et dès l’expédition, nous vous en enverrons un autre avec le code de suivi.',
    resultado_resumo_title: 'Résumé de la commande', resultado_total: 'Total',
    resultado_btn_loja: 'Retour à la boutique', resultado_btn_whatsapp: 'Discuter sur WhatsApp',

    resultado_pendente_eyebrow: 'Paiement en analyse', resultado_pendente_title: 'Votre paiement est en cours d’analyse',
    resultado_pendente_texto: 'Cela peut arriver lorsque le paiement passe par une analyse antifraude. Dès qu’il sera approuvé, nous vous informerons par e-mail avec tous les détails de la commande.',

    resultado_falha_eyebrow: 'Paiement non finalisé', resultado_falha_title: 'Impossible de finaliser le paiement',
    resultado_falha_texto: 'Ne vous inquiétez pas, rien n’a été débité. Votre panier reste enregistré — retournez à la boutique et réessayez, ou contactez-nous si le problème persiste.'
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
