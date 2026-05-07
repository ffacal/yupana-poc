import { useState } from 'react';
import { ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';
import { ScoreCard, BarChartWidget, PieChartWidget, RecommendationsWidget } from '../components/WidgetCards';
import ChatPanel from '../components/ChatPanel';

export default function MarketResearch() {
  const [timeFilter, setTimeFilter] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const getMultiplier = () => {
    if (timeFilter === 'quarterly') return 3;
    if (timeFilter === 'yearly') return 12;
    return 1;
  };
  const mult = getMultiplier();

  const priceData = [
    { brand: 'adidas', price: 182999 },
    { brand: 'asics', price: 249900 },
    { brand: 'fila', price: 99900 },
    { brand: 'nike', price: 199999 },
    { brand: 'puma', price: 137999 },
    { brand: 'underarmour', price: 109999 },
  ];

  const unitSalesData = [
    { brand: 'adidas', sales: 45000 * mult },
    { brand: 'nike', sales: 62000 * mult },
    { brand: 'puma', sales: 28000 * mult },
    { brand: 'asics', sales: 15000 * mult },
    { brand: 'fila', sales: 32000 * mult },
    { brand: 'underarmour', sales: 18000 * mult },
  ];

  const topRetailersData = [
    { name: 'E-commerce Propio', sales: 25000 * mult },
    { name: 'Dash (Distr.)', sales: 18000 * mult },
    { name: 'Dexter (Distr.)', sales: 15000 * mult },
    { name: 'Moov (Distr.)', sales: 12000 * mult },
    { name: 'Grid (Distr.)', sales: 8000 * mult },
  ];

  const msRetail = [
    { brand: 'adidas', share: 25 },
    { brand: 'nike', share: 30 },
    { brand: 'puma', share: 15 },
    { brand: 'asics', share: 10 },
    { brand: 'fila', share: 12 },
    { brand: 'underarmour', share: 8 },
  ];

  const msProprietary = [
    { brand: 'adidas', share: 35 },
    { brand: 'nike', share: 20 },
    { brand: 'puma', share: 10 },
    { brand: 'asics', share: 15 },
    { brand: 'fila', share: 10 },
    { brand: 'underarmour', share: 10 },
  ];

  const msMercadoLibre = [
    { brand: 'adidas', share: 20 },
    { brand: 'nike', share: 35 },
    { brand: 'puma', share: 12 },
    { brand: 'asics', share: 5 },
    { brand: 'fila', share: 20 },
    { brand: 'underarmour', share: 8 },
  ];

  const msOther = [
    { brand: 'adidas', share: 28 },
    { brand: 'nike', share: 28 },
    { brand: 'puma', share: 15 },
    { brand: 'asics', share: 8 },
    { brand: 'fila', share: 15 },
    { brand: 'underarmour', share: 6 },
  ];

  const pieColors = ['#ccff00', '#1a1a1a', '#4b5563', '#9ca3af', '#60a5fa', '#f87171'];

  const recommendations = [
    { text: "Asics y Nike lideran en precio mediano, lo que puede reflejar un posicionamiento superior o portfolios más técnicos.", type: "info" as const },
    { text: "Revisar la dispersión de precios de Fila y Under Armour, actualmente las opciones más accesibles en D2C.", type: "action" as const },
    { text: "Analizar el rango completo de precios (min/max) para tener una visión completa de posicionamiento frente a Adidas.", type: "warning" as const },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Data Panel */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Market Research</h2>
            <p className="text-gray-500">Análisis competitivo de precios en e-commerce directos (D2C).</p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScoreCard 
            title="Mediana Mercado (Running)" 
            value="$163.500" 
            trend="up" 
            trendValue="+5.2%" 
            icon={DollarSign} 
          />
          <ScoreCard 
            title="Marca Premium" 
            value="Asics" 
            icon={TrendingUp} 
          />
          <ScoreCard 
            title="Marca Accesible" 
            value="Fila" 
            icon={ShoppingBag} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-80">
          <BarChartWidget 
            title="Mediana de precios de zapatillas running por marca"
            data={priceData}
            dataKeyX="brand"
            bars={[{ key: 'price', name: 'Precio ($)', color: '#1a1a1a' }]}
          />
          <BarChartWidget 
            title={`Ventas Totales (Unidades) por Marca - ${timeFilter === 'monthly' ? 'Mes' : timeFilter === 'quarterly' ? 'Trimestre' : 'Año'}`}
            data={unitSalesData}
            dataKeyX="brand"
            bars={[{ key: 'sales', name: 'Unidades Vendidas', color: '#ccff00' }]}
          />
        </div>

        <div className="h-80 mt-4">
          <BarChartWidget 
            title="Top Retailers (E-commerce Propio vs Distribuidores)"
            data={topRetailersData}
            dataKeyX="name"
            bars={[{ key: 'sales', name: 'Ventas', color: '#3b82f6' }]}
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">Market Share por Marca (Según Canal)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PieChartWidget 
              title="Retail"
              data={msRetail}
              dataKey="share"
              nameKey="brand"
              colors={pieColors}
            />
            <PieChartWidget 
              title="E-commerce Propio"
              data={msProprietary}
              dataKey="share"
              nameKey="brand"
              colors={pieColors}
            />
            <PieChartWidget 
              title="MercadoLibre"
              data={msMercadoLibre}
              dataKey="share"
              nameKey="brand"
              colors={pieColors}
            />
            <PieChartWidget 
              title="Otros Canales"
              data={msOther}
              dataKey="share"
              nameKey="brand"
              colors={pieColors}
            />
          </div>
        </div>

        <div className="mt-8">
          <RecommendationsWidget recommendations={recommendations} />
        </div>
      </div>

      {/* Chat Panel */}
      <div className="w-full lg:w-[400px] shrink-0">
        <ChatPanel 
          moduleName="Market Research"
          suggestions={[
            "Dame la mediana de precios de zapatillas de running por marca",
            "¿Cuál fue el botín de hombre más vendido?",
            "Comparar precios máximos y mínimos de Nike vs Adidas"
          ]}
        />
      </div>
    </div>
  );
}
