import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  HelpingHand, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  ShieldAlert, 
  Smile, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { REVIEWS } from '../data';

export default function TrustBadges() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'Quais regiões de São Paulo o Rafael Jorge atende?',
      a: 'Atendimento prioritário em toda a Capital (Centro, Zona Sul, Zona Oeste, Zona Norte e Zona Leste), região do ABCD (Santo André, São Bernardo, São Caetano, Diadema) e Guarulhos. Para entregas em outras regiões metropolitanas, consulte taxas.'
    },
    {
      q: 'Como posso realizar o pagamento das entregas?',
      a: 'Aceitamos PIX instantâneo, dinheiro e cartões de débito/crédito direto com a maquininha do Rafael no ponto de coleta/entrega. Para quem precisar, oferecemos a emissão de Nota Fiscal de serviços mediante solicitação.'
    },
    {
      q: 'O que o Rafael pode ou não transportar?',
      a: 'Transportamos com cuidado extremo: Documentos confidenciais, contratos bancários/cartórios, chaves, notebooks, brindes corporativos, pequenos volumes de e-commerce, exames médicos e remédios. Não é permitido o transporte de valores de alta monta em espécie, substâncias ilícitas ou inflamáveis.'
    },
    {
      q: 'Há garantia de segurança com as encomendas?',
      a: 'Sim. Rafael trabalha de forma 100% legalizada, possui baú de tamanho padrão impermeável com trancas reforçadas e segue normas rigorosas de circulação em corredores seguros de São Paulo. Além disso, as encomendas são conferidas na coleta e você recebe comprovante fotográfico na finalização.'
    }
  ];

  return (
    <section id="depoimentos-faq" className="py-16 bg-neutral-950 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Static Pitch Card */}
          <div className="lg:col-span-1 space-y-4">
            <span className="text-[10px] bg-yellow-500/10 text-yellow-500 font-bold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
              CLIENT TESTIMONIALS
            </span>
            <h3 className="text-3xl font-black font-display tracking-tight text-white">
              O que dizem os clientes do Rafael
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              O compromisso dele com a integridade do pacote e com o horário de entrega fideliza dezenas de empresas e autônomos em São Paulo todas as semanas.
            </p>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-neutral-950 font-black">
                98%
              </div>
              <div className="text-xs">
                <strong className="text-white block font-semibold">Índice de Retenção de Clientes</strong>
                <span className="text-neutral-400">Atendimento humanizado e sem burocracias.</span>
              </div>
            </div>
          </div>

          {/* Testimonial List Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <div 
                key={review.id} 
                id={`review-card-${review.id}`}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-300 italic font-light leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-white block font-semibold">{review.name}</strong>
                    <span className="text-neutral-500">{review.role}</span>
                  </div>
                  <span className="text-yellow-500 font-mono text-[10px] uppercase font-semibold">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* FAQ Block */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-8 border-b border-neutral-800 pb-3">
            <HelpCircle className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-bold font-display tracking-tight uppercase">Dúvidas Frequentes (FAQ)</h3>
          </div>

          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                id={`faq-item-${index}`}
                className="bg-neutral-950 border border-neutral-850 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  id={`btn-faq-toggle-${index}`}
                  className="w-full text-left p-4 flex justify-between items-center gap-4 text-sm font-semibold hover:text-yellow-400 transition-colors"
                >
                  <span className="font-display tracking-tight text-white">{faq.q}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  )}
                </button>

                {openFaqIndex === index && (
                  <div id={`faq-answer-${index}`} className="px-4 pb-4 text-xs sm:text-sm text-neutral-400 border-t border-neutral-900 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
