import { MessageSquare } from 'lucide-react';
import ChatPanel from '../components/ChatPanel';

export default function GlobalChatHistory() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Data Panel */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Historial de Chats</h2>
          <p className="text-gray-500">Historial centralizado de todas tus interacciones con el asistente de IA.</p>
        </div>



        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Conversaciones Recientes</h3>
          <div className="space-y-4">
            {[
              { title: "Análisis de precios D2C vs Retail", date: "Hoy, 10:23 AM", module: "Market Research" },
              { title: "Caída de ventas semanales en zapatillas", date: "Ayer, 16:45 PM", module: "Company Insights" },
              { title: "Preparación KPI Directorio Q2", date: "04 May 2026", module: "Executive Report" },
              { title: "Reclamos sobre envíos en AMBA", date: "02 May 2026", module: "Customer Support" },
            ].map((chat, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{chat.title}</h4>
                    <p className="text-sm text-gray-500">{chat.module}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {chat.date}
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* Chat Panel */}
      <div className="w-full lg:w-[400px] shrink-0">
        <ChatPanel 
          moduleName="Global History"
          contextMessage="Hola. Analizando tu historial: tus interacciones recientes se enfocan en Market Research y precios D2C. Hay insights pendientes de ayer. ¿Qué conversación anterior te gustaría retomar o resumir?"
          suggestions={[
            "Resumir los insights pendientes de Market Research",
            "Buscar conversaciones sobre caída de ventas",
            "Analizar tendencias de mis consultas este mes"
          ]}
        />
      </div>
    </div>
  );
}
