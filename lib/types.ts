export type Category = 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Healthcare' | 'Shopping' | 'Other';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: Date;
  recurring?: boolean;
}

export interface CategoryTotal {
  category: Category;
  total: number;
  count: number;
}

export interface FilterState {
  startDate?: Date;
  endDate?: Date;
  category?: Category;
  searchTerm?: string;
}
