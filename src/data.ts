import { Service, Review } from './types';

export const RAFAEL_INFO = {
  name: 'Rafael Jorge',
  title: 'Motoboy Profissional',
  avatar: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=500', // high-quality yellow delivery motorcycle on street
  phone: '+55 11 94742-1357',
  phoneFormatted: '(11) 94742-1357',
  email: 'negruts_sp@outlook.com',
  whatsappUrl: 'https://wa.me/5511947421357',
  experience: '+- 20 anos de profissão com excelência pelas ruas de São Paulo',
  vehicle: 'Honda CG 160 Titan - Documentação 100% em dia & Baú Térmico Higienizado',
  coverage: 'Toda a Grande São Paulo, ABCD e principais rodovias',
  address: 'Rua Domingos Pereda, número 645, Vila Zatt/Pirituba, São Paulo - SP',
  cnpj: 'Nota Fiscal disponível sob solicitação',
  bio: 'Comprometimento, agilidade e segurança no transporte de documentos, pacotes, e-commerce e urgências. Conhecimento profundo do trânsito de SP para garantir o melhor tempo e preservação da sua encomenda.'
};

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Documentos & Contratos de Cartório',
    description: 'Coleta de assinaturas, reconhecimento de firma em cartórios de São Paulo, transporte de contratos confidenciais e devolução com total segurança.',
    estimateTime: 'Geralmente em até 45 minutos',
    basePrice: 'Valor a combinar',
    iconName: 'FileText',
    highlights: ['Protocolamento ágil', 'Acompanhamento digital', 'Sigilo absoluto']
  },
  {
    id: '2',
    title: 'Entregas Expressas Corporativas',
    description: 'Malotes diários, brindes corporativos, peças de reposição e faturamento para pequenas, médias e grandes empresas.',
    estimateTime: 'Sob demanda imediata',
    basePrice: 'Valor a combinar',
    iconName: 'Zap',
    highlights: ['Faturamento quinzenal para empresas', 'Rotas roteirizadas', 'Comprovante digital na hora']
  },
  {
    id: '3',
    title: 'E-commerce & Entregas de Lojas',
    description: 'Ideal para lojas virtuais, confeitarias, vestuário e eletrônicos que necessitam de entregas rápidas "No mesmo dia" (Same Day Delivery).',
    estimateTime: 'Roteiros otimizados diários',
    basePrice: 'Valor a combinar',
    iconName: 'ShoppingBag',
    highlights: ['Manuseio cuidadoso', 'Maquininha de cartão inclusa se necessário', 'Feedback em tempo real']
  },
  {
    id: '4',
    title: 'Medicamentos & Exames Médicos',
    description: 'Coleta de receitas, compra e entrega de remédios controlados ou transporte ágil de exames e laudos laboratoriais.',
    estimateTime: 'Super prioritário (máxima urgência)',
    basePrice: 'Valor a combinar',
    iconName: 'HeartPulse',
    highlights: ['Transporte climatizado de emergência', 'Prioridade máxima', 'Cuidados sanitários rígidos']
  },
  {
    id: '5',
    title: 'Serviços Bancários & Pagamentos',
    description: 'Depósitos, pagamentos de taxas e guias de recolhimento, retirada de talões e serviços gerais burocráticos.',
    estimateTime: 'Conclusão no mesmo período',
    basePrice: 'Valor a combinar',
    iconName: 'Coins',
    highlights: ['Segurança bancária', 'Preenchimento correto de guias', 'Devolução imediata dos comprovantes']
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Mariana Silva',
    role: 'Gerente Administrativa - Advocacia Pinheiro',
    comment: 'O Rafael é extremamente pontual e de extrema confiança. Sempre que precisamos coletar assinaturas urgentes em cartórios na Av. Paulista, ele resolve em tempo recorde!',
    rating: 5,
    date: 'Há 2 dias'
  },
  {
    id: '2',
    name: 'Carlos Antunes',
    role: 'Proprietário da Burger Box SP',
    comment: 'Contratamos o Rafael para fazer entregas de catering corporativo delicado. Chegou tudo impecável, os clientes elogiaram muito a simpatia dele na entrega.',
    rating: 5,
    date: 'Há 1 semana'
  },
  {
    id: '3',
    name: 'Fabiana Melo',
    role: 'Arquiteta Autônoma',
    comment: 'Precisava enviar maquetes e plantas impressas gigantes para um cliente em Santo Amaro. Ele embalou super bem no baú e entregou perfeito. Recomendo muito!',
    rating: 5,
    date: 'Há 3 semanas'
  }
];

export const NEIGHBORHOODS = [
  { name: 'Avenida Paulista', zone: 'Centro/Oeste', lat: 0, lng: 0 },
  { name: 'Pinheiros', zone: 'Zona Oeste', lat: -2, lng: -2 },
  { name: 'Itaim Bibi', zone: 'Zona Sul', lat: -4, lng: -2 },
  { name: 'Vila Olímpia', zone: 'Zona Sul', lat: -5, lng: -3 },
  { name: 'Sé / Centro Histórico', zone: 'Centro', lat: 2, lng: 2 },
  { name: 'Moema', zone: 'Zona Sul', lat: -4, lng: 0 },
  { name: 'Tatuapé', zone: 'Zona Leste', lat: 3, lng: 6 },
  { name: 'Mooca', zone: 'Zona Leste', lat: 1, lng: 5 },
  { name: 'Santana', zone: 'Zona Norte', lat: 6, lng: 1 },
  { name: 'Lapa', zone: 'Zona Oeste', lat: 2, lng: -5 },
  { name: 'Santo Amaro', zone: 'Zona Sul', lat: -10, lng: -4 },
  { name: 'Morumbi', zone: 'Zona Sul', lat: -8, lng: -7 },
  { name: 'Guarulhos', zone: 'Grande SP', lat: 8, lng: 10 },
  { name: 'São Bernardo do Campo', zone: 'Grande SP (ABCD)', lat: -12, lng: 8 }
];

// Helper to simulate distance in km between two neighborhood names
export function calculateSimulatedMetrics(from: string, to: string) {
  if (!from || !to) return { distance: 0, duration: 0, price: 0 };
  if (from === to) return { distance: 2.5, duration: 15, price: 20.00 };

  const start = NEIGHBORHOODS.find(n => n.name === from) || NEIGHBORHOODS[0];
  const end = NEIGHBORHOODS.find(n => n.name === to) || NEIGHBORHOODS[1];

  // Euclidean distances used as scales
  const dx = start.lat - end.lat;
  const dy = start.lng - end.lng;
  const rawDist = Math.sqrt(dx * dx + dy * dy);
  
  // Custom scaled kilometers (usually ranges 3km to ~25km in SP)
  const distance = Math.round((rawDist * 1.8 + 3.2) * 10) / 10;
  
  // In SP traffic, avg speed for a motoboy is around 30-40km/h
  const duration = Math.round(distance * 2.2 + 10); // in minutes
  
  // Base price R$ 15 + R$ 1.80 per km
  const price = Math.round((15 + distance * 1.8) * 10) / 10;

  return {
    distance,
    duration,
    price
  };
}
