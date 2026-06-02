import React, { useState, useEffect, useRef } from 'react';
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
import * as d3 from 'd3';
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

export function D3BarChartWidget({ title, data, dataKeyX, bars, onOpenChat }: { title: string, data: any[], dataKeyX: string, bars: { key: string, color: string, name?: string }[], onOpenChat?: (contextPrompt?: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current || !containerRef.current) return;

    const container = containerRef.current;

    const draw = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      svg.attr('width', width).attr('height', height);

      const margin = { top: 16, right: 16, bottom: 44, left: 56 };
      const innerWidth = Math.max(0, width - margin.left - margin.right);
      const innerHeight = Math.max(0, height - margin.top - margin.bottom);

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      const categories = data.map(d => String(d[dataKeyX]));
      const x0 = d3.scaleBand<string>()
        .domain(categories)
        .range([0, innerWidth])
        .padding(0.25);

      const x1 = d3.scaleBand<string>()
        .domain(bars.map(b => b.key))
        .range([0, x0.bandwidth()])
        .padding(0.08);

      const yMax = d3.max(data, d => d3.max(bars, b => Number(d[b.key]) || 0)) || 0;
      const y = d3.scaleLinear()
        .domain([0, yMax])
        .nice()
        .range([innerHeight, 0]);

      // Horizontal gridlines (subtle, dashed) — emulate recharts CartesianGrid
      g.append('g')
        .attr('class', 'grid')
        .call(
          d3.axisLeft(y)
            .tickSize(-innerWidth)
            .tickFormat(() => '')
            .ticks(5)
        )
        .call(sel => sel.select('.domain').remove())
        .call(sel => sel.selectAll('line')
          .attr('stroke', '#f1f5f9')
          .attr('stroke-dasharray', '3 3'));

      // Y axis (no domain line, gray ticks)
      const yAxis = d3.axisLeft(y)
        .ticks(5)
        .tickFormat(d => d3.format('~s')(d as number));

      g.append('g')
        .call(yAxis)
        .call(sel => sel.select('.domain').remove())
        .call(sel => sel.selectAll('line').remove())
        .call(sel => sel.selectAll('text')
          .attr('fill', '#64748b')
          .style('font-size', '12px'));

      // X axis (no domain line, gray ticks, offset)
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x0).tickSize(0).tickPadding(10))
        .call(sel => sel.select('.domain').remove())
        .call(sel => sel.selectAll('text')
          .attr('fill', '#64748b')
          .style('font-size', '12px'));

      // Tooltip
      const tooltip = d3.select(tooltipRef.current);

      // Bars (rounded top corners via path so we can match radius=[4,4,0,0])
      const radius = 4;
      const roundedTopRect = (xPos: number, yPos: number, w: number, h: number, r: number) => {
        const rr = Math.min(r, w / 2, h);
        if (h <= 0 || w <= 0) return '';
        return `M${xPos},${yPos + h} L${xPos},${yPos + rr} Q${xPos},${yPos} ${xPos + rr},${yPos} L${xPos + w - rr},${yPos} Q${xPos + w},${yPos} ${xPos + w},${yPos + rr} L${xPos + w},${yPos + h} Z`;
      };

      data.forEach(d => {
        const group = g.append('g').attr('transform', `translate(${x0(String(d[dataKeyX]))},0)`);
        bars.forEach(b => {
          const value = Number(d[b.key]) || 0;
          const barX = x1(b.key) || 0;
          const barW = x1.bandwidth();
          const barY = y(value);
          const barH = innerHeight - barY;

          group.append('path')
            .attr('d', roundedTopRect(barX, barY, barW, barH, radius))
            .attr('fill', b.color)
            .style('cursor', 'pointer')
            .on('mouseover', function (event) {
              d3.select(this).attr('opacity', 0.85);
              const containerRect = container.getBoundingClientRect();
              const rows = bars.map(bb => `<div style="display:flex;justify-content:space-between;gap:12px"><span style="color:#64748b">${bb.name || bb.key}</span><strong>${(Number(d[bb.key]) || 0).toLocaleString()}</strong></div>`).join('');
              tooltip
                .style('visibility', 'visible')
                .style('opacity', '1')
                .html(`<div style="font-weight:600;color:#0f172a;margin-bottom:4px">${d[dataKeyX]}</div>${rows}`)
                .style('left', `${event.clientX - containerRect.left + 12}px`)
                .style('top', `${event.clientY - containerRect.top + 12}px`);
            })
            .on('mousemove', function (event) {
              const containerRect = container.getBoundingClientRect();
              tooltip
                .style('left', `${event.clientX - containerRect.left + 12}px`)
                .style('top', `${event.clientY - containerRect.top + 12}px`);
            })
            .on('mouseout', function () {
              d3.select(this).attr('opacity', 1);
              tooltip.style('visibility', 'hidden').style('opacity', '0');
            });
        });
      });

      // Legend (bottom, mirrors recharts)
      const legend = svg.append('g')
        .attr('transform', `translate(${margin.left},${height - 18})`);
      let offset = 0;
      bars.forEach(b => {
        const item = legend.append('g').attr('transform', `translate(${offset},0)`);
        item.append('circle').attr('cx', 6).attr('cy', 0).attr('r', 5).attr('fill', b.color);
        const text = item.append('text')
          .attr('x', 16)
          .attr('y', 4)
          .attr('fill', '#64748b')
          .style('font-size', '12px')
          .text(b.name || b.key);
        const node = text.node();
        const textWidth = node ? node.getComputedTextLength() : 40;
        offset += 16 + textWidth + 18;
      });
    };

    draw();

    const observer = new ResizeObserver(() => draw());
    observer.observe(container);
    return () => observer.disconnect();
  }, [data, dataKeyX, bars]);

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col group">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
          {title}
          <span className="text-[10px] font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">d3</span>
        </h3>
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
      <div ref={containerRef} className="flex-1 min-h-[200px] relative">
        <svg ref={svgRef} style={{ display: 'block' }} />
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            opacity: 0,
            pointerEvents: 'none',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            padding: '8px 10px',
            fontSize: '12px',
            transition: 'opacity 120ms',
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}

export type BoxPlotDatum = { seller: string, brand: string, product: string, price: number, sellerType: string, imageLink?: string };

export function D3BoxPlotWidget({ title, data, brandColors, loading, onOpenChat }: { title: string, data: BoxPlotDatum[], brandColors?: Record<string, string>, loading?: boolean, onOpenChat?: (contextPrompt?: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [splitBySellerType, setSplitBySellerType] = useState<boolean>(false);

  const allBrands = React.useMemo(
    () => Array.from(new Set((data ?? []).map(d => d.brand))).sort(),
    [data]
  );

  const PRICE_STEP = 10000;

  const priceBounds = React.useMemo(() => {
    const prices = (data ?? []).map(d => d.price);
    if (prices.length === 0) return { min: 0, max: 0 };
    const rawMin = Math.min(...prices);
    const rawMax = Math.max(...prices);
    const min = Math.floor(rawMin / PRICE_STEP) * PRICE_STEP;
    const max = Math.ceil(rawMax / PRICE_STEP) * PRICE_STEP;
    return { min, max: max === min ? min + PRICE_STEP : max };
  }, [data]);

  const [priceRange, setPriceRange] = useState<[number, number]>([priceBounds.min, priceBounds.max]);
  const [minDraft, setMinDraft] = useState<string>(String(priceBounds.min));
  const [maxDraft, setMaxDraft] = useState<string>(String(priceBounds.max));

  useEffect(() => {
    setPriceRange([priceBounds.min, priceBounds.max]);
  }, [priceBounds.min, priceBounds.max]);

  useEffect(() => {
    setMinDraft(String(priceRange[0]));
    setMaxDraft(String(priceRange[1]));
  }, [priceRange]);

  const snapToStep = (n: number) => Math.round(n / PRICE_STEP) * PRICE_STEP;

  const commitMinPrice = (raw: string) => {
    const n = Number(raw);
    if (!Number.isFinite(n)) { setMinDraft(String(priceRange[0])); return; }
    const snapped = snapToStep(n);
    const clamped = Math.max(priceBounds.min, Math.min(snapped, priceRange[1] - PRICE_STEP));
    setPriceRange([clamped, priceRange[1]]);
  };

  const commitMaxPrice = (raw: string) => {
    const n = Number(raw);
    if (!Number.isFinite(n)) { setMaxDraft(String(priceRange[1])); return; }
    const snapped = snapToStep(n);
    const clamped = Math.min(priceBounds.max, Math.max(snapped, priceRange[0] + PRICE_STEP));
    setPriceRange([priceRange[0], clamped]);
  };

  const filteredData = React.useMemo(() => {
    const base = selectedBrand === 'all' ? (data ?? []) : (data ?? []).filter(d => d.brand === selectedBrand);
    return base.filter(d => d.price >= priceRange[0] && d.price <= priceRange[1]);
  }, [data, selectedBrand, priceRange]);

  const formatPrice = (v: number) => `$${v.toLocaleString('es-AR')}`;
  const isPriceFiltered = priceRange[0] !== priceBounds.min || priceRange[1] !== priceBounds.max;
  const pricePct = (v: number) => {
    const span = priceBounds.max - priceBounds.min;
    if (span <= 0) return 0;
    return ((v - priceBounds.min) / span) * 100;
  };

  const WHISKER_COLOR = '#000000';
  const BOX_COLOR = '#000000';
  const SELLER_TYPES: string[] = ['brand', 'retailer'];
  const SELLER_TYPE_LABEL: Record<string, string> = { brand: 'Marca', retailer: 'Retailer' };
  const AGGREGATE_KEY = '__all__';
  const activeSellerKeys: string[] = splitBySellerType ? SELLER_TYPES : [AGGREGATE_KEY];

  useEffect(() => {
    if (!filteredData || filteredData.length === 0 || !svgRef.current || !containerRef.current) return;

    const container = containerRef.current;

    const lighten = (hex: string, dl: number) => {
      const c = d3.hsl(hex);
      c.l = Math.min(0.95, c.l + dl);
      c.s = Math.max(0.1, c.s - dl * 0.2);
      return c.formatHex();
    };

    const draw = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      svg.attr('width', width).attr('height', height);

      const margin = { top: 16, right: 24, bottom: 76, left: 72 };
      const innerWidth = Math.max(0, width - margin.left - margin.right);
      const innerHeight = Math.max(0, height - margin.top - margin.bottom);

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      const groups = d3.group(filteredData, d => d.brand);
      const brands = Array.from(groups.keys()).sort((a, b) => {
        const ma = d3.median(groups.get(a)!, d => d.price) ?? 0;
        const mb = d3.median(groups.get(b)!, d => d.price) ?? 0;
        return mb - ma;
      });

      type Stat = {
        brand: string,
        sellerType: string,
        items: BoxPlotDatum[],
        q1: number, median: number, q3: number,
        lowerWhisker: number, upperWhisker: number,
        color: string,
      };

      const computeStat = (brand: string, sellerType: string, items: BoxPlotDatum[]): Stat | null => {
        if (!items || items.length === 0) return null;
        const prices = items.map(d => d.price).sort(d3.ascending);
        const q1 = d3.quantile(prices, 0.25) ?? prices[0];
        const median = d3.quantile(prices, 0.5) ?? prices[0];
        const q3 = d3.quantile(prices, 0.75) ?? prices[prices.length - 1];
        const iqr = q3 - q1;
        const lowerFence = q1 - 1.5 * iqr;
        const upperFence = q3 + 1.5 * iqr;
        const lowerWhisker = prices.find(p => p >= lowerFence) ?? q1;
        const upperPool = prices.filter(p => p <= upperFence);
        const upperWhisker = upperPool.length ? upperPool[upperPool.length - 1] : q3;
        const baseColor = brandColors?.[brand] ?? '#1a1a1a';
        const color = sellerType === 'retailer' ? baseColor : baseColor;
        return { brand, sellerType, items, q1, median, q3, lowerWhisker, upperWhisker, color };
      };

      const stats: Stat[] = [];
      for (const brand of brands) {
        const brandItems = groups.get(brand)!;
        if (splitBySellerType) {
          const byType = d3.group(brandItems, d => d.sellerType);
          for (const st of SELLER_TYPES) {
            const stat = computeStat(brand, st, byType.get(st) ?? []);
            if (stat) stats.push(stat);
          }
        } else {
          const stat = computeStat(brand, AGGREGATE_KEY, brandItems);
          if (stat) stats.push(stat);
        }
      }

      const x = d3.scaleBand<string>()
        .domain(brands)
        .range([0, innerWidth])
        .padding(selectedBrand === 'all' ? 0.2 : 0.45);

      const xInner = d3.scaleBand<string>()
        .domain(activeSellerKeys)
        .range([0, x.bandwidth()])
        .padding(splitBySellerType ? 0.18 : 0);

      const yMax = d3.max(filteredData, d => d.price) ?? 0;
      const yMin = d3.min(filteredData, d => d.price) ?? 0;
      const yPad = (yMax - yMin) * 0.1 || yMax * 0.05;
      const y = d3.scaleLinear()
        .domain([Math.max(0, yMin - yPad), yMax + yPad])
        .nice()
        .range([innerHeight, 0]);

      // Gridlines
      g.append('g')
        .attr('class', 'grid')
        .call(
          d3.axisLeft(y)
            .tickSize(-innerWidth)
            .tickFormat(() => '')
            .ticks(6)
        )
        .call(sel => sel.select('.domain').remove())
        .call(sel => sel.selectAll('line')
          .attr('stroke', '#f1f5f9')
          .attr('stroke-dasharray', '3 3'));

      // Y axis
      g.append('g')
        .call(
          d3.axisLeft(y)
            .ticks(6)
            .tickFormat(d => `$${d3.format('~s')(d as number).replace('G', 'B')}`)
        )
        .call(sel => sel.select('.domain').remove())
        .call(sel => sel.selectAll('line').remove())
        .call(sel => sel.selectAll('text')
          .attr('fill', '#64748b')
          .style('font-size', '12px'));

      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -54)
        .attr('x', -innerHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#64748b')
        .style('font-size', '11px')
        .text('Precio (ARS)');

      // X sub-axis: seller_type under each box (only when split)
      if (splitBySellerType) {
        const subAxis = g.append('g').attr('transform', `translate(0,${innerHeight})`);
        stats.forEach(s => {
          const bx = x(s.brand)!;
          const subX = xInner(s.sellerType)!;
          subAxis.append('text')
            .attr('x', bx + subX + xInner.bandwidth() / 2)
            .attr('y', 14)
            .attr('text-anchor', 'middle')
            .attr('fill', '#94a3b8')
            .style('font-size', '10px')
            .text(SELLER_TYPE_LABEL[s.sellerType] ?? s.sellerType);
        });
      }

      // X axis: brand labels (below seller_type labels when split)
      g.append('g')
        .attr('transform', `translate(0,${innerHeight + (splitBySellerType ? 22 : 4)})`)
        .call(d3.axisBottom(x).tickSize(0).tickPadding(4))
        .call(sel => sel.select('.domain').remove())
        .call(sel => sel.selectAll('text')
          .attr('fill', '#94a3b8') //'#0f172a'
          .style('font-size', '12px')
          .style('font-weight', '400')
          .style('text-transform', 'capitalize'));

      const tooltip = d3.select(tooltipRef.current);

      const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const showTooltip = (event: MouseEvent, d: BoxPlotDatum) => {
        const containerRect = container.getBoundingClientRect();
        const imgHtml = d.imageLink
          ? `<div style="width:120px;height:120px;margin:0 auto 8px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;display:flex;align-items:center;justify-content:center"><img src="${escapeAttr(d.imageLink)}" alt="" style="width:100%;height:100%;object-fit:contain" loading="lazy" onerror="this.style.display='none'"/></div>`
          : '';
        tooltip
          .style('visibility', 'visible')
          .style('opacity', '1')
          .html(`
            ${imgHtml}
            <div style="font-weight:600;color:#0f172a;margin-bottom:6px;max-width:260px;white-space:normal;line-height:1.3">${d.product}</div>
            <div style="display:flex;justify-content:space-between;gap:16px;margin-bottom:2px"><span style="color:#64748b">Brand</span><strong style="text-transform:capitalize">${d.brand}</strong></div>
            <div style="display:flex;justify-content:space-between;gap:16px;margin-bottom:2px"><span style="color:#64748b">Seller</span><strong>${d.seller}</strong></div>
            <div style="display:flex;justify-content:space-between;gap:16px;margin-bottom:2px"><span style="color:#64748b">Tipo</span><strong>${SELLER_TYPE_LABEL[d.sellerType] ?? d.sellerType}</strong></div>
            <div style="display:flex;justify-content:space-between;gap:16px"><span style="color:#64748b">Precio</span><strong>$${d.price.toLocaleString('es-AR')}</strong></div>
          `)
          .style('left', `${event.clientX - containerRect.left + 12}px`)
          .style('top', `${event.clientY - containerRect.top + 12}px`);
      };

      // Layer order: points first (behind), then boxes/whiskers on top
      const pointsLayer = g.append('g').attr('class', 'points-layer');
      const boxesLayer = g.append('g').attr('class', 'boxes-layer');

      stats.forEach((s, statIdx) => {
        const bx = x(s.brand)!;
        const subX = xInner(s.sellerType)!;
        const subW = xInner.bandwidth();
        const cx = bx + subX + subW / 2;
        const boxLeft = bx + subX + subW * 0.1;
        const boxWidth = subW * 0.8;
        const color = s.color;

        // --- Points (behind) ---
        const jitterRange = subW * 0.65;
        const rng = d3.randomLcg(0.42 + statIdx * 0.137);
        const points = s.items.map(d => ({
          datum: d,
          jx: cx + (rng() - 0.5) * jitterRange,
          outlier: d.price < s.lowerWhisker || d.price > s.upperWhisker,
        }));

        pointsLayer.append('g')
          .attr('class', `stat-points-${statIdx}`)
          .selectAll('circle')
          .data(points)
          .join('circle')
          .attr('cx', p => p.jx)
          .attr('cy', p => y(p.datum.price))
          .attr('r', p => p.outlier ? 3 : 2.4)
          .attr('fill', color)
          .attr('fill-opacity', p => p.outlier ? 0.75 : 0.32)
          .attr('stroke', p => p.outlier ? '#0f172a' : 'none')
          .attr('stroke-width', p => p.outlier ? 0.5 : 0)
          .style('cursor', 'pointer')
          .on('mouseover', function (event, p) {
            d3.select(this).attr('r', 6).attr('fill-opacity', 1).attr('stroke', '#0f172a').attr('stroke-width', 1);
            showTooltip(event as MouseEvent, p.datum);
          })
          .on('mousemove', function (event) {
            const containerRect = container.getBoundingClientRect();
            tooltip
              .style('left', `${(event as MouseEvent).clientX - containerRect.left + 12}px`)
              .style('top', `${(event as MouseEvent).clientY - containerRect.top + 12}px`);
          })
          .on('mouseout', function (_event, p) {
            d3.select(this)
              .attr('r', p.outlier ? 3 : 2.4)
              .attr('fill-opacity', p.outlier ? 0.75 : 0.32)
              .attr('stroke', p.outlier ? '#0f172a' : 'none')
              .attr('stroke-width', p.outlier ? 0.5 : 0);
            tooltip.style('visibility', 'hidden').style('opacity', '0');
          });

        // --- Box + whiskers (on top, more prominent) ---
        const brandG = boxesLayer.append('g')
          .attr('class', `stat-box-${statIdx}`)
          .style('pointer-events', 'none');

        // Vertical whisker line — thin, black
        brandG.append('line')
          .attr('x1', cx).attr('x2', cx)
          .attr('y1', y(s.upperWhisker)).attr('y2', y(s.lowerWhisker))
          .attr('stroke', WHISKER_COLOR).attr('stroke-width', 1);

        // Whisker end caps — thin, black
        const capWidth = subW * 0.42;
        [s.upperWhisker, s.lowerWhisker].forEach(v => {
          brandG.append('line')
            .attr('x1', cx - capWidth / 2).attr('x2', cx + capWidth / 2)
            .attr('y1', y(v)).attr('y2', y(v))
            .attr('stroke', WHISKER_COLOR).attr('stroke-width', 1);
        });

        // Box: variant-colored fill + variant-colored stroke
        brandG.append('rect')
          .attr('x', boxLeft).attr('width', boxWidth)
          .attr('y', y(s.q3)).attr('height', Math.max(0, y(s.q1) - y(s.q3)))
          .attr('fill', color)
          .attr('fill-opacity', 0.3)
          .attr('stroke', BOX_COLOR)
          .attr('stroke-width', 1.25);

        // Median line — thin, black
        brandG.append('line')
          .attr('x1', boxLeft).attr('x2', boxLeft + boxWidth)
          .attr('y1', y(s.median)).attr('y2', y(s.median))
          .attr('stroke', BOX_COLOR).attr('stroke-width', 1.5);
      });
    };

    draw();

    const observer = new ResizeObserver(() => draw());
    observer.observe(container);
    return () => observer.disconnect();
  }, [filteredData, brandColors, selectedBrand, splitBySellerType]);

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col group">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
          {title}
          <span className="text-[10px] font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">d3</span>
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSplitBySellerType(v => !v)}
            className={`text-xs font-medium border rounded-xl px-2.5 py-1.5 shadow-sm transition-colors ${
              splitBySellerType
                ? 'text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
                : 'text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
            title={splitBySellerType ? 'Ocultar apertura por tipo de seller' : 'Abrir por tipo de seller (Marca / Retailer)'}
          >
            {splitBySellerType ? 'Ocultar tipo de seller' : 'Abrir por tipo de seller'}
          </button>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-2.5 py-1.5 shadow-sm capitalize cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200"
            title="Filtrar por marca"
          >
            <option value="all">Todas las marcas</option>
            {allBrands.map(b => (
              <option key={b} value={b} className="capitalize">{b}</option>
            ))}
          </select>
          {onOpenChat && (
            <button
              onClick={() => onOpenChat(`Hablemos sobre el gráfico de "${title}"${selectedBrand !== 'all' ? ` filtrado por la marca "${selectedBrand}"` : ''}${isPriceFiltered ? ` y rango de precio ${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}` : ''}. ¿Qué insights podés darme sobre estos datos?`)}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-xl transition-all shadow-sm"
              title="Preguntar al agente sobre este gráfico"
            >
              <Sparkles size={12} className="text-indigo-600 animate-pulse" />
              <span>Preguntar</span>
            </button>
          )}
        </div>
      </div>
      {priceBounds.max > priceBounds.min && (
        <div className="mb-4 flex items-center gap-3">
          <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500 whitespace-nowrap">
            <span>Precio</span>
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-300">
              <span className="text-gray-400">$</span>
              <input
                type="number"
                min={priceBounds.min}
                max={priceBounds.max}
                step={PRICE_STEP}
                value={minDraft}
                onChange={(e) => setMinDraft(e.target.value)}
                onBlur={(e) => commitMinPrice(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                  if (e.key === 'Escape') { setMinDraft(String(priceRange[0])); (e.target as HTMLInputElement).blur(); }
                }}
                className="w-20 bg-transparent text-gray-700 tabular-nums text-right focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                aria-label="Precio mínimo (manual)"
              />
            </div>
            <span className="text-gray-300">—</span>
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-300">
              <span className="text-gray-400">$</span>
              <input
                type="number"
                min={priceBounds.min}
                max={priceBounds.max}
                step={PRICE_STEP}
                value={maxDraft}
                onChange={(e) => setMaxDraft(e.target.value)}
                onBlur={(e) => commitMaxPrice(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                  if (e.key === 'Escape') { setMaxDraft(String(priceRange[1])); (e.target as HTMLInputElement).blur(); }
                }}
                className="w-20 bg-transparent text-gray-700 tabular-nums text-right focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                aria-label="Precio máximo (manual)"
              />
            </div>
          </div>
          <div className="relative flex-1 h-5 select-none">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-gray-200" />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-indigo-500"
              style={{ left: `${pricePct(priceRange[0])}%`, right: `${100 - pricePct(priceRange[1])}%` }}
            />
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={PRICE_STEP}
              value={priceRange[0]}
              onChange={(e) => {
                const v = Math.min(Number(e.target.value), priceRange[1] - PRICE_STEP);
                setPriceRange([Math.max(priceBounds.min, v), priceRange[1]]);
              }}
              className="d3-range-slider absolute inset-0 w-full h-5 appearance-none bg-transparent pointer-events-none"
              aria-label="Precio mínimo"
            />
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={PRICE_STEP}
              value={priceRange[1]}
              onChange={(e) => {
                const v = Math.max(Number(e.target.value), priceRange[0] + PRICE_STEP);
                setPriceRange([priceRange[0], Math.min(priceBounds.max, v)]);
              }}
              className="d3-range-slider absolute inset-0 w-full h-5 appearance-none bg-transparent pointer-events-none"
              aria-label="Precio máximo"
            />
          </div>
          {isPriceFiltered && (
            <button
              onClick={() => setPriceRange([priceBounds.min, priceBounds.max])}
              className="text-[11px] font-medium text-gray-500 hover:text-gray-800 underline-offset-2 hover:underline"
              title="Restablecer rango de precio"
            >
              Reset
            </button>
          )}
        </div>
      )}
      <div ref={containerRef} className="flex-1 min-h-[200px] relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 z-20">
            Cargando datos…
          </div>
        )}
        {!loading && filteredData.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 z-20">
            No hay datos en el rango seleccionado
          </div>
        )}
        <svg ref={svgRef} style={{ display: 'block' }} />
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            opacity: 0,
            pointerEvents: 'none',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            padding: '8px 10px',
            fontSize: '12px',
            transition: 'opacity 120ms',
            zIndex: 10,
          }}
        />
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
