import { MessageSquare, Clock, Search } from 'lucide-react';
import { ScoreCard, RecommendationsWidget } from '../components/WidgetCards';
import ChatPanel from '../components/ChatPanel';

export default function GlobalChatHistory() {
  const recommendations = [
    { text: "Revisar la conversación sobre posicionamiento de precios de ayer, hay insights accionables pendientes.", type: "action" as const },
    { text: "Tus últimas consultas se enfocaron principalmente en Market Research. Considerá cruzar estos datos con Company Insights.", type: "info" as const },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Data Panel */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Global Chat History</h2>
          <p className="text-gray-500">Historial centralizado de todas tus interacciones con el asistente de IA.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScoreCard 
            title="Total Conversaciones" 
            value="128" 
            trend="up" 
            trendValue="+12 esta semana" 
            icon={MessageSquare} 
          />
          <ScoreCard 
            title="Módulo Más Usado" 
            value="Market Research" 
            icon={Clock} 
          />
          <ScoreCard 
            title="Búsquedas Guardadas" 
            value="14" 
            icon={Search} 
          />
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

        <RecommendationsWidget recommendations={recommendations} />
      </div>

      {/* Chat Panel */}
      <div className="w-full lg:w-[400px] shrink-0">
        <ChatPanel 
          moduleName="Global History"
          suggestions={[
            "Buscame el análisis de precios que hicimos ayer",
            "Resumí los insights principales de la última semana",
            "¿De qué hablamos más frecuentemente este mes?"
          ]}
        />
      </div>
    </div>
  );
}
