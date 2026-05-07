import { Users, CreditCard, DollarSign, Target, FileText, Truck } from 'lucide-react';
import { ScoreCard, BarChartWidget, RecommendationsWidget, PieChartWidget, LineChartWidget } from '../components/WidgetCards';
import ChatPanel from '../components/ChatPanel';

export default function ExecutiveReport() {
  const channelData = [
    { channel: 'Retail', revenue: 4500000, margin: 45, profit: 1800000 },
    { channel: 'E-commerce', revenue: 3200000, margin: 55, profit: 1760000 },
    { channel: 'Wholesale', revenue: 2800000, margin: 38, profit: 1064000 },
  ];

  const salesShareData = [
    { name: 'Retail', value: 4500000 },
    { name: 'E-commerce', value: 3200000 },
    { name: 'Wholesale', value: 2800000 },
  ];

  const marketingData = [
    { month: 'Jan', spend: 120, revenue: 450, roi: 275 },
    { month: 'Feb', spend: 135, revenue: 520, roi: 285 },
    { month: 'Mar', spend: 150, revenue: 610, roi: 306 },
    { month: 'Apr', spend: 140, revenue: 580, roi: 314 },
  ];

  const recommendations = [
    { text: "El margen del E-commerce superó el objetivo en 5%. Considerar reasignación de pauta para maximizar retorno.", type: "action" as const },
    { text: "Wholesale presenta un retraso del 8% frente al Forecast Q2. Revisar pipeline de grandes cuentas.", type: "warning" as const },
    { text: "Los costos de logística han aumentado un 1.2% este mes. Explorar opciones de optimización de rutas.", type: "info" as const },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Data Panel */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Executive Report</h2>
            <p className="text-gray-500">Board Meeting KPIs & Financials (Q2 2026).</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            <FileText size={16} />
            Exportar PDF
          </button>
        </div>

        {/* C-Level Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <ScoreCard 
            title="Total Revenue" 
            value="$10.5M" 
            trend="up" 
            trendValue="+14%" 
            icon={DollarSign} 
          />
          <ScoreCard 
            title="Gross Margin" 
            value="48.2%" 
            trend="up" 
            trendValue="+2.1%" 
            icon={Target} 
          />
          <ScoreCard 
            title="CAC (Acquisition)" 
            value="$24.50" 
            trend="down" 
            trendValue="-5%" 
            icon={Users} 
          />
          <ScoreCard 
            title="AOV (Ticket)" 
            value="$145.00" 
            trend="up" 
            trendValue="+8%" 
            icon={CreditCard} 
          />
          <ScoreCard 
            title="Logistics Costs" 
            value="$1.2M" 
            trend="down" 
            trendValue="-1.2%" 
            icon={Truck} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-80">
            <BarChartWidget 
              title="Marketing Spend vs Revenue (k$)"
              data={marketingData}
              dataKeyX="month"
              bars={[
                { key: 'spend', name: 'Spend (k$)', color: '#64748b' },
                { key: 'revenue', name: 'Revenue (k$)', color: '#ccff00' }
              ]}
            />
          </div>
          <div className="h-80">
            <LineChartWidget 
              title="Marketing ROI (%)"
              data={marketingData}
              dataKeyX="month"
              dataKeyY="roi"
            />
          </div>
          <div className="h-80">
            <PieChartWidget
              title="Sales Share per Channel"
              data={salesShareData}
              dataKey="value"
              nameKey="name"
              colors={['#1a1a1a', '#ccff00', '#64748b']}
            />
          </div>
          <div className="h-80">
            <BarChartWidget 
              title="Profitability per Channel"
              data={channelData}
              dataKeyX="channel"
              bars={[
                { key: 'profit', name: 'Profit ($)', color: '#10b981' }
              ]}
            />
          </div>
          <div className="h-80 lg:col-span-2">
            <BarChartWidget 
              title="Revenue vs Margin por Canal"
              data={channelData}
              dataKeyX="channel"
              bars={[
                { key: 'revenue', name: 'Ingresos ($)', color: '#1a1a1a' },
                { key: 'margin', name: 'Margen (%)', color: '#ccff00' }
              ]}
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
          moduleName="Executive Board"
          suggestions={[
            "Generar resumen ejecutivo de ventas Q2",
            "¿Por qué subió el ticket promedio?",
            "Proyectar cierre de año según tendencia actual"
          ]}
        />
      </div>
    </div>
  );
}
