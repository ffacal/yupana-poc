import { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import { BarChartWidget, LineChartWidget, PieChartWidget, DebriefWidget } from '../components/WidgetCards';
import ChatPanel from '../components/ChatPanel';
import ConversationHistoryPanel from '../components/ConversationHistoryPanel';
import type { Conversation } from '../utils/chatDb';

export default function CommercialIntelligence() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [chatContext, setChatContext] = useState<string | undefined>(undefined);
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(true);

  const handleOpenChat = (contextPrompt?: string) => {
    setChatContext(contextPrompt);
    setActiveConversation(null);
    setIsChatOpen(true);
    setIsHistoryCollapsed(false);
  };

  const handleSelectConversation = (convo: Conversation | null) => {
    setActiveConversation(convo);
    setChatContext(undefined);
    if (convo) {
      setIsChatOpen(true);
      setIsHistoryCollapsed(false);
    } else {
      setIsChatOpen(false);
    }
  };

  const handleSaveSuccess = (savedConvo: Conversation) => {
    setActiveConversation(savedConvo);
    setRefreshTrigger(prev => prev + 1);
  };

  const renderMockDebrief = () => (
    <DebriefWidget title="Debrief Analítico Transversal">
      <p className="mb-3">El agente de inteligencia comercial ha procesado en profundidad las proyecciones de ventas, elasticidad de precios y asignación de inventario. El análisis arroja patrones determinantes:</p>
      <ul className="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Proyección de Ventas:</strong> Basado en un modelo predictivo, la proyección para los próximos 90 días muestra un crecimiento sostenido hacia Octubre, pero con un estancamiento en Agosto.</li>
        <li><strong>Competitividad de Precios:</strong> Nuestro posicionamiento de precios se ha encarecido en relación al mercado en las categorías Outdoor y Running (Index &gt; 100), explicando la acumulación de stock.</li>
        <li><strong>Flujo de Inventario:</strong> La categoría Outdoor promedia 120 días de stock frente a un objetivo de 60 días, comprometiendo liquidez.</li>
      </ul>
      <p><strong>Conclusión del Agente:</strong> Adelantar presupuesto de performance para sostener el impulso de ventas en Agosto, ejecutar una promoción agresiva en Outdoor para liberar stock, y reajustar precios en la línea Running Premium donde la demanda es inelástica.</p>
    </DebriefWidget>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Central Content Area */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Inteligencia Comercial <BrainCircuit className="text-blue-600 w-6 h-6" />
            </h1>
            <p className="text-gray-500">Nuestros agentes analizan tus datos para descubrir oportunidades y optimizar operaciones.</p>
          </div>
        </div>

        <div className="mb-2">
          {renderMockDebrief()}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-80">
            <LineChartWidget 
              title="Proyección de Ventas a 90 días"
              data={[
                { month: 'Jul', actual: 450, proj: 450 },
                { month: 'Ago', actual: null, proj: 480 },
                { month: 'Sep', actual: null, proj: 510 },
                { month: 'Oct', actual: null, proj: 590 },
              ]}
              dataKeyX="month"
              dataKeyY="proj"
              strokeColor="#3b82f6"
              onOpenChat={handleOpenChat}
            />
          </div>
          <div className="h-80">
            <BarChartWidget 
              title="Comparativa de Precios (Index = 100)"
              data={[
                { cat: 'Running', us: 105, market: 100 },
                { cat: 'Lifestyle', us: 95, market: 100 },
                { cat: 'Outdoor', us: 112, market: 100 },
              ]}
              dataKeyX="cat"
              bars={[
                { key: 'us', name: 'Nuestro Precio', color: '#3b82f6' },
                { key: 'market', name: 'Promedio Mercado', color: '#9ca3af' }
              ]}
              onOpenChat={handleOpenChat}
            />
          </div>
          <div className="h-80">
            <LineChartWidget 
              title="Flujo de Inventario (Ingresos vs Egresos)"
              data={[
                { sem: 'S1', in: 1000, out: 800 },
                { sem: 'S2', in: 500, out: 950 },
                { sem: 'S3', in: 1200, out: 1100 },
                { sem: 'S4', in: 800, out: 1200 },
              ]}
              dataKeyX="sem"
              dataKeyY="out"
              strokeColor="#f43f5e"
              onOpenChat={handleOpenChat}
            />
          </div>
          <div className="h-80">
            <PieChartWidget 
              title="Distribución Presupuesto de Compras"
              data={[
                { cat: 'Running', prop: 40 },
                { cat: 'Lifestyle', prop: 30 },
                { cat: 'Outdoor', prop: 15 },
                { cat: 'Training', prop: 15 },
              ]}
              dataKey="prop"
              nameKey="cat"
              colors={['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e']}
              onOpenChat={handleOpenChat}
            />
          </div>
        </div>
      </div>

      {/* History & Chat Sidebar Panel */}
      <div className={`w-full shrink-0 transition-all duration-300 ${isHistoryCollapsed ? "lg:w-12" : isChatOpen ? "lg:w-[400px]" : "lg:w-[320px]"}`}>
        {isHistoryCollapsed ? (
          <ConversationHistoryPanel
            moduleKey="commercial_intel"
            activeConversationId={activeConversation?.id || null}
            onSelectConversation={handleSelectConversation}
            refreshTrigger={refreshTrigger}
            isCollapsed={true}
            onToggleCollapse={() => setIsHistoryCollapsed(false)}
            onOpenChat={() => handleOpenChat()}
          />
        ) : isChatOpen ? (
          <div className="h-[calc(100vh-8rem)]">
            <ChatPanel
              moduleKey="commercial_intel"
              moduleName="Inteligencia Comercial"
              contextMessage={chatContext || (activeConversation ? undefined : "Hola. He consolidado los análisis de todos tus agentes activos. Detecté una acumulación de inventario en Outdoor y una oportunidad de ajuste de precios en Running Premium. ¿En qué recomendación ejecutiva te gustaría profundizar?")}
              suggestions={[
                "Profundizar en la estrategia de precios para Running",
                "Ver plan de liquidación para el stock de Outdoor",
                "Explicar la proyección de ventas para Octubre"
              ]}
              initialConversation={activeConversation}
              onClose={() => {
                setIsChatOpen(false);
                setActiveConversation(null);
              }}
              onSaveSuccess={handleSaveSuccess}
              onToggleCollapse={() => setIsHistoryCollapsed(true)}
            />
          </div>
        ) : (
          <ConversationHistoryPanel
            moduleKey="commercial_intel"
            activeConversationId={activeConversation?.id || null}
            onSelectConversation={handleSelectConversation}
            refreshTrigger={refreshTrigger}
            isCollapsed={false}
            onToggleCollapse={() => setIsHistoryCollapsed(true)}
            onOpenChat={() => handleOpenChat()}
          />
        )}
      </div>
    </div>
  );
}
