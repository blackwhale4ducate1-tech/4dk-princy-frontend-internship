'use client';

import { motion } from 'framer-motion';
import { SummaryMetrics } from '@/components/SummaryMetrics';
import { Chart3D } from '@/components/Chart3D';
import { CategoryPieChart, TrendAreaChart, CategoryBarChart } from '@/components/Charts';
import { TransactionList } from '@/components/TransactionList';
import { AddTransactionForm } from '@/components/AddTransactionForm';
import { FilterPanel } from '@/components/FilterPanel';
import { CSVManager } from '@/components/CSVManager';

export default function Dashboard() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Expense Tracker</h1>
        <p className="text-slate-600">Track and visualize your spending with beautiful 3D charts</p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        <AddTransactionForm />
        <FilterPanel />
        <CSVManager />
      </motion.div>

      {/* Summary Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <SummaryMetrics />
      </motion.div>

      {/* 3D Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Expenses by Category (3D View)</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Chart3D />
        </div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
      >
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Category Distribution</h2>
          <CategoryPieChart />
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Spending by Category</h2>
          <CategoryBarChart />
        </div>
      </motion.div>

      {/* Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Spending Trend</h2>
          <TrendAreaChart />
        </div>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Transactions</h2>
        <TransactionList />
      </motion.div>
    </main>
  );
}
