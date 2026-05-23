'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTransactions } from '@/hooks/useTransactions';
import { X, Trash2 } from 'lucide-react';

const categoryColors: Record<string, string> = {
  Food: 'bg-red-100 text-red-700',
  Transport: 'bg-orange-100 text-orange-700',
  Entertainment: 'bg-yellow-100 text-yellow-700',
  Utilities: 'bg-cyan-100 text-cyan-700',
  Healthcare: 'bg-cyan-100 text-cyan-700',
  Shopping: 'bg-pink-100 text-pink-700',
  Other: 'bg-gray-100 text-gray-700',
};

export function TransactionList() {
  const { filteredTransactions, removeTransaction } = useTransactions();

  if (filteredTransactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 text-lg">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {filteredTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[transaction.category]}`}>
                  {transaction.category}
                </span>
                <p className="font-medium text-slate-900">{transaction.description}</p>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {transaction.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold text-slate-900 text-lg">${transaction.amount.toFixed(2)}</p>
              <button
                onClick={() => removeTransaction(transaction.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-100 rounded-lg"
                aria-label="Delete transaction"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
