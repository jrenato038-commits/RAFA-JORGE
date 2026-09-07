import React, { useState } from 'react';
import { 
  History, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText, 
  Check, 
  ArrowRight, 
  Clock, 
  Trash2,
  Lock,
  RotateCcw,
  Camera,
  CheckCircle,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { OrderCall, OrderStatus } from '../types';

interface OrderTrackerProps {
  orders: OrderCall[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus, proofUrl?: string, proofName?: string) => void;
  onDeleteOrder: (orderId: string) => void;
}

export default function OrderTracker({ orders, onUpdateOrderStatus, onDeleteOrder }: OrderTrackerProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orders[0]?.id || null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [deliveryProofFile, setDeliveryProofFile] = useState<{ name: string; url: string } | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'delivered' | 'cancelled'>('all');

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    in_progress: orders.filter(o => o.status === 'in_progress' || o.status === 'accepted').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'in_progress') return o.status === 'in_progress' || o.status === 'accepted';
    return o.status === statusFilter;
  });

  // Auto-select first order if none selected or if selected is deleted or outside current filter
  const selectedOrder = filteredOrders.find(o => o.id === selectedOrderId)
    || orders.find(o => o.id === selectedOrderId)
    || filteredOrders[0]
    || orders[0];

  const handleDeliveryProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setDeliveryProofFile({
          name: file.name,
          url: uploadEvent.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const applyStatusChange = (status: OrderStatus) => {
    if (!selectedOrder) return;
    
    if (status === 'delivered') {
      onUpdateOrderStatus(
        selectedOrder.id, 
        status, 
        deliveryProofFile?.url, 
        deliveryProofFile?.name || 'comprovante_entrega.jpg'
      );
      setDeliveryProofFile(null); // Clear state
    } else {
      onUpdateOrderStatus(selectedOrder.id, status);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Pendente</span>;
      case 'accepted':
        return <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Aceito</span>;
      case 'in_progress':
        return <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono animate-pulse">Em Trânsito</span>;
      case 'delivered':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Entregue</span>;
      case 'cancelled':
        return <span className="bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Cancelado</span>;
      default:
        return null;
    }
  };

  return (
    <section id="acompanhamento-pedidos" className="py-16 bg-neutral-900 border-b border-neutral-800 scroll-mt-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest font-mono mb-2">
              REAL-TIME MONITORING
            </h2>
            <p className="text-3xl font-extrabold font-display tracking-tight text-white">
              Painel de Acompanhamento de Chamados
            </p>
            <p className="text-neutral-400 mt-2 text-sm max-w-xl">
              Pesquise, consulte e simule o status de entrega do seu chamado. 
              {isAdminView ? " Modo Administrador (Rafael Jorge) ativo." : " Mude a chave ao lado para assumir a visão de Rafael Jorge."}
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl">
            <span className="text-xs font-semibold text-neutral-400 uppercase font-mono tracking-wider pl-1.5">
              Área do Rafael (Operador):
            </span>
            <button 
              onClick={() => setIsAdminView(!isAdminView)}
              id="admin-view-toggle"
              className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                isAdminView 
                  ? 'bg-yellow-500 text-neutral-950' 
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300'
              }`}
            >
              <Lock className="w-3.5 h-3.5 fill-current" />
              {isAdminView ? 'Simular Rafael ON' : 'Clique para Simular Rafael'}
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-neutral-950 rounded-2xl border border-neutral-800 p-6">
            <p className="text-neutral-400 mb-4 text-sm font-light">Nenhum chamado foi registrado nesta sessão ainda.</p>
            <a 
              href="#solicitar-chamado" 
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-neutral-950 font-bold px-6 py-2.5 rounded-xl transition-all uppercase text-xs tracking-wider font-display"
            >
              Criar Primeiro Chamado
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-neutral-950 p-2 rounded-2xl border border-neutral-800 overflow-x-auto" id="order-status-filter-tabs">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                id="filter-tab-all"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === 'all'
                    ? 'bg-yellow-500 text-neutral-950 shadow-md font-extrabold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <span>Todos os Chamados</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  statusFilter === 'all' ? 'bg-neutral-950 text-yellow-400' : 'bg-neutral-900 text-neutral-400'
                }`}>
                  {counts.all}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('pending')}
                id="filter-tab-pending"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === 'pending'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-md font-extrabold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-yellow-400" />
                <span>Pendente</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  statusFilter === 'pending' ? 'bg-yellow-500/30 text-yellow-300' : 'bg-neutral-900 text-neutral-400'
                }`}>
                  {counts.pending}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('in_progress')}
                id="filter-tab-in-progress"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === 'in_progress'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50 shadow-md font-extrabold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
                <span>Em Trânsito</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  statusFilter === 'in_progress' ? 'bg-orange-500/30 text-orange-300' : 'bg-neutral-900 text-neutral-400'
                }`}>
                  {counts.in_progress}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('delivered')}
                id="filter-tab-delivered"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === 'delivered'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-md font-extrabold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Entregue</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  statusFilter === 'delivered' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-neutral-900 text-neutral-400'
                }`}>
                  {counts.delivered}
                </span>
              </button>

              {counts.cancelled > 0 && (
                <button
                  type="button"
                  onClick={() => setStatusFilter('cancelled')}
                  id="filter-tab-cancelled"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
                    statusFilter === 'cancelled'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-md font-extrabold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                  <span>Cancelado</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    statusFilter === 'cancelled' ? 'bg-red-500/30 text-red-300' : 'bg-neutral-900 text-neutral-400'
                  }`}>
                    {counts.cancelled}
                  </span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Sidebar with Orders List */}
              <div className="lg:col-span-4 bg-neutral-950 border border-neutral-800 rounded-2xl p-4 max-h-[500px] overflow-y-auto">
                <h3 className="text-xs font-bold uppercase text-neutral-400 tracking-wider font-mono mb-3 px-2 flex items-center justify-between">
                  <span>Lista de Chamados</span>
                  <span className="bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                    {filteredOrders.length} de {orders.length}
                  </span>
                </h3>

                <div className="space-y-2">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-8 text-xs text-neutral-500 font-mono space-y-2">
                      <p>Nenhum chamado encontrado para este filtro.</p>
                      <button
                        type="button"
                        onClick={() => setStatusFilter('all')}
                        className="text-yellow-500 hover:underline font-bold cursor-pointer"
                      >
                        Ver todos os chamados
                      </button>
                    </div>
                  ) : (
                    filteredOrders.map((order) => (
                      <button
                        key={order.id}
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setDeliveryProofFile(null);
                        }}
                        id={`btn-select-order-${order.id}`}
                        className={`w-full text-left p-3 rounded-xl transition-all border flex flex-col gap-1 cursor-pointer ${
                          selectedOrder?.id === order.id
                            ? 'bg-yellow-500/10 border-yellow-500'
                            : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/85'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <span className="font-mono text-[11px] font-bold text-yellow-500">
                            {order.id}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        
                        <strong className="text-white text-xs line-clamp-1">{order.clientName}</strong>
                        
                        <div className="flex justify-between items-center text-[10px] text-neutral-400 mt-1 pt-1.5 border-t border-neutral-900">
                          <span className="line-clamp-1 max-w-[120px]">{order.pickupAddress.split(',')[0]}</span>
                          <ArrowRight className="w-3 h-3 text-neutral-500" />
                          <span className="line-clamp-1 max-w-[120px]">{order.deliveryAddress.split(',')[0]}</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

            {/* Main Order Details View */}
            {selectedOrder && (
              <div id="order-details-pane" className="lg:col-span-8 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
                
                {/* Header detail with simulation controller */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-neutral-850">
                  <div>
                    <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider font-mono">DOCUMENTO INTERNO REGISTRADO</span>
                    <h3 className="text-xl font-bold font-display tracking-tight mt-1 flex items-center gap-2">
                      Chamado <span className="text-yellow-400 font-mono font-black">{selectedOrder.id}</span>
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">
                      Criado em: {new Date(selectedOrder.createdAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400 text-xs font-semibold">Status:</span>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
                  
                  {/* Left Column: Contacts & Details */}
                  <div className="space-y-4">
                    
                    {/* CLIENT BLOCK */}
                    <div className="bg-neutral-900/40 p-4 border border-neutral-800/60 rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold uppercase tracking-wider mb-2 font-mono">
                        <User className="w-4 h-4" />
                        <span>Contatos do Solicitante</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-xs text-neutral-500 block">Nome do Cliente:</span>
                        <strong className="text-white">{selectedOrder.clientName}</strong>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                        <div>
                          <span className="text-[10px] text-neutral-500 block">Telefone:</span>
                          <span className="font-mono">{selectedOrder.phone}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-500 block">E-mail:</span>
                          <span className="font-mono line-clamp-1" title={selectedOrder.email}>{selectedOrder.email}</span>
                        </div>
                      </div>
                      <div className="pt-1.5 border-t border-neutral-800/50 flex justify-between items-center text-xs">
                        <span className="text-neutral-400">Canal Principal:</span>
                        <a 
                          href={`https://wa.me/${selectedOrder.whatsapp.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noopener" 
                          id="whatsapp-chat-lead"
                          className="text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-semibold flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{selectedOrder.whatsapp}</span>
                        </a>
                      </div>
                    </div>

                    {/* Faturamento (Nota Fiscal) & Canais de Envio Status */}
                    <div className="bg-neutral-900/40 p-4 border border-neutral-800/60 rounded-xl space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold uppercase tracking-wider mb-2 font-mono">
                        <FileCheck className="w-4 h-4 text-yellow-500" />
                        <span>Faturamento & Notificações</span>
                      </div>

                      {/* Nota Fiscal State */}
                      <div className="text-xs space-y-1.5 pb-2.5 border-b border-neutral-850">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">Opção Nota Fiscal:</span>
                          {selectedOrder.wantsInvoice ? (
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono">Solicitada (E-Nota)</span>
                          ) : (
                            <span className="bg-neutral-900 text-neutral-500 border border-neutral-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono">Não solicitada</span>
                          )}
                        </div>

                        {selectedOrder.wantsInvoice && (
                          <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-900/80 space-y-1 mt-1">
                            <div>
                              <span className="text-[10px] text-neutral-500 block">Razão Social / Nome:</span>
                              <strong className="text-white font-sans text-xs">{selectedOrder.invoiceCompanyName || 'Não informado'}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-neutral-500 block">CNPJ / CPF do faturamento:</span>
                              <strong className="text-yellow-400 font-mono text-[11px]">{selectedOrder.invoiceCnpjOrCpf || 'Não informado'}</strong>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Notifier Alert Details */}
                      <div className="text-xs space-y-2">
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block font-mono">Status das Notificações:</span>
                        
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          {/* WhatsApp Channel */}
                          <div className={`p-2 rounded-lg border ${
                            selectedOrder.notifyWhatsApp !== false 
                              ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
                              : 'bg-neutral-900/60 border-neutral-800 text-neutral-500'
                          }`}>
                            <span className="font-bold block uppercase font-mono">WhatsApp</span>
                            <span className="block text-[9px] mt-0.5">
                              {selectedOrder.notifyWhatsApp !== false ? '● Ativado' : '○ Sem alertas'}
                            </span>
                            {selectedOrder.notifyWhatsApp !== false && (
                              <span className="block text-[8px] text-neutral-400 mt-1">Real-time status</span>
                            )}
                          </div>

                          {/* Email Channel */}
                          <div className={`p-2 rounded-lg border ${
                            selectedOrder.notifyEmail !== false 
                              ? 'bg-blue-500/5 border-blue-500/20 text-blue-400' 
                              : 'bg-neutral-900/60 border-neutral-800 text-neutral-500'
                          }`}>
                            <span className="font-bold block uppercase font-mono">E-mail</span>
                            <span className="block text-[9px] mt-0.5">
                              {selectedOrder.notifyEmail !== false ? '● Ativado' : '○ Sem alertas'}
                            </span>
                            {selectedOrder.notifyEmail !== false && (
                              <span className="block text-[8px] text-neutral-400 mt-1">Status de entrega</span>
                            )}
                          </div>
                        </div>

                        {/* Direct Alert dispatch simulation */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          <a 
                            href={`https://wa.me/${selectedOrder.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `🏍️ *ATUALIZAÇÃO DE STATUS - PEDIDO STATUS ${selectedOrder.id}* 🏍️\n\n` +
                              `Olá *${selectedOrder.clientName}*,\n` +
                              `O status do seu chamado com o Rafael Jorge foi atualizado!\n\n` +
                              `📍 *RETIRADA:* ${selectedOrder.pickupAddress.split(',')[0]}\n` +
                              `📍 *ENTREGA:* ${selectedOrder.deliveryAddress.split(',')[0]}\n` +
                              `📏 *TRAJETO:* ${selectedOrder.estimatedDistance} km\n\n` +
                              `🏍️ *STATUS ATUAL DO CHAMADO:* ${
                                selectedOrder.status === 'pending' ? '🟡 PENDENTE DE CONFIRMAÇÃO' :
                                selectedOrder.status === 'accepted' ? '🔵 ACEITO / AGUARDANDO COBERTA' :
                                selectedOrder.status === 'in_progress' ? '🟠 EM TRÂNSITO COM O MOTOBOY' :
                                selectedOrder.status === 'delivered' ? '🟢 ENTREGUE / FINALIZADO' : '🔴 CANCELADO'
                              }\n\n` +
                              `Acompanhe online em tempo real no nosso site. ⚡ *PISCOU, CHEGOU!* ⚡`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-neutral-900 hover:bg-neutral-850 text-[10px] font-mono font-bold py-1.5 px-2 rounded-lg text-emerald-400 border border-neutral-800 hover:border-emerald-500/30 flex items-center justify-center gap-1 hover:scale-[1.01] transition-transform"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Alerta WhatsApp
                          </a>

                          <a 
                            href={`mailto:${selectedOrder.email}?subject=${encodeURIComponent(
                              `Atualização de Entrega [${selectedOrder.status.toUpperCase()}] - Pedido ${selectedOrder.id}`
                            )}&body=${encodeURIComponent(
                              `Olá ${selectedOrder.clientName},\n\n` +
                              `Notificamos que o status do seu chamado de coleta e entrega expressa com o Rafael Jorge mudou.\n\n` +
                              `-----------------------------------------------------\n` +
                              `PEDIDO NÚMERO: ${selectedOrder.id}\n` +
                              `STATUS DO SISTEMA: ${
                                selectedOrder.status === 'pending' ? 'Pendente' :
                                selectedOrder.status === 'accepted' ? 'Aceito pelo profissional' :
                                selectedOrder.status === 'in_progress' ? 'Em rota de entrega pelas ruas' :
                                selectedOrder.status === 'delivered' ? 'Entregue com Sucesso' : 'Cancelado'
                              }\n` +
                              `LOCAL DE RETIRADA: ${selectedOrder.pickupAddress}\n` +
                              `LOCAL DE ENTREGA: ${selectedOrder.deliveryAddress}\n` +
                              `DISTÂNCIA: ${selectedOrder.estimatedDistance} km\n` +
                              `${selectedOrder.wantsInvoice ? `NOTA FISCAL DO PEDIDO: Solicitada para CNPJ: ${selectedOrder.invoiceCnpjOrCpf}\n` : ''}` +
                              `-----------------------------------------------------\n\n` +
                              `Você pode continuar acompanhando diretamente por nosso portal.\n\n` +
                              `Atenciosamente,\n` +
                              `Rafael Jorge - Motoboy Profissional\n` +
                              `negruts_sp@outlook.com`
                            )}`}
                            className="flex-1 text-center bg-neutral-900 hover:bg-neutral-850 text-[10px] font-mono font-bold py-1.5 px-2 rounded-lg text-yellow-500 border border-neutral-800 hover:border-yellow-500/20 flex items-center justify-center gap-1 hover:scale-[1.01] transition-transform"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            Alerta E-mail
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* ENCOMENDA ANEXO */}
                    <div className="bg-neutral-900/40 p-4 border border-neutral-800/60 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold uppercase tracking-wider mb-3 font-mono">
                        <FileText className="w-4 h-4" />
                        <span>Anexo da Encomenda</span>
                      </div>

                      {selectedOrder.attachmentUrl ? (
                        <div className="space-y-3">
                          {selectedOrder.attachmentUrl.startsWith('data:image/') ? (
                            <div className="w-full h-36 rounded-lg bg-neutral-950 border border-neutral-800 overflow-hidden flex items-center justify-center">
                              <img 
                                src={selectedOrder.attachmentUrl} 
                                alt="Foto Encomenda" 
                                className="w-full h-full object-contain hover:scale-105 transition-transform" 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ) : (
                            <div className="bg-neutral-950 p-2.5 rounded border border-neutral-850 flex items-center gap-2 text-xs">
                              <FileText className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                              <span className="font-mono line-clamp-1">{selectedOrder.attachmentName || 'documento_encomenda.pdf'}</span>
                            </div>
                          )}
                          <a 
                            href={selectedOrder.attachmentUrl} 
                            download={selectedOrder.attachmentName || 'encomenda_anexo'} 
                            className="w-full text-center block text-[10px] bg-neutral-900 border border-neutral-800 hover:border-yellow-500/50 text-neutral-300 rounded p-1.5 transition-colors font-mono font-bold"
                          >
                            Visualizar / Abrir Anexo Completo
                          </a>
                        </div>
                      ) : (
                        <p className="text-xs text-neutral-500 italic mt-1 py-2 text-center bg-neutral-950/40 rounded border border-dashed border-neutral-850">
                          Nenhum anexo inserido na criação do chamado.
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Right Column: Routes, Contacts & Status Admin Actions */}
                  <div className="space-y-4">
                    
                    {/* ROUTE & METRICS BLOCK */}
                    <div className="bg-neutral-900/40 p-4 border border-neutral-800/60 rounded-xl space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold uppercase tracking-wider font-mono">
                        <MapPin className="w-4 h-4" />
                        <span>Rota Completa</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="border-l-2 border-yellow-500 pl-3">
                          <span className="text-[10px] text-neutral-500 uppercase block font-semibold">1. Retirada da Encomenda</span>
                          <span className="text-white block font-medium mt-0.5 leading-snug">{selectedOrder.pickupAddress}</span>
                          <span className="text-yellow-500 block text-[11px] font-mono mt-0.5 font-semibold">
                            Quem entrega: <span className="text-white font-sans">{selectedOrder.pickupContact}</span>
                          </span>
                        </div>

                        <div className="border-l-2 border-emerald-500 pl-3 pt-1">
                          <span className="text-[10px] text-neutral-500 uppercase block font-semibold">2. Local de Entrega</span>
                          <span className="text-white block font-medium mt-0.5 leading-snug">{selectedOrder.deliveryAddress}</span>
                          <span className="text-emerald-400 block text-[11px] font-mono mt-0.5 font-semibold">
                            Quem recebe: <span className="text-white font-sans">{selectedOrder.deliveryContact}</span>
                          </span>
                        </div>
                      </div>

                      {/* Notes / Obs */}
                      {selectedOrder.notes && (
                        <div className="pt-2 border-t border-neutral-805 text-xs">
                          <span className="text-neutral-500 block">Instruções / Observações:</span>
                          <p className="text-neutral-300 italic whitespace-pre-wrap leading-relaxed bg-neutral-950 p-2 rounded border border-neutral-900/60 mt-1 max-h-20 overflow-y-auto font-sans">
                            "{selectedOrder.notes}"
                          </p>
                        </div>
                      )}

                      <div className="pt-2.5 border-t border-neutral-800 flex justify-between text-xs font-mono">
                        <span className="text-neutral-400">Orçamento estimado: </span>
                        <strong className="text-yellow-400">R$ {selectedOrder.estimatedPrice.toFixed(2)}</strong>
                      </div>
                    </div>

                    {/* DELETE / REMOVE BLOCK (Safeguarded) */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-500">Excluir este teste da lista local:</span>
                      <button 
                        onClick={() => {
                          if (confirm('Tem certeza de que deseja apagar este chamado da lista?')) {
                            onDeleteOrder(selectedOrder.id);
                          }
                        }}
                        id="btn-delete-order"
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded transition-all text-xs flex items-center gap-1 border border-transparent hover:border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Apagar Registro</span>
                      </button>
                    </div>

                  </div>

                </div>

                {/* MODAL / BOTTOM ROW: RAFAEL ADMIN ACTIONS (SIMULATED FOR THE VISITOR) */}
                <div className="mt-8 pt-6 border-t border-neutral-800">
                  {isAdminView ? (
                    <div className="bg-yellow-500/5 p-4 rounded-xl border border-yellow-500/30">
                      <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-widest font-mono mb-3 flex items-center gap-1.5">
                        <Lock className="w-4 h-4" />
                        Controles do Rafael Jorge (Simulação)
                      </h4>
                      <p className="text-xs text-neutral-400 mb-4">
                        Como Rafael Jorge, você pode avançar os pedidos para demonstrar as atualizações ao cliente. 
                        Selecione o novo status abaixo para ver os reflexos em tempo real.
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        <button 
                          onClick={() => applyStatusChange('pending')}
                          id="admin-status-pending"
                          className={`text-xs px-3.5 py-1.5 rounded-lg font-bold border transition-all ${
                            selectedOrder.status === 'pending'
                              ? 'bg-yellow-500 text-neutral-950 border-yellow-500'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                          }`}
                        >
                          Pendente
                        </button>
                        <button 
                          onClick={() => applyStatusChange('accepted')}
                          id="admin-status-accepted"
                          className={`text-xs px-3.5 py-1.5 rounded-lg font-bold border transition-all ${
                            selectedOrder.status === 'accepted'
                              ? 'bg-sky-500 text-neutral-950 border-sky-400'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                          }`}
                        >
                          Aceito
                        </button>
                        <button 
                          onClick={() => applyStatusChange('in_progress')}
                          id="admin-status-inprogress"
                          className={`text-xs px-3.5 py-1.5 rounded-lg font-bold border transition-all ${
                            selectedOrder.status === 'in_progress'
                              ? 'bg-orange-500 text-neutral-950 border-orange-500'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                          }`}
                        >
                          Em Trânsito
                        </button>
                        <button 
                          onClick={() => applyStatusChange('delivered')}
                          id="admin-status-delivered"
                          className={`text-xs px-3.5 py-1.5 rounded-lg font-bold border transition-all ${
                            selectedOrder.status === 'delivered'
                              ? 'bg-emerald-500 text-neutral-950 border-emerald-500'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                          }`}
                        >
                          Entregue
                        </button>
                        <button 
                          onClick={() => applyStatusChange('cancelled')}
                          id="admin-status-cancelled"
                          className={`text-xs px-3.5 py-1.5 rounded-lg font-bold border border-red-550 transition-all ${
                            selectedOrder.status === 'cancelled'
                              ? 'bg-red-600 text-white'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                          }`}
                        >
                          Cancelado
                        </button>
                      </div>

                      {/* If delivered option is selected OR being configured, allow custom confirmation attachment */}
                      {selectedOrder.status !== 'delivered' && (
                        <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-0.5">
                            <span className="text-xs font-semibold text-neutral-300 block flex items-center gap-1">
                              <Camera className="w-3.5 h-3.5 text-yellow-500" />
                              Incluir Comprovante / Foto de Entrega:
                            </span>
                            <span className="text-[10px] text-neutral-500 block">Dará suporte de foto ao mudar o status abaixo para 'Entregue'.</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <input 
                              type="file" 
                              id="delivery-proof-upload"
                              className="hidden" 
                              accept="image/*"
                              onChange={handleDeliveryProofUpload}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById('delivery-proof-upload')?.click()}
                              className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white text-xs px-3 py-1.5 rounded-md font-mono"
                            >
                              {deliveryProofFile ? 'Trocar Imagem' : 'Anexar Foto de Entrega'}
                            </button>
                            {deliveryProofFile && (
                              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Carregado
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block text-white text-xs uppercase text-yellow-500 tracking-wider">Acompanhamento em Tempo Real</span>
                          <span className="text-xs text-neutral-400 block mt-0.5">Clique no botão superior "Clique para Simular Rafael" se quiser simular a mudança de status deste pedido pelo motorista.</span>
                        </div>
                      </div>

                      {selectedOrder.status === 'delivered' && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-3 text-xs w-full sm:w-auto flex flex-col items-center gap-1">
                          <div className="flex items-center gap-1">
                            <FileCheck className="w-4 h-4" />
                            <strong className="font-semibold">Entrega Concluída 100%!</strong>
                          </div>
                          <span className="text-[9px] text-neutral-400 text-center block">Comprovante anexado pelo motorista.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
