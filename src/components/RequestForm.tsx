import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Check, 
  Calculator, 
  AlertCircle,
  FileSpreadsheet,
  X,
  FileImage,
  Sparkles,
  Copy,
  Share2,
  Instagram,
  Facebook,
  Send
} from 'lucide-react';
import { NEIGHBORHOODS, calculateSimulatedMetrics } from '../data';
import { OrderCall } from '../types';

interface RequestFormProps {
  onSubmitSuccess: (order: OrderCall) => void;
  selectedServicePreload?: string;
  onClearPreload?: () => void;
}

export default function RequestForm({ onSubmitSuccess, selectedServicePreload, onClearPreload }: RequestFormProps) {
  // Helper to format date-time string in ISO local format YYYY-MM-DDTHH:MM
  const getFormatDateTime = (offsetMinutes = 0) => {
    try {
      const now = new Date();
      if (offsetMinutes > 0) {
        now.setMinutes(now.getMinutes() + offsetMinutes);
      }
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    } catch {
      return '';
    }
  };

  const formatPortugueseDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return 'Não definida';
    try {
      const [datePart, timePart] = dateTimeStr.split('T');
      const [year, month, day] = datePart.split('-');
      return `${day}/${month}/${year} às ${timePart || '00:00'}`;
    } catch {
      return dateTimeStr;
    }
  };

  // Form states matching exactly all requirements:
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  // Invoice & Billing Option states
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const [invoiceCnpjOrCpf, setInvoiceCnpjOrCpf] = useState('');
  const [invoiceCompanyName, setInvoiceCompanyName] = useState('');

  // Notification Options states
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  
  // Addresses & Contacts
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupContact, setPickupContact] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryContact, setDeliveryContact] = useState('');

  // Collect and Delivery datetimes
  const [pickupDateTime, setPickupDateTime] = useState(getFormatDateTime());
  const [deliveryDateTime, setDeliveryDateTime] = useState(getFormatDateTime(60));
  
  // Custom Notes
  const [notes, setNotes] = useState('');
  
  // Quick select placeholders for SP neighborhoods to trigger calculator
  const [pickupNeighborhood, setPickupNeighborhood] = useState('Vila Olímpia');
  const [deliveryNeighborhood, setDeliveryNeighborhood] = useState('Sé / Centro Histórico');
  
  // Calculated stats (simulated SP distance & pricing)
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  // File Upload
  const [fileAttachment, setFileAttachment] = useState<{ name: string; url: string; size?: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Error handling & Success feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<OrderCall | null>(null);
  const [successShareTab, setSuccessShareTab] = useState<'envio' | 'status'>('envio');
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  // Auto-set note if any service preloaded
  useEffect(() => {
    if (selectedServicePreload) {
      setNotes((prev) => {
        const base = `Serviço desejado: ${selectedServicePreload}.`;
        return prev.includes(selectedServicePreload) ? prev : `${base}\n${prev}`;
      });
      // Scroll to form nicely
      const element = document.getElementById('solicitar-chamado');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedServicePreload]);

  // Recalculate cost when neighborhood changes
  useEffect(() => {
    const metrics = calculateSimulatedMetrics(pickupNeighborhood, deliveryNeighborhood);
    setDistance(metrics.distance);
    setDuration(metrics.duration);
    setPrice(metrics.price);
    
    // Auto-fill full mock address inputs if they are empty
    if (!pickupAddress || NEIGHBORHOODS.some(n => n.name === pickupAddress)) {
      setPickupAddress(pickupNeighborhood + ', São Paulo - SP');
    }
    if (!deliveryAddress || NEIGHBORHOODS.some(n => n.name === deliveryAddress)) {
      setDeliveryAddress(deliveryNeighborhood + ', São Paulo - SP');
    }
  }, [pickupNeighborhood, deliveryNeighborhood]);

  // Handle manual distance adjustment if they edit addresses
  const handleAddressChange = (type: 'pickup' | 'delivery', val: string) => {
    if (type === 'pickup') {
      setPickupAddress(val);
      // Try to match key word
      const match = NEIGHBORHOODS.find(n => val.toLowerCase().includes(n.name.toLowerCase()));
      if (match) setPickupNeighborhood(match.name);
    } else {
      setDeliveryAddress(val);
      const match = NEIGHBORHOODS.find(n => val.toLowerCase().includes(n.name.toLowerCase()));
      if (match) setDeliveryNeighborhood(match.name);
    }
  };

  // Drag and Drop implementation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      const sizeStr = (file.size / 1024).toFixed(1) + ' KB';
      setFileAttachment({
        name: file.name,
        url: base64Url,
        size: sizeStr
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = () => {
    setFileAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit Order Call
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Strict validation
    if (!clientName.trim()) return setErrorMsg('Por favor, informe seu nome.');
    if (!phone.trim()) return setErrorMsg('Por favor, informe o telefone de contato.');
    if (!email.trim() || !email.includes('@')) return setErrorMsg('Por favor, informe um e-mail válido.');
    if (!whatsapp.trim()) return setErrorMsg('Por favor, insira o número de WhatsApp.');
    if (!pickupAddress.trim()) return setErrorMsg('Por favor, digite o local de retirada da encomenda.');
    if (!pickupContact.trim()) return setErrorMsg('Por favor, informe o nome da pessoa de contato na retirada.');
    if (!deliveryAddress.trim()) return setErrorMsg('Por favor, digite o local de entrega da encomenda.');
    if (!deliveryContact.trim()) return setErrorMsg('Por favor, informe o nome da pessoa de contato na entrega.');
    if (!pickupDateTime) return setErrorMsg('Por favor, informe a data e hora desejada para a coleta.');
    if (!deliveryDateTime) return setErrorMsg('Por favor, informe a data e hora estimada de entrega.');

    // If wantsInvoice is selected, validate inputs
    if (wantsInvoice) {
      if (!invoiceCnpjOrCpf.trim()) {
        return setErrorMsg('Por favor, preencha o CNPJ ou CPF para emissão da Nota Fiscal.');
      }
      if (!invoiceCompanyName.trim()) {
        return setErrorMsg('Por favor, preencha o Nome ou Razão Social para emissão da Nota Fiscal.');
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: OrderCall = {
        id: 'RJ-' + Math.floor(100000 + Math.random() * 900000),
        clientName,
        phone,
        email,
        whatsapp,
        pickupAddress,
        pickupContact,
        deliveryAddress,
        deliveryContact,
        pickupDateTime,
        deliveryDateTime,
        notes: notes.trim(),
        attachmentUrl: fileAttachment?.url,
        attachmentName: fileAttachment?.name,
        status: 'pending',
        createdAt: new Date().toISOString(),
        estimatedPrice: price,
        estimatedDistance: distance,
        wantsInvoice,
        invoiceCnpjOrCpf: wantsInvoice ? invoiceCnpjOrCpf.trim() : undefined,
        invoiceCompanyName: wantsInvoice ? invoiceCompanyName.trim() : undefined,
        notifyWhatsApp,
        notifyEmail,
      };

      // Direct success handler
      onSubmitSuccess(newOrder);
      setCreatedOrder(newOrder);
      setShowSuccess(true);
      setIsSubmitting(false);

      // Clean inputs
      setNotes('');
      if (onClearPreload) onClearPreload();
    }, 1200); // realistic network delay simulation
  };

  const handleResetForm = () => {
    setShowSuccess(false);
    setCreatedOrder(null);
    
    // Clear fields
    setClientName('');
    setPhone('');
    setEmail('');
    setWhatsapp('');
    setPickupAddress('');
    setPickupContact('');
    setDeliveryAddress('');
    setDeliveryContact('');
    setNotes('');
    setFileAttachment(null);
    setWantsInvoice(false);
    setInvoiceCnpjOrCpf('');
    setInvoiceCompanyName('');
    setNotifyWhatsApp(true);
    setNotifyEmail(true);
  };

  return (
    <section id="solicitar-chamado" className="py-16 bg-neutral-950 text-white scroll-mt-16 border-b border-neutral-800 relative">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Success Screen Overlay (keeps it modular and elegant) */}
        {showSuccess && createdOrder ? (
          <div id="sucesso-chamado" className="bg-neutral-900 border-2 border-yellow-500 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden animate-fade-in duration-300">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-500 z-20" />
            
            {/* Background Image of delivery motorcycle with packages around it */}
            <div className="absolute inset-0 pointer-events-none select-none z-0">
              <img 
                src="/src/assets/images/delivery_motorcycle_1780145992525.png" 
                alt="Fundo Moto de Entrega" 
                className="w-full h-full object-cover opacity-[0.07] transition-opacity duration-300 mix-blend-luminosity filter blur-[0.5px]" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-900/80" />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/40 text-yellow-500 flex items-center justify-center mx-auto mb-6 scale-110">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
                Chamado de Entrega Criado!
              </h3>
              <p className="text-xs font-mono text-yellow-500 font-bold tracking-widest mb-6">
                NÚMERO DO PEDIDO: {createdOrder.id}
              </p>

              <div className="max-w-xl mx-auto bg-neutral-950 rounded-xl p-5 border border-neutral-800 text-left space-y-3 mb-8">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-2">
                  <span className="text-xs text-neutral-400 font-mono">Status do Chamado:</span>
                  <span className="text-xs bg-yellow-500/20 text-yellow-500 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono animate-pulse">
                    Pendente de Rafael
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-neutral-300">
                  <div>
                    <span className="text-xs text-neutral-400 block font-mono">Solicitante:</span>
                    <strong className="text-white">{createdOrder.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-mono">WhatsApp:</span>
                    <span className="font-mono text-white">{createdOrder.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-mono">📅 Agendamento Coleta:</span>
                    <strong className="text-yellow-400">{formatPortugueseDateTime(createdOrder.pickupDateTime || '')}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-mono">📅 Previsão Entrega:</span>
                    <strong className="text-yellow-400">{formatPortugueseDateTime(createdOrder.deliveryDateTime || '')}</strong>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-neutral-900 mt-1">
                    <span className="text-xs text-neutral-400 block font-mono">Retirada (Quem entrega):</span>
                    <p className="text-white text-xs leading-relaxed">{createdOrder.pickupAddress}</p>
                    <span className="text-xs font-semibold text-yellow-500">Contato: {createdOrder.pickupContact}</span>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-neutral-900">
                    <span className="text-xs text-neutral-400 block font-mono">Entrega (Quem recebe):</span>
                    <p className="text-white text-xs leading-relaxed">{createdOrder.deliveryAddress}</p>
                    <span className="text-xs font-semibold text-yellow-500">Contato: {createdOrder.deliveryContact}</span>
                  </div>
                </div>

                {createdOrder.attachmentName && (
                  <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center gap-2 text-xs text-neutral-400">
                    <FileImage className="w-4 h-4 text-yellow-500" />
                    <span>Anexo adicionado: <strong>{createdOrder.attachmentName}</strong></span>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-neutral-800 flex justify-between text-xs text-neutral-400 font-mono">
                  <span>Distância Estimada: <strong>{createdOrder.estimatedDistance} km</strong></span>
                  <span>Valor do Frete: <strong className="text-yellow-400">A combinar pelas ruas</strong></span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 max-w-lg mx-auto mb-4 leading-relaxed">
                O chamado foi registrado localmente! Rafael Jorge receberá o alerta. 
                Como deseja compartilhar ou comunicar este chamado abaixo?
              </p>

              {/* Selector Tabs for Success State */}
              <div className="flex justify-center gap-2 max-w-md mx-auto mb-6 p-1.5 bg-neutral-950 rounded-xl border border-neutral-800 shadow-inner">
                <button
                  type="button"
                  onClick={() => setSuccessShareTab('envio')}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-black uppercase transition-all tracking-wider font-display cursor-pointer ${
                    successShareTab === 'envio'
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-neutral-950 shadow-md font-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  📨 Opção 1: Enviar Direto
                </button>
                <button
                  type="button"
                  onClick={() => setSuccessShareTab('status')}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-black uppercase transition-all tracking-wider font-display cursor-pointer ${
                    successShareTab === 'status'
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-neutral-950 shadow-md font-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  📱 Opção 2: Postar Status/Redes
                </button>
              </div>

              {/* TAB 1: Direct Envoys via WhatsApp / Email */}
              {successShareTab === 'envio' && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Envie as informações do chamado para o WhatsApp pessoal de Rafael Jorge ou encaminhe a proposta formal preenchida por E-mail:
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                    <a 
                      href={`https://wa.me/5511947421357?text=${encodeURIComponent(
                        `🏍️ *NOVO CHAMADO DE MOTOBOY - PEDIDO ${createdOrder.id}* 🏍️\n\n` +
                        `⏱️ *DATA DE COLETA:* ${formatPortugueseDateTime(createdOrder.pickupDateTime || '')}\n` +
                        `📍 *RETIRADA:* ${createdOrder.pickupAddress}\n` +
                        `👤 *RETIRAR COM (Quem entrega):* ${createdOrder.pickupContact}\n\n` +
                        `⏱️ *PREVISÃO ENTREGA:* ${formatPortugueseDateTime(createdOrder.deliveryDateTime || '')}\n` +
                        `📍 *ENTREGA:* ${createdOrder.deliveryAddress}\n` +
                        `👤 *ENTREGAR PARA (Quem recebe):* ${createdOrder.deliveryContact}\n\n` +
                        `📏 *DISTÂNCIA:* ${createdOrder.estimatedDistance} km\n` +
                        `👤 *SOLICITANTE:* ${createdOrder.clientName}\n` +
                        `📞 *WHATSAPP:* ${createdOrder.whatsapp}\n\n` +
                        `Gostaria de combinar o valor do frete e confirmar a saída rápida, por favor!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="whatsapp-share-cta font-black"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-xl transition-all uppercase text-xs tracking-wider font-display font-black shadow-lg shadow-emerald-900/30 hover:scale-[1.02]"
                    >
                      <MessageSquare className="w-4 h-4 text-white fill-current" />
                      Enviar WhatsApp para Rafael
                    </a>

                    <a 
                      href={`mailto:${`negruts_sp@outlook.com`}?subject=${encodeURIComponent(
                        `Solicitação de Serviço de Motoboy - Pedido ${createdOrder.id}`
                      )}&body=${encodeURIComponent(
                        `Olá Rafael Jorge,\n\n` +
                        `Acabei de registrar uma solicitação de coleta e entrega expressa através do seu site.\n\n` +
                        `Aqui estão as informações completas do chamado:\n` +
                        `-----------------------------------------------------\n` +
                        `PEDIDO NÚMERO: ${createdOrder.id}\n` +
                        `CLIENTE: ${createdOrder.clientName}\n` +
                        `CONTATO / WHATSAPP: ${createdOrder.whatsapp}\n\n` +
                        `📅 DATA/HORA DE COLETA: ${formatPortugueseDateTime(createdOrder.pickupDateTime || '')}\n` +
                        `📍 RETIRADA EM: ${createdOrder.pickupAddress}\n` +
                        `👤 CONTATO NA RETIRADA (Quem entrega): ${createdOrder.pickupContact}\n\n` +
                        `📅 DATA/HORA DE ENTREGA: ${formatPortugueseDateTime(createdOrder.deliveryDateTime || '')}\n` +
                        `📍 ENTREGAR EM: ${createdOrder.deliveryAddress}\n` +
                        `👤 CONTATO NA ENTREGA (Quem recebe): ${createdOrder.deliveryContact}\n\n` +
                        `📏 DISTÂNCIA DE TRAJETO: ${createdOrder.estimatedDistance} km\n` +
                        `📝 OBSERVAÇÕES: ${createdOrder.notes || 'Nenhuma.'}\n` +
                        `-----------------------------------------------------\n\n` +
                        `Favor entrar em contato para combinarmos o valor definitivo! Muito obrigado.\n\n` +
                        `Atenciosamente,\n` +
                        `${createdOrder.clientName}`
                      )}`}
                      id="email-share-cta"
                      className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-neutral-950 font-black px-6 py-3.5 rounded-xl transition-all uppercase text-xs tracking-wider font-display font-black shadow-lg shadow-yellow-500/20 hover:scale-[1.02]"
                    >
                      <Mail className="w-4 h-4 text-neutral-950" />
                      Enviar por E-mail
                    </a>
                  </div>
                </div>
              )}

              {/* TAB 2: Post status or share link across socials */}
              {successShareTab === 'status' && (
                <div className="space-y-4 animate-fade-in text-left max-w-xl mx-auto">
                  <p className="text-xs text-neutral-400 text-center">
                    Publique em seus Status ou Stories e recomende o serviço de quem mais respeita prazos em SP:
                  </p>

                  {(() => {
                    const statusText = `` +
                      `🏍️ *PEDIDO MOTOBOY AGENDADO!* 🏍️\n\n` +
                      `Meu chamado de entrega em São Paulo com o Rafael Jorge já está programado! \n\n` +
                      `📍 Retirada: ${createdOrder.pickupAddress.split(',')[0]}\n` +
                      `📍 Entrega: ${createdOrder.deliveryAddress.split(',')[0]}\n` +
                      `📏 Trajeto: ${createdOrder.estimatedDistance} km rodados!\n` +
                      `🏎️ Saída rápida garantida.\n\n` +
                      `Se você também precisa do melhor serviço com mais de 20 anos de excelência nas ruas de SP, chame ele! ⚡ *PISCOU, CHEGOU!* ⚡\n\n` +
                      `📲 WhatsApp do Rafael: (11) 94742-1357\n` +
                      `💻 Peça online você também: ${window.location.origin}`;

                    const handleStatusCopy = () => {
                      navigator.clipboard.writeText(statusText);
                      setCopiedStatus('copied');
                      setTimeout(() => setCopiedStatus(null), 2500);
                    };

                    return (
                      <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-3.5">
                        <div className="bg-neutral-900 font-mono text-[11px] p-3 rounded-lg text-neutral-300 whitespace-pre-wrap select-all max-h-40 overflow-y-auto leading-relaxed border border-neutral-950">
                          {statusText}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                          <div className="flex flex-wrap gap-1.5">
                            <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[10px] text-emerald-400 font-bold uppercase font-mono">
                              WhatsApp Status
                            </span>
                            <span className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded text-[10px] text-blue-400 font-bold uppercase font-mono">
                              FB Status
                            </span>
                            <span className="inline-flex items-center gap-1 bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 rounded text-[10px] text-pink-400 font-bold uppercase font-mono">
                              Instagram
                            </span>
                          </div>

                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={handleStatusCopy}
                              className={`flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                copiedStatus === 'copied'
                                  ? 'bg-yellow-500 text-neutral-950'
                                  : 'bg-neutral-800 text-neutral-200 border border-neutral-700 hover:text-white'
                              }`}
                            >
                              {copiedStatus === 'copied' ? (
                                <>
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  Copiado!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  Copiar Texto
                                </>
                              )}
                            </button>

                            <a
                              href={`https://wa.me/?text=${encodeURIComponent(statusText)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-lg shadow-emerald-950/40"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Postar
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Central spacing and Reset button */}
              <div className="mt-8 pt-5 border-t border-neutral-800 flex justify-center">
                <button 
                  onClick={handleResetForm}
                  id="btn-new-order-reset"
                  className="inline-flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all border border-neutral-700 text-xs uppercase tracking-wider font-display cursor-pointer hover:scale-[1.02]"
                >
                  Fazer Novo Chamado
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} id="request-service-form" className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl relative">
            <div className="absolute -top-3 -left-3 bg-yellow-500 text-neutral-950 font-black text-[11px] px-3 py-1 rounded-md uppercase tracking-wider shadow-md font-mono flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Solicitação Rápida de Entrega
            </div>

            {/* Section description */}
            <div className="mb-6 mt-4">
              <h3 className="text-2xl font-black font-display tracking-tight text-white mb-2">
                Fazer Chamado de Coleta & Entrega
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Preencha as informações detalhadas correspondentes abaixo. Calculamos automaticamente a distância de trânsito em São Paulo. <strong className="text-yellow-500 font-medium">Atenção: Não há taxas ou valores fixos pré-definidos no site. Todo valor é negociado diretamente com o Rafael Jorge a depender do local, do horário e da distância rodada.</strong>
              </p>
            </div>

            {/* Attention Grabbing Quality Banner */}
            <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-650 text-neutral-950 p-4 rounded-xl font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl mb-8 border border-yellow-400/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-yellow-400/10 animate-pulse pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <span className="text-2xl">⚡</span>
                <div>
                  <span className="block uppercase font-black tracking-wider text-neutral-950 text-xs sm:text-sm">SERVIÇO ULTRA-RÁPIDO COM PADRÃO EXCLUSIVO DE QUALIDADE</span>
                  <p className="text-[11px] font-semibold text-neutral-900 font-sans leading-tight mt-0.5">Piscou, Chegou! Garantia de agilidade com mais de 20 anos de profissão impecável.</p>
                </div>
              </div>
              <span className="bg-neutral-950 text-yellow-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest block flex-shrink-0 font-mono border border-yellow-500/40 relative z-10 animate-bounce">
                SAÍDA IMEDIATA
              </span>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-950/60 border border-red-500/40 text-red-300 rounded-xl text-xs sm:text-sm flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. SEÇÃO DE DADOS DO CLIENTE */}
            <div className="mb-8">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-wider font-mono">1. Seus Dados de Identificação</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5">
                    Seu Nome Inteiro *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                    <input 
                      type="text" 
                      placeholder="Ex: João da Silva" 
                      id="input-client-name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5">
                    Telefone de Contato *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                    <input 
                      type="tel" 
                      placeholder="Ex: (11) 98888-7777" 
                      id="input-client-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5">
                    E-mail do Cliente *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                    <input 
                      type="email" 
                      placeholder="seuemail@exemplo.com" 
                      id="input-client-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5">
                    WhatsApp para Avisos *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                    <input 
                      type="tel" 
                      placeholder="Ex: (11) 94742-1357" 
                      id="input-client-whatsapp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors font-mono"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Opções Extras de Envio: Nota Fiscal & Canais de Notificação */}
              <div id="opcoes-extras-container" className="mt-6 pt-6 border-t border-neutral-800/60 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* NOTA FISCAL CONTAINER */}
                <div className="bg-neutral-950/60 p-4 border border-neutral-800 rounded-xl space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={wantsInvoice}
                      onChange={(e) => setWantsInvoice(e.target.checked)}
                      id="checkbox-wants-invoice"
                      className="w-4.5 h-4.5 rounded border-neutral-800 text-yellow-500 focus:ring-yellow-500/50 accent-yellow-500 cursor-pointer"
                    />
                    <div className="text-left">
                      <span className="text-xs font-bold uppercase tracking-wider text-white block">Desejo Nota Fiscal (NF-e)</span>
                      <p className="text-[10px] text-neutral-400">Solicitar faturamento / dedução como despesa de sua empresa.</p>
                    </div>
                  </label>

                  {wantsInvoice && (
                    <div className="space-y-3 pt-2.5 border-t border-neutral-900 animate-fade-in duration-200">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono font-bold">CNPJ ou CPF para a NF-e *</label>
                        <input 
                          type="text"
                          placeholder="Ex: 00.000.000/0001-00"
                          value={invoiceCnpjOrCpf}
                          onChange={(e) => setInvoiceCnpjOrCpf(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-yellow-500 font-mono text-neutral-200"
                          required={wantsInvoice}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono font-bold">Razão Social ou Nome Completo *</label>
                        <input 
                          type="text"
                          placeholder="Ex: Minha Empresa LTDA"
                          value={invoiceCompanyName}
                          onChange={(e) => setInvoiceCompanyName(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-yellow-500 text-neutral-200"
                          required={wantsInvoice}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* NOTOFICAÇÕES CONTAINER */}
                <div className="bg-neutral-950/60 p-4 border border-neutral-800 rounded-xl space-y-4 font-sans">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white block">Opções de Notificação do Status</span>
                    <p className="text-[10px] text-neutral-400 mb-2">Marque por onde deseja receber alertas do Rafael Jorge:</p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={notifyWhatsApp}
                        onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                        id="checkbox-notify-whatsapp"
                        className="w-4 h-4 rounded border-neutral-800 text-yellow-500 focus:ring-yellow-505 accent-emerald-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-emerald-500 inline-block animate-pulse rounded-full" />
                          Enviar atualizações p/ WhatsApp ({whatsapp || 'Contato'})
                        </span>
                        <p className="text-[10px] text-neutral-400 font-mono">Disparar link de status do seu chamado via WhatsApp.</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={notifyEmail}
                        onChange={(e) => setNotifyEmail(e.target.checked)}
                        id="checkbox-notify-email"
                        className="w-4 h-4 rounded border-neutral-800 text-yellow-500 focus:ring-yellow-505 accent-yellow-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-blue-500 inline-block rounded-full" />
                          Enviar atualizações p/ E-mail ({email || 'E-mail'})
                        </span>
                        <p className="text-[10px] text-neutral-400 font-mono">Coletas, trânsito e assinaturas enviadas para sua caixa de entrada.</p>
                      </div>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* 2. ROTAS E ESTIMATIVA DE PREÇO INTERATIVA */}
            <div className="mb-8">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-wider font-mono">2. Bairros para Estimativa Rápida</h4>
                </div>
                <span className="text-[10px] bg-yellow-500/10 text-yellow-500 font-mono py-0.5 px-2 rounded font-bold">
                  Calculador Ativo
                </span>
              </div>

              <div className="bg-neutral-950/60 p-4 border border-neutral-800 rounded-xl mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Bairro de Saída (Origem SP):
                  </label>
                  <select 
                    value={pickupNeighborhood} 
                    id="select-pickup-neighborhood"
                    onChange={(e) => setPickupNeighborhood(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-sm font-semibold rounded-lg p-2.5 text-white focus:outline-none"
                  >
                    {NEIGHBORHOODS.map(n => (
                      <option key={n.name} value={n.name}>{n.name} ({n.zone})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Bairro de Destino (Entrega SP):
                  </label>
                  <select 
                    value={deliveryNeighborhood} 
                    id="select-delivery-neighborhood"
                    onChange={(e) => setDeliveryNeighborhood(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-sm font-semibold rounded-lg p-2.5 text-white focus:outline-none"
                  >
                    {NEIGHBORHOODS.map(n => (
                      <option key={n.name} value={n.name}>{n.name} ({n.zone})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Map/Route indicators */}
              <div className="bg-neutral-950 font-mono text-xs border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-500/10 p-2.5 border border-yellow-500/20 text-yellow-500 rounded-lg">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-neutral-300">Resumo da Rota Estimada</h5>
                    <p className="text-[11px] text-neutral-500">Do {pickupNeighborhood} até {deliveryNeighborhood}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="text-center">
                    <span className="text-[10px] text-neutral-500 uppercase block">Distância</span>
                    <strong className="text-white text-base">{distance} km</strong>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-neutral-500 uppercase block">Trânsito Médio</span>
                    <strong className="text-white text-base">{duration} min</strong>
                  </div>
                  <div className="text-center bg-yellow-500/10 px-4 py-1.5 border border-yellow-500/30 rounded-lg">
                    <span className="text-[10px] text-yellow-500 uppercase block text-center font-bold">Valor Negociável</span>
                    <strong className="text-yellow-400 text-base font-bold">A combinar</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. ENDEREÇOS E CONTATOS (FLEXÍVEIS & EXATOS) */}
            <div className="mb-8">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-wider font-mono">3. Endereços Exatos & Pessoas de Contato</h4>
              </div>

              <div className="space-y-4">
                
                {/* RETIRADA */}
                <div className="bg-neutral-950/40 p-4 border border-neutral-800/60 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                      Local Exato de Retirada (Endereço Completo) *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ex: Av. Paulista, 1000 - Cj 52" 
                      id="input-pickup-address"
                      value={pickupAddress}
                      onChange={(e) => handleAddressChange('pickup', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-yellow-500" />
                      Pessoa que vai entregar a encomenda *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ex: Maria (Secretária)" 
                      id="input-pickup-contact"
                      value={pickupContact}
                      onChange={(e) => setPickupContact(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-500"
                      required
                    />
                  </div>
                </div>

                {/* ENTREGA */}
                <div className="bg-neutral-950/40 p-4 border border-neutral-800/60 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                      Local Exato de Entrega (Endereço Completo) *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ex: Rua Funchal, 200 - Bloco B" 
                      id="input-delivery-address"
                      value={deliveryAddress}
                      onChange={(e) => handleAddressChange('delivery', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-yellow-500" />
                      Pessoa que vai receber a encomenda *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ex: Dr. Roberto (Destinatário)" 
                      id="input-delivery-contact"
                      value={deliveryContact}
                      onChange={(e) => setDeliveryContact(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-500"
                      required
                    />
                  </div>
                </div>

                {/* AGENDAMENTO DE HORÁRIOS */}
                <div className="bg-neutral-950/40 p-4 border border-neutral-800/60 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                      <span className="text-yellow-500">📆</span>
                      Data e Hora Desejada da Coleta *
                    </label>
                    <input 
                      type="datetime-local" 
                      id="input-pickup-datetime"
                      value={pickupDateTime}
                      onChange={(e) => setPickupDateTime(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-neutral-200 font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                      <span className="text-yellow-500">📆</span>
                      Data e Hora Estimada de Entrega *
                    </label>
                    <input 
                      type="datetime-local" 
                      id="input-delivery-datetime"
                      value={deliveryDateTime}
                      onChange={(e) => setDeliveryDateTime(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-neutral-200 font-mono"
                      required
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* 4. ANEXO (FOTO DO PACOTE OU COMPROVANTE) */}
            <div className="mb-8">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-wider font-mono">4. Fotos ou Comprovante Anexo</h4>
              </div>

              <div 
                className={`border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer text-center relative ${
                  isDragging 
                    ? 'border-yellow-400 bg-yellow-500/5' 
                    : 'border-neutral-800 bg-neutral-950/20 hover:border-neutral-700 hover:bg-neutral-950/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                id="drag-drop-zone"
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  id="file-attachment"
                  className="hidden" 
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                />

                {fileAttachment ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-neutral-900 border border-transparent rounded-xl">
                    <div className="flex items-center gap-3">
                      {fileAttachment.url.startsWith('data:image/') ? (
                        <div className="w-16 h-16 rounded-lg bg-neutral-950 border border-neutral-800 overflow-hidden flex-shrink-0">
                          <img src={fileAttachment.url} alt="Envio" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-yellow-500 flex-shrink-0">
                          <FileSpreadsheet className="w-8 h-8" />
                        </div>
                      )}
                      <div className="text-left font-mono">
                        <p className="text-sm text-white font-medium line-clamp-1 max-w-xs">{fileAttachment.name}</p>
                        <span className="text-xs text-neutral-500">{fileAttachment.size || 'Anexo carregado'}</span>
                      </div>
                    </div>
                    
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAttachment();
                      }}
                      id="remove-file-btn"
                      className="inline-flex items-center justify-center bg-red-950/60 border border-red-500/30 text-red-400 rounded-full w-8 h-8 hover:bg-red-900/60 transition-colors"
                      title="Excluir anexo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-neutral-200">
                      Arraste ou clique para anexar uma foto / comprovante
                    </p>
                    <p className="text-xs text-neutral-500">
                      Formatos aceitos: Imagem (JPEG, PNG), PDF ou Doc • Limite sugerido: 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 5. OBSERVAÇÕES ADICIONAIS */}
            <div className="mb-8">
              <label className="block text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1.5 font-mono">
                5. Descrição da Encomenda, Peso ou Instruções de Entrega (Opcional)
              </label>
              <textarea 
                placeholder="Ex: Documentos em envelope kraft lacrado. Favor entregar na portaria ou subir no 5º andar / Encomenda frágil." 
                id="input-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
              />
            </div>

            {/* SUBMIT ROW */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <p className="text-xs text-neutral-400 flex items-center gap-1.5 leading-normal max-w-sm">
                <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span>O valor oficial da corrida depende do local, horário e distância exata, sendo combinado diretamente no fechamento do chamado.</span>
              </p>

              <button 
                type="submit"
                id="btn-submit-order-form"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-350 hover:from-yellow-350 hover:to-yellow-400 disabled:bg-neutral-800 text-neutral-950 disabled:scale-100 disabled:text-neutral-500 font-black px-8 py-4 rounded-xl transition-all duration-300 uppercase text-xs tracking-wider cursor-pointer font-display shadow-lg shadow-yellow-500/35 hover:shadow-yellow-500/50 hover:scale-[1.03]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    Enviando Chamado...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    Confirmar Envio do Chamado
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
