import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, ChevronRight, MessageSquare, Plus, Trash2, Calendar, History } from 'lucide-react';
import { saveConversation, getConversations, deleteConversation } from '../utils/chatDb';
import type { Conversation, ChatMessage } from '../utils/chatDb';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatPanelProps {
  moduleKey: string;
  moduleName: string;
  suggestions: string[];
  contextMessage?: string;
  initialConversation: Conversation | null;
  onClose: () => void;
  onSaveSuccess: (savedConvo: Conversation) => void;
  onToggleCollapse?: () => void;
}

export default function ChatPanel(props: ChatPanelProps) {
  const {
    moduleKey,
    moduleName,
    suggestions,
    contextMessage,
    initialConversation,
    onSaveSuccess,
    onToggleCollapse
  } = props;
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentConvoId, setCurrentConvoId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load history whenever we switch to history tab or a message is saved
  useEffect(() => {
    setConversations(getConversations(moduleKey));
  }, [moduleKey, historyRefresh]);

  // Initialise chat messages
  useEffect(() => {
    if (initialConversation) {
      setMessages(initialConversation.messages);
      setCurrentConvoId(initialConversation.id);
    } else {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: contextMessage || `Hola. Soy tu agente de IA experto en ${moduleName}. ¿Qué métricas o insights te gustaría explorar hoy?`
        }
      ]);
      setCurrentConvoId(null);
    }
  }, [initialConversation, contextMessage, moduleName]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getExistingConvo = (id: string): Conversation | null => {
    try {
      const raw = localStorage.getItem('yupana_chats_' + moduleKey);
      if (raw) {
        const list: Conversation[] = JSON.parse(raw);
        return list.find(c => c.id === id) || null;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    const newUserMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text };
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInputValue('');

    const convoId = currentConvoId || Date.now().toString();
    const isNew = !currentConvoId;

    let convoTitle = '';
    let convoDate = '';

    if (isNew) {
      convoTitle = text.length > 35 ? text.substring(0, 35) + '...' : text;
      convoDate = new Date().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      const existing = getExistingConvo(convoId);
      convoTitle = existing?.title || 'Conversación';
      convoDate = existing?.date || new Date().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    const midConvo: Conversation = {
      id: convoId,
      title: convoTitle,
      date: convoDate,
      messages: updatedMessages
    };

    saveConversation(moduleKey, midConvo);
    if (isNew) setCurrentConvoId(convoId);
    onSaveSuccess(midConvo);
    setHistoryRefresh(prev => prev + 1);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `He analizado tu consulta sobre "${text}". Aquí tienes los datos actualizados reflejados en los widgets principales. Te sugiero revisar las recomendaciones para accionar sobre esta información.`
      };
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);

      const finalConvo: Conversation = {
        id: convoId,
        title: convoTitle,
        date: convoDate,
        messages: finalMessages
      };

      saveConversation(moduleKey, finalConvo);
      onSaveSuccess(finalConvo);
      setHistoryRefresh(prev => prev + 1);
    }, 1000);
  };

  /** Load a past conversation into the chat (replacing active session — it's already persisted) */
  const handleSelectHistoryConvo = (convo: Conversation) => {
    setMessages(convo.messages);
    setCurrentConvoId(convo.id);
    setActiveTab('chat');
  };

  const handleDeleteConvo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = deleteConversation(moduleKey, id);
    setConversations(updated);
    // If the deleted convo was the active one, start fresh
    if (currentConvoId === id) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: contextMessage || `Hola. Soy tu agente de IA experto en ${moduleName}. ¿Qué métricas o insights te gustaría explorar hoy?`
      }]);
      setCurrentConvoId(null);
    }
  };

  const handleNewChat = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: contextMessage || `Hola. Soy tu agente de IA experto en ${moduleName}. ¿Qué métricas o insights te gustaría explorar hoy?`
    }]);
    setCurrentConvoId(null);
    setActiveTab('chat');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300">
      {/* ── Header ── */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 gap-2">
        <div className="flex items-center gap-2 overflow-hidden shrink-0">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors shrink-0"
              title="Colapsar panel"
            >
              <ChevronRight size={18} />
            </button>
          )}
          <Bot className="text-yupana-green bg-yupana-dark rounded-md p-1 shrink-0" size={24} />
          <span className="font-semibold text-gray-800 text-sm truncate">Asistente Yupana</span>
        </div>
      </div>

      {/* ── Tab Switcher Line ── */}
      <div className="px-4 py-2 border-b border-gray-100 bg-white">
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5 w-full">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'chat'
                ? 'bg-white text-gray-900 shadow-sm font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare size={12} />
            Chat activo
          </button>
          <button
            onClick={() => { setActiveTab('history'); setHistoryRefresh(p => p + 1); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-white text-gray-900 shadow-sm font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <History size={12} />
            Historial
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'chat' ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-gray-50/30">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-gray-200' : 'bg-yupana-dark'
                  }`}>
                    {msg.role === 'user' ? <User size={16} className="text-gray-600" /> : <Bot size={16} className="text-yupana-green" />}
                  </div>
                  <div className={`p-4 rounded-2xl max-w-[70%] ${
                    msg.role === 'user'
                      ? 'bg-yupana-dark text-white rounded-tr-sm shadow-md'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {messages.length === 1 && (
                <div className="mt-4 flex flex-col gap-2 max-w-[70%]">
                  <span className="text-xs text-gray-400 font-medium">Sugerencias de inicio:</span>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(suggestion)}
                        className="text-xs text-left px-3 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-700 transition-all flex items-start gap-2 shadow-sm hover:shadow"
                      >
                        <Sparkles size={14} className="shrink-0 text-yupana-green mt-0.5" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="relative flex items-center max-w-4xl mx-auto">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Preguntale a Yupana sobre este reporte..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yupana-green/50 focus:border-yupana-green transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 p-2 bg-yupana-green text-black rounded-lg hover:bg-[#bce600] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400">Yupana puede cometer errores. Considera verificar la información.</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {/* History header bar */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Conversaciones guardadas</span>
              <button
                onClick={handleNewChat}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-yupana-green text-black hover:bg-[#bce600] transition-colors"
              >
                <Plus size={13} />
                Nuevo chat
              </button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4 text-gray-400">
                  <MessageSquare size={32} className="mb-2 opacity-50" />
                  <p className="text-xs">No hay conversaciones guardadas para esta sección.</p>
                </div>
              ) : (
                conversations.map((convo) => {
                  const isActive = convo.id === currentConvoId;
                  return (
                    <div
                      key={convo.id}
                      onClick={() => handleSelectHistoryConvo(convo)}
                      className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                        isActive
                          ? 'bg-gray-100 border-gray-300 font-medium text-black'
                          : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex flex-col gap-1 overflow-hidden pr-2">
                        <span className="text-xs truncate block font-medium">
                          {convo.title || 'Conversación sin título'}
                        </span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Calendar size={10} />
                          {convo.date}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleDeleteConvo(e, convo.id)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        title="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
