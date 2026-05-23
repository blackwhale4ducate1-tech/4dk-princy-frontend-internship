'use client';

import { motion } from 'framer-motion';
import { calculateTotalExpenses, calculateAverageDailyExpense } from '@/lib/calculations';
import { useTransactions } from '@/hooks/useTransactions';

export function SummaryMetrics() {
  const { filteredTransactions } = useTransactions();

  const totalExpenses = calculateTotalExpenses(filteredTransactions);
  const averageDaily = calculateAverageDailyExpense(filteredTransactions);
  const transactionCount = filteredTransactions.length;

  const metrics = [
    {
      label: 'Total Expenses',
      value: `$${totalExpenses.toFixed(2)}`,
      color: 'from-red-500 to-red-600',
    },
    {
      label: 'Daily Average',
      value: `$${averageDaily.toFixed(2)}`,
      color: 'from-orange-500 to-orange-600',
    },
    {
      label: 'Transactions',
      value: transactionCount.toString(),
      color: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${metric.color} rounded-lg p-6 text-white shadow-lg`}
        >
          <p className="text-sm font-medium opacity-90">{metric.label}</p>
          <p className="text-3xl font-bold mt-2">{metric.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
