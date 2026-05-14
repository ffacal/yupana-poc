import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Package, Activity, BrainCircuit, AlertTriangle } from 'lucide-react';
import { ScoreCard, LineChartWidget, BarChartWidget, PieChartWidget, RecommendationsWidget } from '../components/WidgetCards';
import ChatPanel from '../components/ChatPanel';

export default function CompanyInsights() {
  const [timeFilter, setTimeFilter] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const getMultiplier = () => {
    if (timeFilter === 'quarterly') return 3;
    if (timeFilter === 'yearly') return 12;
    return 1;
  };
  const mult = getMultiplier();

  const salesData = [
    { month: 'Ene', sellIn: 4000 * mult, sellOut: 2400 * mult },
    { month: 'Feb', sellIn: 3000 * mult, sellOut: 1398 * mult },
    { month: 'Mar', sellIn: 2000 * mult, sellOut: 9800 * mult },
    { month: 'Abr', sellIn: 2780 * mult, sellOut: 3908 * mult },
    { month: 'May', sellIn: 1890 * mult, sellOut: 4800 * mult },
    { month: 'Jun', sellIn: 2390 * mult, sellOut: 3800 * mult },
  ];

  const topProducts = [
    { name: 'Racer Carbon 3', sales: 400 * mult },
    { name: 'Ultra Boost', sales: 300 * mult },
    { name: 'Pegasus 40', sales: 300 * mult },
    { name: 'Ghost 15', sales: 200 * mult },
    { name: 'Clifton 9', sales: 278 * mult },
  ];

  const channelShareData = [
    { name: 'D2C', value: 45 },
    { name: 'Retail', value: 30 },
    { name: 'Wholesale', value: 25 },
  ];

  const topRetailersData = [
    { name: 'Sportline', sales: 1200 * mult },
    { name: 'Dexter', sales: 900 * mult },
    { name: 'Grid', sales: 850 * mult },
    { name: 'Moov', sales: 600 * mult },
  ];

  const topDistributorsData = [
    { name: 'Dist. Centro', sales: 3000 * mult },
    { name: 'Dist. Norte', sales: 2500 * mult },
    { name: 'Dist. Sur', sales: 1800 * mult },
  ];

  const recommendations = [
    { text: "Alto riesgo de quiebre de stock en Racer Carbon 3 (talle 42). Sugerimos reabastecimiento inmediato.", type: "warning" as const },
    { text: "La relación Sell-in / Sell-out en Marzo muestra un excelente nivel de rotación.", type: "info" as const },
    { text: "Optimizar el inventario de Ghost 15; las ventas cayeron un 12% frente a la estimación.", type: "action" as const },
  ];

  const agentFeatures = [
    { id: 'curvas-rotas', title: 'Curvas Rotas', prd: 'PRD-011', icon: Activity },
    { id: 'inventory-rotation', title: 'Rotación de Inventario', prd: 'PRD-013', icon: Package },
    { id: 'product-clustering', title: 'Clustering de Productos', prd: 'PRD-014', icon: BrainCircuit },
    { id: 'oos-probability', title: 'Probabilidad de Quiebre', prd: 'PRD-015', icon: AlertTriangle },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Data Panel */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Insights</h2>
            <p className="text-gray-500">Métricas operativas conectadas a tu ERP.</p>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
            <button 
              onClick={() => setTimeFilter('monthly')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeFilter === 'monthly' ? 'bg-gray-100 text-black' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Mensual
            </button>
            <button 
              onClick={() => setTimeFilter('quarterly')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeFilter === 'quarterly' ? 'bg-gray-100 text-black' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Trimestral
            </button>
            <button 
              onClick={() => setTimeFilter('yearly')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeFilter === 'yearly' ? 'bg-gray-100 text-black' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Anual
            </button>
          </div>
        </div>

        <div className="mb-6">
          <RecommendationsWidget recommendations={recommendations} />
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BrainCircuit className="text-blue-600 w-4 h-4" /> 
            <span className="text-sm font-semibold text-gray-700">Análisis disponibles</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {agentFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={feat.id}
                  to={`/commercial-intelligence/${feat.id}`}
                  className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-2.5 hover:border-blue-300 hover:bg-blue-50 transition-colors group shadow-sm"
                >
                  <div className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors shrink-0">
                    <Icon size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-800 leading-tight">
                    {feat.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScoreCard 
            title={`Total Sell-Out (${timeFilter === 'monthly' ? 'MTD' : timeFilter === 'quarterly' ? 'QTD' : 'YTD'})`} 
            value={`${(24.5 * mult).toFixed(1)}k uds`} 
            trend="up" 
            trendValue="+12%" 
            icon={Package} 
          />
          <ScoreCard 
            title="Inventario Total" 
            value={`${(142 * mult).toFixed(0)}k uds`} 
            trend="down" 
            trendValue="-3%" 
            icon={Box} 
          />
          <ScoreCard 
            title="Rotación" 
            value="4.2x" 
            icon={Activity} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-80">
          <LineChartWidget 
            title="Evolución Sell-in vs Sell-out"
            data={salesData}
            dataKeyX="month"
            dataKeyY="sellOut"
          />
          <BarChartWidget 
            title="Top 5 Productos"
            data={topProducts}
            dataKeyX="name"
            bars={[{ key: 'sales', name: 'Ventas', color: '#ccff00' }]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-80">
          <PieChartWidget 
            title="Channel Share"
            data={channelShareData}
            dataKey="value"
            nameKey="name"
            colors={['#10b981', '#3b82f6', '#f59e0b']}
          />
          <BarChartWidget 
            title="Top Retailers"
            data={topRetailersData}
            dataKeyX="name"
            bars={[{ key: 'sales', name: 'Ventas', color: '#3b82f6' }]}
          />
          <BarChartWidget 
            title="Top Distributors"
            data={topDistributorsData}
            dataKeyX="name"
            bars={[{ key: 'sales', name: 'Ventas', color: '#8b5cf6' }]}
          />
        </div>




      </div>

      {/* Chat Panel */}
      <div className="w-full lg:w-[400px] shrink-0">
        <ChatPanel 
          moduleName="Insights"
          contextMessage="Hola. Analizando los datos de operaciones: la rotación de inventario está en 4.2x y hay riesgo de quiebre de stock en Racer Carbon 3. ¿En qué métricas de Sell-out o distribución te gustaría profundizar?"
          suggestions={[
            "¿Cuál es la causa del quiebre de stock en Racer Carbon 3?",
            "Analizar distribución de ventas por canal (D2C vs Retail)",
            "Comparar rendimiento de los Top Distribuidores"
          ]}
        />
      </div>
    </div>
  );
}
