'use client';

import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import { Transaction, FilterState, Category } from '@/lib/types';

interface TransactionContextType {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  filters: FilterState;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  importTransactions: (transactions: Omit<Transaction, 'id'>[]) => void;
}

type Action =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'REMOVE_TRANSACTION'; payload: string }
  | { type: 'UPDATE_TRANSACTION'; payload: { id: string; data: Partial<Transaction> } }
  | { type: 'SET_FILTERS'; payload: FilterState }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'IMPORT_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'LOAD_FROM_STORAGE'; payload: Transaction[] };

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialState: Transaction[] = [];

const transactionReducer = (state: Transaction[], action: Action): Transaction[] => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [action.payload, ...state];
    case 'REMOVE_TRANSACTION':
      return state.filter(t => t.id !== action.payload);
    case 'UPDATE_TRANSACTION':
      return state.map(t =>
        t.id === action.payload.id ? { ...t, ...action.payload.data } : t
      );
    case 'IMPORT_TRANSACTIONS':
    case 'LOAD_FROM_STORAGE':
      return [...action.payload, ...state];
    default:
      return state;
  }
};

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, dispatch] = useReducer(transactionReducer, initialState);
  const [filters, setFiltersState] = React.useState<FilterState>({});

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('expenses');
    if (stored) {
      try {
        const parsed = JSON.parse(stored).map((t: any) => ({
          ...t,
          date: new Date(t.date),
        }));
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed });
      } catch (e) {
        console.error('Failed to load transactions from storage');
      }
    }
  }, []);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(transactions));
  }, [transactions]);

  const filteredTransactions = React.useMemo(() => {
    return transactions.filter(t => {
      if (filters.category && t.category !== filters.category) return false;
      if (filters.startDate && t.date < filters.startDate) return false;
      if (filters.endDate && t.date > filters.endDate) return false;
      if (filters.searchTerm && !t.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [transactions, filters]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: { ...transaction, id: generateId() },
    });
  }, []);

  const removeTransaction = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TRANSACTION', payload: id });
  }, []);

  const updateTransaction = useCallback((id: string, data: Partial<Transaction>) => {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: { id, data } });
  }, []);

  const setFilters = useCallback((newFilters: FilterState) => {
    setFiltersState(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState({});
  }, []);

  const importTransactions = useCallback((toImport: Omit<Transaction, 'id'>[]) => {
    const withIds = toImport.map(t => ({ ...t, id: generateId() }));
    dispatch({ type: 'IMPORT_TRANSACTIONS', payload: withIds });
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        filteredTransactions,
        filters,
        addTransaction,
        removeTransaction,
        updateTransaction,
        setFilters,
        clearFilters,
        importTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
