import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart as RechartsBarChart, 
  Bar,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { AlertCircle, TrendingUp, TrendingDown, ChevronDown, ChevronUp, Bot, Sparkles } from 'lucide-react';

export function ScoreCard({ title, value, trend, trendValue, trendLabel = 'vs mes anterior', icon: Icon, onOpenChat }: { title: string, value: string, trend?: 'up' | 'down' | 'neutral', trendValue?: string, trendLabel?: string, icon?: React.ElementType, onOpenChat?: (contextPrompt?: string) => void }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col relative group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          {onOpenChat && (
            <button
              onClick={() => onOpenChat(`Hablemos sobre la métrica "${title}" que actualmente tiene un valor de ${value}.`)}
              className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 p-1.5 rounded-lg transition-colors flex items-center justify-center shadow-sm"
              title="Preguntar al agente"
            >
              <Sparkles size={14} className="text-indigo-600 animate-pulse" />
            </button>
          )}
        </div>
        {Icon && <Icon className="text-gray-400" size={18} />}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      {trend && trendValue && (
        <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
          {trend === 'up' && <TrendingUp size={14} className="mr-1" />}
          {trend === 'down' && <TrendingDown size={14} className="mr-1" />}
          {trendValue} {trendLabel}
        </div>
      )}
    </div>
  );
}

export function LineChartWidget({ title, data, dataKeyX, dataKeyY, strokeColor = '#ccff00', lines, onOpenChat }: { title: string, data: any[], dataKeyX: string, dataKeyY?: string, strokeColor?: string, lines?: { key: string, color: string, name?: string }[], onOpenChat?: (contextPrompt?: string) => void }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col group">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        {onOpenChat && (
          <button
            onClick={() => onOpenChat(`Hablemos sobre el gráfico de "${title}". ¿Qué insights podés darme sobre estos datos?`)}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-xl transition-all shadow-sm"
            title="Preguntar al agente sobre este gráfico"
          >
            <Sparkles size={12} className="text-indigo-600 animate-pulse" />
            <span>Preguntar</span>
          </button>
        )}
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey={dataKeyX} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            {lines ? (
              <>
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                {lines.map((line, idx) => (
                  <Line key={idx} type="monotone" dataKey={line.key} name={line.name || line.key} stroke={line.color} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                ))}
              </>
            ) : (
              <Line type="monotone" dataKey={dataKeyY!} stroke={strokeColor} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            )}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function BarChartWidget({ title, data, dataKeyX, bars, onOpenChat }: { title: string, data: any[], dataKeyX: string, bars: { key: string, color: string, name?: string }[], onOpenChat?: (contextPrompt?: string) => void }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col group">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        {onOpenChat && (
          <button
            onClick={() => onOpenChat(`Hablemos sobre el gráfico de "${title}". ¿Qué insights podés darme sobre estos datos?`)}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-xl transition-all shadow-sm"
            title="Preguntar al agente sobre este gráfico"
          >
            <Sparkles size={12} className="text-indigo-600 animate-pulse" />
            <span>Preguntar</span>
          </button>
        )}
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey={dataKeyX} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            {bars.map((bar, idx) => (
              <Bar key={idx} dataKey={bar.key} name={bar.name || bar.key} fill={bar.color} radius={[4, 4, 0, 0]} />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PieChartWidget({ title, data, dataKey, nameKey, colors, showLabels = false, onOpenChat }: { title: string, data: any[], dataKey: string, nameKey: string, colors: string[], showLabels?: boolean, onOpenChat?: (contextPrompt?: string) => void }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col group">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        {onOpenChat && (
          <button
            onClick={() => onOpenChat(`Hablemos sobre el gráfico de distribución "${title}". ¿Qué insights podés darme sobre estos datos?`)}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-xl transition-all shadow-sm"
            title="Preguntar al agente sobre este gráfico"
          >
            <Sparkles size={12} className="text-indigo-600 animate-pulse" />
            <span>Preguntar</span>
          </button>
        )}
      </div>
      <div className="flex-1 min-h-[200px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={0}
              outerRadius={75}
              paddingAngle={5}
              dataKey={dataKey}
              nameKey={nameKey}
              label={showLabels ? ({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%` : false}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function RecommendationsWidget({ recommendations, isCollapsible = true }: { recommendations: { text: string, type: 'warning' | 'info' | 'action', link?: string }[], isCollapsible?: boolean }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 shadow-lg text-white overflow-hidden">
      <div 
        className={`flex items-center justify-between p-5 ${isCollapsible ? 'cursor-pointer select-none hover:bg-white/5 transition-colors' : ''} ${isOpen ? 'pb-2' : ''}`}
        onClick={() => isCollapsible && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold flex items-center gap-2 m-0">
            <AlertCircle size={16} className="text-yupana-green" />
            Recomendaciones del Agente
          </h3>
        </div>
        {isCollapsible && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 transition-all text-gray-200"
          >
            {isOpen ? (
              <>
                <span>Minimizar</span>
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                <span>Ver Recomendaciones</span>
                <ChevronDown size={14} />
              </>
            )}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="p-5 pt-2">
          <ul className="space-y-3">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-3 items-start text-sm">
                <span className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${
                  rec.type === 'action' ? 'bg-yupana-green' : rec.type === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
                }`}></span>
                <div className="text-gray-300 leading-relaxed flex-1">
                  {rec.text}
                  {rec.link && (
                    <Link to={rec.link} className="inline-flex items-center gap-1 mt-1.5 text-yupana-green hover:underline font-medium text-xs opacity-90 hover:opacity-100 transition-opacity">
                      Ver insight detallado &rarr;
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function DebriefWidget({ title = "Debrief Analítico del Agente", children }: { title?: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-gray-700 text-sm leading-relaxed relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-50 text-blue-600">
            <Bot size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 transition-all text-gray-700"
        >
          {isOpen ? (
            <>
              <span>Minimizar</span>
              <ChevronUp size={14} />
            </>
          ) : (
            <>
              <span>Ver Debrief</span>
              <ChevronDown size={14} />
            </>
          )}
        </button>
      </div>
      {isOpen && children}
    </div>
  );
}
