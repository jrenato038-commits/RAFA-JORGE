import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesList from './components/ServicesList';
import RequestForm from './components/RequestForm';
import OrderTracker from './components/OrderTracker';
import TrustBadges from './components/TrustBadges';
import PromotionalMaterials from './components/PromotionalMaterials';
import { OrderCall, OrderStatus } from './types';
import { Mail, Phone, MapPin, ShieldCheck, Heart, X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { RAFAEL_INFO } from './data';
import { AnimatePresence, motion } from 'motion/react';

// Pre-populated mock orders to show the portfolio system capabilities out-of-the-box
const INITIAL_MOCK_ORDERS: OrderCall[] = [
  {
    id: 'RJ-742918',
    clientName: 'Advocacia Pinheiro & Associados',
    phone: '(11) 98765-4321',
    email: 'marta.pinheiro@ pinheiro.adv.br',
    whatsapp: '(11) 98765-4321',
    pickupAddress: 'Avenida Paulista, 1000 - Bela Vista, São Paulo - SP',
    pickupContact: 'Dra. Marta Pinheiro (Responsável Comercial)',
    deliveryAddress: 'Sé / Centro Histórico (Cartório do 4° Ofício) - São Paulo - SP',
    deliveryContact: 'Escrevente Geraldo (Setor de Reconhecimento)',
    status: 'delivered',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4h ago
    notes: 'Urgente! Coleta de contrato social para reconhecimento de firma e autenticação de vias adicionais.',
    estimatedPrice: 38.00,
    estimatedDistance: 12.8,
    attachmentName: 'contrato_prestacao.pdf',
    attachmentUrl: 'data:text/plain;base64,TW9ja0RvY3VtZW50UGF0aEZvclRlc3Rpbmc=' // Mock PDF
  },
  {
    id: 'RJ-309121',
    clientName: 'E-commerce WearSP Estilo',
    phone: '(11) 97775-1111',
    email: 'contato@wearsp.com',
    whatsapp: '(11) 97775-1111',
    pickupAddress: 'Pinheiros (Galpão Logístico Wear) - São Paulo - SP',
    pickupContact: 'Claudio (Coordenador de Estoque)',
    deliveryAddress: 'Moema (Apartamento Res. Sol de Moema) - São Paulo - SP',
    deliveryContact: 'Sandra Melo (Cliente Final)',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(), // 1h ago
    notes: 'Vestuário (Caixa com 3 jaquetas da coleção de inverno). Favor entregar direto ao morador (não deixar na portaria se possível).',
    estimatedPrice: 28.50,
    estimatedDistance: 7.2,
    attachmentName: 'pacote_encomenda.jpg',
    attachmentUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200' // Real placeholder image representation of a package
  }
];

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  title?: string;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendente',
  accepted: 'Aceito pelo Rafael',
  in_progress: 'Em Trânsito / Entrega',
  delivered: 'Entregue com Sucesso',
  cancelled: 'Cancelado'
};

