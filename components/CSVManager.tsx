'use client';

import { useRef, useState } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { exportToCSV, importFromCSV } from '@/lib/csv';
import { Download, Upload } from 'lucide-react';

export function CSVManager() {
  const { transactions, importTransactions } = useTransactions();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    if (transactions.length === 0) {
      alert('No transactions to export');
      return;
    }
    exportToCSV(transactions);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const imported = await importFromCSV(file);
      importTransactions(imported);
      alert(`Successfully imported ${imported.length} transactions`);
    } catch (error) {
      alert(`Error importing CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
      >
        <Download className="w-4 h-4" />
        Export CSV
      </button>

      <button
        onClick={handleImportClick}
        disabled={isImporting}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium disabled:opacity-50"
      >
        <Upload className="w-4 h-4" />
        {isImporting ? 'Importing...' : 'Import CSV'}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
