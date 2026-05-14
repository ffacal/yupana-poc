import { useState } from 'react';
import { ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';
import { ScoreCard, BarChartWidget, PieChartWidget } from '../components/WidgetCards';
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

  const msJugador = [
    { name: 'Nosotros', val: 32 },
    { name: 'Competidor A', val: 28 },
    { name: 'Competidor B', val: 20 },
    { name: 'Otros', val: 20 },
  ];

  const pieColors = ['#ccff00', '#1a1a1a', '#4b5563', '#9ca3af', '#60a5fa', '#f87171'];





  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Data Panel */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Benchmark de Mercado</h2>
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

        <div className="mb-6">
          <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-gray-700 text-sm leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-50 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Debrief Analítico del Agente</h3>
            </div>
            
            <p className="mb-3">El motor de inferencia analizó el posicionamiento D2C y detectó que <strong>Asics y Nike</strong> lideran en el segmento premium de Running, validado por un precio mediano de mercado en alza ($163.500, +5.2%).</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Alerta de Posicionamiento:</strong> Fila y Under Armour están absorbiendo la cuota de mercado en el segmento accesible (entry-level). Nuestra marca se encuentra actualmente un 12% por encima del promedio del mercado en la categoría de entrada.</li>
              <li><strong>Oportunidad de Elasticidad:</strong> Los datos históricos indican que el segmento Premium de Running presenta una demanda inelástica. Un incremento controlado de precios (+5%) en nuestra línea de gama alta podría mejorar el margen bruto sin afectar significativamente el volumen de ventas.</li>
              <li><strong>Rendimiento de Canales:</strong> El canal de E-commerce propio (D2C) está logrando un 35% de market share en comparación con competidores clave, consolidándose como nuestro canal más fuerte frente al retail tradicional.</li>
            </ul>
            <p><strong>Recomendación Ejecutiva:</strong> Mantener el impulso en el E-commerce propio e implementar paquetes promocionales (bundles) en el segmento de entrada para recuperar terreno sin degradar el precio base frente a Fila y Under Armour.</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-80 mt-4">
          <BarChartWidget 
            title="Top Retailers (E-commerce Propio vs Distribuidores)"
            data={topRetailersData}
            dataKeyX="name"
            bars={[{ key: 'sales', name: 'Ventas', color: '#3b82f6' }]}
          />
          <PieChartWidget 
            title="Market Snapshot: Market Share por Jugador"
            data={msJugador}
            dataKey="val"
            nameKey="name"
            colors={['#3b82f6', '#f43f5e', '#eab308', '#9ca3af']}
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




      </div>

      {/* Chat Panel */}
      <div className="w-full lg:w-[400px] shrink-0">
        <ChatPanel 
          moduleName="Benchmark de Mercado"
          contextMessage="Hola. Analizando el mercado D2C (Running): la mediana de mercado está en $163.500. Asics lidera en segmento premium mientras Fila ofrece opciones accesibles. ¿Qué posicionamiento competitivo te gustaría analizar?"
          suggestions={[
            "Comparar posicionamiento de precios de Nike vs Adidas",
            "Analizar Market Share en el canal Retail",
            "Identificar oportunidades en e-commerce propio"
          ]}
        />
      </div>
    </div>
  );
}
