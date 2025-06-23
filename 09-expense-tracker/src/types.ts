export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Entertainment' | 'Bills';
  date: string;
}
