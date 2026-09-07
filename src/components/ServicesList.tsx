import React from 'react';
import { 
  FileText, 
  Zap, 
  ShoppingBag, 
  HeartPulse, 
  Coins, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

// Icon Renderer helper
const ServiceIcon = ({ name, className }: { name: string; className: string }) => {
  switch (name) {
    case 'FileText':
      return <FileText className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'Coins':
      return <Coins className={className} />;
    default:
      return <Zap className={className} />;
  }
};

interface ServicesListProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesList({ onSelectService }: ServicesListProps) {
  return (
    <section id="portfolio-servicos" className="py-16 bg-neutral-900 text-white scroll-mt-16 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest font-mono mb-2">
            CONHEÇA O MEU PORTFÓLIO
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Serviços Mais Realizados em São Paulo
          </p>
          <p className="text-neutral-400 mt-3 text-sm leading-relaxed">
            Seja um contrato urgente para cartório ou a logística de entregas recorrentes de uma loja online, 
            estamos preparados com rotas inteligentes e baús adequados para atender com segurança.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              id={`service-card-${service.id}`}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 transition-all duration-300 hover:border-yellow-500/40 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-yellow-500/5 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Cost Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                    <ServiceIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-semibold bg-neutral-900 border border-neutral-800 text-yellow-400 px-3 py-1 rounded-full">
                    {service.basePrice}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold font-display tracking-tight text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-400 font-mono mb-4 flex items-center gap-1.5">
                  <span className="inline-block w-2 2-2 rounded-full bg-yellow-500/60" />
                  Tempo estimado: {service.estimateTime}
                </p>
                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 mb-6">
                  {service.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => onSelectService(service.title)}
                id={`btn-select-service-${service.id}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-yellow-500 hover:text-neutral-950 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 text-xs uppercase tracking-wider font-display border border-neutral-800 hover:border-yellow-500 mt-2 cursor-pointer"
              >
                Solicitar Este Serviço
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Additional Custom Request Banner */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold font-display tracking-tight">Precisa de um serviço sob medida para sua empresa?</h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Fazemos parcerias com faturamento quinzenal para rotas personalizadas, malotes recorrentes ou múltiplos destinos na mesma tarde em São Paulo. Fale diretamente comigo.
            </p>
          </div>
          <a 
            href="https://wa.me/5511947421357?text=Olá%20Rafael,%20gostaria%20de%20um%20orçamento%20corporativo%20personalizado%20para%20minha%20empresa."
            target="_blank" 
            rel="noopener noreferrer"
            id="services-whatsapp-custom-cta"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-neutral-950 font-black px-6 py-3 rounded-xl transition-all duration-200 text-xs uppercase tracking-wider font-display font-black cursor-pointer"
          >
            Falar pelo WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
