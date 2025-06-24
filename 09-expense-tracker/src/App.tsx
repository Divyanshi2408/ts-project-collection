import { useState } from 'react';
import { ExpenseProvider, useExpenses } from './context/ExpenseContext';
import type { Expense } from './types';

const ExpenseForm = () => {
  const { addExpense } = useExpenses();
  const [form, setForm] = useState({ title: '', amount: '', category: 'Food' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);

    if (!form.title.trim() || isNaN(amount) || amount <= 0) {
      alert('Please enter valid title and amount');
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      title: form.title.trim(),
      amount: parseFloat(amount.toFixed(2)),
      category: form.category as Expense['category'],
      date: new Date().toISOString(),
    };

    addExpense(newExpense);
    setForm({ title: '', amount: '', category: 'Food' });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        required
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })}
        required
        style={styles.input}
      />
      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        style={styles.input}
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Entertainment</option>
        <option>Bills</option>
        <option>Others</option>
      </select>
      <button type="submit" style={styles.button}>➕ Add</button>
    </form>
  );
};

const ExpenseList = () => {
  const { expenses, removeExpense } = useExpenses();

  if (expenses.length === 0) {
    return <p style={styles.empty}>No expenses added yet.</p>;
  }

  return (
    <ul style={styles.list}>
      {expenses.map(exp => (
        <li key={exp.id} style={styles.listItem}>
          <strong>{exp.title}</strong> - ₹{exp.amount} ({exp.category})
          <button onClick={() => removeExpense(exp.id)} style={styles.deleteButton}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default function App() {
  return (
    <ExpenseProvider>
      <div style={styles.container}>
        <h2>💰 Expense Tracker</h2>
        <ExpenseForm />
        <ExpenseList />
      </div>
    </ExpenseProvider>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column' as React.CSSProperties['flexDirection'],
    gap: '10px',
    marginBottom: '20px',
  } as React.CSSProperties,
  input: {
    padding: '8px',
    fontSize: '16px',
  } as React.CSSProperties,
  button: {
    padding: '10px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  } as React.CSSProperties,
  list: {
    listStyle: 'none',
    padding: 0,
  } as React.CSSProperties,
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,
  deleteButton: {
    background: 'transparent',
    border: 'none',
    color: 'red',
    fontSize: '16px',
    cursor: 'pointer',
  } as React.CSSProperties,
  empty: {
    fontStyle: 'italic',
    color: '#999',
  } as React.CSSProperties,
};