export default function App() {
  const [orders, setOrders] = useState<OrderCall[]>([]);
  const [selectedServicePreload, setSelectedServicePreload] = useState<string | undefined>(undefined);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to add a toast notification
  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'info', title?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  // Function to remove a toast notification
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load orders from local storage or pre-populate on start
  useEffect(() => {
    const saved = localStorage.getItem('rafael_portfolio_orders');
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        console.error('Falha ao parsear chamados salvos. Usando padrão.', e);
        setOrders(INITIAL_MOCK_ORDERS);
      }
    } else {
      setOrders(INITIAL_MOCK_ORDERS);
      localStorage.setItem('rafael_portfolio_orders', JSON.stringify(INITIAL_MOCK_ORDERS));
    }
  }, []);

  // Sync state changes with localStorage
  const saveOrders = (updatedOrders: OrderCall[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('rafael_portfolio_orders', JSON.stringify(updatedOrders));
  };

  // Callback when a user clicks "Solicitar este serviço" in portfolio list
  const handleSelectService = (serviceName: string) => {
    setSelectedServicePreload(serviceName);
  };

  const handleClearPreload = () => {
    setSelectedServicePreload(undefined);
  };

  // Action on new order success
  const handleNewOrder = (newOrder: OrderCall) => {
    const nextOrders = [newOrder, ...orders];
    saveOrders(nextOrders);
    addToast(
      `O chamado #${newOrder.id} para "${newOrder.clientName}" foi registrado no sistema.`,
      'success',
      'Novo Chamado Criado'
    );
  };

  // Action: update status or proof details
  const handleUpdateOrderStatus = (
    orderId: string, 
    status: OrderStatus, 
    proofUrl?: string, 
    proofName?: string
  ) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        const label = STATUS_LABELS[status] || status;
        addToast(
          `Chamado #${orderId}: status alterado para "${label}".`,
          status === 'delivered' ? 'success' : status === 'cancelled' ? 'warning' : 'info',
          'Status Atualizado'
        );
        return {
          ...o,
          status,
          // Append proof attributes if delivered
          ...(status === 'delivered' ? { 
            attachmentUrl: proofUrl || o.attachmentUrl, 
            attachmentName: proofName || o.attachmentName || 'Comprovante Entrega'
          } : {})
        };
      }
      return o;
    });
    saveOrders(updated);
  };

  // Action: delete order
  const handleDeleteOrder = (orderId: string) => {
    const filtered = orders.filter(o => o.id !== orderId);
    saveOrders(filtered);
    addToast(
      `Chamado #${orderId} foi removido do painel de monitoramento.`,
      'warning',
      'Chamado Removido'
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans antialiased text-base selection:bg-yellow-500 selection:text-neutral-950">
      
      {/* Brand Header */}
      <Header />

      {/* Main Content Layout */}
      <main>
        {/* Dynamic Presentation Pitch & Quick Bios */}
        <Hero />

        {/* Portfolio Showcase Grid of Services */}
        <ServicesList onSelectService={handleSelectService} />

        {/* Dynamic Order Creation Form fulfilling all requirement fields */}
        <RequestForm 
          onSubmitSuccess={handleNewOrder} 
          selectedServicePreload={selectedServicePreload}
          onClearPreload={handleClearPreload}
        />

        {/* Interactive Delivery Tracker & Order Management Console */}
        <OrderTracker 
          orders={orders} 
          onUpdateOrderStatus={handleUpdateOrderStatus} 
          onDeleteOrder={handleDeleteOrder} 
        />

        {/* Client trust testimonials, badges & FAQs */}
        <TrustBadges />

        {/* Ready to use WhatsApp menus and Social network Status copies */}
        <PromotionalMaterials />
      </main>

      {/* Footer Details */}
      <footer id="portfolio-footer" className="bg-neutral-950 border-t border-neutral-850 text-neutral-400 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-neutral-900">
            
            {/* Column 1: Core Bio */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-yellow-500 bg-neutral-950 flex items-center justify-center">
                  <img 
                    src="/src/assets/images/piscou_chegou_1780106010728.png" 
                    alt="Logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <strong className="text-white font-bold font-display tracking-tight text-base">{RAFAEL_INFO.name}</strong>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                Entrega ágil, segura e totalmente regulamentada em toda a cidade de São Paulo. Caso precise de Nota Fiscal de Serviços, basta solicitar diretamente ao Rafael.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <strong className="text-white block font-semibold mb-4 text-xs uppercase tracking-wider font-mono">Contatos Diretos</strong>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-yellow-500" />
                  <a href={`tel:${RAFAEL_INFO.phone}`} className="hover:text-yellow-400 font-mono">{RAFAEL_INFO.phoneFormatted}</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-yellow-500" />
                  <a href={`mailto:${RAFAEL_INFO.email}`} className="hover:text-yellow-400 font-mono">{RAFAEL_INFO.email}</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <span className="text-white block font-medium">Endereço / Base Operacional:</span>
                    <span className="text-neutral-400 block font-mono text-[11px] leading-relaxed">
                      Rua Domingos Pereda, 645<br/>
                      Vila Zatt, Pirituba<br/>
                      São Paulo - SP
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Professional Conduct info */}
            <div>
              <strong className="text-white block font-semibold mb-4 text-xs uppercase tracking-wider font-mono">Zelo & Certificações</strong>
              <p className="text-xs text-neutral-400 leading-normal mb-3">
                Operando sob extrema segurança com baú devidamente higienizado, antenas corta-pipa instaladas e proteção total contra intempéries.
              </p>
              <span className="inline-flex items-center gap-1.5 px-2 px-1 rounded bg-neutral-905 border border-neutral-800 text-[10px] text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> Condutor Legalizado Detran/SP
              </span>
            </div>

          </div>

          {/* Sub-footer Copyright & design details */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-mono">
            <div>
              &copy; {new Date().getFullYear()} {RAFAEL_INFO.name} • Caso precise de Nota Fiscal, solicitar • Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-1">
              <span>Feito com</span>
              <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
              <span>para o trânsito seguro de São Paulo</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Toast Notification Stack */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0" id="toast-notifications-container">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } }}
              className="pointer-events-auto w-full bg-neutral-900/95 backdrop-blur-md border border-neutral-800/80 rounded-xl shadow-2xl p-4 flex gap-3 items-start relative overflow-hidden"
              id={`toast-notification-${toast.id}`}
            >
              {/* Left accent bar matching the visual language */}
              <div className={`absolute top-0 left-0 bottom-0 w-1 ${
                toast.type === 'success' ? 'bg-emerald-500' :
                toast.type === 'warning' ? 'bg-rose-500' :
                'bg-yellow-500'
              }`} />

              <div className="flex-shrink-0 mt-0.5">
                {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                {toast.type === 'info' && <Info className="w-4 h-4 text-yellow-500" />}
              </div>

              <div className="flex-1 min-w-0 pr-4">
                {toast.title && (
                  <h4 className="text-xs font-black uppercase tracking-wider text-white font-display mb-1">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 text-neutral-500 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                id={`btn-close-toast-${toast.id}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
