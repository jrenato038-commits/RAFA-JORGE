import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Share2, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Phone, 
  Smartphone,
  Sparkles,
  Award,
  Mail,
  Send
} from 'lucide-react';
import { RAFAEL_INFO } from '../data';

export default function PromotionalMaterials() {
  const [activeTab, setActiveTab] = useState<'direct' | 'status'>('direct');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const sharedLink = window.location.origin;

  // Option 1: Direct message templates (WhatsApp & Email)
  const directTemplates = [
    {
      id: 'wa-menu',
      title: "📞 Menu Completo de Serviços (WhatsApp)",
      subtitle: "Ideal para enviar em grupos de condomínio, contatos corporativos e parceiros.",
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      tag: "WhatsApp",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      text: `🏍️ *RAFAEL JORGE - MOTOBOY PROFISSIONAL* 🏍️
⚡ *PISCOU, CHEGOU!* ⚡
+- 20 anos de profissão com excelência pelas ruas de São Paulo!

Precisa enviar um documento urgente, coletar assinaturas no cartório, entregar pacotes do seu e-commerce ou realizar uma entrega expressa com total segurança? Conte com a experiência de quem mais domina o asfalto paulistano!

📦 *Nossos Serviços Principais em SP:*
1️⃣ *Documentos e Contratos:* Coleta, Cartório e Assinaturas.
2️⃣ *Entregas Corporativas:* Malotes, Brindes e Faturamento.
3️⃣ *E-commerce:* Entregas expressas no mesmo dia.
4️⃣ *Medicamentos & Saúde:* Coleta de receitas e exames de urgência.
5️⃣ *Serviços Bancários:* Pagamentos, retiradas e depósitos seguros.

📍 *Área de Atendimento:* Toda a Grande São Paulo, ABCD e Região Metropolitana.
💳 *Formas de Pagamento:* PIX, Dinheiro ou Cartão de Crédito/Débito (levo maquininha).
🧾 _Caso precise de Nota Fiscal, solicitar!_

📲 *CHAME AGORA NO WHATSAPP:*
👉 ${RAFAEL_INFO.phoneFormatted}
👉 Clique para falar no WhatsApp: ${RAFAEL_INFO.whatsappUrl}
🌐 Faça seu chamado e calcule o trajeto em: ${sharedLink}

_Rafael Jorge - Compromisso, agilidade e segurança!_`
    },
    {
      id: 'email-corp',
      title: "💼 Apresentação Corporativa (E-mail Comercial)",
      subtitle: "Formato mais formal e bem estruturado para empresas ou propostas de faturamento.",
      icon: <Mail className="w-5 h-5 text-yellow-500" />,
      tag: "E-mail",
      tagColor: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      text: `Assunto: Apresentação de Serviços Logísticos Expressos - Rafael Jorge Motoboy SP

Olá, prezado(a),

Gostaria de apresentar meus serviços personalizados de transporte rápido expresso (Motoboy) em toda a cidade de São Paulo e Região Metropolitana. 

Sou o Rafael Jorge, com ampla experiência de +- 20 anos de profissão exercidos com extrema excelência, pontualidade e segurança. Sediado em Pirituba (Rua Domingos Pereda, 645), atendo empresas de pequeno a grande porte com soluções ágeis para a logística do seu negócio:

✅ Escritórios de advocacia (Cartórios, assinaturas presenciais, fóruns)
✅ Lojas virtuais e e-commerce (Same-day delivery local com cuidado redobrado)
✅ Clínicas, laboratórios e farmácias (Transporte prioritário de exames e receitas)
✅ Malotes administrativos e bancários recorrentes com devolução rápida de comprovantes

Oferecemos faturamento quinzenal facilitado para parceiros fixos, com emissão de Nota Fiscal de Serviços eletrônica sob solicitação.

Fico inteiramente à sua disposição para cotações pontuais ou parcerias fixas!

Atenciosamente,
Rafael Jorge Motoboy Express SP
📞 WhatsApp: ${RAFAEL_INFO.phoneFormatted}
📧 E-mail: ${RAFAEL_INFO.email}
🚀 Faça seu pedido online no nosso portal: ${sharedLink}`
    }
  ];

  // Option 2: Status & Stories Templates (WhatsApp Status, Facebook & Instagram Stories/Posts)
  const statusTemplates = [
    {
      id: 'wa-status',
      title: "🟢 Versão para STATUS DO WHATSAPP",
      subtitle: "Texto rápido, atraente e cheio de emojis, perfeito para o Status de 24 horas do WhatsApp.",
      icon: <MessageSquare className="w-5 h-5 text-emerald-400 fill-emerald-400/10" />,
      tag: "WhatsApp Status",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      text: `🏍️ *PRECISANDO DE MOTOBOY HOJE?* 🏍️
⚡ *PISCOU, CHEGOU!* com o Rafael Jorge!

✅ +- 20 anos de experiência pelas ruas de SP
📦 Entregas rápidas de e-commerce, documentos, exames e malotes
💳 Aceito PIX e Cartão de Crédito/Débito!
🧾 *Caso precise de Nota Fiscal, solicitar.*

Chame agora mesmo no direct ou clique no link para falar direto comigo! 👇
📲 WhatsApp: ${RAFAEL_INFO.phoneFormatted}
🌐 Ou faça seu pedido online no site: ${sharedLink}`
    },
    {
      id: 'fb-status',
      title: "🔵 Versão para STATUS & POSTS DO FACEBOOK",
      subtitle: "Excelente para postar no seu feed pessoal, páginas ou em grupos de bairros do Facebook.",
      icon: <Facebook className="w-5 h-5 text-blue-500 fill-blue-500/10" />,
      tag: "Facebook",
      tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      text: `🚀 MOTOBOY PROFISSIONAL EM SÃO PAULO - RAFAEL JORGE

Se você ou sua empresa precisam de uma entrega expressa e ultra-segura hoje, o Rafael Jorge resolve na hora! São mais de 20 anos de asfalto com excelência e segurança garantida pela Capital e Grande SP.

📦 Atendemos:
• Escritórios de Advocacia, Contratos e Cartórios
• Entregas corporativas e malotes comerciais
• E-commerce e e-commerce Same Day Delivery
• Coleta de exames e medicamentos de urgência

💳 Formas de pagamento ajustáveis (PIX, Dinheiro ou Cartões)
🧾 Caso precise de Nota Fiscal, favor solicitar!

Entre em contato e faça sua cotação imediata!
📲 WhatsApp: ${RAFAEL_INFO.phoneFormatted}
🔗 Link Direto: ${RAFAEL_INFO.whatsappUrl}
💻 Faça o pedido online aqui: ${sharedLink}

#MotoboySP #EntregasRapidas #SaoPaulo #LogisticaporAmor #PiscouChegou`
    },
    {
      id: 'ig-stories',
      title: "🟣 Versão para INSTAGRAM (Stories & Bio)",
      subtitle: "Formatado com quebras curtas e slogans marcantes para colar nos Stories do Instagram, reels ou na Bio.",
      icon: <Instagram className="w-5 h-5 text-pink-500" />,
      tag: "Instagram",
      tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      text: `⚡ PISCOU, CHEGOU! 🏍️💨
Qualidade e confiança nas ruas de SP de quem entende do assunto!

👤 @RafaelJorgeMotoboy
⏱️ +- 20 anos de asfalto com excelência!
📦 Documentos | E-commerce | Exames | Urgências
💳 Aceita Pix/Cartão (Maquininha inclusa)
🧾 Emissão de Nota Fiscal de Serviços (basta solicitar!)

Faça seu pedido rápido e prático direto no link da Bio! 👇
🔗 ${sharedLink}
📲 WhatsApp: ${RAFAEL_INFO.phoneFormatted}`
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2500);
  };

  return (
    <section id="divulgacao-marketing" className="py-16 bg-neutral-900/60 border-b border-neutral-800 scroll-mt-16 text-white relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs font-semibold text-yellow-500 uppercase tracking-widest mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            Divulgador & Redes Sociais
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-3">
            Seu Assistente de Divulgação Oficial
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Criador de conteúdo promocional do Rafael Jorge! Escolha o canal desejado abaixo, copie mensagens de alta conversão prontas com o slogan <strong className="text-yellow-400 font-bold">"PISCOU, CHEGOU!"</strong>, e espalhe a qualidade do seu serviço.
          </p>
        </div>

        {/* Dynamic Dual-Option System Selector (Tabs) */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 max-w-3xl mx-auto mb-10 p-1.5 bg-neutral-950 border border-neutral-800 rounded-2xl">
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 flex items-center justify-center gap-3 py-3 px-5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider font-display transition-all cursor-pointer ${
              activeTab === 'direct'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-neutral-950 shadow-md shadow-yellow-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Opção 1: Envio Direto (WhatsApp / E-mail)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('status')}
            className={`flex-1 flex items-center justify-center gap-3 py-3 px-5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider font-display transition-all cursor-pointer ${
              activeTab === 'status'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-neutral-950 shadow-md shadow-yellow-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Opção 2: Status & Stories (WhatsApp, FB, IG)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Social Presence Tips - Visual Left Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase text-yellow-500 tracking-wider font-mono flex items-center gap-2 border-b border-neutral-900 pb-2.5">
                <Sparkles className="w-4 h-4" />
                Como bombar de pedidos
              </h3>
              
              <div className="space-y-4 text-xs text-neutral-300">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold flex-shrink-0 mt-0.5 font-mono">
                    W
                  </div>
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Status Diários</strong>
                    <p className="text-neutral-400 leading-relaxed">
                      Publique a mensagem de Status do WhatsApp todas as manhãs com fotos da sua moto ou no trânsito. Os contatos salvos lembrarão instantaneamente de você na hora de enviar algo!
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold flex-shrink-0 mt-0.5 font-mono">
                    F
                  </div>
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Grupos do Facebook</strong>
                    <p className="text-neutral-400 leading-relaxed">
                      Copie o formato do Facebook e cole em grupos de negócios de Pirituba, Vila Zatt, Lapa, e toda a Zona Oeste. É onde surgem muitas parcerias fixas de e-commerce!
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center font-bold flex-shrink-0 mt-0.5 font-mono">
                    I
                  </div>
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Stories e Link na Bio</strong>
                    <p className="text-neutral-400 leading-relaxed">
                      Deixe o link do site na sua Bio do Instagram para passar autoridade. Nos Stories, divulgue que emite Nota Fiscal sob solicitação, atraindo clientes comerciais exigentes!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Instant Action Widget */}
            <div className="bg-gradient-to-br from-yellow-500/10 via-neutral-950 to-neutral-950 border border-yellow-500/20 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <Award className="w-8 h-8 text-yellow-500 mx-auto animate-pulse" />
              <h4 className="font-bold font-display tracking-tight text-base text-white">Atendimento Imediato</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Clique nos botões de atalho rápido abaixo se preferir realizar um contato prioritário simulado agora:
              </p>

              <div className="flex flex-col gap-2">
                <a 
                  href={RAFAEL_INFO.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  id="marketing-direct-whatsapp"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Abrir Meu WhatsApp
                </a>
                
                <a 
                  href={`tel:${RAFAEL_INFO.phone.replace(/[^+\d]/g, '')}`}
                  id="marketing-direct-phone"
                  className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-yellow-500" />
                  Ligar: {RAFAEL_INFO.phoneFormatted}
                </a>
              </div>
            </div>
          </div>

          {/* Copyable Message Templates List - Visual Right Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* RENDER ACTIVE TAB: DIRECT TEMPLATES */}
            {activeTab === 'direct' && (
              <div className="space-y-6 animate-fade-in">
                {directTemplates.map((template) => (
                  <div 
                    key={template.id} 
                    id={`marketing-template-${template.id}`}
                    className="bg-neutral-950/90 border border-neutral-850 rounded-2xl p-5 sm:p-6 hover:border-yellow-500/25 transition-all duration-300 relative overflow-hidden group shadow-2xl"
                  >
                    {/* Background image of delivery motorcycle */}
                    <div className="absolute inset-0 pointer-events-none select-none">
                      <img 
                        src="/src/assets/images/delivery_motorcycle_1780145992525.png" 
                        alt="Fundo Moto de Entrega" 
                        className="w-full h-full object-cover opacity-6 group-hover:opacity-10 transition-opacity duration-300 mix-blend-luminosity filter blur-[0.5px]" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-neutral-950/80" />
                    </div>

                    <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-neutral-900">
                          <div className="flex items-center gap-2.5">
                            {template.icon}
                            <div>
                              <h3 className="font-bold font-display text-sm sm:text-base text-white tracking-tight">
                                {template.title}
                              </h3>
                              <p className="text-xs text-neutral-500 mt-0.5">{template.subtitle}</p>
                            </div>
                          </div>
                          
                          <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full border ${template.tagColor}`}>
                            {template.tag}
                          </span>
                        </div>

                        <div className="bg-neutral-900/95 border border-neutral-850 p-4 rounded-xl mt-4 font-mono text-[11px] sm:text-xs text-neutral-300 max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                          {template.text}
                        </div>
                      </div>

                      <div className="flex justify-end pt-2 border-t border-neutral-900">
                        <button
                          onClick={() => handleCopy(template.text, template.id)}
                          id={`btn-copy-template-${template.id}`}
                          className={`text-xs px-4 py-2 rounded-xl font-bold border flex items-center gap-2 transition-all cursor-pointer ${
                            copiedIndex === template.id 
                              ? 'bg-yellow-500 text-neutral-950 border-yellow-500' 
                              : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white hover:border-neutral-700'
                          }`}
                        >
                          {copiedIndex === template.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Copiado com Sucesso!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar Texto Completo</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* RENDER ACTIVE TAB: STATUS & STORIES TEMPLATES */}
            {activeTab === 'status' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-xs text-yellow-400 leading-relaxed font-sans">
                  📌 <strong>Dica Especial de Negócio:</strong> Seus Status e Stories são visualizados diariamente por pessoas que compram muito pela internet e contratam serviços. Copie e cole os textos abaixo junto com uma foto bonita ou vídeo da sua moto trabalhando e configure para atualizar suas redes!
                </div>
                
                {statusTemplates.map((template) => (
                  <div 
                    key={template.id} 
                    id={`marketing-template-${template.id}`}
                    className="bg-neutral-950/90 border border-neutral-850 rounded-2xl p-5 sm:p-6 hover:border-yellow-500/25 transition-all duration-300 relative overflow-hidden group shadow-2xl"
                  >
                    {/* Background image of delivery motorcycle */}
                    <div className="absolute inset-0 pointer-events-none select-none">
                      <img 
                        src="/src/assets/images/delivery_motorcycle_1780145992525.png" 
                        alt="Fundo Moto de Entrega" 
                        className="w-full h-full object-cover opacity-6 group-hover:opacity-10 transition-opacity duration-300 mix-blend-luminosity filter blur-[0.5px]" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-neutral-950/80" />
                    </div>

                    <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-neutral-900">
                          <div className="flex items-center gap-2.5">
                            {template.icon}
                            <div>
                              <h3 className="font-bold font-display text-sm sm:text-base text-white tracking-tight">
                                {template.title}
                              </h3>
                              <p className="text-xs text-neutral-500 mt-0.5">{template.subtitle}</p>
                            </div>
                          </div>
                          
                          <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full border ${template.tagColor}`}>
                            {template.tag}
                          </span>
                        </div>

                        <div className="bg-neutral-900/95 border border-neutral-850 p-4 rounded-xl mt-4 font-mono text-[11px] sm:text-xs text-neutral-300 max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                          {template.text}
                        </div>
                      </div>

                      <div className="flex justify-between items-center gap-3 pt-3 border-t border-neutral-900">
                        {template.id === 'wa-status' && (
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(template.text)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold font-mono transition-colors"
                          >
                            <Send className="w-3.5 h-3.5" />
                            Encaminhar Direto pro WhatsApp
                          </a>
                        )}
                        
                        {template.id === 'ig-stories' && (
                          <span className="text-[10px] text-neutral-500 font-mono hidden sm:block">
                            Instagram: ideal para Bio ou Story diário!
                          </span>
                        )}

                        {template.id === 'fb-status' && (
                          <span className="text-[10px] text-neutral-500 font-mono hidden sm:block">
                            Facebook: ideal para feeds corporativos e grupos!
                          </span>
                        )}
                        
                        <button
                          onClick={() => handleCopy(template.text, template.id)}
                          id={`btn-copy-template-${template.id}`}
                          className={`text-xs px-4 py-2 rounded-xl font-bold border ml-auto flex items-center gap-2 transition-all cursor-pointer ${
                            copiedIndex === template.id 
                              ? 'bg-yellow-500 text-neutral-950 border-yellow-500' 
                              : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white hover:border-neutral-700'
                          }`}
                        >
                          {copiedIndex === template.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Copiado com Sucesso!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar Status</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
