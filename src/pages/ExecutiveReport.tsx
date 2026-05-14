import { DollarSign, Target, FileText, Package, Clock, Percent, Store, Bot } from 'lucide-react';
import { ScoreCard, BarChartWidget, PieChartWidget, LineChartWidget } from '../components/WidgetCards';
import ChatPanel from '../components/ChatPanel';

export default function ExecutiveReport() {
  const revenueTrendData = [
    { month: 'Ene', real: 3200, budget: 3000, lastYear: 2800 },
    { month: 'Feb', real: 2800, budget: 2900, lastYear: 2600 },
    { month: 'Mar', real: 3500, budget: 3300, lastYear: 3100 },
    { month: 'Abr', real: 3100, budget: 3100, lastYear: 2900 },
  ];

  const inventoryAgingData = [
    { name: '< 30 días', value: 45 },
    { name: '30-90 días', value: 30 },
    { name: '90-180 días', value: 15 },
    { name: '> 180 días', value: 10 },
  ];

  const storePerformanceData = [
    { store: 'Alto Palermo', sellThrough: 75, target: 70 },
    { store: 'Unicenter', sellThrough: 82, target: 70 },
    { store: 'Florida', sellThrough: 55, target: 70 },
    { store: 'Abasto', sellThrough: 68, target: 70 },
  ];

  const categorySellThroughData = [
    { category: 'Zapatillas', sellThrough: 78, target: 70 },
    { category: 'Indumentaria', sellThrough: 62, target: 70 },
    { category: 'Accesorios', sellThrough: 85, target: 70 },
    { category: 'Equipamiento', sellThrough: 45, target: 70 },
  ];

  const budgetVarianceData = [
    { metric: 'Ingresos', real: 10.5, budget: 10.0 },
    { metric: 'Costos', real: 5.4, budget: 5.0 },
    { metric: 'Margen', real: 5.1, budget: 5.0 },
  ];

  const renderExecutiveDebrief = () => (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-gray-700 text-sm leading-relaxed relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
      <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-50 text-blue-600">
          <Bot size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Debrief Analítico del Agente</h3>
      </div>
      
      <p className="mb-3">El agente directivo ha consolidado los indicadores clave de rendimiento (KPIs) de esta semana. Se observa una desviación positiva en ingresos, aunque contrarrestada por alertas operativas que requieren atención inmediata:</p>
      <ul className="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Desempeño de Tiendas (2 Críticas):</strong> La sucursal 'Florida' registra una severa caída en sell-through (55% vs objetivo del 70%) y contracción de ventas del 12%; por otro lado, 'Abasto' (68%) entra en zona de riesgo al no alcanzar las cuotas proyectadas. Requieren revisión de tráfico y conversión.</li>
        <li><strong>Salud de Inventario:</strong> La categoría 'Running' inmoviliza capital con un 20% del stock superando los 180 días, mientras que 'Nike' sufre quiebres de stock (15%) en top sucursales.</li>
        <li><strong>Eficiencia Operativa:</strong> El costo logístico presenta un sobrecosto del 8% frente al límite proyectado para el trimestre.</li>
      </ul>
      <p><strong>Conclusión Ejecutiva:</strong> Priorizar reasignación de inventario de Running hacia tiendas de alta rotación, acelerar el reabastecimiento de Nike, y auditar tarifas logísticas para mitigar la erosión del margen.</p>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Data Panel */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reporte Ejecutivo</h2>
            <p className="text-gray-500">Overview directivo y KPIs en tiempo real.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              <FileText size={16} />
              Exportar PDF
            </button>
          </div>
        </div>

        <div className="mb-6">
          {renderExecutiveDebrief()}
        </div>

        {/* C-Level Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <ScoreCard 
            title="Ventas (MTD)" 
            value="$3.5M" 
            trend="up" 
            trendValue="+14% vs Bgt" 
            trendLabel=""
            icon={DollarSign} 
          />
          <ScoreCard 
            title="Días de Inventario" 
            value="45 Días" 
            trend="down" 
            trendValue="-5 Días" 
            icon={Package} 
          />
          <ScoreCard 
            title="Edad > 90 Días" 
            value="25%" 
            trend="down" 
            trendValue="-2%" 
            icon={Clock} 
          />
          <ScoreCard 
            title="Var. Presupuesto" 
            value="+5%" 
            trend="up" 
            trendValue="Ingresos" 
            trendLabel=""
            icon={Target} 
          />
          <ScoreCard 
            title="Sell-through" 
            value="68%" 
            trend="up" 
            trendValue="+3%" 
            icon={Percent} 
          />
          <ScoreCard 
            title="Tiendas Críticas" 
            value="2" 
            trend="down" 
            trendValue="Requieren acción" 
            trendLabel=""
            icon={Store} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-80 lg:col-span-2">
            <LineChartWidget 
              title="Tendencia de Ventas vs Presupuesto (k$)"
              data={revenueTrendData}
              dataKeyX="month"
              lines={[
                { key: 'real', name: 'Real ($)', color: '#1a1a1a' },
                { key: 'budget', name: 'Presupuesto ($)', color: '#64748b' },
                { key: 'lastYear', name: 'Año Anterior ($)', color: '#ccff00' }
              ]}
            />
          </div>
          <div className="h-80">
            <BarChartWidget 
              title="Presupuesto vs Real (M$)"
              data={budgetVarianceData}
              dataKeyX="metric"
              bars={[
                { key: 'real', name: 'Real (M$)', color: '#1a1a1a' },
                { key: 'budget', name: 'Presupuesto (M$)', color: '#64748b' }
              ]}
            />
          </div>
          <div className="h-80">
            <PieChartWidget
              title="Salud del Inventario (Edad)"
              data={inventoryAgingData}
              dataKey="value"
              nameKey="name"
              colors={['#10b981', '#ccff00', '#f59e0b', '#ef4444']}
            />
          </div>
          <div className="h-80">
            <BarChartWidget 
              title="Sell-through por Categoría (%)"
              data={categorySellThroughData}
              dataKeyX="category"
              bars={[
                { key: 'sellThrough', name: 'Sell-through (%)', color: '#1a1a1a' },
                { key: 'target', name: 'Objetivo (%)', color: '#64748b' }
              ]}
            />
          </div>
          <div className="h-80">
            <BarChartWidget 
              title="Desempeño de Tiendas (Sell-through %)"
              data={storePerformanceData}
              dataKeyX="store"
              bars={[
                { key: 'sellThrough', name: 'Sell-through (%)', color: '#1a1a1a' },
                { key: 'target', name: 'Objetivo (%)', color: '#ccff00' }
              ]}
            />
          </div>
        </div>




      </div>

      {/* Chat Panel */}
      <div className="w-full lg:w-[400px] shrink-0">
        <ChatPanel 
          moduleName="Executive Board"
          contextMessage="Hola. Analizando los KPIs directivos: Las ventas superan el presupuesto en 14%, sin embargo la tienda 'Florida' presenta una caída del 12% y la categoría 'Running' tiene un 20% de stock inmovilizado (>180 días). ¿Quieres que profundicemos en alguno de estos puntos?"
          suggestions={[
            "Analizar motivos de caída en tienda Florida",
            "Ver plan de liquidación para Running",
            "Detalle de desviación en costo logístico"
          ]}
        />
      </div>
    </div>
  );
}
