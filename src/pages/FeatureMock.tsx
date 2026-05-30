import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lightbulb, TrendingUp, BarChart3, AlertTriangle, ArrowLeft } from 'lucide-react';
import ChatPanel from '../components/ChatPanel';
import ConversationHistoryPanel from '../components/ConversationHistoryPanel';
import { ScoreCard, BarChartWidget, LineChartWidget, PieChartWidget, DebriefWidget } from '../components/WidgetCards';
import type { Conversation } from '../utils/chatDb';

export default function FeatureMock() {
  const { featureId } = useParams();
  const navigate = useNavigate();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [chatContext, setChatContext] = useState<string | undefined>(undefined);
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(true);

  const titleFormat = (str: string) => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const title = featureId ? titleFormat(featureId) : 'Feature Analysis';

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

  const renderMockChart = () => {
    switch(featureId) {
      case 'curvas-rotas':
        return (
          <div className="h-[300px]">
            <BarChartWidget 
              title="Impacto de Curvas Rotas (Oportunidad Perdida)" 
              data={[
                { name: 'Racer Carbon', perdido: 45000, disponible: 120000 },
                { name: 'Ultra Boost', perdido: 32000, disponible: 80000 },
                { name: 'Pegasus', perdido: 28000, disponible: 150000 },
                { name: 'Ghost', perdido: 15000, disponible: 60000 },
              ]}
              dataKeyX="name"
              bars={[
                { key: 'perdido', name: 'Venta Perdida ($)', color: '#ef4444' },
                { key: 'disponible', name: 'Venta Realizada ($)', color: '#22c55e' }
              ]}
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'sales-projection':
        return (
          <div className="h-[300px]">
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
        );
      case 'inventory-rotation':
        return (
          <div className="h-[300px]">
            <BarChartWidget 
              title="Días de Inventario por Categoría"
              data={[
                { cat: 'Running', dias: 45 },
                { cat: 'Training', dias: 65 },
                { cat: 'Lifestyle', dias: 90 },
                { cat: 'Outdoor', dias: 120 },
              ]}
              dataKeyX="cat"
              bars={[
                { key: 'dias', name: 'Días de stock', color: '#f59e0b' }
              ]}
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'product-clustering':
        return (
          <div className="h-[300px]">
            <PieChartWidget 
              title="Distribución de Clústeres (ABC)"
              data={[
                { name: 'Clúster A (Alta Rotación)', val: 20 },
                { name: 'Clúster B (Media)', val: 35 },
                { name: 'Clúster C (Baja)', val: 45 },
              ]}
              dataKey="val"
              nameKey="name"
              colors={['#22c55e', '#eab308', '#ef4444']}
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'oos-probability':
        return (
          <div className="h-[300px]">
            <BarChartWidget 
              title="Top 5 Productos: Probabilidad de Quiebre"
              data={[
                { name: 'Air Max 90', prob: 92 },
                { name: 'Racer Carbon 3', prob: 85 },
                { name: 'Ultraboost 22', prob: 78 },
                { name: 'Pegasus 40', prob: 65 },
                { name: 'Clifton 9', prob: 54 },
              ]}
              dataKeyX="name"
              bars={[
                { key: 'prob', name: 'Probabilidad (%)', color: '#ef4444' }
              ]}
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'launch-performance':
        return (
          <div className="h-[300px]">
            <LineChartWidget 
              title="Rendimiento de Nuevos Lanzamientos (Días 1-30)"
              data={[
                { dia: 'Día 1', ventas: 120 },
                { dia: 'Día 7', ventas: 350 },
                { dia: 'Día 14', ventas: 580 },
                { dia: 'Día 21', ventas: 890 },
                { dia: 'Día 30', ventas: 1200 },
              ]}
              dataKeyX="dia"
              dataKeyY="ventas"
              strokeColor="#8b5cf6"
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'price-elasticity':
        return (
          <div className="h-[300px]">
            <LineChartWidget 
              title="Curva de Demanda vs Precio"
              data={[
                { precio: '$100', demanda: 1000 },
                { precio: '$120', demanda: 850 },
                { precio: '$140', demanda: 700 },
                { precio: '$160', demanda: 500 },
                { precio: '$180', demanda: 250 },
              ]}
              dataKeyX="precio"
              dataKeyY="demanda"
              strokeColor="#10b981"
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'market-snapshot':
        return (
          <div className="h-[300px]">
            <PieChartWidget 
              title="Market Share por Jugador"
              data={[
                { name: 'Nosotros', val: 32 },
                { name: 'Competidor A', val: 28 },
                { name: 'Competidor B', val: 20 },
                { name: 'Otros', val: 20 },
              ]}
              dataKey="val"
              nameKey="name"
              colors={['#3b82f6', '#f43f5e', '#eab308', '#9ca3af']}
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'price-competitiveness':
        return (
          <div className="h-[300px]">
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
        );
      case 'business-report':
        return (
          <div className="h-[300px]">
            <BarChartWidget 
              title="Métricas Clave de Negocio (YTD)"
              data={[
                { kpi: 'Revenue', actual: 120, obj: 100 },
                { kpi: 'Margin', actual: 45, obj: 50 },
                { kpi: 'EBITDA', actual: 22, obj: 20 },
              ]}
              dataKeyX="kpi"
              bars={[
                { key: 'actual', name: 'Actual', color: '#22c55e' },
                { key: 'obj', name: 'Objetivo', color: '#eab308' }
              ]}
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'area-deep-dives':
        return (
          <div className="h-[300px]">
            <BarChartWidget 
              title="Rendimiento por Región"
              data={[
                { region: 'Norte', ventas: 450 },
                { region: 'Sur', ventas: 320 },
                { region: 'Este', ventas: 500 },
                { region: 'Oeste', ventas: 410 },
              ]}
              dataKeyX="region"
              bars={[
                { key: 'ventas', name: 'Ventas (k$)', color: '#6366f1' }
              ]}
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'inventory-movement':
        return (
          <div className="h-[300px]">
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
        );
      case 'repricing-promotions':
        return (
          <div className="h-[300px]">
            <BarChartWidget 
              title="Impacto Promocional en Volumen"
              data={[
                { prod: 'P1', normal: 100, promo: 250 },
                { prod: 'P2', normal: 150, promo: 180 },
                { prod: 'P3', normal: 80, promo: 300 },
              ]}
              dataKeyX="prod"
              bars={[
                { key: 'normal', name: 'Volumen Base', color: '#9ca3af' },
                { key: 'promo', name: 'Volumen con Promo', color: '#10b981' }
              ]}
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'purchase-proposal':
        return (
          <div className="h-[300px]">
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
        );
      case 'store-allocation':
        return (
          <div className="h-[300px]">
            <BarChartWidget 
              title="Asignación de Stock por Tier de Tienda"
              data={[
                { tier: 'Tier 1 (Flagship)', unidades: 5000 },
                { tier: 'Tier 2 (Malls)', unidades: 3500 },
                { tier: 'Tier 3 (Street)', unidades: 1500 },
              ]}
              dataKeyX="tier"
              bars={[
                { key: 'unidades', name: 'Unidades Sugeridas', color: '#14b8a6' }
              ]}
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      case 'store-open-close':
        return (
          <div className="h-[300px]">
            <BarChartWidget 
              title="Proyección ROI Nuevas Aperturas"
              data={[
                { loc: 'Mendoza Plaza', roi: 18 },
                { loc: 'Alto Rosario', roi: 24 },
                { loc: 'Patio Olmos', roi: 15 },
              ]}
              dataKeyX="loc"
              bars={[
                { key: 'roi', name: 'ROI Estimado (%)', color: '#84cc16' }
              ]}
              onOpenChat={handleOpenChat}
            />
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Visualización en Construcción</h3>
            <p className="text-gray-500 max-w-md">
              El agente está procesando los datos para generar las visualizaciones correspondientes a este PRD.
            </p>
          </div>
        );
    }
  };

  const renderMockDebrief = () => {
    let content = null;
    switch(featureId) {
      case 'curvas-rotas':
        content = (
          <>
            <p className="mb-3">El motor de inferencia ha identificado una correlación directa entre el quiebre de stock en talles core (41 a 43) y una caída del 22% en la tasa de conversión global para la familia <strong>Racer Carbon</strong>. La pérdida proyectada de $45,000 es conservadora y asume un escenario sin efecto rebote.</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Prioridad Crítica:</strong> Reabastecer la tienda principal (Flagship) y el e-commerce propio, que representan el 70% de las búsquedas fallidas.</li>
              <li><strong>Transferencia Recomendada:</strong> Existen 150 pares inmovilizados en tiendas Tier 3 con rotación nula. Se sugiere un movement de inventario inmediato.</li>
            </ul>
            <p><strong>Conclusión del Agente:</strong> Resolver esta curva antes del próximo fin de semana mitigará las pérdidas y mejorará el ROI de las pautas activas en Meta Ads que dirigen tráfico a este producto.</p>
          </>
        );
        break;
      case 'sales-projection':
        content = (
          <>
            <p className="mb-3">Basado en un modelo ARIMA ajustado por variables macroeconómicas y el calendario promocional planificado, la proyección de ventas para los próximos 90 días muestra un crecimiento sostenido.</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Tendencia Alcista:</strong> Octubre cerraría con $590k, impulsado fuertemente por la introducción de la nueva línea de running.</li>
              <li><strong>Alerta Temprana:</strong> Agosto muestra un aplanamiento en la curva comparado con el año anterior. Históricamente, esto ocurre cuando no hay activaciones de media temporada.</li>
            </ul>
            <p><strong>Conclusión del Agente:</strong> Se recomienda adelantar un 15% del presupuesto de performance de Septiembre hacia la segunda quincena de Agosto para sostener el impulso y no perder cuota de mercado frente a competidores directos.</p>
          </>
        );
        break;
      case 'inventory-rotation':
        content = (
          <>
            <p className="mb-3">El análisis de rotación transversal revela una acumulación atípica de inventario en la categoría Outdoor, promediando 120 días de stock frente a un objetivo de 60 días. Esto está comprometiendo liquidez (working capital).</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Productos Overstocked:</strong> Chaquetas impermeables de temporada anterior representan el 45% del sobrestock.</li>
              <li><strong>Rendimiento Running:</strong> En contraste, Running rota a 45 días, acercándose a niveles de rotura si la cadena de suministro sufre retrasos.</li>
            </ul>
            <p><strong>Conclusión del Agente:</strong> Ejecutar una promoción agresiva ("Mid-Season Sale") exclusiva para la categoría Outdoor enfocada en la base de datos de clientes existentes para no diluir el margen general de adquisición.</p>
          </>
        );
        break;
      case 'product-clustering':
        content = (
          <>
            <p className="mb-3">La segmentación no supervisada (K-Means) de los SKUs ha dividido el catálogo en tres clústeres principales. Notablemente, el Clúster C (Baja rotación, bajo margen) está ocupando el 45% del catálogo físico, lo que genera costos de oportunidad en el espacio de tienda.</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Clúster A:</strong> Solo el 20% del catálogo genera el 68% del revenue. Necesita protección estricta contra quiebres de stock.</li>
              <li><strong>Clúster C:</strong> Alta dispersión de talles rotos y baja tracción incluso con promociones profundas.</li>
            </ul>
            <p><strong>Conclusión del Agente:</strong> Iniciar un proceso de discontinuación agresiva ("sunset") de 150 SKUs del Clúster C para liberar espacio y presupuesto de compras hacia las nuevas líneas del Clúster A para la próxima temporada.</p>
          </>
        );
        break;
      case 'price-elasticity':
        content = (
          <>
            <p className="mb-3">El modelo de elasticidad (calculado sobre datos históricos de transacciones y cambios de precio del último año) indica que la familia <strong>Running Premium</strong> tiene una demanda altamente inelástica (-0.4).</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Oportunidad de Margen:</strong> Un incremento de precio del 8% en esta línea resultaría en una caída de demanda inferior al 3%, maximizando el margen bruto.</li>
              <li><strong>Sensibilidad en Lifestyle:</strong> La categoría Lifestyle es extremadamente sensible a precio (-1.8). Cualquier incremento superior a inflación contraerá la venta dramáticamente.</li>
            </ul>
            <p><strong>Conclusión del Agente:</strong> Proceder con un ajuste de precios escalonado (+5% ahora, +3% en un mes) para la línea Running Premium y congelar precios base en Lifestyle, apoyándose en paquetes promocionales (bundles) en lugar de descuentos directos.</p>
          </>
        );
        break;
      case 'price-competitiveness':
        content = (
          <>
            <p className="mb-3">La recolección automática de datos de la competencia muestra que nuestro posicionamiento de precios se ha encarecido en relación al mercado (Index &gt; 100) específicamente en las categorías Outdoor y Running.</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Outdoor:</strong> Estamos un 12% por encima del precio promedio del mercado, lo cual explica la acumulación de stock detectada en otros análisis.</li>
              <li><strong>Lifestyle:</strong> Estratégicamente, estamos posicionados un 5% por debajo, capturando exitosamente cuota de mercado entry-level.</li>
            </ul>
            <p><strong>Conclusión del Agente:</strong> No es posible sostener un Index de 112 en Outdoor sin un diferencial de producto técnico superior demostrable. Alinear precios mediante descuentos ocultos en carrito (cupones) para evaluar si el volumen compensa la pérdida de margen per-unit.</p>
          </>
        );
        break;
      default:
        content = (
          <>
            <p className="mb-3">El agente de inteligencia comercial ha procesado en profundidad las correlaciones, series temporales y métricas de rentabilidad. El análisis arroja patrones determinantes que requieren atención ejecutiva.</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Hallazgo Principal:</strong> Se detectaron anomalías positivas en la eficiencia del canal, sugiriendo un aumento orgánico de la demanda no atribuible a inversión publicitaria directa.</li>
              <li><strong>Riesgo Potencial:</strong> La elasticidad operativa indica que un incremento en volumen superior al 15% podría tensionar las operaciones de cumplimiento logístico.</li>
            </ul>
            <p><strong>Conclusión del Agente:</strong> Mantener la estrategia actual, reforzando preventivamente la cadena de suministro. El sistema ha generado las alertas automatizadas correspondientes para monitorear desviaciones a diario y ajustar predicciones.</p>
          </>
        );
    }

    return (
      <div className="mt-2">
        <DebriefWidget title="Debrief Analítico del Agente">
          {content}
        </DebriefWidget>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Central Content Area */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div className="mb-[-10px] flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm hover:shadow"
          >
            <ArrowLeft size={16} /> Volver
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-500">
              Mock de interfaz para la funcionalidad generada por el agente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScoreCard 
            title="Confianza del Agente" 
            value="94%" 
            trend="up" 
            trendValue="+2.1%" 
            icon={Lightbulb} 
            onOpenChat={handleOpenChat}
          />
          <ScoreCard 
            title="Impacto Estimado" 
            value="Alto" 
            icon={TrendingUp} 
            onOpenChat={handleOpenChat}
          />
          <ScoreCard 
            title="Alertas Activas" 
            value="3" 
            icon={AlertTriangle} 
            onOpenChat={handleOpenChat}
          />
        </div>

        {renderMockChart()}

        <div className="mt-4">
          {renderMockDebrief()}
        </div>
      </div>

      {/* History & Chat Sidebar Panel */}
      <div className={`w-full shrink-0 transition-all duration-300 ${isHistoryCollapsed ? "lg:w-12" : isChatOpen ? "lg:w-[400px]" : "lg:w-[320px]"}`}>
        {isHistoryCollapsed ? (
          <ConversationHistoryPanel
            moduleKey={`feature_${featureId || 'unknown'}`}
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
              moduleKey={`feature_${featureId || 'unknown'}`}
              moduleName={title}
              contextMessage={chatContext || (activeConversation ? undefined : `Hola. He generado el debrief analítico para ${title}. Noté patrones determinantes que requieren atención ejecutiva basada en el motor de inferencia. ¿Sobre qué dato específico de este reporte querés profundizar?`)}
              suggestions={[
                `Desglosar los hallazgos principales de ${title}`,
                "Proyectar impacto financiero de las recomendaciones",
                "¿Qué acciones preventivas sugiere el modelo?"
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
            moduleKey={`feature_${featureId || 'unknown'}`}
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
