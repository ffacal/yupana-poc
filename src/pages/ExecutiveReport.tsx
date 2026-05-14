import { Link } from 'react-router-dom';
import { DollarSign, Target, FileText, Briefcase, Package, Clock, Percent, Store } from 'lucide-react';
import { ScoreCard, BarChartWidget, RecommendationsWidget, PieChartWidget, LineChartWidget } from '../components/WidgetCards';
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

  const alerts = [
    { text: "Tienda 'Florida' presenta una caída del 12% frente al mes anterior. Requiere revisión de tráfico y conversión.", type: "warning" as const },
    { text: "La marca 'Nike' presenta un 15% de Out-of-Stock en las 3 sucursales principales.", type: "action" as const },
    { text: "Categoría 'Running' concentra un 20% del inventario con edad superior a 180 días.", type: "warning" as const },
    { text: "Costo logístico supera el límite proyectado en un 8% este trimestre.", type: "info" as const },
  ];

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
            <Link 
              to="/commercial-intelligence/business-report" 
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <Briefcase size={16} />
              Generar Business Report
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              <FileText size={16} />
              Exportar PDF
            </button>
          </div>
        </div>

        <div className="mb-6">
          <RecommendationsWidget recommendations={alerts} />
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
