import { Smile, Clock, MessageSquareWarning } from 'lucide-react';
import { ScoreCard, LineChartWidget, BarChartWidget, RecommendationsWidget } from '../components/WidgetCards';
import ChatPanel from '../components/ChatPanel';

export default function CustomerSupport() {
  const sentimentOverTime = [
    { month: 'Ene', positive: 65, neutral: 20, negative: 15 },
    { month: 'Feb', positive: 68, neutral: 18, negative: 14 },
    { month: 'Mar', positive: 74, neutral: 15, negative: 11 },
    { month: 'Abr', positive: 70, neutral: 18, negative: 12 },
    { month: 'May', positive: 78, neutral: 12, negative: 10 },
    { month: 'Jun', positive: 82, neutral: 10, negative: 8 },
  ];

  const sentimentByChannel = [
    { channel: 'Retail (Tienda)', positive: 85, negative: 15 },
    { channel: 'E-commerce', positive: 72, negative: 28 },
    { channel: 'WhatsApp', positive: 78, negative: 22 },
    { channel: 'Redes Sociales', positive: 60, negative: 40 },
  ];

  const sentimentShift = [
    { type: 'Cambios / Devoluciones', initial: 30, final: 85 },
    { type: 'Demora de Envío', initial: 15, final: 60 },
    { type: 'Dudas de Producto', initial: 50, final: 90 },
    { type: 'Falla de Producto', initial: 10, final: 75 },
    { type: 'Consulta General', initial: 60, final: 88 },
  ];

  const recommendations = [
    { text: "El sentimiento negativo en Redes Sociales (40%) es alto. Revisa las quejas recientes sobre demoras en envíos de E-commerce.", type: "warning" as const },
    { text: "La satisfacción posterior al chat aumentó un 12% este mes. El agente virtual está resolviendo eficazmente consultas de talles.", type: "info" as const },
    { text: "Implementar encuestas de salida en tiendas físicas para igualar la calidad del feedback recibido online.", type: "action" as const },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Data Panel */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Support & Sentiment</h2>
          <p className="text-gray-500">Métricas de interacción con la marca, satisfacción y puntos de contacto.</p>
        </div>

        {/* Support KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScoreCard 
            title="CSAT (Satisfacción)" 
            value="82%" 
            trend="up" 
            trendValue="+4%" 
            icon={Smile} 
          />
          <ScoreCard 
            title="Tiempo Medio de Resolución" 
            value="4h 15m" 
            trend="down" 
            trendValue="-30m" 
            icon={Clock} 
          />
          <ScoreCard 
            title="Tickets Activos" 
            value="342" 
            trend="down" 
            trendValue="-12%" 
            icon={MessageSquareWarning} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-80">
          <LineChartWidget 
            title="Evolución de Sentimiento Positivo vs Negativo"
            data={sentimentOverTime}
            dataKeyX="month"
            dataKeyY="positive"
            strokeColor="#ccff00"
          />
          <BarChartWidget 
            title="Sentimiento por Canal de Contacto (%)"
            data={sentimentByChannel}
            dataKeyX="channel"
            bars={[
              { key: 'positive', name: 'Positivo', color: '#ccff00' },
              { key: 'negative', name: 'Negativo', color: '#1a1a1a' }
            ]}
          />
        </div>

        <div className="h-80 mt-4">
          <BarChartWidget 
            title="Evolución del Sentimiento Positivo durante la Atención (Inicial vs Final)"
            data={sentimentShift}
            dataKeyX="type"
            bars={[
              { key: 'initial', name: 'Sentimiento al Iniciar', color: '#9ca3af' },
              { key: 'final', name: 'Sentimiento al Finalizar', color: '#10b981' }
            ]}
          />
        </div>

        <div className="mt-8">
          <RecommendationsWidget recommendations={recommendations} />
        </div>
      </div>

      {/* Chat Panel */}
      <div className="w-full lg:w-[400px] shrink-0">
        <ChatPanel 
          moduleName="Customer Support"
          suggestions={[
            "¿Cuáles son los reclamos más frecuentes en E-commerce?",
            "Comparar NPS de Retail vs E-commerce",
            "Mostrar evolución de satisfacción de atención post-venta"
          ]}
        />
      </div>
    </div>
  );
}
