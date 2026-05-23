import { Transaction, CategoryTotal, Category } from '@/lib/types';

export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

export function calculateCategoryTotals(transactions: Transaction[]): CategoryTotal[] {
  const categoryMap = new Map<Category, { total: number; count: number }>();

  transactions.forEach(t => {
    const existing = categoryMap.get(t.category) || { total: 0, count: 0 };
    categoryMap.set(t.category, {
      total: existing.total + t.amount,
      count: existing.count + 1,
    });
  });

  return Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    total: data.total,
    count: data.count,
  }));
}

export function calculateMonthlyBreakdown(transactions: Transaction[]): Record<string, number> {
  const monthMap = new Map<string, number>();

  transactions.forEach(t => {
    const monthKey = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, '0')}`;
    const existing = monthMap.get(monthKey) || 0;
    monthMap.set(monthKey, existing + t.amount);
  });

  return Object.fromEntries(monthMap);
}

export function calculateAverageDailyExpense(transactions: Transaction[]): number {
  if (transactions.length === 0) return 0;

  const dates = new Set(transactions.map(t => t.date.toDateString()));
  const totalDays = dates.size;
  const totalAmount = calculateTotalExpenses(transactions);

  return totalDays > 0 ? totalAmount / totalDays : 0;
}

export function calculateTrendData(transactions: Transaction[]): Array<{ date: string; amount: number }> {
  const sortedByDate = [...transactions].sort((a, b) => a.date.getTime() - b.date.getTime());
  const dateMap = new Map<string, number>();

  sortedByDate.forEach(t => {
    const dateStr = t.date.toLocaleDateString();
    const existing = dateMap.get(dateStr) || 0;
    dateMap.set(dateStr, existing + t.amount);
  });

  return Array.from(dateMap.entries()).map(([date, amount]) => ({
    date,
    amount,
  }));
}
