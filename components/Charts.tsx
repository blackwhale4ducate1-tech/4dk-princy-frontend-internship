'use client';

import { PieChart, Pie, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { calculateCategoryTotals, calculateTrendData } from '@/lib/calculations';
import { useTransactions } from '@/hooks/useTransactions';

const categoryColors: Record<string, string> = {
  Food: '#ef4444',
  Transport: '#f97316',
  Entertainment: '#eab308',
  Utilities: '#06b6d4',
  Healthcare: '#06b6d4',
  Shopping: '#ec4899',
  Other: '#6b7280',
};

export function CategoryPieChart() {
  const { filteredTransactions } = useTransactions();
  const data = calculateCategoryTotals(filteredTransactions);

  if (data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-slate-50 rounded-lg">
        <p className="text-slate-600">No data to display</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data.map(cat => ({ name: cat.category, value: cat.total }))}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.category} fill={categoryColors[entry.category]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TrendAreaChart() {
  const { filteredTransactions } = useTransactions();
  const data = calculateTrendData(filteredTransactions);

  if (data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-slate-50 rounded-lg">
        <p className="text-slate-600">No data to display</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
        <Area type="monotone" dataKey="amount" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAmount)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CategoryBarChart() {
  const { filteredTransactions } = useTransactions();
  const data = calculateCategoryTotals(filteredTransactions);

  if (data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-slate-50 rounded-lg">
        <p className="text-slate-600">No data to display</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data.map(cat => ({ name: cat.category, total: cat.total }))}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
        <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.category} fill={categoryColors[entry.category]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
