import React from 'react';
import { ShieldCheck, Compass, Award, CircleAlert, Users } from 'lucide-react';
import { RAFAEL_INFO } from '../data';

export default function Hero() {
  return (
    <section id="hero-section" className="relative py-12 md:py-20 bg-neutral-950 text-white overflow-hidden border-b border-neutral-800">
      
      {/* Decorative dynamic roads design/glows */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#fbbf24_1px,transparent_1px),linear-gradient(-45deg,#fbbf24_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Pitch & Visual Branding */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs font-semibold text-yellow-500 uppercase tracking-widest w-fit">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
                Ativo Agora em São Paulo
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-neutral-950 rounded-full text-xs font-black uppercase tracking-wider shadow-lg shadow-yellow-500/30 w-fit animate-pulse">
                ⚡ PISCOU, CHEGOU!
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none text-white mb-4">
              Rapidez, Segurança e <span className="text-yellow-400">Profissionalismo</span> sobre Duas Rodas
            </h2>

            <div className="bg-gradient-to-r from-yellow-500/20 to-neutral-950/40 border-l-4 border-yellow-500 pl-4 py-2.5 mb-6 rounded-r-xl">
              <p className="text-yellow-400 font-extrabold italic text-sm sm:text-base tracking-wide uppercase font-display">
                "PISCOU, CHEGOU! Sua encomenda entregue com precisão por quem domina o asfalto paulistano."
              </p>
            </div>
            
            <p className="text-lg text-neutral-300 font-light mb-8 max-w-2xl leading-relaxed">
              {RAFAEL_INFO.bio}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80">
                <div className="text-yellow-400 font-black text-2xl font-display mb-1">20+ Anos</div>
                <div className="text-xs text-neutral-400 font-medium">No Trânsito de SP</div>
              </div>
              
              <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80">
                <div className="text-emerald-400 font-black text-lg sm:text-xl font-display mb-1">Nota Fiscal</div>
                <div className="text-xs text-neutral-400 font-medium font-sans">Solicitar se precisar</div>
              </div>

              <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80">
                <div className="text-yellow-400 font-black text-2xl font-display mb-1">&lt; 45m</div>
                <div className="text-xs text-neutral-400 font-medium">Média de Coletas</div>
              </div>

              <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80">
                <div className="text-emerald-400 font-black text-2xl font-display mb-1">9.8k+</div>
                <div className="text-xs text-neutral-400 font-medium">Entregas Concluídas</div>
              </div>
            </div>

            {/* CTA anchors */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a 
                href="#solicitar-chamado" 
                id="hero-request-cta"
                className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-neutral-950 font-black px-8 py-4 rounded-xl transition-all duration-200 text-center shadow-lg shadow-yellow-500/20 uppercase text-xs tracking-wider font-display"
              >
                Criar Chamado de Entrega
              </a>
              <a 
                href="#portfolio-servicos" 
                id="hero-portfolio-cta"
                className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-center text-xs uppercase tracking-wider font-display"
              >
                Conhecer Serviços
              </a>
            </div>
          </div>

          {/* Business Profile Sidebar Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border-2 border-yellow-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-500/20 font-mono">
                ENTREGAS EM SP
              </div>

              {/* Large Delivery Motorcycle Web Image Accent */}
              <div className="w-full h-44 rounded-xl overflow-hidden mb-6 border border-neutral-805 relative bg-neutral-950 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=500" 
                  alt="Moto de Entrega Profissional" 
                  className="w-full h-full object-cover pr-2 brightness-95 hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950 to-transparent p-3 pt-8 flex items-end">
                  <span className="bg-yellow-500 text-neutral-950 text-[9px] font-black px-2.5 py-0.5 rounded uppercase tracking-widest font-mono shadow">
                    Moto & Equipamento de Rafael
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  {/* Decorative badge circle simulating a high-quality delivery guy avatar */}
                  <div className="w-16 h-16 rounded-full bg-neutral-800 border-2 border-yellow-500 flex items-center justify-center text-yellow-500 overflow-hidden shadow-md">
                    <img 
                      src={RAFAEL_INFO.avatar} 
                      alt="Logo Moto Rafael" 
                      className="w-full h-full object-cover brightness-100 hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-neutral-900" title="Disponível agora" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display tracking-tight text-white">{RAFAEL_INFO.name}</h3>
                  <p className="text-xs text-yellow-500 font-mono font-semibold">⚡ Piscou, Chegou!</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white text-xs uppercase text-yellow-500 tracking-wider">Garantia & Procedência</span>
                    <p className="text-xs text-neutral-400 leading-normal mt-0.5">Procedura regulamentada, uso de bota, jaqueta refletiva e capacete com selo do Inmetro.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white text-xs uppercase text-yellow-500 tracking-wider">Equipamento Profissional</span>
                    <p className="text-xs text-neutral-400 leading-normal mt-0.5">{RAFAEL_INFO.vehicle}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white text-xs uppercase text-yellow-500 tracking-wider">Região de Atendimento</span>
                    <p className="text-xs text-neutral-400 leading-normal mt-0.5">{RAFAEL_INFO.coverage}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 bg-neutral-900/40 p-3 rounded-lg">
                <span className="flex items-center gap-1.5 font-mono">
                  <CircleAlert className="w-4 h-4 text-yellow-500" />
                  Segunda a Sábado • 07h às 21h
                </span>
                <span className="text-yellow-500 font-medium">SP - Capital</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
