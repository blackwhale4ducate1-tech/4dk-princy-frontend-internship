'use client';

import { useState } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { Category } from '@/lib/types';
import { X } from 'lucide-react';

const CATEGORIES: Category[] = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Other'];

export function FilterPanel() {
  const { setFilters, filters, clearFilters } = useTransactions();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    setFilters(localFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    clearFilters();
    setIsOpen(false);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          hasActiveFilters
            ? 'bg-blue-100 text-blue-700 border border-blue-300'
            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
        }`}
      >
        {hasActiveFilters ? `Filters (${Object.keys(filters).length})` : 'Filters'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-900">Filter Transactions</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                value={localFilters.category || ''}
                onChange={(e) => setLocalFilters({ ...localFilters, category: (e.target.value as Category) || undefined })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                value={localFilters.startDate ? localFilters.startDate.toISOString().split('T')[0] : ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    startDate: e.target.value ? new Date(e.target.value) : undefined,
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input
                type="date"
                value={localFilters.endDate ? localFilters.endDate.toISOString().split('T')[0] : ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    endDate: e.target.value ? new Date(e.target.value) : undefined,
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                value={localFilters.searchTerm || ''}
                onChange={(e) => setLocalFilters({ ...localFilters, searchTerm: e.target.value || undefined })}
                placeholder="Search transactions..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Apply
            </button>
            <button
              onClick={handleClearFilters}
              className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
