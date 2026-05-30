import { useEffect, useState } from 'react';
import { MessageSquare, Plus, Trash2, Calendar, ChevronLeft, ChevronRight, History, Bot } from 'lucide-react';
import { getConversations, deleteConversation } from '../utils/chatDb';
import type { Conversation } from '../utils/chatDb';

interface ConversationHistoryPanelProps {
  moduleKey: string;
  activeConversationId: string | null;
  onSelectConversation: (convo: Conversation | null) => void;
  refreshTrigger: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onOpenChat?: () => void;
}

export default function ConversationHistoryPanel({
  moduleKey,
  activeConversationId,
  onSelectConversation,
  refreshTrigger,
  isCollapsed = false,
  onToggleCollapse,
  onOpenChat
}: ConversationHistoryPanelProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    setConversations(getConversations(moduleKey));
  }, [moduleKey, refreshTrigger]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = deleteConversation(moduleKey, id);
    setConversations(updated);
    if (activeConversationId === id) {
      onSelectConversation(null);
    }
  };

  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center py-4 h-[calc(100vh-8rem)] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden w-12 transition-all duration-300">
        {onOpenChat && (
          <button
            onClick={onOpenChat}
            className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 transition-colors mb-4 flex items-center justify-center"
            title="Consultar Agente"
          >
            <Bot size={20} className="animate-pulse" />
          </button>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors mb-4"
          title="Ver historial de chats"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => {
            if (onOpenChat) {
              onOpenChat();
            } else {
              onSelectConversation(null);
              if (onToggleCollapse) onToggleCollapse();
            }
          }}
          className="p-1.5 rounded-lg bg-yupana-green text-black hover:bg-[#bce600] transition-colors mb-4"
          title="Nuevo Chat"
        >
          <Plus size={20} />
        </button>
        <div className="flex-1 flex flex-col items-center gap-4 justify-center text-gray-300">
          <History size={20} className="opacity-60" />
          <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase select-none [writing-mode:vertical-lr] rotate-180">
            Historial
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              title="Colapsar historial"
            >
              <ChevronRight size={18} />
            </button>
          )}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="p-1 rounded-md hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 transition-colors flex items-center justify-center"
              title="Consultar Agente"
            >
              <Bot size={18} />
            </button>
          )}
          <span className="font-semibold text-gray-800 text-sm">Historial</span>
        </div>
        <button
          onClick={() => {
            if (onOpenChat) {
              onOpenChat();
            } else {
              onSelectConversation(null);
            }
          }}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-yupana-green text-black hover:bg-[#bce600] transition-colors"
        >
          <Plus size={14} />
          <span>Nuevo</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 text-gray-400">
            <MessageSquare size={32} className="mb-2 opacity-50" />
            <p className="text-xs">No hay conversaciones guardadas para esta sección.</p>
          </div>
        ) : (
          conversations.map((convo) => {
            const isActive = convo.id === activeConversationId;
            return (
              <div
                key={convo.id}
                onClick={() => onSelectConversation(convo)}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border text-left ${
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
                  onClick={(e) => handleDelete(e, convo.id)}
                  className="text-gray-400 hover:text-red-500 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
