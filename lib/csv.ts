import Papa from 'papaparse';
import { Transaction } from './types';

export function exportToCSV(transactions: Transaction[]): void {
  const data = transactions.map(t => ({
    Description: t.description,
    Amount: t.amount,
    Category: t.category,
    Date: t.date.toLocaleDateString(),
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `expenses-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function importFromCSV(file: File): Promise<Omit<Transaction, 'id'>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        try {
          const transactions = results.data
            .filter((row: any) => row.Description && row.Amount)
            .map((row: any) => ({
              description: row.Description,
              amount: parseFloat(row.Amount),
              category: row.Category || 'Other',
              date: new Date(row.Date),
            }));
          resolve(transactions);
        } catch (error) {
          reject(new Error('Failed to parse CSV file'));
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      },
    });
  });
}
