import React from 'react';
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
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

export function ScoreCard({ title, value, trend, trendValue, icon: Icon }: { title: string, value: string, trend?: 'up' | 'down' | 'neutral', trendValue?: string, icon?: React.ElementType }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {Icon && <Icon className="text-gray-400" size={18} />}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      {trend && trendValue && (
        <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
          {trend === 'up' && <TrendingUp size={14} className="mr-1" />}
          {trend === 'down' && <TrendingDown size={14} className="mr-1" />}
          {trendValue} vs mes anterior
        </div>
      )}
    </div>
  );
}

export function LineChartWidget({ title, data, dataKeyX, dataKeyY, strokeColor = '#ccff00' }: { title: string, data: any[], dataKeyX: string, dataKeyY: string, strokeColor?: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-medium text-gray-800 mb-4">{title}</h3>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey={dataKeyX} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line type="monotone" dataKey={dataKeyY} stroke={strokeColor} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function BarChartWidget({ title, data, dataKeyX, bars }: { title: string, data: any[], dataKeyX: string, bars: { key: string, color: string, name?: string }[] }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-medium text-gray-800 mb-4">{title}</h3>
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

export function PieChartWidget({ title, data, dataKey, nameKey, colors }: { title: string, data: any[], dataKey: string, nameKey: string, colors: string[] }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-medium text-gray-800 mb-4">{title}</h3>
      <div className="flex-1 min-h-[300px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={80}
              paddingAngle={5}
              dataKey={dataKey}
              nameKey={nameKey}
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
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

export function RecommendationsWidget({ recommendations }: { recommendations: { text: string, type: 'warning' | 'info' | 'action', link?: string }[] }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-2xl border border-gray-800 shadow-lg text-white">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <AlertCircle size={16} className="text-yupana-green" />
        Recomendaciones del Agente
      </h3>
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
  );
}
