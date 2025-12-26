
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DailyStat } from '../types';

interface HistoryChartProps {
  data: DailyStat[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis 
          dataKey="day" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 12 }} 
          dy={10}
        />
        <Tooltip 
          cursor={{ fill: '#1e293b', radius: 8 }}
          contentStyle={{ 
            backgroundColor: '#0f172a', 
            border: '1px solid #334155', 
            borderRadius: '12px',
            color: '#f8fafc'
          }}
          itemStyle={{ color: '#10b981' }}
        />
        <Bar 
          dataKey="count" 
          radius={[6, 6, 0, 0]} 
          maxBarSize={40}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={index === data.length - 1 ? '#10b981' : '#334155'} 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
