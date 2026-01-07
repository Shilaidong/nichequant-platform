import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../src/services/api';
import type { ChartDataPoint } from '../types';

const MarketData: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await api.marketData.getAll();
        setChartData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch market data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg text-slate-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">市场指数概览</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">追踪亚文化资产的市场价值波动，把握投资时机。</p>
        </div>
        <div className="bg-neutral-100/50 backdrop-blur-lg p-4 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-lg shadow-neutral-500/10">
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
                <XAxis dataKey="date" stroke="#475569" axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    color: '#0f172a'
                  }}
                  cursor={{ stroke: 'rgba(0, 0, 0, 0.2)', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Line type="monotone" dataKey="value" name="指数" stroke="#0f172a" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff', fill: '#0f172a' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketData;