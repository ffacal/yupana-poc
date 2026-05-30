import { Link } from 'react-router-dom';
import { PieChart, LineChart, BarChart3, ArrowRight, Sparkles, BrainCircuit } from 'lucide-react';
import { RecommendationsWidget } from '../components/WidgetCards';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const modules = [
    {
      id: 'commercial-intelligence',
      title: 'Inteligencia Comercial',
      description: 'Agentes de IA especializados en predecir ventas, optimizar inventario, analizar precios y resolver curvas rotas.',
      icon: BrainCircuit,
      color: 'bg-indigo-50 text-indigo-600',
      delay: 0.1,
    },
    {
      id: 'market-research',
      title: 'Benchmark de Mercado',
      description: 'Analizá datos públicos, precios promedio, tendencias del mercado y posicionamiento de la competencia.',
      icon: PieChart,
      color: 'bg-blue-50 text-blue-600',
      delay: 0.1,
    },
    {
      id: 'company-insights',
      title: 'Insights',
      description: 'Conectá tu ERP para entender operaciones de ventas, stock, sell-in, sell-out y comportamiento de productos.',
      icon: LineChart,
      color: 'bg-green-50 text-green-600',
      delay: 0.2,
    },
    {
      id: 'executive-report',
      title: 'Reporte Ejecutivo',
      description: 'Plantillas de KPIs listas para reuniones de directorio (CMO, CEO, CFO). Métricas clave al instante.',
      icon: BarChart3,
      color: 'bg-purple-50 text-purple-600',
      delay: 0.3,
    },
    /* {
      id: 'customer-support',
      title: 'Soporte al Cliente',
      description: 'Analizá el sentimiento de tus clientes, métricas de satisfacción y el rendimiento de los canales de atención.',
      icon: HeartHandshake,
      color: 'bg-pink-50 text-pink-600',
      delay: 0.4,
    } */
  ];

  const globalRecommendations = [
    { text: "Asics y Nike lideran en precio mediano, revisá la dispersión de precios para ajustar tu posicionamiento.", type: "info" as const, link: "/market-research" },
    { text: "Alto riesgo de quiebre de stock en Racer Carbon 3 (talle 42). Sugerimos reabastecimiento inmediato.", type: "warning" as const, link: "/company-insights" },
    // { text: "El sentimiento negativo en Redes Sociales es alto. Revisa quejas sobre envíos.", type: "action" as const, link: "/customer-support" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          Bienvenido a Yupana <Sparkles className="text-yupana-green w-6 h-6" />
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Seleccioná un módulo para comenzar a interactuar con los datos de tu negocio y el mercado. Nuestro agente de IA está listo para asistirte.
        </p>
      </div>

      <div className="mb-10">
        <RecommendationsWidget recommendations={globalRecommendations} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mod.delay, duration: 0.4 }}
            >
              <Link 
                to={`/${mod.id}`}
                className="block group h-full bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500 ease-out"></div>
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${mod.color}`}>
                  <Icon size={24} />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
                  {mod.title}
                </h2>
                
                <p className="text-gray-500 mb-6 line-clamp-3">
                  {mod.description}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  Ingresar al módulo
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
