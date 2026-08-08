// Catálogo de produtos — edite/substitua com os produtos reais da Café Só Grãos.
// "img" pode apontar para fotos reais em /assets quando você tiver.
// "categoria" alimenta os filtros da vitrine. "badge" e "precoOriginal" são opcionais.
const CATEGORIES = [
  { id: "grao", nome: "Café em Grão" },
  { id: "moido", nome: "Café Moído" },
  { id: "kit", nome: "Kits" }
];

const PRODUCTS = [
  {
    id: "bourbon-amarelo-250",
    nome: "Bourbon Amarelo",
    descricao: "Torra média, notas de caramelo e frutas amarelas. 250g em grãos.",
    preco: 39.90,
    categoria: "grao",
    badge: "Mais vendido",
    img: null
  },
  {
    id: "catuai-vermelho-250",
    nome: "Catuaí Vermelho",
    descricao: "Torra escura, corpo encorpado e final achocolatado. 250g em grãos.",
    preco: 34.90,
    categoria: "grao",
    img: null
  },
  {
    id: "geisha-especial-250",
    nome: "Geisha Especial",
    descricao: "Torra clara, floral e cítrico. Lote limitado. 250g em grãos.",
    preco: 89.90,
    categoria: "grao",
    badge: "Lote limitado",
    img: null
  },
  {
    id: "blend-classico-500",
    nome: "Blend Clássico Só Grãos",
    descricao: "Torra média, equilibrado para o dia a dia. 500g moído.",
    preco: 49.90,
    precoOriginal: 54.90,
    categoria: "moido",
    badge: "Promoção",
    img: null
  },
  {
    id: "descafeinado-250",
    nome: "Descafeinado",
    descricao: "Torra média, todo o sabor sem cafeína. 250g moído.",
    preco: 42.90,
    categoria: "moido",
    img: null
  },
  {
    id: "kit-degustacao",
    nome: "Kit Degustação",
    descricao: "Três origens diferentes, 100g cada, para conhecer a casa.",
    preco: 69.90,
    categoria: "kit",
    badge: "Frete grátis",
    img: null
  }
];
