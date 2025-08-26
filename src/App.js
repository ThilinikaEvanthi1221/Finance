// chart.tsx or App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required components only ONCE globally
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/expenses');
      setExpenses(res.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const addExpense = async () => {
    if (!amount || !category) return alert('Please enter both amount and category');

    try {
      await axios.post('http://localhost:5000/api/expenses', {
        amount: parseFloat(amount),
        category,
        type,
      });
      setAmount('');
      setCategory('');
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const data = {
    labels: expenses.map((e) => e.category),
    datasets: [
      {
        label: 'Amount',
        data: expenses.map((e) => e.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Expenses Overview' },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Personal Finance Tracker</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button onClick={addExpense}>Add</button>

      <div style={{ maxWidth: '600px', marginTop: '30px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default App;
