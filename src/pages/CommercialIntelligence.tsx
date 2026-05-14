import { BrainCircuit, Bot } from 'lucide-react';
import { BarChartWidget, LineChartWidget, PieChartWidget } from '../components/WidgetCards';
import ChatPanel from '../components/ChatPanel';

export default function CommercialIntelligence() {
  const renderMockDebrief = () => (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-gray-700 text-sm leading-relaxed relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
      <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-50 text-blue-600">
          <Bot size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Debrief Analítico Transversal</h3>
      </div>
      
      <p className="mb-3">El agente de inteligencia comercial ha procesado en profundidad las proyecciones de ventas, elasticidad de precios y asignación de inventario. El análisis arroja patrones determinantes:</p>
      <ul className="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Proyección de Ventas:</strong> Basado en un modelo predictivo, la proyección para los próximos 90 días muestra un crecimiento sostenido hacia Octubre, pero con un estancamiento en Agosto.</li>
        <li><strong>Competitividad de Precios:</strong> Nuestro posicionamiento de precios se ha encarecido en relación al mercado en las categorías Outdoor y Running (Index &gt; 100), explicando la acumulación de stock.</li>
        <li><strong>Flujo de Inventario:</strong> La categoría Outdoor promedia 120 días de stock frente a un objetivo de 60 días, comprometiendo liquidez.</li>
      </ul>
      <p><strong>Conclusión del Agente:</strong> Adelantar presupuesto de performance para sostener el impulso de ventas en Agosto, ejecutar una promoción agresiva en Outdoor para liberar stock, y reajustar precios en la línea Running Premium donde la demanda es inelástica.</p>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Data Panel */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Inteligencia Comercial <BrainCircuit className="text-blue-600 w-6 h-6" />
            </h1>
            <p className="text-gray-500">Nuestros agentes analizan tus datos para descubrir oportunidades y optimizar operaciones.</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-200">
            <Bot size={16} />
            Agentes Activos (10)
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
            />
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="w-full lg:w-[400px] shrink-0">
        <ChatPanel 
          moduleName="Inteligencia Comercial"
          contextMessage="Hola. He consolidado los análisis de todos tus agentes activos. Detecté una acumulación de inventario en Outdoor y una oportunidad de ajuste de precios en Running Premium. ¿En qué recomendación ejecutiva te gustaría profundizar?"
          suggestions={[
            "Profundizar en la estrategia de precios para Running",
            "Ver plan de liquidación para el stock de Outdoor",
            "Explicar la proyección de ventas para Octubre"
          ]}
        />
      </div>
    </div>
  );
}
