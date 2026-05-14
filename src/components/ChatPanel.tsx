import { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  moduleName: string;
  suggestions: string[];
  contextMessage?: string;
}

export default function ChatPanel({ moduleName, suggestions, contextMessage }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: contextMessage || `Hola. Soy tu agente de IA experto en ${moduleName}. ¿Qué métricas o insights te gustaría explorar hoy?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');

    // Simulate AI thinking and responding
    setTimeout(() => {
      const aiResponse: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: `He analizado tu consulta sobre "${text}". Aquí tienes los datos actualizados reflejados en los widgets principales. Te sugiero revisar las recomendaciones para accionar sobre esta información.` 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          <Bot className="text-yupana-green bg-yupana-dark rounded-md p-1" size={24} />
          <span className="font-semibold text-gray-800">Asistente Yupana</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
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
            <div className={`p-3 rounded-2xl max-w-[80%] ${
              msg.role === 'user' 
                ? 'bg-gray-100 text-gray-800 rounded-tr-sm' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        
        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion)}
                className="text-xs text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-600 transition-colors flex items-start gap-2"
              >
                <Sparkles size={14} className="shrink-0 text-yupana-green mt-0.5" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Preguntale a Yupana..."
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
    </div>
  );
}
