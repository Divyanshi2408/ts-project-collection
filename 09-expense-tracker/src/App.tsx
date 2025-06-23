import { useState } from 'react';
import { ExpenseProvider, useExpenses } from './context/ExpenseContext';
import type { Expense } from './types';

const ExpenseForm = () => {
  const { addExpense } = useExpenses();
  const [form, setForm] = useState({ title: '', amount: '', category: 'Food' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Date.now(),
      title: form.title,
      amount: parseFloat(form.amount),
      category: form.category as Expense['category'],
      date: new Date().toISOString(),
    };
    addExpense(newExpense);
    setForm({ title: '', amount: '', category: 'Food' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })}
        required
      />
      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Entertainment</option>
        <option>Bills</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

const ExpenseList = () => {
  const { expenses, removeExpense } = useExpenses();
  return (
    <ul>
      {expenses.map(exp => (
        <li key={exp.id}>
          {exp.title} - ₹{exp.amount} ({exp.category})
          <button onClick={() => removeExpense(exp.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default function App() {
  return (
    <ExpenseProvider>
      <h2>Expense Tracker</h2>
      <ExpenseForm />
      <ExpenseList />
    </ExpenseProvider>
  );
}
