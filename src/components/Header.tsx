import React, { useState } from 'react';
import { Phone, Mail, Clock, ShieldCheck, MessageSquare, QrCode, X } from 'lucide-react';
import { RAFAEL_INFO } from '../data';

export default function Header() {
  const [showQR, setShowQR] = useState(false);

  return (
    <header id="header-section" className="bg-neutral-900 border-b border-yellow-500/20 text-white py-4 sticky top-0 z-50 backdrop-blur-md bg-neutral-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo & Status Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 bg-neutral-950 flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <img 
                src="/src/assets/images/piscou_chegou_1780106010728.png" 
                alt="Rafael Jorge Logo" 
                className="w-full h-full object-cover scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight flex items-center gap-2">
                {RAFAEL_INFO.name}
              </h1>
              <p className="text-xs text-yellow-500 font-medium tracking-widest uppercase">
                {RAFAEL_INFO.title} • São Paulo
              </p>
            </div>
          </div>

          {/* Quick Contact & Working Hours Badge */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm mt-1 md:mt-0">
            <a 
              href={`mailto:${RAFAEL_INFO.email}`} 
              id="header-email-link"
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors bg-neutral-800/60 px-3 py-1.5 rounded-full border border-neutral-700/50"
            >
              <Mail className="w-4 h-4 text-yellow-500" />
              <span className="hidden sm:inline">{RAFAEL_INFO.email}</span>
              <span className="sm:hidden text-xs">Apoio por E-mail</span>
            </a>
            
            <a 
              href={`tel:${RAFAEL_INFO.phone.replace(/[^+\d]/g, '')}`} 
              id="header-phone-link"
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors bg-neutral-800/60 px-3 py-1.5 rounded-full border border-neutral-700/50"
            >
              <Phone className="w-4 h-4 text-yellow-500" />
              <span className="font-mono text-xs sm:text-sm">{RAFAEL_INFO.phoneFormatted}</span>
            </a>

            {/* QR Code trigger component - customized for desktop */}
            <div className="relative hidden md:block">
              <button 
                onClick={() => setShowQR(!showQR)}
                onMouseEnter={() => setShowQR(true)}
                id="header-qrcode-button"
                className="flex items-center gap-2 bg-neutral-800/80 hover:bg-neutral-700 hover:text-yellow-400 text-neutral-300 border border-neutral-700/50 px-3.5 py-1.5 rounded-full transition-all duration-200 text-xs font-semibold cursor-pointer"
                title="Visualizar QR Code para Celular"
              >
                <QrCode className="w-4 h-4 text-yellow-500" />
                <span>QR Code WhatsApp</span>
              </button>

              {showQR && (
                <div 
                  onMouseLeave={() => setShowQR(false)}
                  id="header-qrcode-popover"
                  className="absolute right-0 top-full mt-2.5 w-56 bg-neutral-900 border-2 border-yellow-500/40 text-white p-4 rounded-2xl shadow-2xl z-[100] animate-fade-in flex flex-col items-center text-center"
                >
                  <div className="flex justify-between items-center w-full mb-3 pb-1.5 border-b border-neutral-800">
                    <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-widest font-mono">Contato Rápido</span>
                    <button 
                      onClick={() => setShowQR(false)} 
                      className="text-neutral-400 hover:text-white cursor-pointer"
                      id="btn-close-qr-popover"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  <div className="bg-white p-2.5 rounded-xl mb-3 shadow-inner">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(RAFAEL_INFO.whatsappUrl)}&color=0a0a0a`} 
                      alt="WhatsApp QR Code"
                      className="w-32 h-32"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <p className="text-[10px] text-neutral-300 font-sans leading-relaxed">
                    Escaneie com a câmera do seu celular para abrir o chat do WhatsApp na hora!
                  </p>
                </div>
              )}
            </div>

            <a 
              href={RAFAEL_INFO.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              id="header-whatsapp-link"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-full transition-all duration-200 shadow-md shadow-emerald-900/45 animate-pulse"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
